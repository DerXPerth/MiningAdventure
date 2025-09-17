<?php

declare(strict_types=1);

final class GameRepository
{
    public function __construct(private \PDO $pdo)
    {
    }

    public function findPlayer(string $username): ?array
    {
        $stmt = $this->pdo->prepare('SELECT * FROM players WHERE username = :username');
        $stmt->execute(['username' => $username]);
        $player = $stmt->fetch();

        return $player ?: null;
    }

    public function createPlayer(string $username, string $passwordHash, string $company): array
    {
        $now = now()->format(\DateTimeInterface::ATOM);
        $stmt = $this->pdo->prepare(
            'INSERT INTO players(username, password_hash, company, created_at) VALUES(:username, :password, :company, :created_at)'
        );
        $stmt->execute([
            'username' => $username,
            'password' => $passwordHash,
            'company' => $company,
            'created_at' => $now,
        ]);

        $playerId = (int) $this->pdo->lastInsertId();
        $state = initial_state();
        $this->saveState($playerId, $state);

        return $this->getPlayerWithState($playerId);
    }

    public function verifyCredentials(string $username, string $password): ?array
    {
        $player = $this->findPlayer($username);
        if (!$player || !password_verify($password, $player['password_hash'])) {
            return null;
        }

        return $this->getPlayerWithState((int) $player['id']);
    }

    public function getPlayerWithState(int $playerId): array
    {
        $stmt = $this->pdo->prepare('SELECT * FROM saves WHERE player_id = :player ORDER BY updated_at DESC LIMIT 1');
        $stmt->execute(['player' => $playerId]);
        $save = $stmt->fetch();

        $stmtPlayer = $this->pdo->prepare('SELECT id, username, company, created_at FROM players WHERE id = :player');
        $stmtPlayer->execute(['player' => $playerId]);
        $player = $stmtPlayer->fetch();

        if (!$player) {
            throw new \RuntimeException('Spieler nicht gefunden.');
        }

        $state = $save ? json_decode($save['state_json'], true, 512, JSON_THROW_ON_ERROR) : initial_state();

        return [
            'id' => (int) $player['id'],
            'username' => $player['username'],
            'company' => $player['company'],
            'createdAt' => $player['created_at'],
            'state' => $state,
        ] + $this->getMultiplayerContext($playerId);
    }

    public function saveState(int $playerId, array $state): void
    {
        $json = json_encode($state, JSON_THROW_ON_ERROR);
        $now = now()->format(\DateTimeInterface::ATOM);
        $stmt = $this->pdo->prepare(
            'INSERT INTO saves(player_id, state_json, updated_at) VALUES(:player, :state, :updated_at)
             ON CONFLICT(player_id) DO UPDATE SET state_json = :state, updated_at = :updated_at'
        );
        $stmt->execute([
            'player' => $playerId,
            'state' => $json,
            'updated_at' => $now,
        ]);
    }

    public function createSession(int $playerId): array
    {
        $token = generate_token();
        $createdAt = now();
        $expiresAt = $createdAt->modify('+12 hours');
        $stmt = $this->pdo->prepare(
            'INSERT INTO sessions(token, player_id, created_at, expires_at) VALUES(:token, :player, :created_at, :expires_at)'
        );
        $stmt->execute([
            'token' => $token,
            'player' => $playerId,
            'created_at' => $createdAt->format(\DateTimeInterface::ATOM),
            'expires_at' => $expiresAt->format(\DateTimeInterface::ATOM),
        ]);

        return [
            'token' => $token,
            'expiresAt' => $expiresAt->format(\DateTimeInterface::ATOM),
        ];
    }

    public function validateSession(string $token): ?array
    {
        $stmt = $this->pdo->prepare(
            'SELECT s.token, s.player_id, s.expires_at, p.username, p.company FROM sessions s
             INNER JOIN players p ON p.id = s.player_id WHERE token = :token'
        );
        $stmt->execute(['token' => $token]);
        $session = $stmt->fetch();
        if (!$session) {
            return null;
        }

        if (new \DateTimeImmutable($session['expires_at']) < now()) {
            $this->deleteSession($token);
            return null;
        }

        return $session;
    }

    public function deleteSession(string $token): void
    {
        $stmt = $this->pdo->prepare('DELETE FROM sessions WHERE token = :token');
        $stmt->execute(['token' => $token]);
    }

    public function cleanupSessions(): void
    {
        $stmt = $this->pdo->prepare('DELETE FROM sessions WHERE expires_at < :now');
        $stmt->execute(['now' => now()->format(\DateTimeInterface::ATOM)]);
    }

