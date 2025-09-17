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
