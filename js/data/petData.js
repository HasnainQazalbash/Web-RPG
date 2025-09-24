// js/data/petData.js - Pet Type Definitions
const PET_TYPES = [
    { 
        name: "Phoenix", 
        emoji: "🔥", 
        type: "damage", 
        baseCost: 1000, // 20x from 50
        description: "Increases damage by 0.5% per level",
        owned: false,
        level: 0,
        baseAttack: 5,
        bonusPerLevel: 0.5 // % damage bonus
    },
    { 
        name: "Griffin", 
        emoji: "⚡", 
        type: "crit_rate", 
        baseCost: 2000, // 20x from 100
        description: "Increases crit rate by 0.2% per level",
        owned: false,
        level: 0,
        baseAttack: 8,
        bonusPerLevel: 0.2 // % crit rate
    },
    { 
        name: "Leviathan", 
        emoji: "🌊", 
        type: "crit_damage", 
        baseCost: 3000, // 20x from 150
        description: "Increases crit damage by 0.3% per level",
        owned: false,
        level: 0,
        baseAttack: 12,
        bonusPerLevel: 0.3 // % crit damage
    }
];