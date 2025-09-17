<?php

declare(strict_types=1);

require __DIR__ . '/bootstrap.php';
require __DIR__ . '/GameRepository.php';

$repository = new GameRepository($pdo);
$repository->cleanupSessions();

$input = json_decode(file_get_contents('php://input') ?: '[]', true);
if (!is_array($input)) {
    respond(['success' => false, 'message' => 'Ungültiger JSON-Body.'], 400);
}

$action = $_GET['action'] ?? '';

try {
    match ($action) {
        'register' => handle_register($repository, $input),
        'login' => handle_login($repository, $input),
        'restore' => handle_restore($repository, $input),
        'saveState' => handle_save_state($repository, $input),
        'logout' => handle_logout($repository, $input),
        'listGuilds' => handle_list_guilds($repository),
        'createGuild' => handle_create_guild($repository, $input),
        'joinGuild' => handle_join_guild($repository, $input),
        'leaveGuild' => handle_leave_guild($repository, $input),
        'guildOverview' => handle_guild_overview($repository, $input),
        'claimGuildZone' => handle_claim_guild_zone($repository, $input),
        'guildSupport' => handle_guild_support($repository, $input),
        'resolveSupport' => handle_resolve_support($repository, $input),
        'unlockGuildTech' => handle_unlock_guild_tech($repository, $input),
        'worldSnapshot' => handle_world_snapshot($repository),
        default => respond(['success' => false, 'message' => 'Unbekannte Aktion.'], 404),
    };
} catch (JsonException $exception) {
    respond(['success' => false, 'message' => 'JSON-Fehler: ' . $exception->getMessage()], 400);
} catch (Throwable $exception) {
    respond(['success' => false, 'message' => 'Serverfehler: ' . $exception->getMessage()], 500);
}

function handle_register(GameRepository $repository, array $input): void
{
    $username = trim($input['username'] ?? '');
    $password = (string) ($input['password'] ?? '');
    $company = trim($input['company'] ?? '');

    validate_string($username, 3, 32, 'Benutzername');
    validate_string($password, 6, 64, 'Passwort');
    validate_string($company, 3, 64, 'Firmenname');

    if ($repository->findPlayer($username)) {
        respond(['success' => false, 'message' => 'Benutzername bereits vergeben.'], 409);
    }

    $passwordHash = password_hash($password, PASSWORD_DEFAULT);
    $account = $repository->createPlayer($username, $passwordHash, $company);

    respond([
        'success' => true,
        'message' => 'Account erstellt. Bitte melde dich nun an.',
        'account' => simplify_account($account),
    ]);
}

function handle_login(GameRepository $repository, array $input): void
{
    $username = trim($input['username'] ?? '');
    $password = (string) ($input['password'] ?? '');

    if ($username === '' || $password === '') {
        respond(['success' => false, 'message' => 'Bitte Benutzername und Passwort angeben.'], 422);
    }

    $account = $repository->verifyCredentials($username, $password);
    if (!$account) {
        respond(['success' => false, 'message' => 'Ungültige Kombination aus Benutzername und Passwort.'], 401);
    }

    $session = $repository->createSession((int) $account['id']);

    respond([
        'success' => true,
        'account' => simplify_account($account),
        'session' => $session['token'],
        'expiresAt' => $session['expiresAt'],
    ]);
}

function handle_restore(GameRepository $repository, array $input): void
{
    $sessionToken = (string) ($input['session'] ?? '');
    if ($sessionToken === '') {
        respond(['success' => false, 'message' => 'Sitzungstoken fehlt.'], 401);
    }

    $session = $repository->validateSession($sessionToken);
    if (!$session) {
        respond(['success' => false, 'message' => 'Sitzung ist abgelaufen oder ungültig.'], 401);
    }

    $account = $repository->getPlayerWithState((int) $session['player_id']);
    respond([
        'success' => true,
        'account' => simplify_account($account),
        'session' => $sessionToken,
        'expiresAt' => $session['expires_at'],
    ]);
}

function handle_save_state(GameRepository $repository, array $input): void
{
    $state = $input['state'] ?? null;

    if (!is_array($state)) {
        respond(['success' => false, 'message' => 'Ungültiger Spielstand.'], 422);
    }

    $session = require_session($repository, $input);

    $repository->saveState((int) $session['player_id'], $state);

    respond(['success' => true]);
}

function handle_logout(GameRepository $repository, array $input): void
{
    $sessionToken = (string) ($input['session'] ?? '');
    if ($sessionToken !== '') {
        $repository->deleteSession($sessionToken);
    }

    respond(['success' => true]);
}

function handle_list_guilds(GameRepository $repository): void
{
    respond([
        'success' => true,
        'guilds' => $repository->listGuilds(),
    ]);
}

function handle_create_guild(GameRepository $repository, array $input): void
{
    $session = require_session($repository, $input);

    $name = trim($input['name'] ?? '');
    $motto = trim($input['motto'] ?? '');

    validate_string($name, 3, 48, 'Zunftname');
    validate_string($motto, 4, 120, 'Motto');

    try {
        $guild = $repository->createGuild((int) $session['player_id'], $name, $motto);
        $repository->logGuildEvent((int) $guild['id'], 'founding', ['name' => $name, 'motto' => $motto], '+14 days');
    } catch (\RuntimeException $exception) {
        respond(['success' => false, 'message' => $exception->getMessage()], 409);
    }

    respond([
        'success' => true,
        'guild' => $repository->getGuildMembership((int) $session['player_id']),
    ]);
}

