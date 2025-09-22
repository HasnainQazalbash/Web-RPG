// js/player.js - Player Management
const Player = {
    levelUp() {
        while (GameState.player.exp >= GameState.player.expToLevel) {
            GameState.player.exp -= GameState.player.expToLevel;
            GameState.player.level++;
            GameState.player.expToLevel = Math.floor(GameState.player.expToLevel * 1.2);
            GameState.player.maxStamina += 5;
            GameState.player.stamina = GameState.player.maxStamina;
            GameState.player.baseAttack += 2;
        }
    },

    gainExp(amount) {
        GameState.player.exp += amount;
        this.levelUp();
    },

    gainGold(amount) {
        GameState.player.gold += amount;
    },

    spendStamina(amount) {
        if (GameState.player.stamina >= amount) {
            GameState.player.stamina -= amount;
            return true;
        }
        return false;
    },

    refillStamina() {
        GameState.player.stamina = Math.min(
            GameState.player.stamina + Math.floor(GameState.player.maxStamina * 1), 
            GameState.player.maxStamina
        );
    }
};