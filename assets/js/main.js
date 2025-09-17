export const STORAGE_KEYS = {
  accounts: 'stratasphere_accounts_v1',
  active: 'stratasphere_active_v1',
  session: 'stratasphere_session_v1',
};

export const RESOURCE_DEFS = {
  iron: {
    name: 'Eisen',
    baseRate: 16,
    basePrice: 12,
    color: '#9ca3af',
    optimalWorkforce: 60,
    geology: 'Sedimentäre Lagerstätten',
  },
  copper: {
    name: 'Kupfer',
    baseRate: 12,
    basePrice: 18,
    color: '#f59e0b',
    optimalWorkforce: 55,
    geology: 'Porphyrische Adern',
  },
  coal: {
    name: 'Kohle',
    baseRate: 22,
    basePrice: 9,
    color: '#1f2937',
    optimalWorkforce: 70,
    geology: 'Karbonflöze',
  },
  gold: {
    name: 'Gold',
    baseRate: 6,
    basePrice: 45,
    color: '#fbbf24',
    optimalWorkforce: 45,
    geology: 'Hydrothermale Venen',
  },
  uranium: {
    name: 'Uran',
    baseRate: 4,
    basePrice: 72,
    color: '#10b981',
    optimalWorkforce: 35,
    geology: 'Granitische Pegmatite',
  },
};

export const GUILD_TECHS = [
  {
    id: 'synergy_drills',
    name: 'Synergiebohrer',
    cost: 480,
    description: '+8% Produktion in Zunft-Zonen.',
  },
  {
    id: 'global_market',
    name: 'Globaler Marktplatz',
    cost: 560,
    description: '+10% Verkaufspreise für alle Ressourcen.',
  },
  {
    id: 'night_ops',
    name: 'Nachtschicht-Protokolle',
    cost: 420,
    description: 'Minimiert Nacht-Malus auf 20% in allen Minen.',
  },
  {
    id: 'support_drones',
    name: 'Support-Drohnen',
    cost: 360,
    description: 'Unterstützungsanfragen werden 25% schneller abgewickelt.',
  },
];

export const RESEARCH_DEFS = [
  {
    id: 'automation',
    name: 'Adaptive Automatisierung',
    cost: 350,
    description: '+15% Grundproduktion für alle Minen.',
    bonusType: 'production',
    bonusValue: 0.15,
  },
  {
    id: 'deepScanning',
    name: 'Tiefenscan-Netzwerk',
    cost: 600,
    description: 'Erhöht Chancen auf seltene Vorkommen. +25% Lagerkapazität.',
    bonusType: 'storage',
    bonusValue: 0.25,
  },
  {
    id: 'quantumLogistics',
    name: 'Quantenlogistik',
    cost: 900,
    description: 'Logistikkapazität +40%.',
    bonusType: 'logistics',
    bonusValue: 0.4,
  },
  {
    id: 'cleanEnergy',
    name: 'Saubere Energie',
    cost: 500,
    description: 'Tag-Nacht-Schwankung -30%. Stabilere Produktion.',
    bonusType: 'stability',
    bonusValue: 0.3,
  },
];

export const INITIAL_STATE = () => ({
  credits: 5000,
  researchPoints: 120,
  day: 1,
  minuteOfDay: 480,
  resources: Object.keys(RESOURCE_DEFS).reduce((acc, key) => {
    acc[key] = 0;
    return acc;
  }, {}),
  mines: [],
  logistics: {
    capacity: 60,
    level: 1,
  },
  research: {
    unlocked: [],
    bonuses: {
      production: 0,
      storage: 0,
      logistics: 0,
      stability: 0,
    },
  },
  influence: {
    guildReputation: 0,
    supportGiven: 0,
    supportReceived: 0,
  },
  timeline: [],
});

export const DEFAULT_PREFERENCES = () => ({
  fontScale: 1,
  theme: 'default',
  autoTrade: false,
  experimentalWeather: false,
  notifyGuild: true,
  windowScale: 1,
});

const generateId = () => {
  if (crypto?.randomUUID) return crypto.randomUUID();
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
};

const toRadians = (degrees) => (degrees * Math.PI) / 180;

export const createCircularPolygon = (center, radiusKm, segments = 24) => {
  const points = [];
  const earthRadiusKm = 6371;
  for (let i = 0; i < segments; i += 1) {
    const angle = (2 * Math.PI * i) / segments;
    const lat =
      Math.asin(
        Math.sin(toRadians(center.lat)) * Math.cos(radiusKm / earthRadiusKm) +
          Math.cos(toRadians(center.lat)) * Math.sin(radiusKm / earthRadiusKm) * Math.cos(angle)
      ) * (180 / Math.PI);
    const lng =
      (center.lng +
        (Math.atan2(
          Math.sin(angle) * Math.sin(radiusKm / earthRadiusKm) * Math.cos(toRadians(center.lat)),
          Math.cos(radiusKm / earthRadiusKm) - Math.sin(toRadians(center.lat)) * Math.sin(toRadians(lat))
        ) * 180) /
          Math.PI);
    points.push([lat, lng]);
  }
  return points;
};

export const pointInPolygon = (point, polygon) => {
  const [lat, lng] = point;
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i, i += 1) {
    const yi = polygon[i][0];
    const xi = polygon[i][1];
    const yj = polygon[j][0];
    const xj = polygon[j][1];
    const denominator = yj - yi || Number.EPSILON;
    const intersect = yi > lat !== yj > lat && lng < ((xj - xi) * (lat - yi)) / denominator + xi;
    if (intersect) inside = !inside;
  }
  return inside;
};

export class RemoteGateway {
  constructor(baseUrl = 'server/api.php') {
    this.baseUrl = baseUrl;
  }