    public function getMultiplayerContext(int $playerId): array
    {
        return [
            'guild' => $this->getGuildMembership($playerId),
            'world' => $this->getWorldSnapshot(),
        ];
    }

    public function listGuilds(): array
    {
        $stmt = $this->pdo->query(
            'SELECT g.id, g.name, g.motto, g.created_at, g.founder_id, COUNT(m.player_id) as members
             FROM guilds g
             LEFT JOIN guild_members m ON m.guild_id = g.id
             GROUP BY g.id
             ORDER BY members DESC, g.name'
        );

        $guilds = $stmt->fetchAll();

        return array_map(function (array $guild): array {
            $guild['id'] = (int) $guild['id'];
            $guild['members'] = (int) $guild['members'];
            $guild['founder_id'] = (int) $guild['founder_id'];
            return $guild;
        }, $guilds);
    }

    public function createGuild(int $playerId, string $name, string $motto): array
    {
        if ($this->getGuildMembership($playerId)) {
            throw new \RuntimeException('Du bist bereits Mitglied einer Zunft.');
        }

        $now = now()->format(\DateTimeInterface::ATOM);
        $stmt = $this->pdo->prepare(
            'INSERT INTO guilds(name, motto, founder_id, created_at) VALUES(:name, :motto, :founder, :created_at)'
        );
        $stmt->execute([
            'name' => $name,
            'motto' => $motto,
            'founder' => $playerId,
            'created_at' => $now,
        ]);

        $guildId = (int) $this->pdo->lastInsertId();

        $memberStmt = $this->pdo->prepare(
            'INSERT INTO guild_members(guild_id, player_id, role, joined_at) VALUES(:guild, :player, :role, :joined_at)'
        );
        $memberStmt->execute([
            'guild' => $guildId,
            'player' => $playerId,
            'role' => 'founder',
            'joined_at' => $now,
        ]);

        return $this->getGuildMembership($playerId) ?? [];
    }

    public function joinGuild(int $playerId, int $guildId): array
    {
        if ($this->getGuildMembership($playerId)) {
            throw new \RuntimeException('Du bist bereits Mitglied einer Zunft.');
        }

        $exists = $this->pdo->prepare('SELECT id FROM guilds WHERE id = :id');
        $exists->execute(['id' => $guildId]);
        if (!$exists->fetch()) {
            throw new \RuntimeException('Zunft wurde nicht gefunden.');
        }

        $stmt = $this->pdo->prepare(
            'INSERT INTO guild_members(guild_id, player_id, role, joined_at) VALUES(:guild, :player, :role, :joined_at)'
        );
        $stmt->execute([
            'guild' => $guildId,
            'player' => $playerId,
            'role' => 'member',
            'joined_at' => now()->format(\DateTimeInterface::ATOM),
        ]);

        return $this->getGuildMembership($playerId) ?? [];
    }

    public function leaveGuild(int $playerId): void
    {
        $stmt = $this->pdo->prepare('DELETE FROM guild_members WHERE player_id = :player');
        $stmt->execute(['player' => $playerId]);
    }

    public function claimGuildZone(int $playerId, string $name, array $polygon, float $bonus): array
    {
        $membership = $this->getGuildMembership($playerId);
        if (!$membership) {
            throw new \RuntimeException('Nur Mitglieder einer Zunft können Zonen beanspruchen.');
        }

        if (!in_array($membership['role'], ['founder', 'officer'], true)) {
            throw new \RuntimeException('Nur Gründer:innen oder Offiziere dürfen Zonen registrieren.');
        }

        if (count($polygon) < 3) {
            throw new \RuntimeException('Polygon benötigt mindestens drei Punkte.');
        }

        $stmt = $this->pdo->prepare(
            'INSERT INTO guild_zones(guild_id, name, polygon_json, resource_bonus, created_at) VALUES(:guild, :name, :polygon, :bonus, :created_at)'
        );
        $stmt->execute([
            'guild' => $membership['id'],
            'name' => $name,
            'polygon' => json_encode($polygon, JSON_THROW_ON_ERROR),
            'bonus' => $bonus,
            'created_at' => now()->format(\DateTimeInterface::ATOM),
        ]);

        return $this->getGuildMembership($playerId)['zones'] ?? [];
    }

