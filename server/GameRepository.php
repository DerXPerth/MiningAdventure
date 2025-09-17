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
        ];
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
}