  async request(action, payload = {}) {
    const response = await fetch(`${this.baseUrl}?action=${encodeURIComponent(action)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const message = await response.text();
      throw new Error(`Remote request failed: ${response.status} ${message}`);
    }

    return response.json();
  }

  register(payload) {
    return this.request('register', payload);
  }

  login(payload) {
    return this.request('login', payload);
  }

  restore(payload) {
    return this.request('restore', payload);
  }

  saveState(payload) {
    return this.request('saveState', payload);
  }

  logout(payload) {
    return this.request('logout', payload);
  }

  listGuilds() {
    return this.request('listGuilds');
  }

  createGuild(payload) {
    return this.request('createGuild', payload);
  }

  joinGuild(payload) {
    return this.request('joinGuild', payload);
  }

  leaveGuild(payload) {
    return this.request('leaveGuild', payload);
  }

  guildOverview(payload) {
    return this.request('guildOverview', payload);
  }

  claimGuildZone(payload) {
    return this.request('claimGuildZone', payload);
  }

  guildSupport(payload) {
    return this.request('guildSupport', payload);
  }

  resolveSupport(payload) {
    return this.request('resolveSupport', payload);
  }

  unlockGuildTech(payload) {
    return this.request('unlockGuildTech', payload);
  }

  worldSnapshot() {
    return this.request('worldSnapshot');
  }
}

export class AccountStore {
  constructor(storage, remoteGateway) {
    this.storage = storage;
    this.remote = remoteGateway;
    this.session = this.storage.getItem(STORAGE_KEYS.session);
    this.pendingSync = null;
    this.syncTimeout = null;
  }

  hash(value) {
    return btoa(unescape(encodeURIComponent(value)));
  }

  loadAccounts() {
    const raw = this.storage.getItem(STORAGE_KEYS.accounts);
    if (!raw) return [];
    try {
      const accounts = JSON.parse(raw);
      return Array.isArray(accounts) ? accounts : [];
    } catch (err) {
      console.error('Accounts konnten nicht geladen werden', err);
      return [];
    }
  }

  ensureAccountShape(account) {
    if (!account.state) {
      account.state = INITIAL_STATE();
    }
    if (!account.preferences) {
      account.preferences = DEFAULT_PREFERENCES();
    } else {
      account.preferences = {
        ...DEFAULT_PREFERENCES(),
        ...account.preferences,
      };
    }
    if (typeof account.tutorialCompleted !== 'boolean') {
      account.tutorialCompleted = false;
    }
    if (typeof account.tutorialSkipped !== 'boolean') {
      account.tutorialSkipped = false;
    }
    return account;
  }

  saveAccounts(accounts) {
    this.storage.setItem(STORAGE_KEYS.accounts, JSON.stringify(accounts));
  }

  cacheAccount(account) {
    const accounts = this.loadAccounts();
    const index = accounts.findIndex((acc) => acc.username === account.username);
    const previous = index >= 0 ? accounts[index] : null;
    const stored = this.ensureAccountShape({
      ...(previous || {}),
      ...account,
    });
    if (account.password) {
      stored.password = account.password;
    } else if (previous?.password) {
      stored.password = previous.password;
    } else {
      delete stored.password;
    }
    if (index >= 0) {
      accounts[index] = stored;
    } else {
      accounts.push(stored);
    }
    this.saveAccounts(accounts);
  }

  findAccount(username) {
    const account = this.loadAccounts().find((acc) => acc.username === username) || null;
    return account ? this.ensureAccountShape(account) : null;
  }

  registerLocal({ username, password, company }) {
    const accounts = this.loadAccounts();
    if (accounts.some((acc) => acc.username === username)) {
      return { success: false, message: 'Benutzername bereits vergeben.' };
    }

    const account = this.ensureAccountShape({
      username,
      company,
      password: this.hash(password),
      createdAt: new Date().toISOString(),
    });

    accounts.push(account);
    this.saveAccounts(accounts);
    return { success: true, account };
  }

  async register(payload) {
    if (!this.remote) {
      return this.registerLocal(payload);
    }

    try {
      const result = await this.remote.register(payload);
      if (result.success && result.account) {
        const cachedAccount = this.ensureAccountShape({
          ...result.account,
          password: this.hash(payload.password),
        });
        this.cacheAccount(cachedAccount);
      }
      return result;
    } catch (error) {
      console.warn('Remote Registrierung fehlgeschlagen, nutze Offline-Modus', error);
      return this.registerLocal(payload);
    }
  }

  loginLocal({ username, password }) {
    const accounts = this.loadAccounts();
    const account = accounts.find((acc) => acc.username === username);
    if (!account) {
      return { success: false, message: 'Account nicht gefunden.' };
    }
    if (account.password !== this.hash(password)) {
      return { success: false, message: 'Falsches Passwort.' };
    }
    this.storage.setItem(STORAGE_KEYS.active, username);
    this.storage.removeItem(STORAGE_KEYS.session);
    this.session = null;
    return { success: true, account: this.ensureAccountShape(account) };
  }

  async login(payload) {
    if (!this.remote) {
      return this.loginLocal(payload);
    }

    try {
      const result = await this.remote.login(payload);
      if (!result.success) {
        return result;
      }

      const { account, session } = result;
      if (session) {
        this.session = session;
        this.storage.setItem(STORAGE_KEYS.session, session);
      }
      if (account) {
        const cachedAccount = this.ensureAccountShape({
          ...account,
          password: this.hash(payload.password),
        });
        this.cacheAccount(cachedAccount);
        this.storage.setItem(STORAGE_KEYS.active, cachedAccount.username);
        return { success: true, account: cachedAccount };
      }
      this.storage.setItem(STORAGE_KEYS.active, payload.username);
      return { success: true, account };
    } catch (error) {
      console.warn('Remote Login fehlgeschlagen, nutze Offline-Modus', error);
      return this.loginLocal(payload);
    }
  }

  scheduleSync(account) {
    this.cacheAccount(account);
    if (!this.remote || !this.session) return;
    this.pendingSync = {
      username: account.username,
      state: account.state,
      preferences: account.preferences,
    };
    window.clearTimeout(this.syncTimeout);
    this.syncTimeout = window.setTimeout(() => this.flush(), 600);
  }

  async flush() {
    if (!this.pendingSync || !this.remote || !this.session) return;
    const payload = {
      session: this.session,
      state: this.pendingSync.state,
      preferences: this.pendingSync.preferences,
    };
    try {
      await this.remote.saveState(payload);
      this.pendingSync = null;
    } catch (error) {
      console.warn('Konnte Spielstand nicht synchronisieren', error);
    }
  }

  updateAccount(account) {
    this.scheduleSync(this.ensureAccountShape(account));
  }

  async restoreActiveAccount() {
    const username = this.storage.getItem(STORAGE_KEYS.active);
    if (!username) return null;

    if (this.remote && this.session) {
      try {
        const result = await this.remote.restore({ session: this.session });
        if (result.success && result.account) {
          if (result.session) {
            this.session = result.session;
            this.storage.setItem(STORAGE_KEYS.session, result.session);
          }
          const cached = this.findAccount(result.account.username);
          const mergedAccount = this.ensureAccountShape({
            ...result.account,
            password: cached?.password,
          });
          this.cacheAccount(mergedAccount);
          return mergedAccount;
        }
      } catch (error) {
        console.warn('Remote-Sitzung konnte nicht wiederhergestellt werden', error);
      }
    }

    return this.findAccount(username);
  }

  async logout() {
    if (this.session) {
      await this.flush();
    }
    if (this.remote && this.session) {
      try {
        await this.remote.logout({ session: this.session });
      } catch (error) {
        console.warn('Remote Logout fehlgeschlagen', error);
      }
    }
    this.session = null;
    this.storage.removeItem(STORAGE_KEYS.session);
    this.storage.removeItem(STORAGE_KEYS.active);
  }
}

export class Toast {
  constructor() {
    this.element = document.createElement('div');
    this.element.className = 'toast';
    document.body.appendChild(this.element);
  }

  show(message, duration = 2500) {
    this.element.textContent = message;
    this.element.classList.add('show');
    window.clearTimeout(this.hideTimeout);
    this.hideTimeout = window.setTimeout(() => {
      this.element.classList.remove('show');
    }, duration);
  }
}

export class GameEngine {
  constructor(account, accountStore, toast) {
    this.account = account;
    this.accountStore = accountStore;
    this.toast = toast;
    this.state = account.state || INITIAL_STATE();
    this.map = null;
    this.mines = new Map();
    this.tickHandle = null;
    this.lastTick = performance.now();
    this.resourcesPerMinute = {};
    this.multiplayer =
      account.multiplayer || {
        guild: null,
        world: { topGuilds: [], events: [] },
      };
    this.guildTechSet = new Set(this.multiplayer.guild?.technologies?.map((tech) => tech.techId) || []);
    this.zoneLayers = [];
    this.worldInterval = null;
    this.supportInterval = null;
    this.preferences = this.account.preferences ? { ...DEFAULT_PREFERENCES(), ...this.account.preferences } : DEFAULT_PREFERENCES();
    this.hasDOM = typeof document !== 'undefined';
    this.tabBar = this.hasDOM ? document.getElementById('window-tab-bar') : null;
    this.minimizedWindows = new Map();
    this.windowContainer = this.hasDOM ? document.querySelector('.game-body') : null;
    this.guildResources = this.initializeGuildResources();
    this.tutorialState = {
      element: this.hasDOM ? document.getElementById('tutorial') : null,
      text: this.hasDOM ? document.getElementById('tutorial-text') : null,
      back: this.hasDOM ? document.getElementById('tutorial-back') : null,
      next: this.hasDOM ? document.getElementById('tutorial-next') : null,
      skip: this.hasDOM ? document.getElementById('tutorial-skip') : null,
      index: 0,
      initialized: false,
      steps: [
        'Willkommen im Kontrollzentrum! Oben siehst du deine aktive Gesellschaft und wichtige Aktionen.',
        'Nutze die Weltkarte, um Minen zu platzieren. Mit dem Kartenregler passt du den Zoom direkt an.',
        'Jedes Fenster lässt sich verschieben, skalieren oder minimieren. Minimierte Fenster landen in der Tab-Leiste.',
        'In der Zunft-Ansicht koordinierst du Forschung, Einflusszonen und Unterstützungsanfragen.',
        'Alle Verwaltungsansichten öffnen sich in separaten Iframes, damit du fokussiert planen kannst.',
      ],
    };
  }

  async init() {
    this.setupUI();
    this.setupMap();
    this.restoreMines();
    this.render();
    await this.bootstrapMultiplayer();
    this.startLoop();
  }

  setupUI() {
    if (!this.hasDOM) return;
    document.getElementById('player-company').textContent = `${this.account.company} — ${this.account.username}`;
    this.applyPreferences();
    this.setupWindowControls();
    this.setupWindowScaleControl();
    this.setupTutorial();
    this.populateTradeSelector();
    this.renderResearch();
    this.updateLogistics();
    document.getElementById('trade-sell').addEventListener('click', () => this.handleTrade());
    document.getElementById('trade-resource').addEventListener('change', (ev) =>
      this.updateTradePrice(ev.target.value)
    );
    document.getElementById('upgrade-logistics').addEventListener('click', () => this.upgradeLogistics());
    document.getElementById('mine-form').addEventListener('submit', (event) => this.createMine(event));
    document.querySelectorAll('[data-close="mine"]').forEach((btn) =>
      btn.addEventListener('click', () => this.toggleMineModal(false))
    );
    this.setupGuildUI();
  }

  async bootstrapMultiplayer() {
    if (!this.accountStore.remote || !this.accountStore.session) {
      this.renderGuildWindow();
      this.renderCommunityWindow();
      return;
    }

    await this.refreshMultiplayer();
    this.scheduleWorldPolling();
    this.scheduleSupportPolling();
  }

  scheduleWorldPolling() {
    if (!this.accountStore.remote) return;
    if (this.worldInterval) {
      window.clearInterval(this.worldInterval);
    }
    this.worldInterval = window.setInterval(() => {
      this.refreshMultiplayer({ worldOnly: true });
    }, 120000);
  }

  scheduleSupportPolling() {
    if (!this.accountStore.remote) return;
    if (this.supportInterval) {
      window.clearInterval(this.supportInterval);
    }
    if (!this.multiplayer.guild) {
      return;
    }
    this.supportInterval = window.setInterval(() => {
      if (this.multiplayer.guild) {
        this.refreshMultiplayer();
      }
    }, 70000);
  }

  async refreshMultiplayer({ worldOnly = false } = {}) {
    if (!this.accountStore.remote || !this.accountStore.session) return;
    try {
      if (worldOnly) {
        const snapshot = await this.accountStore.remote.worldSnapshot();
        if (snapshot.success && snapshot.world) {
          this.multiplayer.world = snapshot.world;
          this.renderCommunityWindow();
        }
        return;
      }

      const overview = await this.accountStore.remote.guildOverview({ session: this.accountStore.session });
      if (overview.success) {
        this.multiplayer.guild = overview.guild || null;
        this.multiplayer.world = overview.world || this.multiplayer.world;
        this.guildTechSet = new Set(this.multiplayer.guild?.technologies?.map((tech) => tech.techId) || []);
        this.guildResources = this.initializeGuildResources();
        this.account.multiplayer = this.multiplayer;
        this.renderGuildWindow();
        this.renderCommunityWindow();
        this.drawGuildZones();
      }
    } catch (error) {
      console.warn('Multiplayer-Daten konnten nicht geladen werden', error);
    }
  }

  drawGuildZones() {
    if (!this.map) return;
    this.zoneLayers.forEach((layer) => this.map.removeLayer(layer));
    this.zoneLayers = [];
    const zones = this.multiplayer.guild?.zones || [];
    zones.forEach((zone) => {
      const polygon = L.polygon(zone.polygon, {
        color: '#6366f1',
        weight: 2,
        fillOpacity: 0.12,
        dashArray: '6 4',
      }).addTo(this.map);
      polygon.bindTooltip(`${zone.name} • +${Math.round(zone.resourceBonus * 100)}%`);
      this.zoneLayers.push(polygon);
    });
  }

  initializeGuildResources() {
    const base = { essence: 0, research: 0, logistics: 0 };
    const remote = this.multiplayer.guild?.resources;
    return remote ? { ...base, ...remote } : base;
  }

  setupGuildUI() {
    this.guildPanels = {
      empty: document.getElementById('guild-empty'),
      browser: document.getElementById('guild-browser'),
      create: document.getElementById('guild-create'),
      dashboard: document.getElementById('guild-dashboard'),
    };

    document.getElementById('open-guild-browser')?.addEventListener('click', () => this.openGuildBrowser());
    document.getElementById('open-guild-create')?.addEventListener('click', () => this.openGuildCreate());
    document.getElementById('guild-browser-back')?.addEventListener('click', () => this.toggleGuildPanels('empty'));
    document.getElementById('guild-create-cancel')?.addEventListener('click', () => this.toggleGuildPanels('empty'));
    document.getElementById('guild-refresh')?.addEventListener('click', () => this.refreshMultiplayer());
    document.getElementById('guild-leave')?.addEventListener('click', () => this.leaveGuild());

    const createForm = document.getElementById('guild-create-form');
    createForm?.addEventListener('submit', (event) => this.submitGuildCreate(event));

    const browser = document.getElementById('guild-list');
    browser?.addEventListener('click', (event) => {
      const target = event.target.closest('[data-join-guild]');
      if (!target) return;
      const guildId = Number(target.dataset.joinGuild);
      if (guildId) {
        this.joinGuild(guildId);
      }
    });

    const techList = document.getElementById('guild-tech-list');
    techList?.addEventListener('click', (event) => {
      const button = event.target.closest('[data-tech]');
      if (!button) return;
      const techId = button.dataset.tech;
      const tech = GUILD_TECHS.find((item) => item.id === techId);
      if (tech) {
        this.unlockGuildTech(tech);
      }
    });

    const zoneForm = document.getElementById('guild-zone-form');
    zoneForm?.addEventListener('submit', (event) => this.submitZoneClaim(event));

    const supportForm = document.getElementById('guild-support-form');
    supportForm?.addEventListener('submit', (event) => this.submitSupportRequest(event));

    document.getElementById('guild-support-queue')?.addEventListener('click', (event) => {
      const button = event.target.closest('[data-support-action]');
      if (!button) return;
      const supportId = Number(button.dataset.supportId);
      const action = button.dataset.supportAction;
      if (supportId && action) {
        this.resolveSupportRequest(supportId, action);
      }
    });
  }

  applyPreferences() {
    if (!this.hasDOM) return;
    const fontScale = this.preferences.fontScale || 1;
    const windowScale = this.preferences.windowScale || 1;
    document.documentElement.style.setProperty('--font-scale', fontScale.toFixed(2));
    document.documentElement.style.setProperty('--window-scale', windowScale.toFixed(2));
    document.body.classList.remove('theme-void', 'theme-sunrise');
    if (this.preferences.theme === 'void') {
      document.body.classList.add('theme-void');
    } else if (this.preferences.theme === 'sunrise') {
      document.body.classList.add('theme-sunrise');
    }
    const slider = document.getElementById('window-scale');
    if (slider) {
      slider.value = Math.round(windowScale * 100);
    }
  }

  updatePreferences(partial, persist = true) {
    this.preferences = {
      ...this.preferences,
      ...partial,
    };
    this.account.preferences = this.preferences;
    this.applyPreferences();
    if (persist) {
      this.persistState();
    }
  }

  populateSettingsForm(form) {
    if (!this.hasDOM || !form) return;
    const pref = this.preferences;
    const fontScaleInput = form.querySelector('[name="fontScale"]');
    if (fontScaleInput) {
      fontScaleInput.value = Math.round((pref.fontScale || 1) * 100);
    }
    const themeSelect = form.querySelector('[name="theme"]');
    if (themeSelect) {
      themeSelect.value = pref.theme || 'default';
    }
    const autoTrade = form.querySelector('[name="autoTrade"]');
    if (autoTrade) {
      autoTrade.checked = !!pref.autoTrade;
    }
    const weather = form.querySelector('[name="experimentalWeather"]');
    if (weather) {
      weather.checked = !!pref.experimentalWeather;
    }
    const notifyGuild = form.querySelector('[name="notifyGuild"]');
    if (notifyGuild) {
      notifyGuild.checked = pref.notifyGuild !== false;
    }
  }

  applySettingsForm(formData) {
    const fontScale = Number(formData.get('fontScale') || 100) / 100;
    const theme = formData.get('theme') || 'default';
    const autoTrade = formData.get('autoTrade') === 'on';
    const experimentalWeather = formData.get('experimentalWeather') === 'on';
    const notifyGuild = formData.get('notifyGuild') !== null;
    this.updatePreferences({ fontScale, theme, autoTrade, experimentalWeather, notifyGuild });
    this.toast.show('Einstellungen aktualisiert.');
    if (experimentalWeather) {
      this.toast.show('Experimentelle Wettereffekte aktiviert. Achte auf dynamische Modifikatoren!');
    }
  }

  setupWindowScaleControl() {
    if (!this.hasDOM) return;
    const slider = document.getElementById('window-scale');
    if (!slider) return;
    slider.addEventListener('input', (event) => {
      const scale = Number(event.target.value) / 100;
      this.updatePreferences({ windowScale: scale }, false);
      document.documentElement.style.setProperty('--window-scale', scale.toFixed(2));
    });
  }

  setupTutorial() {
    if (!this.hasDOM) return;
    const tutorial = this.tutorialState;
    if (!tutorial.element || !tutorial.text || !tutorial.next || !tutorial.back || !tutorial.skip) return;
    const render = () => {
      tutorial.text.textContent = tutorial.steps[tutorial.index];
      tutorial.back.disabled = tutorial.index === 0;
      tutorial.next.textContent = tutorial.index === tutorial.steps.length - 1 ? 'Abschließen' : 'Weiter';
    };
    tutorial.render = render;
    if (!tutorial.initialized) {
      tutorial.back.addEventListener('click', () => {
        tutorial.index = Math.max(0, tutorial.index - 1);
        tutorial.render();
      });
      tutorial.next.addEventListener('click', () => {
        if (tutorial.index >= tutorial.steps.length - 1) {
          this.completeTutorial(false);
          return;
        }
        tutorial.index += 1;
        tutorial.render();
      });
      tutorial.skip.addEventListener('click', () => {
        if (window.confirm('Tutorial wirklich überspringen?')) {
          this.completeTutorial(true);
        }
      });
      tutorial.initialized = true;
    }
    tutorial.render();
    if (!this.account.tutorialCompleted) {
      tutorial.element.classList.remove('hidden');
      tutorial.element.setAttribute('aria-hidden', 'false');
    } else {
      tutorial.element.classList.add('hidden');
      tutorial.element.setAttribute('aria-hidden', 'true');
    }
  }

  completeTutorial(skipped) {
    if (this.tutorialState.element) {
      this.tutorialState.element.classList.add('hidden');
      this.tutorialState.element.setAttribute('aria-hidden', 'true');
    }
    this.account.tutorialCompleted = true;
    this.account.tutorialSkipped = skipped;
    this.persistState();
    if (skipped) {
      this.toast.show('Tutorial übersprungen. Du kannst es in den Einstellungen erneut starten.');
    } else {
      this.toast.show('Tutorial abgeschlossen – viel Erfolg!');
    }
  }

  restartTutorial() {
    const tutorial = this.tutorialState;
    if (!tutorial.element) return;
    tutorial.index = 0;
    tutorial.element.classList.remove('hidden');
    tutorial.element.setAttribute('aria-hidden', 'false');
    this.account.tutorialCompleted = false;
    this.account.tutorialSkipped = false;
    this.persistState();
    tutorial.render?.();
  }

  setupWindowControls() {
    if (!this.hasDOM) return;
    const container = this.windowContainer;
    if (!container) return;
    document.querySelectorAll('.ui-window').forEach((windowEl) => {
      const id = windowEl.id || generateId();
      windowEl.dataset.windowId = id;
      const actions = windowEl.querySelector('.window-actions');
      if (actions) {
        actions.innerHTML = '';
        const minimize = this.createWindowAction('–', 'Minimieren');
        const expand = this.createWindowAction('▢', 'Maximieren');
        actions.append(minimize, expand);
        minimize.addEventListener('click', () => this.minimizeWindow(windowEl));
        expand.addEventListener('click', () => this.toggleWindowExpand(windowEl));
      }
      if (!windowEl.querySelector('.window-resize-handle')) {
        const handle = document.createElement('div');
        handle.className = 'window-resize-handle';
        windowEl.appendChild(handle);
        this.enableResizing(windowEl, handle);
      }
      this.enableDragging(windowEl, container);
    });
  }

  createWindowAction(symbol, label) {
    const button = document.createElement('button');
    button.className = 'window-action';
    button.type = 'button';
    button.setAttribute('aria-label', label);
    button.textContent = symbol;
    return button;
  }

  enableDragging(windowEl, container) {
    const header = windowEl.querySelector('.window-header');
    if (!header) return;
    let dragging = false;
    let offsetX = 0;
    let offsetY = 0;
    let pointerId = null;

    const onPointerMove = (event) => {
      if (!dragging) return;
      const bounds = container.getBoundingClientRect();
      const width = windowEl.offsetWidth;
      const height = windowEl.offsetHeight;
      const maxX = bounds.width - width - 12;
      const maxY = bounds.height - height - 12;
      const targetX = event.clientX - offsetX - bounds.left;
      const targetY = event.clientY - offsetY - bounds.top;
      windowEl.style.position = 'absolute';
      windowEl.style.left = `${Math.max(12, Math.min(targetX, maxX))}px`;
      windowEl.style.top = `${Math.max(12, Math.min(targetY, maxY))}px`;
      windowEl.style.width = `${width}px`;
    };

    header.addEventListener('pointerdown', (event) => {
      if (event.target.closest('.window-action')) return;
      if (window.innerWidth < 1024) return;
      dragging = true;
      pointerId = event.pointerId;
      const rect = windowEl.getBoundingClientRect();
      const bounds = container.getBoundingClientRect();
      offsetX = event.clientX - rect.left;
      offsetY = event.clientY - rect.top;
      header.setPointerCapture(pointerId);
      windowEl.style.position = 'absolute';
      windowEl.style.left = `${rect.left - bounds.left}px`;
      windowEl.style.top = `${rect.top - bounds.top}px`;
      windowEl.style.width = `${rect.width}px`;
      windowEl.style.zIndex = '70';
      windowEl.classList.add('dragging');
    });

    header.addEventListener('pointermove', onPointerMove);

    const stopDragging = () => {
      if (!dragging) return;
      dragging = false;
      windowEl.classList.remove('dragging');
      if (pointerId !== null) {
        try {
          header.releasePointerCapture(pointerId);
        } catch (err) {
          /* noop */
        }
      }
      windowEl.style.zIndex = '';
      pointerId = null;
    };

    header.addEventListener('pointerup', stopDragging);
    header.addEventListener('pointercancel', stopDragging);
  }

  enableResizing(windowEl, handle) {
    let resizing = false;
    let pointerId = null;
    let startWidth = 0;
    let startHeight = 0;
    let startX = 0;
    let startY = 0;

    const onPointerMove = (event) => {
      if (!resizing) return;
      const deltaX = event.clientX - startX;
      const deltaY = event.clientY - startY;
      const width = Math.max(240, startWidth + deltaX);
      const height = Math.max(200, startHeight + deltaY);
      windowEl.style.width = `${width}px`;
      windowEl.style.height = `${height}px`;
    };

    handle.addEventListener('pointerdown', (event) => {
      resizing = true;
      pointerId = event.pointerId;
      startWidth = windowEl.offsetWidth;
      startHeight = windowEl.offsetHeight;
      startX = event.clientX;
      startY = event.clientY;
      handle.setPointerCapture(pointerId);
      event.stopPropagation();
    });

    handle.addEventListener('pointermove', onPointerMove);

    const stopResizing = () => {
      if (!resizing) return;
      resizing = false;
      if (pointerId !== null) {
        try {
          handle.releasePointerCapture(pointerId);
        } catch (err) {
          /* noop */
        }
      }
      pointerId = null;
    };

    handle.addEventListener('pointerup', stopResizing);
    handle.addEventListener('pointercancel', stopResizing);
  }

  minimizeWindow(windowEl) {
    const id = windowEl.dataset.windowId;
    if (!id || this.minimizedWindows.has(id)) return;
    windowEl.classList.add('minimized');
    const tab = document.createElement('button');
    tab.type = 'button';
    tab.textContent = windowEl.querySelector('h2')?.textContent || id;
    tab.dataset.windowId = id;
    tab.addEventListener('click', () => this.restoreWindow(id));
    this.tabBar?.appendChild(tab);
    this.minimizedWindows.set(id, { element: windowEl, tab });
  }

  restoreWindow(id) {
    const entry = this.minimizedWindows.get(id);
    if (!entry) return;
    entry.element.classList.remove('minimized');
    if (entry.tab.parentElement) {
      entry.tab.parentElement.removeChild(entry.tab);
    }
    this.minimizedWindows.delete(id);
  }

  toggleWindowExpand(windowEl) {
    const expanded = windowEl.classList.toggle('expanded');
    if (!expanded) {
      windowEl.style.width = '';
      windowEl.style.height = '';
    }
  }

  persistState() {
    this.account.state = this.state;
    this.account.preferences = this.preferences;
    this.account.multiplayer = this.multiplayer;
    this.accountStore.updateAccount(this.account);
  }

  toggleGuildPanels(panel) {
    Object.entries(this.guildPanels).forEach(([key, element]) => {
      if (!element) return;
      element.classList.toggle('hidden', key !== panel);
    });
  }

  openGuildBrowser() {
    this.toggleGuildPanels('browser');
    this.loadGuildDirectory();
  }

  openGuildCreate() {
    this.toggleGuildPanels('create');
    const form = document.getElementById('guild-create-form');
    form?.reset();
  }

  async loadGuildDirectory() {
    if (!this.accountStore.remote) return;
    const list = document.getElementById('guild-list');
    if (!list) return;
    list.innerHTML = '<p class="guild-loading">Lade verfügbare Zünfte …</p>';
    try {
      const result = await this.accountStore.remote.listGuilds();
      if (!result.success) {
        list.innerHTML = '<p class="guild-error">Zünfte konnten nicht geladen werden.</p>';
        return;
      }
      list.innerHTML = '';
      if (!result.guilds || result.guilds.length === 0) {
        list.innerHTML = '<p class="guild-empty-state">Noch keine Zünfte registriert. Gründe die erste!</p>';
        return;
      }
      result.guilds.forEach((guild) => {
        const card = document.createElement('article');
        card.className = 'guild-card';
        card.innerHTML = `
          <header>
            <h4>${guild.name}</h4>
            <span>${guild.members} Mitglieder</span>
          </header>
          <p>${guild.motto}</p>
          <footer>
            <button class="btn btn-secondary" data-join-guild="${guild.id}">Beitreten</button>
          </footer>
        `;
        list.appendChild(card);
      });
    } catch (error) {
      console.warn('Zünfte konnten nicht geladen werden', error);
      list.innerHTML = '<p class="guild-error">Netzwerkfehler beim Laden der Zünfte.</p>';
    }
  }

  async submitGuildCreate(event) {
    event.preventDefault();
    if (!this.accountStore.remote || !this.accountStore.session) return;
    const formData = new FormData(event.target);
    const name = formData.get('name');
    const motto = formData.get('motto');
    try {
      const result = await this.accountStore.remote.createGuild({
        session: this.accountStore.session,
        name,
        motto,
      });
      if (!result.success) {
        this.toast.show(result.message || 'Zunft konnte nicht erstellt werden.');
        return;
      }
      this.multiplayer.guild = result.guild;
      this.guildTechSet = new Set(this.multiplayer.guild?.technologies?.map((tech) => tech.techId) || []);
      this.toggleGuildPanels('dashboard');
      this.renderGuildWindow();
      this.drawGuildZones();
      this.toast.show('Zunft gegründet!');
      this.scheduleSupportPolling();
      this.persistState();
    } catch (error) {
      console.warn('Zunft konnte nicht erstellt werden', error);
      this.toast.show('Serverfehler beim Erstellen der Zunft.');
    }
  }

  async joinGuild(guildId) {
    if (!this.accountStore.remote || !this.accountStore.session) return;
    try {
      const result = await this.accountStore.remote.joinGuild({
        session: this.accountStore.session,
        guildId,
      });
      if (!result.success) {
        this.toast.show(result.message || 'Beitritt fehlgeschlagen.');
        return;
      }
      this.multiplayer.guild = result.guild;
      this.guildTechSet = new Set(this.multiplayer.guild?.technologies?.map((tech) => tech.techId) || []);
      this.toggleGuildPanels('dashboard');
      this.renderGuildWindow();
      this.drawGuildZones();
      this.toast.show('Zunft beigetreten!');
      this.scheduleSupportPolling();
      this.persistState();
    } catch (error) {
      console.warn('Beitritt fehlgeschlagen', error);
      this.toast.show('Serverfehler beim Beitritt.');
    }
  }

  async leaveGuild() {
    if (!this.accountStore.remote || !this.accountStore.session || !this.multiplayer.guild) return;
    try {
      const result = await this.accountStore.remote.leaveGuild({ session: this.accountStore.session });
      if (!result.success) {
        this.toast.show(result.message || 'Konnte Zunft nicht verlassen.');
        return;
      }
      this.multiplayer.guild = null;
      this.guildTechSet = new Set();
      this.drawGuildZones();
      this.renderGuildWindow();
      this.toast.show('Zunft verlassen.');
      this.scheduleSupportPolling();
      this.persistState();
    } catch (error) {
      console.warn('Zunft konnte nicht verlassen werden', error);
      this.toast.show('Serverfehler beim Verlassen der Zunft.');
    }
  }

  async unlockGuildTech(tech) {
    if (this.guildTechSet.has(tech.id)) return;
    if (this.state.researchPoints < tech.cost) {
      this.toast.show('Nicht genügend Forschungspunkte für diese Zunft-Technologie.');
      return;
    }
    if (!this.accountStore.remote || !this.accountStore.session) return;
    try {
      const result = await this.accountStore.remote.unlockGuildTech({
        session: this.accountStore.session,
        techId: tech.id,
      });
      if (!result.success) {
        this.toast.show(result.message || 'Technologie konnte nicht freigeschaltet werden.');
        return;
      }
      this.state.researchPoints -= tech.cost;
      this.guildTechSet = new Set(result.technologies?.map((item) => item.techId) || []);
      this.multiplayer.guild.technologies = result.technologies || [];
      this.toast.show(`${tech.name} für deine Zunft freigeschaltet!`);
      this.renderGuildWindow();
      this.render();
      this.persistState();
    } catch (error) {
      console.warn('Zunft-Technologie konnte nicht geladen werden', error);
      this.toast.show('Serverfehler beim Freischalten der Technologie.');
    }
  }

  async submitZoneClaim(event) {
    event.preventDefault();
    if (!this.accountStore.remote || !this.accountStore.session || !this.multiplayer.guild) return;
    const formData = new FormData(event.target);
    const mineId = formData.get('mine');
    const radius = Number(formData.get('radius')) || 50;
    const mine = this.state.mines.find((item) => item.id === mineId);
    if (!mine) {
      this.toast.show('Bitte wähle eine bestehende Mine als Kernzone.');
      return;
    }
    const polygon = createCircularPolygon(mine.location, radius, 32);
    try {
      const result = await this.accountStore.remote.claimGuildZone({
        session: this.accountStore.session,
        name: `${mine.name}-Einfluss`,
        polygon,
        bonus: 0.1,
      });
      if (!result.success) {
        this.toast.show(result.message || 'Zone konnte nicht registriert werden.');
        return;
      }
      this.multiplayer.guild.zones = result.zones || [];
      this.drawGuildZones();
      this.renderGuildWindow();
      this.toast.show('Neue Zunft-Zone markiert!');
      this.persistState();
    } catch (error) {
      console.warn('Zone konnte nicht registriert werden', error);
      this.toast.show('Serverfehler beim Registrieren der Zone.');
    }
  }

  async submitSupportRequest(event) {
    event.preventDefault();
    if (!this.accountStore.remote || !this.accountStore.session || !this.multiplayer.guild) return;
    const formData = new FormData(event.target);
    const type = formData.get('type');
    const amount = Number(formData.get('amount')) || 0;
    const note = formData.get('note');
    try {
      const result = await this.accountStore.remote.guildSupport({
        session: this.accountStore.session,
        type,
        payload: { amount, note },
      });
      if (!result.success) {
        this.toast.show(result.message || 'Anfrage konnte nicht gesendet werden.');
        return;
      }
      this.multiplayer.guild.supportQueue = result.support || [];
      event.target.reset();
      this.renderGuildWindow();
      this.toast.show('Unterstützung angefordert.');
      this.persistState();
    } catch (error) {
      console.warn('Unterstützung konnte nicht angefragt werden', error);
      this.toast.show('Serverfehler beim Senden der Anfrage.');
    }
  }

  async resolveSupportRequest(supportId, action) {
    if (!this.accountStore.remote || !this.accountStore.session || !this.multiplayer.guild) return;
    try {
      const result = await this.accountStore.remote.resolveSupport({
        session: this.accountStore.session,
        supportId,
        status: action === 'approve' ? 'resolved' : 'rejected',
      });
      if (!result.success) {
        this.toast.show(result.message || 'Anfrage konnte nicht aktualisiert werden.');
        return;
      }
      await this.refreshMultiplayer();
      this.toast.show('Anfrage aktualisiert.');
      this.persistState();
    } catch (error) {
      console.warn('Unterstützung konnte nicht aktualisiert werden', error);
      this.toast.show('Serverfehler beim Aktualisieren der Anfrage.');
    }
  }

  populateZoneMineSelector() {
    if (!this.hasDOM) return;
    const select = document.getElementById('zone-mine-select');
    if (!select) return;
    const current = select.value;
    select.innerHTML = '';
    this.state.mines.forEach((mine) => {
      const option = document.createElement('option');
      option.value = mine.id;
      option.textContent = `${mine.name} (${RESOURCE_DEFS[mine.resource].name})`;
      select.appendChild(option);
    });
    if (select.options.length === 0) {
      const placeholder = document.createElement('option');
      placeholder.textContent = 'Keine Minen verfügbar';
      placeholder.disabled = true;
      placeholder.selected = true;
      select.appendChild(placeholder);
    }
    if (current) {
      select.value = current;
    }
  }

  renderGuildWindow() {
    if (!this.hasDOM) return;
    if (!this.guildPanels) return;
    const guild = this.multiplayer.guild;
    const activePanel = Object.entries(this.guildPanels).find(([, element]) =>
      element && !element.classList.contains('hidden')
    );
    const activeKey = activePanel ? activePanel[0] : null;
    if (!guild) {
      if (activeKey !== 'browser' && activeKey !== 'create') {
        this.toggleGuildPanels('empty');
      }
      return;
    }

    if (activeKey !== 'browser' && activeKey !== 'create') {
      this.toggleGuildPanels('dashboard');
    }
    const roleMap = {
      founder: 'Gründer:in',
      officer: 'Offizier:in',
      member: 'Mitglied',
    };

    document.getElementById('guild-name').textContent = guild.name;
    document.getElementById('guild-motto').textContent = guild.motto;
    document.getElementById('guild-role').textContent = roleMap[guild.role] || guild.role;

    const memberList = document.getElementById('guild-member-list');
    if (memberList) {
      memberList.innerHTML = '';
      guild.members?.forEach((member) => {
        const item = document.createElement('li');
        item.innerHTML = `
          <span><strong>${member.username}</strong> — ${member.company}</span>
          <small>${roleMap[member.role] || member.role} • seit ${new Date(member.joinedAt).toLocaleDateString()}</small>
        `;
        memberList.appendChild(item);
      });
    }

    const techList = document.getElementById('guild-tech-list');
    if (techList) {
      techList.innerHTML = '';
      GUILD_TECHS.forEach((tech) => {
        const unlocked = this.guildTechSet.has(tech.id);
        const item = document.createElement('li');
        item.className = unlocked ? 'unlocked' : '';
        item.innerHTML = `
          <div>
            <h4>${tech.name}</h4>
            <p>${tech.description}</p>
          </div>
          <div>
            <span>${tech.cost} RP</span>
            <button class="btn btn-outline" data-tech="${tech.id}" ${unlocked ? 'disabled' : ''}>
              ${unlocked ? 'Aktiv' : 'Freischalten'}
            </button>
          </div>
        `;
        techList.appendChild(item);
      });
    }

    const zoneList = document.getElementById('guild-zone-list');
    if (zoneList) {
      zoneList.innerHTML = '';
      if (!guild.zones || guild.zones.length === 0) {
        zoneList.innerHTML = '<li class="muted">Noch keine Zunft-Zonen markiert.</li>';
      } else {
        guild.zones.forEach((zone) => {
          const item = document.createElement('li');
          item.innerHTML = `
            <strong>${zone.name}</strong>
            <small>Bonus: +${Math.round(zone.resourceBonus * 100)}% • Seit ${new Date(zone.createdAt).toLocaleDateString()}</small>
          `;
          zoneList.appendChild(item);
        });
      }
    }

    const supportQueue = document.getElementById('guild-support-queue');
    if (supportQueue) {
      supportQueue.innerHTML = '';
      if (!guild.supportQueue || guild.supportQueue.length === 0) {
        supportQueue.innerHTML = '<li class="muted">Keine offenen Anfragen.</li>';
      } else {
        guild.supportQueue.forEach((request) => {
          const item = document.createElement('li');
          const statusLabel = request.status === 'open' ? 'Offen' : request.status === 'resolved' ? 'Erledigt' : 'Abgelehnt';
          item.innerHTML = `
            <div>
              <strong>${request.username}</strong> bittet um ${request.type} (${request.payload?.amount || 0})
              <small>${new Date(request.createdAt).toLocaleString()} • Status: ${statusLabel}</small>
              <p>${request.payload?.note || ''}</p>
            </div>
          `;
          if (['founder', 'officer'].includes(guild.role) && request.status === 'open') {
            const actions = document.createElement('div');
            actions.className = 'support-actions';
            actions.innerHTML = `
              <button class="btn btn-secondary" data-support-action="approve" data-support-id="${request.id}">Erfüllen</button>
              <button class="btn btn-outline" data-support-action="reject" data-support-id="${request.id}">Ablehnen</button>
            `;
            item.appendChild(actions);
          }
          supportQueue.appendChild(item);
        });
      }
    }

    const resourceLedger = document.getElementById('guild-resource-ledger');
    if (resourceLedger) {
      resourceLedger.innerHTML = '';
      const entries = [
        { key: 'essence', label: 'Aether-Essenz' },
        { key: 'research', label: 'Forschungsfonds' },
        { key: 'logistics', label: 'Logistik-Kontingent' },
      ];
      entries.forEach(({ key, label }) => {
        const value = this.guildResources[key] || 0;
        const item = document.createElement('li');
        item.innerHTML = `<strong>${label}</strong><small>${value.toFixed(1)} Einheiten</small>`;
        resourceLedger.appendChild(item);
      });
    }
  }

  renderCommunityWindow() {
    if (!this.hasDOM) return;
    const eventList = document.getElementById('world-events');
    if (eventList) {
      eventList.innerHTML = '';
      const events = this.multiplayer.world?.events || [];
      if (events.length === 0) {
        eventList.innerHTML = '<li class="muted">Keine aktiven Weltereignisse.</li>';
      } else {
        events.forEach((event) => {
          const item = document.createElement('li');
          item.innerHTML = `
            <h4>${event.title}</h4>
            <p>${event.description}</p>
            <small>Aktiv bis ${new Date(event.endsAt).toLocaleDateString()}</small>
          `;
          eventList.appendChild(item);
        });
      }
    }

    const guildLeaderboard = document.getElementById('world-guilds');
    if (guildLeaderboard) {
      guildLeaderboard.innerHTML = '';
      const guilds = this.multiplayer.world?.topGuilds || [];
      if (guilds.length === 0) {
        guildLeaderboard.innerHTML = '<li class="muted">Noch keine Gilden im Ranking.</li>';
      } else {
        guilds.forEach((guild, index) => {
          const item = document.createElement('li');
          item.innerHTML = `
            <span>${index + 1}. ${guild.name}</span>
            <small>${guild.members} Mitglieder • ${guild.zones} Zonen</small>
          `;
          guildLeaderboard.appendChild(item);
        });
      }
    }
  }

  setupMap() {
    if (!this.hasDOM) return;
    this.map = L.map('map', {
      zoomControl: false,
      minZoom: 2,
      worldCopyJump: true,
    }).setView([20, 0], 3);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap-Mitwirkende',
    }).addTo(this.map);

    L.control.zoom({ position: 'topright' }).addTo(this.map);

    this.map.on('click', (event) => this.openMineModal(event.latlng));

    const mapScale = document.getElementById('map-scale');
    if (mapScale) {
      mapScale.value = `${this.map.getZoom()}`;
      mapScale.addEventListener('input', (event) => {
        const zoom = Number(event.target.value);
        if (!Number.isNaN(zoom)) {
          this.map.setZoom(zoom);
        }
      });
      this.map.on('zoomend', () => {
        mapScale.value = `${this.map.getZoom()}`;
      });
    }
  }

  restoreMines() {
    this.state.mines.forEach((mine) => this.addMineMarker(mine));
    this.renderMineList();
  }

  startLoop() {
    this.tickHandle = window.setInterval(() => this.tick(), 1000);
  }

  stopLoop() {
    if (this.tickHandle) {
      window.clearInterval(this.tickHandle);
      this.tickHandle = null;
    }
    if (this.worldInterval) {
      window.clearInterval(this.worldInterval);
      this.worldInterval = null;
    }
    if (this.supportInterval) {
      window.clearInterval(this.supportInterval);
      this.supportInterval = null;
    }
  }

  tick() {
    const now = performance.now();
    const deltaSeconds = (now - this.lastTick) / 1000;
    this.lastTick = now;
    const minutesToAdvance = deltaSeconds * 18; // 18 Spielminuten pro Sekunde
    this.advanceTime(minutesToAdvance);
    this.produceResources(minutesToAdvance);
    this.generateResearch(minutesToAdvance);
    this.render();
    this.persistState();
  }

  advanceTime(minutes) {
    this.state.minuteOfDay += minutes;
    while (this.state.minuteOfDay >= 1440) {
      this.state.minuteOfDay -= 1440;
      this.state.day += 1;
      this.toast.show(`Neuer Tag ${this.state.day}! Deine Crews sind motiviert.`);
      this.persistState();
    }
  }

  dayPhaseMultiplier() {
    const cycle = this.state.minuteOfDay / 1440;
    const dayMultiplier = 0.65 + Math.sin(cycle * Math.PI * 2) * 0.35;
    const stabilityBonus = this.state.research.bonuses.stability || 0;
    let adjusted = dayMultiplier + stabilityBonus * 0.2;
    if (this.guildTechSet.has('night_ops')) {
      adjusted = Math.max(adjusted, 0.8);
    }
    if (this.preferences.experimentalWeather) {
      const stormFactor = Math.sin(Date.now() / 120000) * 0.1;
      adjusted += stormFactor;
    }
    return Math.max(0.4, Math.min(1.35, adjusted));
  }

  produceResources(minutes) {
    const productionMultiplier = 1 + (this.state.research.bonuses.production || 0);
    const storageBonus = 1 + (this.state.research.bonuses.storage || 0);
    const globalLogisticsBonus = 1 + (this.state.research.bonuses.logistics || 0);
    const minuteFactor = minutes / 60;
    const outputs = {};

    this.state.mines.forEach((mine) => {
      const resource = RESOURCE_DEFS[mine.resource];
      const baseRate = resource.baseRate * productionMultiplier;
      const workforceEfficiency = Math.min(mine.workers / resource.optimalWorkforce, 1.5);
      const levelBonus = 1 + (mine.level - 1) * 0.2;
      const localLogisticsBonus = 1 + (mine.logisticsLevel - 1) * 0.15;
      const dayMultiplier = this.dayPhaseMultiplier();
      let output =
        baseRate *
        workforceEfficiency *
        levelBonus *
        localLogisticsBonus *
        dayMultiplier *
        minuteFactor;
      output *= this.getGuildProductionModifier(mine);
      if (this.multiplayer.guild) {
        const essenceGain = output * 0.12;
        this.guildResources.essence += essenceGain;
        this.guildResources.research += essenceGain * 0.35;
        this.guildResources.logistics += mine.logisticsLevel * 0.05;
        this.multiplayer.guild.resources = { ...this.guildResources };
      }
      mine.storage += output;
      const capacity = (mine.baseStorage || 320) * storageBonus;
      if (mine.storage > capacity) {
        mine.storage = capacity;
      }
      outputs[mine.resource] = (outputs[mine.resource] || 0) + output;
    });

    let remainingCapacity = this.state.logistics.capacity * globalLogisticsBonus * minuteFactor * this.getLogisticsMultiplier();

    this.state.mines.forEach((mine) => {
      if (remainingCapacity <= 0) return;
      const transferable = Math.min(mine.storage, remainingCapacity);
      mine.storage -= transferable;
      this.state.resources[mine.resource] += transferable;
      remainingCapacity -= transferable;
    });

    this.resourcesPerMinute = Object.entries(outputs).reduce((acc, [key, value]) => {
      acc[key] = value / minuteFactor;
      return acc;
    }, {});
  }

  estimateMineOutput(mine) {
    const productionMultiplier = 1 + (this.state.research.bonuses.production || 0);
    const resource = RESOURCE_DEFS[mine.resource];
    const baseRate = resource.baseRate * productionMultiplier;
    const workforceEfficiency = Math.min(mine.workers / resource.optimalWorkforce, 1.5);
    const levelBonus = 1 + (mine.level - 1) * 0.2;
    const localLogisticsBonus = 1 + (mine.logisticsLevel - 1) * 0.15;
    const output =
      baseRate * workforceEfficiency * levelBonus * localLogisticsBonus * this.dayPhaseMultiplier() * this.getGuildProductionModifier(mine);
    return output;
  }

  getGuildProductionModifier(mine) {
    let modifier = 1;
    const zones = this.multiplayer.guild?.zones || [];
    const location = [mine.location.lat, mine.location.lng];
    zones.forEach((zone) => {
      if (pointInPolygon(location, zone.polygon)) {
        modifier += zone.resourceBonus;
      }
    });
    if (this.guildTechSet.has('synergy_drills')) {
      modifier += 0.08;
    }
    const events = this.multiplayer.world?.events || [];
    events.forEach((event) => {
      if (event.effect?.type === 'regionalBoost' && event.effect.region === 'Nordischer Gürtel') {
        if (mine.location.lat >= 58) {
          modifier += event.effect.value || 0;
        }
      }
    });
    return modifier;
  }

  getLogisticsMultiplier() {
    let modifier = 1;
    if (this.guildTechSet.has('global_market')) {
      modifier += 0.1;
    }
    return modifier;
  }

  getMarketMultiplier(resourceKey) {
    let modifier = 1;
    if (this.guildTechSet.has('global_market')) {
      modifier += 0.1;
    }
    const events = this.multiplayer.world?.events || [];
    events.forEach((event) => {
      if (event.effect?.type === 'marketTrend' && Array.isArray(event.effect.resource)) {
        if (event.effect.resource.includes(resourceKey)) {
          modifier += event.effect.value || 0;
        }
      }
    });
    return modifier;
  }

  generateResearch(minutes) {
    const gain = minutes * 0.8;
    this.state.researchPoints += gain;
  }

  render() {
    if (!this.hasDOM) return;
    this.updateStatusPanel();
    this.renderMineList();
    this.updateTradePrice(document.getElementById('trade-resource').value);
    if (this.preferences.autoTrade) {
      const amountInput = document.getElementById('trade-amount');
      if (amountInput) {
        const resourceKey = document.getElementById('trade-resource').value;
        const available = this.state.resources[resourceKey] || 0;
        amountInput.placeholder = `${available.toFixed(1)} verfügbar`;
      }
    }
    this.updateLogistics();
    this.renderResearch();
    this.populateZoneMineSelector();
    this.renderGuildWindow();
    this.renderCommunityWindow();
  }

  updateStatusPanel() {
    if (!this.hasDOM) return;
    const timeDisplay = document.getElementById('time-display');
    const creditsDisplay = document.getElementById('credits-display');
    const researchDisplay = document.getElementById('research-display');
    const resourceList = document.getElementById('resource-list');

    const hours = Math.floor(this.state.minuteOfDay / 60);
    const minutes = Math.floor(this.state.minuteOfDay % 60)
      .toString()
      .padStart(2, '0');
    timeDisplay.textContent = `Tag ${this.state.day}, ${hours}:${minutes} Uhr`;
    creditsDisplay.textContent = `${Math.round(this.state.credits).toLocaleString('de-DE')} cr`;
    researchDisplay.textContent = `${Math.floor(this.state.researchPoints)} RP`;

    resourceList.innerHTML = '';
    Object.entries(this.state.resources).forEach(([key, amount]) => {
      const def = RESOURCE_DEFS[key];
      const item = document.createElement('div');
      item.className = 'resource-item';
      item.innerHTML = `
        <span>${def.name}</span>
        <span>${amount.toFixed(1)} t <small>(${this.resourcesPerMinute[key]?.toFixed(1) || '0.0'} /min)</small></span>
      `;
      resourceList.appendChild(item);
    });
  }

  renderMineList() {
    if (!this.hasDOM) return;
    const list = document.getElementById('mine-list');
    list.innerHTML = '';

    if (this.state.mines.length === 0) {
      const empty = document.createElement('p');
      empty.textContent = 'Noch keine Minen angelegt. Tippe auf die Karte, um zu starten!';
      list.appendChild(empty);
      return;
    }

    this.state.mines.forEach((mine) => {
      const resource = RESOURCE_DEFS[mine.resource];
      const card = document.createElement('article');
      card.className = 'mine-card';
      card.innerHTML = `
        <h3>${mine.name}</h3>
        <div class="mine-details">
          <span>Ressource: ${resource.name} — ${resource.geology}</span>
          <span>Level ${mine.level} • ${mine.workers} Ingenieure</span>
          <span>Lager: ${mine.storage.toFixed(1)} t</span>
          <span>Logistik: Stufe ${mine.logisticsLevel}</span>
        </div>
        <div class="mine-actions">
          <button class="btn btn-secondary" data-action="upgrade" data-id="${mine.id}">Upgrade (900 cr)</button>
          <button class="btn btn-primary" data-action="staff" data-id="${mine.id}">+10 Ingenieure (120 cr)</button>
          <button class="btn btn-outline" data-action="boost" data-id="${mine.id}">Boost 8h (Forschung 60)</button>
          <button class="btn btn-outline" data-action="iframe" data-id="${mine.id}">Management</button>
        </div>
      `;
      card.querySelectorAll('button').forEach((btn) =>
        btn.addEventListener('click', (event) => this.handleMineAction(event, mine.id))
      );
      list.appendChild(card);
    });
  }

  handleMineAction(event, mineId) {
    const action = event.currentTarget.dataset.action;
    const mine = this.state.mines.find((m) => m.id === mineId);
    if (!mine) return;

    if (action === 'upgrade') {
      if (this.state.credits < 900) {
        this.toast.show('Nicht genügend Credits.');
        return;
      }
      this.state.credits -= 900;
      mine.level += 1;
      mine.baseStorage = (mine.baseStorage || 320) + 60;
      this.toast.show(`${mine.name} wurde auf Level ${mine.level} ausgebaut.`);
    } else if (action === 'staff') {
      if (this.state.credits < 120) {
        this.toast.show('Nicht genügend Credits für zusätzliche Ingenieure.');
        return;
      }
      this.state.credits -= 120;
      mine.workers += 10;
      this.toast.show(`${mine.name} erhält 10 neue Ingenieure.`);
    } else if (action === 'boost') {
      if (this.state.researchPoints < 60) {
        this.toast.show('Zu wenig Forschungspunkte.');
        return;
      }
      this.state.researchPoints -= 60;
      mine.logisticsLevel += 1;
      window.setTimeout(() => {
        mine.logisticsLevel = Math.max(1, mine.logisticsLevel - 1);
      }, 8 * 1000);
      this.toast.show(`Boost aktiv: ${mine.name} arbeitet mit Höchstleistung!`);
    } else if (action === 'iframe') {
      this.openMineManagement(mine);
      return;
    }
    this.render();
    this.persistState();
  }

  openMineManagement(mine) {
    const frames = document.getElementById('mine-frames');
    if (!frames) return;
    let panel = frames.querySelector(`[data-frame-id="${mine.id}"]`);
    if (panel) {
      const iframe = panel.querySelector('iframe');
      if (iframe) {
        iframe.srcdoc = this.buildMineFrameContent(mine);
      }
      panel.classList.add('highlight');
      window.setTimeout(() => panel.classList.remove('highlight'), 800);
      panel.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    panel = document.createElement('section');
    panel.className = 'frame-panel';
    panel.dataset.frameId = mine.id;
    const header = document.createElement('header');
    const title = document.createElement('h4');
    title.textContent = `${mine.name} – Übersicht`;
    const close = document.createElement('button');
    close.type = 'button';
    close.setAttribute('aria-label', 'Frame schließen');
    close.textContent = '×';
    close.addEventListener('click', () => {
      panel.remove();
    });
    header.append(title, close);
    const iframe = document.createElement('iframe');
    iframe.title = `Management ${mine.name}`;
    iframe.setAttribute('loading', 'lazy');
    iframe.srcdoc = this.buildMineFrameContent(mine);
    panel.append(header, iframe);
    frames.appendChild(panel);
  }

  buildMineFrameContent(mine) {
    if (!this.hasDOM) return '';
    const resource = RESOURCE_DEFS[mine.resource];
    const output = this.estimateMineOutput(mine);
    const guildBonus = (this.getGuildProductionModifier(mine) - 1) * 100;
    const researchBonus = (this.state.research.bonuses.production || 0) * 100;
    const guildContribution = this.multiplayer.guild ? output * 0.12 : 0;
    const ledgerEssence = this.guildResources.essence || 0;
    return `<!DOCTYPE html>
      <html lang="de">
        <head>
          <meta charset="utf-8" />
          <style>
            :root {
              color-scheme: dark;
              font-family: 'Montserrat', sans-serif;
            }
            body {
              margin: 0;
              padding: 1rem;
              background: #0f172a;
              color: #f8fafc;
              display: grid;
              gap: 0.75rem;
            }
            h2 {
              margin: 0;
              font-size: 1.1rem;
            }
            .grid {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
              gap: 0.75rem;
            }
            .stat {
              padding: 0.75rem;
              border-radius: 0.75rem;
              background: rgba(15, 23, 42, 0.75);
              border: 1px solid rgba(148, 163, 184, 0.25);
            }
            .stat span {
              display: block;
              font-size: 0.75rem;
              color: #cbd5f5;
            }
          </style>
        </head>
        <body>
          <h2>${mine.name} – ${resource.name}</h2>
          <div class="grid">
            <div class="stat"><strong>${output.toFixed(1)} t/min</strong><span>Aktuelle Förderrate</span></div>
            <div class="stat"><strong>${mine.workers}</strong><span>Ingenieure</span></div>
            <div class="stat"><strong>${mine.level}</strong><span>Minenstufe</span></div>
            <div class="stat"><strong>${(guildBonus).toFixed(1)}%</strong><span>Zunft-Bonus</span></div>
            <div class="stat"><strong>${researchBonus.toFixed(1)}%</strong><span>Forschungsbonus</span></div>
            <div class="stat"><strong>${guildContribution.toFixed(1)} t</strong><span>Zunft-Pool Beitrag</span></div>
            <div class="stat"><strong>${ledgerEssence.toFixed(1)}</strong><span>Zunft-Essenz gesamt</span></div>
          </div>
        </body>
      </html>`;
  }

  populateTradeSelector() {
    const tradeSelector = document.getElementById('trade-resource');
    tradeSelector.innerHTML = '';
    Object.keys(RESOURCE_DEFS).forEach((key) => {
      const option = document.createElement('option');
      option.value = key;
      option.textContent = RESOURCE_DEFS[key].name;
      tradeSelector.appendChild(option);
    });
    this.updateTradePrice(tradeSelector.value);
  }

  updateTradePrice(resourceKey) {
    const priceElement = document.getElementById('trade-price');
    if (!resourceKey) return;
    const resource = RESOURCE_DEFS[resourceKey];
    const marketVariance = 0.85 + Math.sin(Date.now() / 60000) * 0.15;
    const price = resource.basePrice * marketVariance;
    const multiplier = this.getMarketMultiplier(resourceKey);
    const finalPrice = price * multiplier;
    priceElement.textContent = `${finalPrice.toFixed(2)} cr/t`;
    return finalPrice;
  }

  handleTrade() {
    if (!this.hasDOM) return;
    const resourceKey = document.getElementById('trade-resource').value;
    const amountInput = document.getElementById('trade-amount');
    const desiredAmount = Number(amountInput.value);
    if (!resourceKey || desiredAmount <= 0) {
      this.toast.show('Bitte gib eine gültige Menge ein.');
      return;
    }
    const available = this.state.resources[resourceKey] || 0;
    const sellable = Math.min(
      available,
      desiredAmount,
      this.state.logistics.capacity * (1 + (this.state.research.bonuses.logistics || 0)) * this.getLogisticsMultiplier()
    );
    if (sellable <= 0) {
      this.toast.show('Keine Ressourcen vorhanden oder Logistikkapazität zu gering.');
      return;
    }
    const price = this.updateTradePrice(resourceKey);
    const earnings = sellable * price;
    this.state.resources[resourceKey] -= sellable;
    this.state.credits += earnings;
    this.toast.show(`Verkauft: ${sellable.toFixed(1)}t ${RESOURCE_DEFS[resourceKey].name} für ${earnings.toFixed(0)} Credits.`);
    amountInput.value = '0';
    this.render();
    this.persistState();
  }

  upgradeLogistics() {
    const cost = 1500;
    if (this.state.credits < cost) {
      this.toast.show('Du benötigst mehr Credits für den Logistikausbau.');
      return;
    }
    this.state.credits -= cost;
    this.state.logistics.level += 1;
    const bonus = 20 * this.state.logistics.level;
    this.state.logistics.capacity += 30 + bonus;
    this.toast.show(`Logistik erweitert! Kapazität beträgt nun ${this.state.logistics.capacity.toFixed(0)} t/min.`);
    this.render();
    this.persistState();
  }

  renderResearch() {
    if (!this.hasDOM) return;
    const list = document.getElementById('research-list');
    list.innerHTML = '';
    RESEARCH_DEFS.forEach((research) => {
      const unlocked = this.state.research.unlocked.includes(research.id);
      const canAfford = this.state.researchPoints >= research.cost;
      const item = document.createElement('article');
      item.className = `research-item ${unlocked ? '' : 'locked'}`;
      item.innerHTML = `
        <h3>${research.name}</h3>
        <p>${research.description}</p>
        <span class="status">Kosten: ${research.cost} RP</span>
        <button class="btn btn-secondary" ${unlocked ? 'disabled' : ''}>${
        unlocked ? 'Erforscht' : 'Freischalten'
      }</button>
      `;
      const button = item.querySelector('button');
      if (!unlocked) {
        if (!canAfford) {
          button.disabled = true;
          button.textContent = 'Zu wenig Forschung';
        } else {
          button.addEventListener('click', () => this.unlockResearch(research));
        }
      }
      list.appendChild(item);
    });
  }

  unlockResearch(research) {
    if (this.state.research.unlocked.includes(research.id)) return;
    if (this.state.researchPoints < research.cost) {
      this.toast.show('Du benötigst mehr Forschungspunkte.');
      return;
    }
    this.state.researchPoints -= research.cost;
    this.state.research.unlocked.push(research.id);
    this.state.research.bonuses[research.bonusType] += research.bonusValue;
    this.toast.show(`${research.name} freigeschaltet!`);
    this.render();
    this.persistState();
  }

  updateLogistics() {
    if (!this.hasDOM) return;
    const element = document.getElementById('logistics-capacity');
    const effective = this.state.logistics.capacity * (1 + (this.state.research.bonuses.logistics || 0));
    element.textContent = `${effective.toFixed(0)}`;
  }

  openMineModal(latlng) {
    if (!this.hasDOM) return;
    this.pendingLocation = latlng;
    const modal = document.getElementById('mine-modal');
    const locationText = `${latlng.lat.toFixed(2)}°, ${latlng.lng.toFixed(2)}°`;
    document.getElementById('mine-location').textContent = locationText;
    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');
  }

  toggleMineModal(show) {
    if (!this.hasDOM) return;
    const modal = document.getElementById('mine-modal');
    modal.classList.toggle('show', show);
    modal.setAttribute('aria-hidden', show ? 'false' : 'true');
    if (!show) {
      document.getElementById('mine-form').reset();
      this.pendingLocation = null;
    }
  }

  createMine(event) {
    if (!this.hasDOM) return;
    event.preventDefault();
    if (!this.pendingLocation) {
      this.toast.show('Kein Standort ausgewählt.');
      return;
    }
    if (this.state.credits < 750) {
      this.toast.show('Nicht genügend Credits für eine neue Mine.');
      return;
    }
    const formData = new FormData(event.target);
    const name = formData.get('name');
    const resource = formData.get('resource');
    const workers = Number(formData.get('workers'));

    const mine = {
      id: generateId(),
      name,
      resource,
      workers,
      level: 1,
      logisticsLevel: 1,
      storage: 0,
      baseStorage: 320,
      location: this.pendingLocation,
    };

    this.state.credits -= 750;
    this.state.mines.push(mine);
    this.addMineMarker(mine);
    this.toast.show(`${mine.name} wurde erfolgreich eröffnet.`);
    this.toggleMineModal(false);
    this.render();
    this.persistState();
  }

  addMineMarker(mine) {
    const resource = RESOURCE_DEFS[mine.resource];
    const marker = L.circleMarker([mine.location.lat, mine.location.lng], {
      radius: 10,
      color: resource.color,
      fillColor: resource.color,
      fillOpacity: 0.8,
    }).addTo(this.map);

    marker.bindPopup(`
      <strong>${mine.name}</strong><br />
      Ressource: ${resource.name}<br />
      Level ${mine.level} • ${mine.workers} Ingenieure
    `);

    marker.on('click', () => {
      this.toast.show(`${mine.name}: Lager ${mine.storage.toFixed(1)}t`);
    });

    this.mines.set(mine.id, marker);
  }

}

export class App {
  constructor() {
    this.accountStore = new AccountStore(window.localStorage, new RemoteGateway());
    this.toast = new Toast();
    this.game = null;
    this.setupLanding();
    this.setupAuth();
    this.setupGameControls();
    this.tryAutoLogin();
  }

  setupLanding() {
    const yearSpan = document.getElementById('year');
    yearSpan.textContent = new Date().getFullYear();
  }

  setupAuth() {
    const modal = document.getElementById('auth-modal');
    const openLogin = document.getElementById('open-login');
    const openRegister = document.getElementById('open-register');
    const closeModal = document.getElementById('close-modal');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const surfaces = document.querySelectorAll('.auth-surface');
    const surfaceToggles = document.querySelectorAll('.auth-toggle [data-switch]');

    const openModal = (defaultSurface = 'login') => {
      modal.classList.add('show');
      modal.setAttribute('aria-hidden', 'false');
      this.switchSurface(defaultSurface);
    };

    const close = () => {
      modal.classList.remove('show');
      modal.setAttribute('aria-hidden', 'true');
      loginForm.reset();
      registerForm.reset();
      document.querySelector('[data-role="login"]').textContent = '';
      document.querySelector('[data-role="register"]').textContent = '';
    };

    openLogin.addEventListener('click', () => openModal('login'));
    openRegister.addEventListener('click', () => openModal('register'));
    document.getElementById('open-game').addEventListener('click', () => openModal('login'));
    closeModal.addEventListener('click', close);
    modal.addEventListener('click', (event) => {
      if (event.target === modal) close();
    });

    surfaceToggles.forEach((button) => {
      button.addEventListener('click', () => {
        const target = button.dataset.switch;
        this.switchSurface(target);
      });
    });

    surfaces.forEach((surface) => {
      surface.setAttribute('aria-hidden', surface.classList.contains('active') ? 'false' : 'true');
    });

    loginForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const formData = new FormData(loginForm);
      const message = document.querySelector('[data-role="login"]');
      message.textContent = 'Prüfe Zugangsdaten …';
      const result = await this.accountStore.login({
        username: formData.get('username'),
        password: formData.get('password'),
      });
      if (!result.success) {
        message.textContent = result.message || 'Anmeldung fehlgeschlagen.';
      } else {
        message.textContent = '';
        close();
        this.startGame(result.account);
      }
    });

    registerForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const formData = new FormData(registerForm);
      const message = document.querySelector('[data-role="register"]');
      message.textContent = 'Erstelle Account …';
      const result = await this.accountStore.register({
        username: formData.get('username'),
        password: formData.get('password'),
        company: formData.get('company'),
      });
      if (!result.success) {
        message.textContent = result.message || 'Registrierung fehlgeschlagen.';
      } else {
        message.textContent = 'Account erstellt! Du kannst dich nun anmelden.';
        registerForm.reset();
        this.switchSurface('login');
      }
    });
  }

  switchSurface(target) {
    document.querySelectorAll('.auth-surface').forEach((surface) => {
      const isActive = surface.dataset.surface === target;
      surface.classList.toggle('active', isActive);
      surface.setAttribute('aria-hidden', isActive ? 'false' : 'true');
    });
    document.querySelectorAll('.auth-toggle [data-switch]').forEach((button) => {
      button.classList.toggle('active', button.dataset.switch === target);
    });
  }

  setupGameControls() {
    document.getElementById('logout').addEventListener('click', () => this.logout());
    const settingsButton = document.getElementById('settings-button');
    const helpButton = document.getElementById('help-button');
    const settingsModal = document.getElementById('settings-modal');
    const helpModal = document.getElementById('help-modal');
    const settingsForm = document.getElementById('settings-form');

    const openModal = (element) => {
      if (!element) return;
      element.classList.add('show');
      element.setAttribute('aria-hidden', 'false');
    };

    const closeModal = (element) => {
      if (!element) return;
      element.classList.remove('show');
      element.setAttribute('aria-hidden', 'true');
    };

    settingsButton?.addEventListener('click', () => {
      if (!this.game) return;
      this.game.populateSettingsForm(settingsForm);
      openModal(settingsModal);
    });

    helpButton?.addEventListener('click', () => openModal(helpModal));

    settingsForm?.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!this.game) return;
      const formData = new FormData(settingsForm);
      this.game.applySettingsForm(formData);
      closeModal(settingsModal);
    });

    document.querySelectorAll('[data-close="settings"]').forEach((btn) =>
      btn.addEventListener('click', () => closeModal(settingsModal))
    );
    document.querySelectorAll('[data-close="help"]').forEach((btn) =>
      btn.addEventListener('click', () => closeModal(helpModal))
    );
    const tutorialReset = document.getElementById('tutorial-reset');
    tutorialReset?.addEventListener('click', () => {
      if (!this.game) return;
      closeModal(settingsModal);
      this.game.restartTutorial();
    });
  }

  async tryAutoLogin() {
    const account = await this.accountStore.restoreActiveAccount();
    if (account) {
      this.startGame(account);
      this.toast.show('Willkommen zurück, deine Sitzung wurde geladen.');
    }
  }

  startGame(account) {
    document.getElementById('app').classList.add('hidden');
    document.getElementById('game').classList.remove('hidden');
    this.game?.stopLoop();
    this.game = new GameEngine(account, this.accountStore, this.toast);
    this.game
      .init()
      .catch((error) => {
        console.error('Spiel konnte nicht initialisiert werden', error);
        this.toast.show('Beim Start gab es ein Problem. Versuche es erneut.');
      });
  }

  async logout() {
    await this.accountStore.logout();
    this.game?.stopLoop();
    this.game = null;
    document.getElementById('game').classList.add('hidden');
    document.getElementById('app').classList.remove('hidden');
    document.getElementById('player-company').textContent = '';
    const tutorial = document.getElementById('tutorial');
    if (tutorial) {
      tutorial.classList.add('hidden');
      tutorial.setAttribute('aria-hidden', 'true');
    }
    this.toast.show('Erfolgreich abgemeldet.');
  }
}

export const bootstrapApp = () => new App();

if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    bootstrapApp();
  });
}