    public function requestGuildSupport(int $playerId, string $type, array $payload): array
    {
        $membership = $this->getGuildMembership($playerId);
        if (!$membership) {
            throw new \RuntimeException('Unterstützungsanfragen benötigen eine Zunft.');
        }

        $now = now()->format(\DateTimeInterface::ATOM);
        $stmt = $this->pdo->prepare(
            'INSERT INTO guild_support(guild_id, player_id, request_type, payload_json, status, created_at, updated_at) VALUES(:guild, :player, :type, :payload, :status, :created, :updated)'
        );
        $stmt->execute([
            'guild' => $membership['id'],
            'player' => $playerId,
            'type' => $type,
            'payload' => json_encode($payload, JSON_THROW_ON_ERROR),
            'status' => 'open',
            'created' => $now,
            'updated' => $now,
        ]);

        return $this->getGuildMembership($playerId)['supportQueue'] ?? [];
    }

    public function updateGuildSupportStatus(int $playerId, int $supportId, string $status): void
    {
        $membership = $this->getGuildMembership($playerId);
        if (!$membership) {
            throw new \RuntimeException('Aktion nicht erlaubt.');
        }

        if (!in_array($membership['role'], ['founder', 'officer'], true)) {
            throw new \RuntimeException('Nur Offiziere oder Gründer:innen können Anfragen abschließen.');
        }

        $stmt = $this->pdo->prepare('UPDATE guild_support SET status = :status, updated_at = :updated WHERE id = :id AND guild_id = :guild');
        $stmt->execute([
            'status' => $status,
            'updated' => now()->format(\DateTimeInterface::ATOM),
            'id' => $supportId,
            'guild' => $membership['id'],
        ]);
    }

    public function unlockGuildTechnology(int $playerId, string $techId): array
    {
        $membership = $this->getGuildMembership($playerId);
        if (!$membership) {
            throw new \RuntimeException('Forschung ist nur innerhalb einer Zunft verfügbar.');
        }

        if (in_array($techId, array_column($membership['technologies'], 'techId'), true)) {
            return $membership['technologies'];
        }

        $stmt = $this->pdo->prepare(
            'INSERT INTO guild_technologies(guild_id, tech_id, unlocked_at) VALUES(:guild, :tech, :unlocked)'
        );
        $stmt->execute([
            'guild' => $membership['id'],
            'tech' => $techId,
            'unlocked' => now()->format(\DateTimeInterface::ATOM),
        ]);

        return $this->getGuildMembership($playerId)['technologies'] ?? [];
    }

    public function logGuildEvent(int $guildId, string $type, array $payload, string $expiresModifier = '+3 days'): void
    {
        $stmt = $this->pdo->prepare(
            'INSERT INTO guild_events(guild_id, type, payload_json, created_at, expires_at) VALUES(:guild, :type, :payload, :created, :expires)'
        );
        $now = now();
        $stmt->execute([
            'guild' => $guildId,
            'type' => $type,
            'payload' => json_encode($payload, JSON_THROW_ON_ERROR),
            'created' => $now->format(\DateTimeInterface::ATOM),
            'expires' => $now->modify($expiresModifier)->format(\DateTimeInterface::ATOM),
        ]);
    }

    public function getWorldSnapshot(): array
    {
        $topGuildsStmt = $this->pdo->query(
            'SELECT g.id, g.name, COUNT(m.player_id) as members, COUNT(z.id) as zones
             FROM guilds g
             LEFT JOIN guild_members m ON m.guild_id = g.id
             LEFT JOIN guild_zones z ON z.guild_id = g.id
             GROUP BY g.id
             ORDER BY zones DESC, members DESC, g.name
             LIMIT 6'
        );
        $topGuilds = array_map(function (array $row): array {
            return [
                'id' => (int) $row['id'],
                'name' => $row['name'],
                'members' => (int) $row['members'],
                'zones' => (int) $row['zones'],
            ];
        }, $topGuildsStmt->fetchAll());

        $eventsStmt = $this->pdo->prepare('SELECT * FROM world_events WHERE ends_at > :now ORDER BY starts_at ASC');
        $eventsStmt->execute(['now' => now()->format(\DateTimeInterface::ATOM)]);
        $events = array_map(function (array $event): array {
            return [
                'id' => (int) $event['id'],
                'title' => $event['title'],
                'description' => $event['description'],
                'effect' => json_decode($event['effect_json'], true, 512, JSON_THROW_ON_ERROR),
                'startsAt' => $event['starts_at'],
                'endsAt' => $event['ends_at'],
            ];
        }, $eventsStmt->fetchAll());

        return [
            'topGuilds' => $topGuilds,
            'events' => $events,
        ];
    }

