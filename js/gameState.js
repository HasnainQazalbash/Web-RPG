// js/gameState.js - Central Game State
const GameState = {
    player: {
        level: 1,
        exp: 0,
        expToLevel: 100,
        stamina: 50,
        maxStamina: 50,
        gold: 100,
        diamonds: 1000,
        petFood: 0,
        
        // Base stats
        baseAttack: 5,
        
        // Stat allocation
        availableStatPoints: 0,
        allocatedStats: {
            attack: 0,
            stamina: 0
        }
    },
    
    combat: {
        totalAttack: 250, // base 5 * 50 = 250
        bonusDamage: 0,
        critRate: 0,
        critDamage: 50
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
        
        // Initialize pets with new costs and bonuses
        this.pets = PET_TYPES.map(pet => ({
            ...pet,
            owned: false,
            level: 0
        }));
    }
};