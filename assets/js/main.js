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

export const PROVINCE_PRESETS = [
  {
    id: 'aurora_caverns',
    name: 'Aurora-Kaverne',
    defaultFocus: 'produktion',
    population: 2850,
    prosperity: 52,
    defense: 28,
    culture: 34,
    productionBonus: 0.04,
    logisticsBonus: 0.02,
    marketBonus: 0,
    summary: 'Schachtanlagen unter polarisiertem Licht, spezialisiert auf Hochenergie-Erze.',
    structures: ['Pionier-Depot'],
  },
  {
    id: 'valoris_bastion',
    name: 'Valoris-Kliff',
    defaultFocus: 'verteidigung',
    population: 1980,
    prosperity: 44,
    defense: 46,
    culture: 22,
    productionBonus: 0.02,
    logisticsBonus: 0.01,
    marketBonus: 0,
    summary: 'Terrassierte Felsplateaus mit natürlichen Verteidigungsstellungen und Luftschleusen.',
    structures: ['Frontier-Werkstatt'],
  },
  {
    id: 'meridian_harbor',
    name: 'Meridian-Hafen',
    defaultFocus: 'produktion',
    population: 3620,
    prosperity: 60,
    defense: 24,
    culture: 48,
    productionBonus: 0.03,
    logisticsBonus: 0.05,
    marketBonus: 0,
    summary: 'Orbital angebundener Umschlagplatz, an dem jede Ressource ihren Käufer findet.',
    structures: ['Orbitaler Umschlagplatz'],
  },
];

export const PROVINCE_PROJECTS = [
  {
    id: 'titan_foundry',
    name: 'Titan-Gießerei',
    duration: 540,
    cost: 1300,
    description: 'Erweitert das Industriecluster um energieintensive Fertigungslinien.',
    effects: {
      production: 0.07,
      prosperity: 6,
      structure: 'Titan-Gießerei',
    },
  },
  {
    id: 'skyport',
    name: 'Skyport-Relais',
    duration: 420,
    cost: 950,
    description: 'Richtet eine permanente Luftbrücke für Versorgung und Evakuierung ein.',
    effects: {
      logistics: 0.06,
      defense: 4,
      structure: 'Skyport-Relais',
    },
  },
  {
    id: 'trade_forum',
    name: 'Handelsforum Meridian',
    duration: 480,
    cost: 1100,
    description: 'Etabliert diplomatische Handelskammern und optimierte Lieferverträge.',
    effects: {
      market: 0.05,
      prosperity: 8,
      structure: 'Handelsforum',
    },
  },
  {
    id: 'scholar_academy',
    name: 'Akademie der Geomechanik',
    duration: 360,
    cost: 880,
    description: 'Schult Fachpersonal in Hyperbohrverfahren und vernetzt Forschungsteams.',
    effects: {
      research: 90,
      production: 0.03,
      culture: 6,
      structure: 'Akademie',
    },
  },
  {
    id: 'aegis_wall',
    name: 'Aegis-Wall',
    duration: 600,
    cost: 1250,
    description: 'Errichtet modulare Verteidigungsgürtel gegen Überfälle und Umweltgefahren.',
    effects: {
      defense: 12,
      logistics: 0.02,
      structure: 'Aegis-Wall',
    },
  },
];

export const DISPATCH_UNIT_PRESETS = [
  {
    id: 'unit-vanguard',
    name: 'Vanguard-Ingenieurkorps',
    type: 'engineering',
    readiness: 1,
    description: 'Spezialisiert auf Bergungsstützen und Evakuierungsrouten unter Tage.',
  },
  {
    id: 'unit-responder',
    name: 'Responder-Sanitätsstaffel',
    type: 'medical',
    readiness: 1,
    description: 'Mobile Klinik mit Stabilisierungseinheiten für Großschadenslagen.',
  },
  {
    id: 'unit-aerial',
    name: 'Aerial-Lift Falko',
    type: 'airlift',
    readiness: 0.9,
    description: 'Luftgestützte Transportplattform für schwer zugängliche Regionen.',
  },
  {
    id: 'unit-logistics',
    name: 'Atlas-Logistikstaffel',
    type: 'logistics',
    readiness: 1,
    description: 'Koordiniert Versorgungsketten und modulare Depots.',
  },
];

