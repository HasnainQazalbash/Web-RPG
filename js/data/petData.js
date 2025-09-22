// js/data/petData.js - Pet Type Definitions
const PET_TYPES = [
    { 
        name: "Phoenix", 
        emoji: "🔥", 
        type: "damage", 
        baseCost: 50, 
        description: "Increases damage by 25% per level",
        owned: false,
        level: 0,
        baseAttack: 5,
        bonusPerLevel: 25 // % damage bonus
    },
    { 
        name: "Griffin", 
        emoji: "⚡", 
        type: "crit_rate", 
        baseCost: 100, 
        description: "Increases crit rate by 3% per level",
        owned: false,
        level: 0,
        baseAttack: 8,
        bonusPerLevel: 3 // % crit rate
    },
    { 
        name: "Leviathan", 
        emoji: "🌊", 
        type: "crit_damage", 
        baseCost: 150, 
        description: "Increases crit damage by 20% per level",
        owned: false,
        level: 0,
        baseAttack: 12,
        bonusPerLevel: 20 // % crit damage
    }
];