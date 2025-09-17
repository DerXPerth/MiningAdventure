import { test } from 'node:test';
import assert from 'node:assert/strict';
import { AccountStore, INITIAL_STATE, STORAGE_KEYS } from '../assets/js/main.js';

if (typeof globalThis.btoa !== 'function') {
  globalThis.btoa = (value) => Buffer.from(String(value), 'utf8').toString('base64');
}

class MemoryStorage {
  constructor(initial = {}) {
    this.map = new Map(Object.entries(initial));
  }

  getItem(key) {
    return this.map.has(key) ? this.map.get(key) : null;
  }

  setItem(key, value) {
    this.map.set(key, String(value));
  }

  removeItem(key) {
    this.map.delete(key);
  }
}

test('registerLocal persists a new account with hashed password', () => {
  const storage = new MemoryStorage();
  const store = new AccountStore(storage, null);
  const result = store.registerLocal({ username: 'miner', password: 'secret', company: 'Nova Terra' });
  assert.strictEqual(result.success, true);
  const saved = JSON.parse(storage.getItem(STORAGE_KEYS.accounts));
  assert.strictEqual(saved.length, 1);
  assert.strictEqual(saved[0].username, 'miner');
  assert.notStrictEqual(saved[0].password, 'secret');
  assert.ok(saved[0].state);
});

test('registerLocal rejects duplicate usernames', () => {
  const storage = new MemoryStorage({
    [STORAGE_KEYS.accounts]: JSON.stringify([
      { username: 'miner', password: 'hash', state: INITIAL_STATE() },
    ]),
  });
  const store = new AccountStore(storage, null);
  const result = store.registerLocal({ username: 'miner', password: 'secret', company: 'Nova Terra' });
  assert.strictEqual(result.success, false);
  assert.match(result.message, /Benutzername/);
});

test('loginLocal authenticates valid credentials and stores the active user', () => {
  const storage = new MemoryStorage();
  const store = new AccountStore(storage, null);
  const account = { username: 'miner', password: store.hash('secret'), state: INITIAL_STATE() };
  storage.setItem(STORAGE_KEYS.accounts, JSON.stringify([account]));
  const result = store.loginLocal({ username: 'miner', password: 'secret' });
  assert.strictEqual(result.success, true);
  assert.strictEqual(storage.getItem(STORAGE_KEYS.active), 'miner');
  assert.strictEqual(storage.getItem(STORAGE_KEYS.session), null);
});

test('loginLocal rejects invalid credentials', () => {
  const storage = new MemoryStorage();
  const store = new AccountStore(storage, null);
  const account = { username: 'miner', password: store.hash('secret'), state: INITIAL_STATE() };
  storage.setItem(STORAGE_KEYS.accounts, JSON.stringify([account]));
  const result = store.loginLocal({ username: 'miner', password: 'wrong' });
  assert.strictEqual(result.success, false);
  assert.match(result.message, /Falsches Passwort/);
});

test('restoreActiveAccount returns the cached account when offline', async () => {
  const storage = new MemoryStorage();
  const store = new AccountStore(storage, null);
  const account = { username: 'miner', password: store.hash('secret'), state: INITIAL_STATE() };
  storage.setItem(STORAGE_KEYS.accounts, JSON.stringify([account]));
  storage.setItem(STORAGE_KEYS.active, 'miner');
  const restored = await store.restoreActiveAccount();
  assert.ok(restored);
  assert.strictEqual(restored.username, 'miner');
});

test('logout clears the active user and session tokens', async () => {
  const storage = new MemoryStorage();
  const store = new AccountStore(storage, null);
  storage.setItem(STORAGE_KEYS.session, 'abc');
  storage.setItem(STORAGE_KEYS.active, 'miner');
  store.session = 'abc';
  await store.logout();
  assert.strictEqual(storage.getItem(STORAGE_KEYS.session), null);
  assert.strictEqual(storage.getItem(STORAGE_KEYS.active), null);
  assert.strictEqual(store.session, null);
});
