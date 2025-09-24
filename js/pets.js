// js/pets.js - Pet System
const Pets = {
    buy(petIndex) {
        const pet = GameState.pets[petIndex];
        if (GameState.player.gold >= pet.baseCost && !pet.owned) {
            GameState.player.gold -= pet.baseCost;
            pet.owned = true;
            pet.level = 1;
            Combat.calculateStats();
            return true;
        }
        return false;
    },

    feed(petIndex) {
        const pet = GameState.pets[petIndex];
        const feedCost = Math.max(1, Math.floor(GameState.player.petFood / 10)) || 1;
        
        if (GameState.player.petFood >= feedCost) {
            GameState.player.petFood -= feedCost;
            pet.level++;
            Combat.calculateStats();
            return true;
        }
        return false;
    },

    buyFood() {
        if (GameState.player.gold >= 50) {
            GameState.player.gold -= 50;
            GameState.player.petFood += 1;
            return true;
        }
        return false;
    },

    // Global function for onclick handlers
    feedPet(petIndex) {
        if (this.feed(petIndex)) {
            UI.updateAll();
        }
    }
};

// Make Pets functions globally accessible
window.Pets = Pets;