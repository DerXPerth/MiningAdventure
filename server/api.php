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
    $sessionToken = (string) ($input['session'] ?? '');
    $state = $input['state'] ?? null;

    if ($sessionToken === '') {
        respond(['success' => false, 'message' => 'Sitzungstoken fehlt.'], 401);
    }

    if (!is_array($state)) {
        respond(['success' => false, 'message' => 'Ungültiger Spielstand.'], 422);
    }

    $session = $repository->validateSession($sessionToken);
    if (!$session) {
        respond(['success' => false, 'message' => 'Sitzung ist abgelaufen oder ungültig.'], 401);
    }

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

function simplify_account(array $account): array
{
    return [
        'username' => $account['username'],
        'company' => $account['company'],
        'createdAt' => $account['createdAt'],
        'state' => $account['state'],
    ];
}