function handle_join_guild(GameRepository $repository, array $input): void
{
    $session = require_session($repository, $input);
    $guildId = (int) ($input['guildId'] ?? 0);
    if ($guildId <= 0) {
        respond(['success' => false, 'message' => 'Ungültige Zunft.'], 422);
    }

    try {
        $repository->joinGuild((int) $session['player_id'], $guildId);
        $repository->logGuildEvent($guildId, 'member_join', ['playerId' => (int) $session['player_id']], '+7 days');
    } catch (\RuntimeException $exception) {
        respond(['success' => false, 'message' => $exception->getMessage()], 409);
    }

    respond([
        'success' => true,
        'guild' => $repository->getGuildMembership((int) $session['player_id']),
    ]);
}

function handle_leave_guild(GameRepository $repository, array $input): void
{
    $session = require_session($repository, $input);
    $membership = $repository->getGuildMembership((int) $session['player_id']);
    if (!$membership) {
        respond(['success' => false, 'message' => 'Du bist in keiner Zunft.'], 409);
    }

    $repository->leaveGuild((int) $session['player_id']);
    respond(['success' => true]);
}

function handle_guild_overview(GameRepository $repository, array $input): void
{
    $session = require_session($repository, $input);
    respond([
        'success' => true,
        'guild' => $repository->getGuildMembership((int) $session['player_id']),
        'world' => $repository->getWorldSnapshot(),
    ]);
}

function handle_claim_guild_zone(GameRepository $repository, array $input): void
{
    $session = require_session($repository, $input);
    $name = trim($input['name'] ?? '');
    $polygon = $input['polygon'] ?? [];
    $bonus = (float) ($input['bonus'] ?? 0.0);

    if ($name === '' || !is_array($polygon) || count($polygon) < 3) {
        respond(['success' => false, 'message' => 'Zone unvollständig.'], 422);
    }

    try {
        $zones = $repository->claimGuildZone((int) $session['player_id'], $name, $polygon, $bonus);
        $membership = $repository->getGuildMembership((int) $session['player_id']);
        if ($membership) {
            $repository->logGuildEvent((int) $membership['id'], 'zone_claimed', ['zone' => $name], '+10 days');
        }
        respond(['success' => true, 'zones' => $zones]);
    } catch (\RuntimeException $exception) {
        respond(['success' => false, 'message' => $exception->getMessage()], 403);
    }
}

function handle_guild_support(GameRepository $repository, array $input): void
{
    $session = require_session($repository, $input);
    $type = trim($input['type'] ?? '');
    $payload = $input['payload'] ?? [];

    if ($type === '') {
        respond(['success' => false, 'message' => 'Typ erforderlich.'], 422);
    }

    try {
        $queue = $repository->requestGuildSupport((int) $session['player_id'], $type, is_array($payload) ? $payload : []);
        respond(['success' => true, 'support' => $queue]);
    } catch (\RuntimeException $exception) {
        respond(['success' => false, 'message' => $exception->getMessage()], 403);
    }
}

function handle_resolve_support(GameRepository $repository, array $input): void
{
    $session = require_session($repository, $input);
    $supportId = (int) ($input['supportId'] ?? 0);
    $status = trim($input['status'] ?? '');
    if ($supportId <= 0 || !in_array($status, ['resolved', 'rejected'], true)) {
        respond(['success' => false, 'message' => 'Ungültige Anfrage.'], 422);
    }

    try {
        $repository->updateGuildSupportStatus((int) $session['player_id'], $supportId, $status);
        respond(['success' => true]);
    } catch (\RuntimeException $exception) {
        respond(['success' => false, 'message' => $exception->getMessage()], 403);
    }
}

function handle_unlock_guild_tech(GameRepository $repository, array $input): void
{
    $session = require_session($repository, $input);
    $techId = trim($input['techId'] ?? '');
    if ($techId === '') {
        respond(['success' => false, 'message' => 'Technologie fehlt.'], 422);
    }

    try {
        $tech = $repository->unlockGuildTechnology((int) $session['player_id'], $techId);
        $membership = $repository->getGuildMembership((int) $session['player_id']);
        if ($membership) {
            $repository->logGuildEvent((int) $membership['id'], 'tech_unlocked', ['techId' => $techId], '+14 days');
        }
        respond(['success' => true, 'technologies' => $tech]);
    } catch (\RuntimeException $exception) {
        respond(['success' => false, 'message' => $exception->getMessage()], 403);
    }
}

function handle_world_snapshot(GameRepository $repository): void
{
    respond([
        'success' => true,
        'world' => $repository->getWorldSnapshot(),
    ]);
}

function require_session(GameRepository $repository, array $input): array
{
    $sessionToken = (string) ($input['session'] ?? '');
    if ($sessionToken === '') {
        respond(['success' => false, 'message' => 'Sitzungstoken fehlt.'], 401);
    }

    $session = $repository->validateSession($sessionToken);
    if (!$session) {
        respond(['success' => false, 'message' => 'Sitzung ist abgelaufen oder ungültig.'], 401);
    }

    return $session;
}

function simplify_account(array $account): array
{
    return [
        'username' => $account['username'],
        'company' => $account['company'],
        'createdAt' => $account['createdAt'],
        'state' => $account['state'],
        'multiplayer' => $account['guild'] !== null || $account['world'] !== null
            ? [
                'guild' => $account['guild'],
                'world' => $account['world'],
            ]
            : null,
    ];
}