    public function getGuildMembership(int $playerId): ?array
    {
        $stmt = $this->pdo->prepare(
            'SELECT g.id, g.name, g.motto, gm.role, gm.joined_at
             FROM guild_members gm
             INNER JOIN guilds g ON g.id = gm.guild_id
             WHERE gm.player_id = :player'
        );
        $stmt->execute(['player' => $playerId]);
        $membership = $stmt->fetch();
        if (!$membership) {
            return null;
        }

        $guildId = (int) $membership['id'];

        return [
            'id' => $guildId,
            'name' => $membership['name'],
            'motto' => $membership['motto'],
            'role' => $membership['role'],
            'joinedAt' => $membership['joined_at'],
            'members' => $this->getGuildMembers($guildId),
            'zones' => $this->getGuildZones($guildId),
            'technologies' => $this->getGuildTechnologies($guildId),
            'events' => $this->getGuildEvents($guildId),
            'supportQueue' => $this->getGuildSupportQueue($guildId),
        ];
    }

    private function getGuildMembers(int $guildId): array
    {
        $stmt = $this->pdo->prepare(
            'SELECT gm.player_id, gm.role, gm.joined_at, p.username, p.company
             FROM guild_members gm
             INNER JOIN players p ON p.id = gm.player_id
             WHERE gm.guild_id = :guild
             ORDER BY CASE gm.role WHEN "founder" THEN 1 WHEN "officer" THEN 2 ELSE 3 END, gm.joined_at'
        );
        $stmt->execute(['guild' => $guildId]);
        return array_map(function (array $member): array {
            return [
                'playerId' => (int) $member['player_id'],
                'username' => $member['username'],
                'company' => $member['company'],
                'role' => $member['role'],
                'joinedAt' => $member['joined_at'],
            ];
        }, $stmt->fetchAll());
    }

    private function getGuildTechnologies(int $guildId): array
    {
        $stmt = $this->pdo->prepare('SELECT tech_id, unlocked_at FROM guild_technologies WHERE guild_id = :guild');
        $stmt->execute(['guild' => $guildId]);
        return array_map(function (array $tech): array {
            return [
                'techId' => $tech['tech_id'],
                'unlockedAt' => $tech['unlocked_at'],
            ];
        }, $stmt->fetchAll());
    }

    private function getGuildZones(int $guildId): array
    {
        $stmt = $this->pdo->prepare(
            'SELECT id, name, polygon_json, resource_bonus, created_at FROM guild_zones WHERE guild_id = :guild ORDER BY created_at DESC'
        );
        $stmt->execute(['guild' => $guildId]);
        return array_map(function (array $zone): array {
            return [
                'id' => (int) $zone['id'],
                'name' => $zone['name'],
                'polygon' => json_decode($zone['polygon_json'], true, 512, JSON_THROW_ON_ERROR),
                'resourceBonus' => (float) $zone['resource_bonus'],
                'createdAt' => $zone['created_at'],
            ];
        }, $stmt->fetchAll());
    }

    private function getGuildEvents(int $guildId): array
    {
        $stmt = $this->pdo->prepare(
            'SELECT id, type, payload_json, created_at, expires_at FROM guild_events WHERE guild_id = :guild AND expires_at > :now ORDER BY created_at DESC'
        );
        $stmt->execute([
            'guild' => $guildId,
            'now' => now()->format(\DateTimeInterface::ATOM),
        ]);
        return array_map(function (array $event): array {
            return [
                'id' => (int) $event['id'],
                'type' => $event['type'],
                'payload' => json_decode($event['payload_json'], true, 512, JSON_THROW_ON_ERROR),
                'createdAt' => $event['created_at'],
                'expiresAt' => $event['expires_at'],
            ];
        }, $stmt->fetchAll());
    }

    private function getGuildSupportQueue(int $guildId): array
    {
        $stmt = $this->pdo->prepare(
            'SELECT s.id, s.player_id, s.request_type, s.payload_json, s.status, s.created_at, s.updated_at, p.username
             FROM guild_support s
             INNER JOIN players p ON p.id = s.player_id
             WHERE s.guild_id = :guild
             ORDER BY s.status ASC, s.created_at DESC'
        );
        $stmt->execute(['guild' => $guildId]);
        return array_map(function (array $support): array {
            return [
                'id' => (int) $support['id'],
                'playerId' => (int) $support['player_id'],
                'username' => $support['username'],
                'type' => $support['request_type'],
                'payload' => json_decode($support['payload_json'], true, 512, JSON_THROW_ON_ERROR),
                'status' => $support['status'],
                'createdAt' => $support['created_at'],
                'updatedAt' => $support['updated_at'],
            ];
        }, $stmt->fetchAll());
    }
}
