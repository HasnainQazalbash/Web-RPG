// js/dragon.js - Dragon Companion System
const Dragon = {
    gainExp(damage) {
        const dragonExpGain = Math.floor(damage / 1000);
        GameState.dragon.exp += dragonExpGain;
        this.levelUp();
    },

    levelUp() {
        while (GameState.dragon.exp >= GameState.dragon.expToLevel) {
            GameState.dragon.exp -= GameState.dragon.expToLevel;
            GameState.dragon.level++;
            GameState.dragon.bonus += 2;
            GameState.dragon.expToLevel = Math.floor(GameState.dragon.expToLevel * 1.3);
        }
    }
};
