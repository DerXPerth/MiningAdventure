<?php

declare(strict_types=1);

const DATABASE_PATH = __DIR__ . '/../storage/stratasphere.sqlite';

if (!is_dir(dirname(DATABASE_PATH))) {
    mkdir(dirname(DATABASE_PATH), 0775, true);
}

$pdo = new \PDO('sqlite:' . DATABASE_PATH);
$pdo->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
$pdo->setAttribute(\PDO::ATTR_DEFAULT_FETCH_MODE, \PDO::FETCH_ASSOC);
$pdo->exec('PRAGMA foreign_keys = ON');

$pdo->exec(
    'CREATE TABLE IF NOT EXISTS players (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        password_hash TEXT NOT NULL,
        company TEXT NOT NULL,
        created_at TEXT NOT NULL
    )'
);

$pdo->exec(
    'CREATE TABLE IF NOT EXISTS saves (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        player_id INTEGER NOT NULL UNIQUE,
        state_json TEXT NOT NULL,
        updated_at TEXT NOT NULL,
        FOREIGN KEY(player_id) REFERENCES players(id) ON DELETE CASCADE
    )'
);

$pdo->exec(
    'CREATE TABLE IF NOT EXISTS sessions (
        token TEXT PRIMARY KEY,
        player_id INTEGER NOT NULL,
        created_at TEXT NOT NULL,
        expires_at TEXT NOT NULL,
        FOREIGN KEY(player_id) REFERENCES players(id) ON DELETE CASCADE
    )'
);

$pdo->exec(
    'CREATE TABLE IF NOT EXISTS guilds (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,
        motto TEXT NOT NULL,
        founder_id INTEGER NOT NULL,
        created_at TEXT NOT NULL,
        FOREIGN KEY(founder_id) REFERENCES players(id) ON DELETE CASCADE
    )'
);

$pdo->exec(
    'CREATE TABLE IF NOT EXISTS guild_members (
        guild_id INTEGER NOT NULL,
        player_id INTEGER NOT NULL UNIQUE,
        role TEXT NOT NULL,
        joined_at TEXT NOT NULL,
        PRIMARY KEY(guild_id, player_id),
        FOREIGN KEY(guild_id) REFERENCES guilds(id) ON DELETE CASCADE,
        FOREIGN KEY(player_id) REFERENCES players(id) ON DELETE CASCADE
    )'
);

$pdo->exec(
    'CREATE TABLE IF NOT EXISTS guild_zones (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        guild_id INTEGER NOT NULL,
        name TEXT NOT NULL,
        polygon_json TEXT NOT NULL,
        resource_bonus REAL NOT NULL,
        created_at TEXT NOT NULL,
        FOREIGN KEY(guild_id) REFERENCES guilds(id) ON DELETE CASCADE
    )'
);

$pdo->exec(
    'CREATE TABLE IF NOT EXISTS guild_technologies (
        guild_id INTEGER NOT NULL,
        tech_id TEXT NOT NULL,
        unlocked_at TEXT NOT NULL,
        PRIMARY KEY(guild_id, tech_id),
        FOREIGN KEY(guild_id) REFERENCES guilds(id) ON DELETE CASCADE
    )'
);

$pdo->exec(
    'CREATE TABLE IF NOT EXISTS guild_events (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        guild_id INTEGER NOT NULL,
        type TEXT NOT NULL,
        payload_json TEXT NOT NULL,
        created_at TEXT NOT NULL,
        expires_at TEXT NOT NULL,
        FOREIGN KEY(guild_id) REFERENCES guilds(id) ON DELETE CASCADE
    )'
);

$pdo->exec(
    'CREATE TABLE IF NOT EXISTS guild_support (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        guild_id INTEGER NOT NULL,
        player_id INTEGER NOT NULL,
        request_type TEXT NOT NULL,
        payload_json TEXT NOT NULL,
        status TEXT NOT NULL,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL,
        FOREIGN KEY(guild_id) REFERENCES guilds(id) ON DELETE CASCADE,
        FOREIGN KEY(player_id) REFERENCES players(id) ON DELETE CASCADE
    )'
);

$pdo->exec(
    'CREATE TABLE IF NOT EXISTS world_events (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        effect_json TEXT NOT NULL,
        starts_at TEXT NOT NULL,
        ends_at TEXT NOT NULL
    )'
);

function ensure_world_events(\PDO $pdo): void
{
    $count = (int) $pdo->query('SELECT COUNT(*) FROM world_events')->fetchColumn();
    if ($count > 0) {
        return;
    }

    $now = now();
    $events = [
        [
            'title' => 'Aurora-Schürfrechte',
            'description' => 'Skandinavische Regierungen vergeben zusätzliche Förderlizenzen. Gilden mit Zonen nördlich von 60° erhalten +12% Förderung.',
            'effect' => ['type' => 'regionalBoost', 'value' => 0.12, 'region' => 'Nordischer Gürtel'],
            'duration' => '+10 days',
        ],
        [
            'title' => 'Globaler Energiebedarf',
            'description' => 'Eine Hitzeperiode sorgt weltweit für Stromengpässe. Kohle- und Uranverkäufe erzielen +18% Preis.',
            'effect' => ['type' => 'marketTrend', 'resource' => ['coal', 'uranium'], 'value' => 0.18],
            'duration' => '+6 days',
        ],
        [
            'title' => 'UN Nachhaltigkeitsgipfel',
            'description' => 'Gilden, die Forschungspunkte spenden, erhalten globale Reputation und Bonus auf Stabilität.',
            'effect' => ['type' => 'researchDonation', 'value' => 0.2],
            'duration' => '+4 days',
        ],
    ];

    foreach ($events as $event) {
        $startsAt = $now;
        $endsAt = $now->modify($event['duration']);
        $stmt = $pdo->prepare(
            'INSERT INTO world_events(title, description, effect_json, starts_at, ends_at) VALUES(:title, :description, :effect, :starts_at, :ends_at)'
        );
        $stmt->execute([
            'title' => $event['title'],
            'description' => $event['description'],
            'effect' => json_encode($event['effect'], JSON_THROW_ON_ERROR),
            'starts_at' => $startsAt->format(\DateTimeInterface::ATOM),
            'ends_at' => $endsAt->format(\DateTimeInterface::ATOM),
        ]);
    }
}

function initial_state(): array
{
    return [
        'credits' => 5000,
        'researchPoints' => 120,
        'day' => 1,
        'minuteOfDay' => 480,
        'resources' => [
            'iron' => 0,
            'copper' => 0,
            'coal' => 0,
            'gold' => 0,
            'uranium' => 0,
        ],
        'mines' => [],
        'logistics' => [
            'capacity' => 60,
            'level' => 1,
        ],
        'research' => [
            'unlocked' => [],
            'bonuses' => [
                'production' => 0,
                'storage' => 0,
                'logistics' => 0,
                'stability' => 0,
            ],
        ],
    ];
}

function now(): \DateTimeImmutable
{
    return new \DateTimeImmutable('now');
}

ensure_world_events($pdo);

function respond(array $data, int $status = 200): void
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data, JSON_THROW_ON_ERROR);
    exit;
}

function validate_string(string $value, int $min, int $max, string $field): void
{
    $length = mb_strlen($value);
    if ($length < $min || $length > $max) {
        respond([
            'success' => false,
            'message' => sprintf('%s muss zwischen %d und %d Zeichen lang sein.', $field, $min, $max),
        ], 422);
    }
}

function generate_token(): string
{
    return bin2hex(random_bytes(32));
}
