import { test } from 'node:test';
import assert from 'node:assert/strict';
import { GameEngine, INITIAL_STATE, RESEARCH_DEFS } from '../assets/js/main.js';

const createState = (overrides = {}) => {
  const state = INITIAL_STATE();
  if (overrides.credits !== undefined) state.credits = overrides.credits;
  if (overrides.researchPoints !== undefined) state.researchPoints = overrides.researchPoints;
  if (overrides.day !== undefined) state.day = overrides.day;
  if (overrides.minuteOfDay !== undefined) state.minuteOfDay = overrides.minuteOfDay;
  if (overrides.resources) {
    state.resources = { ...state.resources, ...overrides.resources };
  }
  if (overrides.mines) state.mines = overrides.mines;
  if (overrides.logistics) {
    state.logistics = { ...state.logistics, ...overrides.logistics };
  }
  if (overrides.research) {
    state.research = {
      unlocked: overrides.research.unlocked ?? state.research.unlocked,
      bonuses: { ...state.research.bonuses, ...(overrides.research.bonuses || {}) },
    };
  }
  if (overrides.timeline) state.timeline = overrides.timeline;
  return state;
};

const createGame = ({ stateOverrides = {}, multiplayer } = {}) => {
  const state = createState(stateOverrides);
  const account = {
    username: 'miner',
    company: 'Nova Terra',
    state,
    multiplayer: multiplayer || { guild: null, world: { topGuilds: [], events: [] } },
  };
  const updates = [];
  const accountStore = {
    updateAccount: (acc) => updates.push(acc),
    remote: null,
    session: null,
  };
  const toastMessages = [];
  const toast = { show: (message) => toastMessages.push(message) };
  const game = new GameEngine(account, accountStore, toast);
  game.render = () => {};
  return { game, updates, toastMessages };
};

test('advanceTime rolls over to a new day and notifies the account store', () => {
  const { game, updates, toastMessages } = createGame({
    stateOverrides: { minuteOfDay: 1430, day: 1 },
  });
  game.advanceTime(20);
  assert.strictEqual(game.state.day, 2);
  assert.ok(game.state.minuteOfDay < 60);
  assert.strictEqual(updates.length, 1);
  assert.strictEqual(updates[0], game.account);
  assert.ok(toastMessages.at(-1)?.includes('Neuer Tag'));
});

test('dayPhaseMultiplier honors research stability and night ops technology', () => {
  const multiplayer = {
    guild: { technologies: [{ techId: 'night_ops' }] },
    world: { topGuilds: [], events: [] },
  };
  const { game } = createGame({
    stateOverrides: { minuteOfDay: 0, research: { bonuses: { stability: 0.5 } } },
    multiplayer,
  });
  assert.strictEqual(game.dayPhaseMultiplier(), 0.8);
});

test('produceResources converts mine output into global resources', () => {
  const mine = {
    id: 'mine-1',
    name: 'Aurora',
    resource: 'iron',
    workers: 60,
    level: 1,
    logisticsLevel: 1,
    storage: 0,
    baseStorage: 320,
    location: { lat: 10, lng: 10 },
  };
  const { game } = createGame({
    stateOverrides: {
      mines: [mine],
      logistics: { capacity: 1000 },
      resources: { iron: 0 },
    },
  });
  game.produceResources(60);
  assert.ok(game.state.resources.iron > 0);
  assert.ok(game.resourcesPerMinute.iron > 0);
  assert.ok(mine.storage <= mine.baseStorage);
});

test('generateResearch accumulates research points over time', () => {
  const { game } = createGame({ stateOverrides: { researchPoints: 100 } });
  game.generateResearch(30);
  assert.strictEqual(game.state.researchPoints, 124);
});

test('unlockResearch spends points, applies bonuses and records the unlock', () => {
  const research = RESEARCH_DEFS.find((item) => item.id === 'automation');
  const { game, toastMessages } = createGame({
    stateOverrides: {
      researchPoints: research.cost + 10,
      research: { unlocked: [], bonuses: { production: 0 } },
    },
  });
  game.unlockResearch(research);
  assert.ok(game.state.research.unlocked.includes(research.id));
  assert.strictEqual(game.state.researchPoints, 10);
  assert.strictEqual(game.state.research.bonuses.production, research.bonusValue);
  assert.ok(toastMessages.some((msg) => msg.includes('freigeschaltet')));
});

test('getGuildProductionModifier stacks zone bonuses, technologies and events', () => {
  const polygon = [
    [55, -5],
    [55, 5],
    [65, 5],
    [65, -5],
  ];
  const multiplayer = {
    guild: {
      zones: [{ polygon, resourceBonus: 0.2 }],
      technologies: [{ techId: 'synergy_drills' }],
    },
    world: {
      topGuilds: [],
      events: [
        {
          title: 'Polar Boost',
          effect: { type: 'regionalBoost', region: 'Nordischer Gürtel', value: 0.15 },
        },
      ],
    },
  };
  const { game } = createGame({ multiplayer });
  const mine = { resource: 'iron', location: { lat: 60, lng: 0 } };
  const modifier = game.getGuildProductionModifier(mine);
  assert.ok(Math.abs(modifier - 1.43) < 1e-6);
});

test('getMarketMultiplier combines global tech and event modifiers', () => {
  const multiplayer = {
    guild: { technologies: [{ techId: 'global_market' }] },
    world: {
      topGuilds: [],
      events: [
        {
          title: 'Iron Surge',
          effect: { type: 'marketTrend', resource: ['iron'], value: 0.2 },
        },
      ],
    },
  };
  const { game } = createGame({ multiplayer });
  const multiplier = game.getMarketMultiplier('iron');
  assert.ok(Math.abs(multiplier - 1.3) < 1e-6);
});

test('getLogisticsMultiplier reflects unlocked technologies', () => {
  const multiplayer = {
    guild: { technologies: [{ techId: 'global_market' }] },
    world: { topGuilds: [], events: [] },
  };
  const { game } = createGame({ multiplayer });
  assert.strictEqual(game.getLogisticsMultiplier(), 1.1);
});
