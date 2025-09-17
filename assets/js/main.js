const STORAGE_KEYS = {
  accounts: 'stratasphere_accounts_v1',
  active: 'stratasphere_active_v1',
  session: 'stratasphere_session_v1',
};

const RESOURCE_DEFS = {
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

const RESEARCH_DEFS = [
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

const INITIAL_STATE = () => ({
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
});

const generateId = () => {
  if (crypto?.randomUUID) return crypto.randomUUID();
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
};

class RemoteGateway {
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
}

class AccountStore {
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

  saveAccounts(accounts) {
    this.storage.setItem(STORAGE_KEYS.accounts, JSON.stringify(accounts));
  }

  cacheAccount(account) {
    const accounts = this.loadAccounts();
    const index = accounts.findIndex((acc) => acc.username === account.username);
    const previous = index >= 0 ? accounts[index] : null;
    const stored = {
      ...(previous || {}),
      ...account,
    };
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
    return this.loadAccounts().find((acc) => acc.username === username) || null;
  }

  registerLocal({ username, password, company }) {
    const accounts = this.loadAccounts();
    if (accounts.some((acc) => acc.username === username)) {
      return { success: false, message: 'Benutzername bereits vergeben.' };
    }

    const account = {
      username,
      company,
      password: this.hash(password),
      state: INITIAL_STATE(),
      createdAt: new Date().toISOString(),
    };

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
        const cachedAccount = {
          ...result.account,
          password: this.hash(payload.password),
        };
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
    return { success: true, account };
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
        const cachedAccount = {
          ...account,
          password: this.hash(payload.password),
        };
        this.cacheAccount(cachedAccount);
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
    };
    window.clearTimeout(this.syncTimeout);
    this.syncTimeout = window.setTimeout(() => this.flush(), 600);
  }

  async flush() {
    if (!this.pendingSync || !this.remote || !this.session) return;
    const payload = {
      session: this.session,
      state: this.pendingSync.state,
    };
    try {
      await this.remote.saveState(payload);
      this.pendingSync = null;
    } catch (error) {
      console.warn('Konnte Spielstand nicht synchronisieren', error);
    }
  }

  updateAccount(account) {
    this.scheduleSync(account);
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
          const mergedAccount = {
            ...result.account,
            password: cached?.password,
          };
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

class Toast {
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

class GameEngine {
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
  }

  init() {
    this.setupUI();
    this.setupMap();
    this.restoreMines();
    this.render();
    this.startLoop();
  }

  setupUI() {
    document.getElementById('player-company').textContent = `${this.account.company} — ${this.account.username}`;
    this.bindWindowControls();
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
  }

  bindWindowControls() {
    document.querySelectorAll('.ui-window').forEach((windowEl) => {
      const header = windowEl.querySelector('.window-header');
      const body = windowEl.querySelector('.window-body');
      const toggle = windowEl.querySelector('.window-minimize');
      if (toggle && body) {
        toggle.addEventListener('click', () => {
          body.classList.toggle('minimized');
        });
      }

      let isDragging = false;
      let offsetX = 0;
      let offsetY = 0;

      const onMouseMove = (event) => {
        if (!isDragging) return;
        windowEl.style.left = `${event.clientX - offsetX}px`;
        windowEl.style.top = `${event.clientY - offsetY}px`;
      };

      header.addEventListener('mousedown', (event) => {
        if (window.innerWidth < 1024) return;
        isDragging = true;
        const rect = windowEl.getBoundingClientRect();
        offsetX = event.clientX - rect.left;
        offsetY = event.clientY - rect.top;
        window.addEventListener('mousemove', onMouseMove);
      });

      window.addEventListener('mouseup', () => {
        isDragging = false;
        window.removeEventListener('mousemove', onMouseMove);
      });
    });
  }

  setupMap() {
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
  }

  advanceTime(minutes) {
    this.state.minuteOfDay += minutes;
    while (this.state.minuteOfDay >= 1440) {
      this.state.minuteOfDay -= 1440;
      this.state.day += 1;
      this.toast.show(`Neuer Tag ${this.state.day}! Deine Crews sind motiviert.`);
      this.account.state = this.state;
      this.accountStore.updateAccount(this.account);
    }
  }

  dayPhaseMultiplier() {
    const cycle = this.state.minuteOfDay / 1440;
    const dayMultiplier = 0.65 + Math.sin(cycle * Math.PI * 2) * 0.35;
    const stabilityBonus = this.state.research.bonuses.stability || 0;
    const adjusted = dayMultiplier + stabilityBonus * 0.2;
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
      const output =
        baseRate *
        workforceEfficiency *
        levelBonus *
        localLogisticsBonus *
        dayMultiplier *
        minuteFactor;
      mine.storage += output;
      const capacity = (mine.baseStorage || 320) * storageBonus;
      if (mine.storage > capacity) {
        mine.storage = capacity;
      }
      outputs[mine.resource] = (outputs[mine.resource] || 0) + output;
    });

    let remainingCapacity = this.state.logistics.capacity * globalLogisticsBonus * minuteFactor;
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

  generateResearch(minutes) {
    const gain = minutes * 0.8;
    this.state.researchPoints += gain;
  }

  render() {
    this.updateStatusPanel();
    this.renderMineList();
    this.updateTradePrice(document.getElementById('trade-resource').value);
    this.updateLogistics();
    this.renderResearch();
    this.account.state = this.state;
    this.accountStore.updateAccount(this.account);
  }

  updateStatusPanel() {
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
    }
    this.render();
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
    priceElement.textContent = `${price.toFixed(2)} cr/t`;
    return price;
  }

  handleTrade() {
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
      this.state.logistics.capacity * (1 + (this.state.research.bonuses.logistics || 0))
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
  }

  renderResearch() {
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
  }

  updateLogistics() {
    const element = document.getElementById('logistics-capacity');
    const effective = this.state.logistics.capacity * (1 + (this.state.research.bonuses.logistics || 0));
    element.textContent = `${effective.toFixed(0)}`;
  }

  openMineModal(latlng) {
    this.pendingLocation = latlng;
    const modal = document.getElementById('mine-modal');
    const locationText = `${latlng.lat.toFixed(2)}°, ${latlng.lng.toFixed(2)}°`;
    document.getElementById('mine-location').textContent = locationText;
    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');
  }

  toggleMineModal(show) {
    const modal = document.getElementById('mine-modal');
    modal.classList.toggle('show', show);
    modal.setAttribute('aria-hidden', show ? 'false' : 'true');
    if (!show) {
      document.getElementById('mine-form').reset();
      this.pendingLocation = null;
    }
  }

  createMine(event) {
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

  async saveState() {
    this.account.state = this.state;
    this.accountStore.updateAccount(this.account);
    await this.accountStore.flush();
    this.toast.show('Spielstand gespeichert.');
  }
}

class App {
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
    const tabs = document.querySelectorAll('.tab-button');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    const openModal = (defaultTab = 'login-form') => {
      modal.classList.add('show');
      modal.setAttribute('aria-hidden', 'false');
      this.switchTab(defaultTab);
    };

    const close = () => {
      modal.classList.remove('show');
      modal.setAttribute('aria-hidden', 'true');
      loginForm.reset();
      registerForm.reset();
      document.querySelector('[data-role="login"]').textContent = '';
      document.querySelector('[data-role="register"]').textContent = '';
    };

    openLogin.addEventListener('click', () => openModal('login-form'));
    openRegister.addEventListener('click', () => openModal('register-form'));
    document.getElementById('open-game').addEventListener('click', () => openModal('login-form'));
    closeModal.addEventListener('click', close);
    modal.addEventListener('click', (event) => {
      if (event.target === modal) close();
    });

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        this.switchTab(tab.dataset.target);
      });
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
      }
    });
  }

  switchTab(targetId) {
    document.querySelectorAll('.tab-button').forEach((tab) => {
      tab.classList.toggle('active', tab.dataset.target === targetId);
    });
    document.querySelectorAll('.auth-form').forEach((form) => {
      form.classList.toggle('active', form.id === targetId);
    });
  }

  setupGameControls() {
    document.getElementById('save-game').addEventListener('click', async () => {
      await this.game?.saveState();
    });
    document.getElementById('logout').addEventListener('click', () => this.logout());
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
    this.game.init();
  }

  async logout() {
    await this.accountStore.logout();
    this.game?.stopLoop();
    this.game = null;
    document.getElementById('game').classList.add('hidden');
    document.getElementById('app').classList.remove('hidden');
    document.getElementById('player-company').textContent = '';
    this.toast.show('Erfolgreich abgemeldet.');
  }
}

window.addEventListener('DOMContentLoaded', () => {
  new App();
});
