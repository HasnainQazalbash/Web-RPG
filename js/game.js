// js/game.js - Main Game Controller
const Game = {
    init() {
        GameState.init();
        Combat.calculateStats();
        Mobs.create();
        Shop.create();
        UI.updateAll();
        UI.updateTimer();
        
        // Start stamina regeneration timer
        setInterval(() => {
            GameState.stamina.currentTimer--;
            if (GameState.stamina.currentTimer <= 0) {
                Player.refillStamina();
                GameState.stamina.currentTimer = GameState.stamina.refillInterval;
                UI.updateAll();
            }
            UI.updateTimer();
        }, 1000);
    }
};

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', () => {
    Game.init();
});