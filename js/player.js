// js/player.js - Player Management
const Player = {
    levelUp() {
        while (GameState.player.exp >= GameState.player.expToLevel) {
            GameState.player.exp -= GameState.player.expToLevel;
            GameState.player.level++;
            GameState.player.expToLevel = Math.floor(GameState.player.expToLevel * 1.2);
            
            // Give 5 stat points per level
            GameState.player.availableStatPoints += 5;
        }
    },

    gainExp(amount) {
        GameState.player.exp += amount;
        this.levelUp();
    },

    gainGold(amount) {
        GameState.player.gold += amount;
    },

    gainDiamonds(amount) {
        GameState.player.diamonds += amount;
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
    },

    // Stat allocation functions
    allocateStats(statType, amount) {
        if (GameState.player.availableStatPoints >= amount) {
            GameState.player.availableStatPoints -= amount;
            GameState.player.allocatedStats[statType] += amount;
            
            // Apply stat effects
            if (statType === 'stamina') {
                GameState.player.maxStamina += amount;
                GameState.player.stamina += amount; // Also increase current stamina
            }
            
            return true;
        }
        return false;
    },

    // Respec function
    respecStats() {
        const respecCost = 100; // diamonds
        if (GameState.player.diamonds >= respecCost) {
            GameState.player.diamonds -= respecCost;
            
            // Return all allocated points
            const totalAllocated = GameState.player.allocatedStats.attack + GameState.player.allocatedStats.stamina;
            GameState.player.availableStatPoints += totalAllocated;
            
            // Reset stamina based on removed points
            GameState.player.maxStamina -= GameState.player.allocatedStats.stamina;
            GameState.player.stamina = Math.min(GameState.player.stamina, GameState.player.maxStamina);
            
            // Reset allocated stats
            GameState.player.allocatedStats.attack = 0;
            GameState.player.allocatedStats.stamina = 0;
            
            return true;
        }
        return false;
    }
};

// Make Player globally accessible
window.Player = Player;