export const DISPATCH_MISSION_PRESETS = [
  {
    id: 'mission-collapse',
    name: 'Schachtkollaps Draupnir',
    location: 'Draupnir-Becken',
    severity: 'hoch',
    duration: 210,
    expiry: 360,
    requiredTypes: ['engineering', 'medical'],
    reward: { credits: 950, influence: 6 },
    description: 'Ein kollabierter Förderturm blockiert Rettungswege, schnelle Stabilisierung ist nötig.',
  },
  {
    id: 'mission-flood',
    name: 'Flut im Meridian-Hafen',
    location: 'Meridian-Küste',
    severity: 'mittel',
    duration: 180,
    expiry: 300,
    requiredTypes: ['logistics', 'engineering'],
    reward: { credits: 720, research: 55 },
    description: 'Sturmfront spült Lagerbestände fort – Wiederaufbau der Versorgungsbrücken erforderlich.',
  },
  {
    id: 'mission-outbreak',
    name: 'Chemische Reaktion',
    location: 'Aurora-Kaverne',
    severity: 'kritisch',
    duration: 260,
    expiry: 330,
    requiredTypes: ['medical', 'airlift'],
    reward: { credits: 840, influence: 8 },
    description: 'Unerwartete Gasentwicklung macht schnelle Evakuierungen notwendig.',
  },
  {
    id: 'mission-relief',
    name: 'Hilfskonvoi Valoris',
    location: 'Valoris-Hochebene',
    severity: 'niedrig',
    duration: 150,
    expiry: 420,
    requiredTypes: ['logistics'],
    reward: { credits: 540, research: 35, influence: 4 },
    description: 'Ein Versorgungskonvoi steckt fest, Hilfsgüter müssen verteilt werden.',
  },
];

const createInitialCommandState = () => ({
  provinces: PROVINCE_PRESETS.map((preset) => ({
    id: preset.id,
    name: preset.name,
    focus: preset.defaultFocus,
    population: preset.population,
    prosperity: preset.prosperity,
    defense: preset.defense,
    culture: preset.culture,
    productionBonus: preset.productionBonus || 0,
    logisticsBonus: preset.logisticsBonus || 0,
    marketBonus: preset.marketBonus || 0,
    summary: preset.summary,
    structures: [...(preset.structures || [])],
  })),
  queue: [],
  doctrine: 'Expansion',
  unlockedDoctrines: ['Expansion', 'Fortifikation', 'Handelsnetz'],
  supplyLines: [],
});

