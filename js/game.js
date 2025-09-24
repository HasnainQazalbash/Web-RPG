// js/game.js - Main Game Controller
const Game = {
    init() {
        try {
            // Initialize game state first
            GameState.init();
            
            // Initialize UI system
            UI.init();
            
            // Calculate initial stats
            Combat.calculateStats();
            
            // Create initial content
            Mobs.create();
            Shop.create();
            
            // Update all UI elements
            UI.updateAll();
            UI.updateTimer();
            
            console.log("Game initialized successfully");
            
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
            
        } catch (error) {
            console.error("Game initialization failed:", error);
            alert("Game failed to load. Check console for details.");
        }
    }
};

// Make sure functions are globally accessible for onclick handlers
window.Combat = Combat;
window.Shop = Shop;
window.UI = UI;

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', () => {
    Game.init();
});