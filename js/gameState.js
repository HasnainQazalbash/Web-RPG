// js/gameState.js - Central Game State
const GameState = {
    player: {
        level: 1,
        exp: 0,
        expToLevel: 100,
        stamina: 1000,
        maxStamina: 1000,
        gold: 1000000000,
        baseAttack: 10,
        petFood: 0
    },
    
    combat: {
        totalAttack: 10,
        critRate: 5,
        critDamage: 150
    },
    
    stamina: {
        refillInterval: 5,
        currentTimer: 5
    },

    mobs: [],
    pets: [...PET_TYPES],

    init() {
        // Initialize mobs with current HP and respawn status
        this.mobs = MOB_DATA.map(mob => ({
            ...mob,
            currentHP: mob.maxHP,
            pendingRespawn: false
        }));
    }
};