const createInitialDispatchState = () => ({
  units: DISPATCH_UNIT_PRESETS.map((preset) => ({
    id: preset.id,
    templateId: preset.id,
    name: preset.name,
    type: preset.type,
    readiness: preset.readiness ?? 1,
    status: 'ready',
    description: preset.description,
  })),
  missions: [],
  history: [],
});

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
  command: createInitialCommandState(),
  dispatch: createInitialDispatchState(),
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
    const baseState = INITIAL_STATE();
    if (account.state) {
      this.state = {
        ...baseState,
        ...account.state,
        resources: { ...baseState.resources, ...(account.state.resources || {}) },
        logistics: { ...baseState.logistics, ...(account.state.logistics || {}) },
        research: {
          ...baseState.research,
          ...(account.state.research || {}),
          bonuses: {
            ...baseState.research.bonuses,
            ...((account.state.research && account.state.research.bonuses) || {}),
          },
        },
      };
    } else {
      this.state = baseState;
    }
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
    this.ensureCommandState();
    this.ensureDispatchState();
    this.guildResources = this.initializeGuildResources();
    this.dispatchSpawnTimer = 0;
    if (this.state.dispatch.missions.length === 0) {
      this.spawnDispatchMission(true);
    }
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
        'Über Provinzen steuerst du wie in Age of Empires Fokus und Bauvorhaben für dein Territorium.',
        'Im Einsatzleitstand entsendest du wie bei Leitstellenspielen Rettungsteams zu dynamischen Missionen.',
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
    this.setupOperationsUI();
    this.setupDispatchUI();
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

  ensureCommandState() {
    const baseline = createInitialCommandState();
    if (!this.state.command) {
      this.state.command = baseline;
      return;
    }
    const provinces = Array.isArray(this.state.command.provinces) ? this.state.command.provinces : [];
    const normalizedProvinces = baseline.provinces.map((preset) => {
      const existing = provinces.find((province) => province.id === preset.id);
      const structures = Array.isArray(existing?.structures)
        ? existing.structures
        : [...(preset.structures || [])];
      return {
        ...preset,
        ...existing,
        id: preset.id,
        name: preset.name,
        focus: existing?.focus || preset.focus,
        population: typeof existing?.population === 'number' ? existing.population : preset.population,
        prosperity: typeof existing?.prosperity === 'number' ? existing.prosperity : preset.prosperity,
        defense: typeof existing?.defense === 'number' ? existing.defense : preset.defense,
        culture: typeof existing?.culture === 'number' ? existing.culture : preset.culture,
        productionBonus:
          typeof existing?.productionBonus === 'number' ? existing.productionBonus : preset.productionBonus,
        logisticsBonus:
          typeof existing?.logisticsBonus === 'number' ? existing.logisticsBonus : preset.logisticsBonus,
        marketBonus: typeof existing?.marketBonus === 'number' ? existing.marketBonus : preset.marketBonus,
        structures,
        summary: preset.summary,
      };
    });

    const queue = Array.isArray(this.state.command.queue)
      ? this.state.command.queue.filter((entry) => entry && entry.provinceId && entry.projectId)
      : [];

    this.state.command = {
      ...baseline,
      ...this.state.command,
      provinces: normalizedProvinces,
      queue,
      doctrine: this.state.command.doctrine || baseline.doctrine,
      unlockedDoctrines:
        Array.isArray(this.state.command.unlockedDoctrines) && this.state.command.unlockedDoctrines.length
          ? this.state.command.unlockedDoctrines
          : baseline.unlockedDoctrines,
      supplyLines: Array.isArray(this.state.command.supplyLines) ? this.state.command.supplyLines : [],
    };
  }

  ensureDispatchState() {
    const baseline = createInitialDispatchState();
    if (!this.state.dispatch) {
      this.state.dispatch = baseline;
      return;
    }

    const units = Array.isArray(this.state.dispatch.units) ? this.state.dispatch.units : [];
    const normalizedUnits = baseline.units.map((preset) => {
      const existing = units.find(
        (unit) => unit.templateId === preset.templateId || unit.id === preset.id || unit.templateId === preset.id
      );
      return {
        ...preset,
        ...existing,
        id: existing?.id || preset.id,
        templateId: preset.templateId,
        status: existing?.status || 'ready',
        readiness: typeof existing?.readiness === 'number' ? existing.readiness : preset.readiness,
        description: existing?.description || preset.description,
      };
    });

    const missions = Array.isArray(this.state.dispatch.missions)
      ? this.state.dispatch.missions.map((mission) => ({
          ...mission,
          status: mission?.status || 'pending',
          requiredTypes: Array.isArray(mission?.requiredTypes) ? mission.requiredTypes : [],
          assignedUnits: Array.isArray(mission?.assignedUnits) ? mission.assignedUnits : [],
          duration: typeof mission?.duration === 'number' ? mission.duration : mission?.remaining || 0,
          remaining: typeof mission?.remaining === 'number' ? mission.remaining : mission?.duration || 0,
          expiry: typeof mission?.expiry === 'number' ? mission.expiry : 360,
        }))
      : [];

    this.state.dispatch = {
      ...baseline,
      ...this.state.dispatch,
      units: normalizedUnits,
      missions,
      history: Array.isArray(this.state.dispatch.history) ? this.state.dispatch.history : [],
    };
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

  setupOperationsUI() {
    if (!this.hasDOM) return;
    const provinceList = document.getElementById('province-list');
    provinceList?.addEventListener('change', (event) => {
      const select = event.target.closest('[data-province-focus]');
      if (!select) return;
      const provinceId = select.dataset.provinceId;
      const focus = select.value;
      if (provinceId) {
        this.updateProvinceFocus(provinceId, focus);
      }
    });

    const doctrineSelect = document.getElementById('doctrine-select');
    doctrineSelect?.addEventListener('change', (event) => {
      const value = event.target.value;
      this.state.command.doctrine = value;
      this.toast.show(`Neue Doktrin aktiv: ${this.getDoctrineLabel(value)}.`);
      this.renderOperationsWindow();
      this.persistState();
    });

    const projectForm = document.getElementById('province-project-form');
    projectForm?.addEventListener('submit', (event) => this.submitProvinceProject(event));
  }

  setupDispatchUI() {
    if (!this.hasDOM) return;
    const missionList = document.getElementById('dispatch-mission-list');
    missionList?.addEventListener('click', (event) => {
      const startBtn = event.target.closest('[data-dispatch-start]');
      if (startBtn) {
        this.dispatchMission(startBtn.dataset.dispatchStart);
        return;
      }
      const abortBtn = event.target.closest('[data-dispatch-abort]');
      if (abortBtn) {
        this.abortMission(abortBtn.dataset.dispatchAbort);
      }
    });
  }

  getDoctrineLabel(key) {
    switch (key) {
      case 'Fortifikation':
        return 'Fortifikation';
      case 'Handelsnetz':
        return 'Handelsnetz';
      case 'Expansion':
      default:
        return 'Expansion';
    }
  }

  getDoctrineModifiers() {
    const doctrine = this.state.command?.doctrine || 'Expansion';
    if (doctrine === 'Fortifikation') {
      return { defense: 14, logistics: 0.01 };
    }
    if (doctrine === 'Handelsnetz') {
      return { market: 0.08, production: 0.02 };
    }
    return { production: 0.04, logistics: 0.02 };
  }

  getFocusLabel(focus) {
    switch (focus) {
      case 'produktion':
        return 'Produktion';
      case 'verteidigung':
        return 'Verteidigung';
      case 'handel':
        return 'Handel';
      case 'kultur':
        return 'Kultur';
      default:
        return 'Allgemein';
    }
  }

  updateProvinceFocus(provinceId, focus) {
    const province = this.state.command.provinces.find((entry) => entry.id === provinceId);
    if (!province || province.focus === focus) return;
    province.focus = focus;
    this.toast.show(`${province.name} richtet sich nun auf ${this.getFocusLabel(focus)} aus.`);
    this.renderOperationsWindow();
    this.persistState();
    this.render();
  }

  submitProvinceProject(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const provinceId = formData.get('province');
    const projectId = formData.get('project');
    const province = this.state.command.provinces.find((entry) => entry.id === provinceId);
    const project = PROVINCE_PROJECTS.find((entry) => entry.id === projectId);
    if (!province || !project) {
      this.toast.show('Bitte wähle eine gültige Provinz und ein Projekt.');
      return;
    }
    if (this.state.credits < project.cost) {
      this.toast.show('Es fehlen Credits für dieses Bauvorhaben.');
      return;
    }
    if (
      this.state.command.queue.some(
        (entry) => entry.provinceId === provinceId && entry.projectId === projectId && entry.remaining > 0
      )
    ) {
      this.toast.show('Dieses Projekt befindet sich bereits in der Warteschlange.');
      return;
    }
    const queueEntry = {
      id: generateId(),
      provinceId,
      projectId,
      remaining: project.duration,
      duration: project.duration,
    };
    this.state.command.queue.push(queueEntry);
    this.state.credits -= project.cost;
    this.toast.show(`${project.name} wurde für ${province.name} eingeplant.`);
    form.reset();
    this.render();
    this.persistState();
  }

  formatDuration(minutes) {
    const total = Math.max(0, Math.ceil(minutes));
    const hours = Math.floor(total / 60);
    const mins = total % 60;
    if (hours > 0) {
      return `${hours}h ${mins.toString().padStart(2, '0')}m`;
    }
    return `${mins}m`;
  }

  renderOperationsWindow() {
    if (!this.hasDOM) return;
    const provinceList = document.getElementById('province-list');
    if (provinceList) {
      provinceList.innerHTML = '';
      if (!this.state.command.provinces.length) {
        provinceList.innerHTML = '<p class="muted">Keine Provinzen unter Kontrolle.</p>';
      } else {
        this.state.command.provinces.forEach((province) => {
          const card = document.createElement('article');
          card.className = 'province-card';
          card.innerHTML = `
            <header>
              <h3>${province.name}</h3>
              <small>${province.summary}</small>
            </header>
            <dl>
              <div><dt>Einwohner</dt><dd>${Math.round(province.population).toLocaleString('de-DE')}</dd></div>
              <div><dt>Prosperität</dt><dd>${Math.round(province.prosperity)}%</dd></div>
              <div><dt>Verteidigung</dt><dd>${Math.round(province.defense)}%</dd></div>
              <div><dt>Kultur</dt><dd>${Math.round(province.culture)}%</dd></div>
            </dl>
            <label class="focus-select">
              Strategischer Fokus
              <select data-province-focus data-province-id="${province.id}">
                <option value="produktion" ${province.focus === 'produktion' ? 'selected' : ''}>Produktion</option>
                <option value="verteidigung" ${province.focus === 'verteidigung' ? 'selected' : ''}>Verteidigung</option>
                <option value="handel" ${province.focus === 'handel' ? 'selected' : ''}>Handel</option>
                <option value="kultur" ${province.focus === 'kultur' ? 'selected' : ''}>Kultur</option>
              </select>
            </label>
            <p class="province-structures"><strong>Strukturen:</strong> ${
              province.structures.length ? province.structures.join(', ') : 'Noch keine Projekte abgeschlossen.'
            }</p>
          `;
          provinceList.appendChild(card);
        });
      }
    }

    const provinceSelect = document.getElementById('province-select');
    if (provinceSelect) {
      const previous = provinceSelect.value;
      provinceSelect.innerHTML = this.state.command.provinces
        .map((province) => `<option value="${province.id}">${province.name}</option>`)
        .join('');
      if (previous) {
        provinceSelect.value = previous;
      }
      if (!provinceSelect.value && this.state.command.provinces.length) {
        provinceSelect.value = this.state.command.provinces[0].id;
      }
    }

    const projectSelect = document.getElementById('province-project-select');
    if (projectSelect) {
      const previousProject = projectSelect.value;
      projectSelect.innerHTML = PROVINCE_PROJECTS.map(
        (project) => `<option value="${project.id}">${project.name} — ${project.cost} cr</option>`
      ).join('');
      if (previousProject) {
        projectSelect.value = previousProject;
      }
      if (!projectSelect.value && PROVINCE_PROJECTS.length) {
        projectSelect.value = PROVINCE_PROJECTS[0].id;
      }
    }

    const doctrineSelect = document.getElementById('doctrine-select');
    if (doctrineSelect) {
      doctrineSelect.value = this.state.command.doctrine;
    }

    const queueList = document.getElementById('province-queue');
    if (queueList) {
      queueList.innerHTML = '';
      if (!this.state.command.queue.length) {
        queueList.innerHTML = '<li class="muted">Keine laufenden Projekte.</li>';
      } else {
        this.state.command.queue.forEach((entry) => {
          const project = PROVINCE_PROJECTS.find((item) => item.id === entry.projectId);
          const province = this.state.command.provinces.find((item) => item.id === entry.provinceId);
          if (!project || !province) return;
          const progress = entry.duration
            ? Math.min(100, Math.max(0, ((entry.duration - entry.remaining) / entry.duration) * 100))
            : 0;
          const li = document.createElement('li');
          li.className = 'queue-item';
          li.innerHTML = `
            <div>
              <strong>${project.name}</strong>
              <small>${province.name}</small>
              <p>${project.description}</p>
            </div>
            <div class="queue-progress">
              <div class="progress-bar"><span style="width:${progress.toFixed(1)}%"></span></div>
              <small>Noch ${this.formatDuration(entry.remaining)}</small>
            </div>
          `;
          queueList.appendChild(li);
        });
      }
    }
  }

  getUnitTypeLabel(type) {
    switch (type) {
      case 'engineering':
        return 'Ingenieur';
      case 'medical':
        return 'Medizin';
      case 'airlift':
        return 'Lufttransport';
      case 'logistics':
        return 'Logistik';
      default:
        return type;
    }
  }

  getMissionStatusLabel(mission) {
    if (mission.status === 'active') return 'Aktiv';
    if (mission.status === 'failed') return 'Fehlgeschlagen';
    if (mission.status === 'completed') return 'Erfolgreich';
    return 'Bereit';
  }

  renderDispatchWindow() {
    if (!this.hasDOM) return;
    const unitList = document.getElementById('dispatch-unit-list');
    if (unitList) {
      unitList.innerHTML = '';
      this.state.dispatch.units.forEach((unit) => {
        const card = document.createElement('article');
        card.className = `unit-card status-${unit.status}`;
        card.innerHTML = `
          <header>
            <h4>${unit.name}</h4>
            <span class="badge">${this.getUnitTypeLabel(unit.type)}</span>
          </header>
          <p>${unit.description}</p>
          <footer>${unit.status === 'busy' ? 'Im Einsatz' : 'Bereit'}</footer>
        `;
        unitList.appendChild(card);
      });
    }

    const missionList = document.getElementById('dispatch-mission-list');
    if (missionList) {
      missionList.innerHTML = '';
      if (!this.state.dispatch.missions.length) {
        missionList.innerHTML = '<li class="muted">Keine offenen Einsätze. Lehne dich nicht zu weit zurück!</li>';
      } else {
        this.state.dispatch.missions.forEach((mission) => {
          const required = mission.requiredTypes
            .map((type) => `<span class="badge badge-${type}">${this.getUnitTypeLabel(type)}</span>`)
            .join('');
          const li = document.createElement('li');
          li.className = `mission-card mission-${mission.status}`;
          li.innerHTML = `
            <div class="mission-head">
              <div>
                <h4>${mission.name}</h4>
                <small>${mission.location} • ${mission.severity.toUpperCase()}</small>
              </div>
              <span class="status">${this.getMissionStatusLabel(mission)}</span>
            </div>
            <p>${mission.description}</p>
            <div class="mission-meta">
              <div><strong>Benötigt:</strong> ${required || 'Flexibel'}</div>
              <div><strong>Belohnung:</strong> ${
                mission.reward?.credits ? `${mission.reward.credits} cr` : ''
              } ${mission.reward?.research ? `• ${mission.reward.research} RP` : ''} ${
            mission.reward?.influence ? `• ${mission.reward.influence} Einfluss` : ''
          }</div>
            </div>
          `;
          const footer = document.createElement('div');
          footer.className = 'mission-actions';
          if (mission.status === 'pending') {
            footer.innerHTML = `
              <span>Verfällt in ${this.formatDuration(mission.expiry)}</span>
              <button class="btn btn-secondary" data-dispatch-start="${mission.id}">Einsatz starten</button>
            `;
          } else if (mission.status === 'active') {
            footer.innerHTML = `
              <span>Restzeit ${this.formatDuration(mission.remaining)}</span>
              <button class="btn btn-outline" data-dispatch-abort="${mission.id}">Abbrechen</button>
            `;
          } else {
            footer.innerHTML = `<span>Abgeschlossen</span>`;
          }
          li.appendChild(footer);
          missionList.appendChild(li);
        });
      }
    }

    const historyList = document.getElementById('dispatch-history');
    if (historyList) {
      historyList.innerHTML = '';
      if (!this.state.dispatch.history.length) {
        historyList.innerHTML = '<li class="muted">Noch keine Einsätze abgeschlossen.</li>';
      } else {
        this.state.dispatch.history.slice(0, 8).forEach((entry) => {
          const li = document.createElement('li');
          li.className = entry.success ? 'history-success' : 'history-fail';
          const timeLabel = `Tag ${entry.day} • ${Math.floor(entry.minuteOfDay / 60)}:${Math.floor(entry.minuteOfDay % 60)
            .toString()
            .padStart(2, '0')} Uhr`;
          li.innerHTML = `
            <strong>${entry.name}</strong>
            <small>${timeLabel}</small>
            ${entry.success && entry.reward?.credits ? `<span>+${Math.round(entry.reward.credits)} cr</span>` : ''}
            ${entry.note ? `<p>${entry.note}</p>` : ''}
          `;
          historyList.appendChild(li);
        });
      }
    }
  }

  progressCommandQueue(minutes) {
    if (!this.state.command?.queue?.length) return;
    const completed = [];
    this.state.command.queue.forEach((entry) => {
      entry.remaining -= minutes;
      if (entry.remaining <= 0) {
        completed.push(entry);
      }
    });
    if (!completed.length) return;
    completed.forEach((entry) => this.applyProjectEffect(entry));
    this.state.command.queue = this.state.command.queue.filter((entry) => entry.remaining > 0);
  }

  applyProjectEffect(entry) {
    const project = PROVINCE_PROJECTS.find((item) => item.id === entry.projectId);
    const province = this.state.command.provinces.find((item) => item.id === entry.provinceId);
    if (!project || !province) return;
    const effects = project.effects || {};
    if (effects.production) {
      province.productionBonus = (province.productionBonus || 0) + effects.production;
    }
    if (effects.logistics) {
      province.logisticsBonus = (province.logisticsBonus || 0) + effects.logistics;
    }
    if (effects.market) {
      province.marketBonus = (province.marketBonus || 0) + effects.market;
    }
    if (effects.defense) {
      province.defense = Math.min(100, province.defense + effects.defense);
    }
    if (effects.prosperity) {
      province.prosperity = Math.min(100, province.prosperity + effects.prosperity);
    }
    if (effects.culture) {
      province.culture = Math.min(100, province.culture + effects.culture);
    }
    if (effects.research) {
      this.state.researchPoints += effects.research;
    }
    if (effects.credits) {
      this.state.credits += effects.credits;
    }
    if (effects.structure && !province.structures.includes(effects.structure)) {
      province.structures.push(effects.structure);
    }
    if (this.state.timeline) {
      this.state.timeline.unshift({
        id: entry.id,
        type: 'province_project',
        day: this.state.day,
        minuteOfDay: this.state.minuteOfDay,
        summary: `${project.name} in ${province.name} abgeschlossen.`,
      });
      this.state.timeline = this.state.timeline.slice(0, 50);
    }
    this.toast.show(`${project.name} in ${province.name} abgeschlossen.`);
    this.renderOperationsWindow();
  }

  getProvinceProductionBonus() {
    const provinces = this.state.command?.provinces || [];
    const focusBonus = provinces.reduce((sum, province) => {
      let bonus = province.productionBonus || 0;
      if (province.focus === 'produktion') bonus += 0.05;
      if (province.focus === 'kultur') bonus += 0.01;
      return sum + bonus;
    }, 0);
    const doctrine = this.getDoctrineModifiers();
    return focusBonus + (doctrine.production || 0);
  }

  getProvinceLogisticsBonus() {
    const provinces = this.state.command?.provinces || [];
    const focusBonus = provinces.reduce((sum, province) => {
      let bonus = province.logisticsBonus || 0;
      if (province.focus === 'handel') bonus += 0.04;
      if (province.focus === 'verteidigung') bonus += 0.01;
      return sum + bonus;
    }, 0);
    const doctrine = this.getDoctrineModifiers();
    return focusBonus + (doctrine.logistics || 0);
  }

  getProvinceMarketBonus() {
    const provinces = this.state.command?.provinces || [];
    const focusBonus = provinces.reduce((sum, province) => {
      let bonus = province.marketBonus || 0;
      if (province.focus === 'handel') bonus += 0.06;
      return sum + bonus;
    }, 0);
    const doctrine = this.getDoctrineModifiers();
    return focusBonus + (doctrine.market || 0);
  }

  calculateDefenseModifier() {
    const provinces = this.state.command?.provinces || [];
    if (!provinces.length) return 0;
    const averageDefense = provinces.reduce((sum, province) => sum + (province.defense || 0), 0) / provinces.length;
    const doctrine = this.getDoctrineModifiers();
    return Math.min(0.25, (averageDefense + (doctrine.defense || 0)) / 320);
  }

  tickDispatch(minutes) {
    if (!this.state.dispatch) return;
    this.dispatchSpawnTimer += minutes;
    if (this.dispatchSpawnTimer >= 75) {
      this.dispatchSpawnTimer = 0;
      this.spawnDispatchMission();
    }
    const missions = [...this.state.dispatch.missions];
    missions.forEach((mission) => {
      if (mission.status === 'active') {
        mission.remaining -= minutes;
        if (mission.remaining <= 0) {
          this.resolveMission(mission, true);
        }
      } else if (mission.status === 'pending') {
        mission.expiry -= minutes;
        if (mission.expiry <= 0) {
          this.resolveMission(mission, false, 'Mission verstrichen.');
        }
      }
    });
    if (this.state.dispatch.missions.length === 0) {
      this.spawnDispatchMission(true);
    }
  }

  spawnDispatchMission(force = false) {
    if (!this.state.dispatch) return;
    if (!force && this.state.dispatch.missions.length >= 4) return;
    const existingTemplates = new Set(this.state.dispatch.missions.map((mission) => mission.templateId));
    const candidates = DISPATCH_MISSION_PRESETS.filter((preset) => !existingTemplates.has(preset.id));
    const pool = candidates.length ? candidates : DISPATCH_MISSION_PRESETS;
    const template = pool[Math.floor(Math.random() * pool.length)];
    if (!template) return;
    const mission = {
      id: generateId(),
      templateId: template.id,
      name: template.name,
      location: template.location,
      severity: template.severity,
      duration: template.duration,
      remaining: template.duration,
      expiry: template.expiry,
      requiredTypes: [...template.requiredTypes],
      reward: { ...template.reward },
      description: template.description,
      status: 'pending',
      assignedUnits: [],
    };
    this.state.dispatch.missions.push(mission);
    if (!force) {
      this.toast.show(`Neue Einsatzlage: ${mission.name} (${mission.location}).`);
    }
    this.renderDispatchWindow();
  }

  selectUnitsForMission(requiredTypes) {
    const available = this.state.dispatch.units.filter((unit) => unit.status === 'ready');
    const selected = [];
    const used = new Set();
    requiredTypes.forEach((type) => {
      const unit = available.find((candidate) => candidate.type === type && !used.has(candidate.id));
      if (unit) {
        selected.push(unit);
        used.add(unit.id);
      }
    });
    if (selected.length !== requiredTypes.length) {
      return null;
    }
    return selected;
  }

  dispatchMission(missionId) {
    if (!missionId) return;
    const mission = this.state.dispatch.missions.find((entry) => entry.id === missionId);
    if (!mission || mission.status !== 'pending') return;
    const units = this.selectUnitsForMission(mission.requiredTypes);
    if (!units) {
      this.toast.show('Es stehen nicht genügend passende Einheiten bereit.');
      return;
    }
    mission.status = 'active';
    mission.remaining = mission.duration;
    mission.assignedUnits = units.map((unit) => unit.id);
    units.forEach((unit) => {
      unit.status = 'busy';
      unit.missionId = mission.id;
    });
    this.toast.show(`Einsatz gestartet: ${mission.name}.`);
    this.renderDispatchWindow();
    this.persistState();
  }

  abortMission(missionId) {
    if (!missionId) return;
    const mission = this.state.dispatch.missions.find((entry) => entry.id === missionId);
    if (!mission || mission.status !== 'active') return;
    this.resolveMission(mission, false, 'Manuell abgebrochen.');
  }

  releaseUnitsFromMission(missionId) {
    this.state.dispatch.units.forEach((unit) => {
      if (unit.missionId === missionId) {
        unit.status = 'ready';
        delete unit.missionId;
      }
    });
  }

  resolveMission(mission, success, reason) {
    this.releaseUnitsFromMission(mission.id);
    const reward = mission.reward || {};
    if (success) {
      const defenseModifier = 1 + this.calculateDefenseModifier();
      const credits = (reward.credits || 0) * defenseModifier;
      const research = reward.research || 0;
      const influence = reward.influence || 0;
      this.state.credits += credits;
      this.state.researchPoints += research;
      this.state.influence.supportGiven += influence;
      this.state.dispatch.history.unshift({
        id: mission.id,
        name: mission.name,
        success: true,
        reward: { credits, research, influence },
        day: this.state.day,
        minuteOfDay: this.state.minuteOfDay,
      });
      this.toast.show(`Mission erfolgreich: ${mission.name}. Belohnung gutgeschrieben.`);
    } else {
      this.state.influence.supportReceived += 4;
      this.state.dispatch.history.unshift({
        id: mission.id,
        name: mission.name,
        success: false,
        note: reason || 'Mission gescheitert.',
        day: this.state.day,
        minuteOfDay: this.state.minuteOfDay,
      });
      this.toast.show(reason || `Mission fehlgeschlagen: ${mission.name}.`);
    }
    this.state.dispatch.history = this.state.dispatch.history.slice(0, 20);
    this.state.dispatch.missions = this.state.dispatch.missions.filter((entry) => entry.id !== mission.id);
    this.renderDispatchWindow();
    this.persistState();
    this.render();
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
    this.progressCommandQueue(minutesToAdvance);
    this.tickDispatch(minutesToAdvance);
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
    const provinceProductionMultiplier = 1 + this.getProvinceProductionBonus();
    const storageBonus = 1 + (this.state.research.bonuses.storage || 0);
    const globalLogisticsBonus = (1 + (this.state.research.bonuses.logistics || 0)) * (1 + this.getProvinceLogisticsBonus());
    const minuteFactor = minutes / 60;
    const outputs = {};

    this.state.mines.forEach((mine) => {
      const resource = RESOURCE_DEFS[mine.resource];
      const baseRate = resource.baseRate * productionMultiplier * provinceProductionMultiplier;
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

    let remainingCapacity =
      this.state.logistics.capacity * globalLogisticsBonus * minuteFactor * this.getLogisticsMultiplier();

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
    modifier += this.getProvinceMarketBonus(resourceKey);
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
    this.renderOperationsWindow();
    this.renderDispatchWindow();
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
