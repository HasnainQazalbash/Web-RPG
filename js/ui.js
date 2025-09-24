// js/ui.js - UI Management
const UI = {
    // Menu configuration - easy to reorder
    menuItems: [
        { id: 'battle', icon: '⚔️', name: 'Battle' },
        { id: 'shop', icon: '🛒', name: 'Shop' },
        { id: 'pets', icon: '🐾', name: 'Pets' },
        { id: 'stats', icon: '📈', name: 'Stats' },
        { id: 'equipment', icon: '⚖️', name: 'Equipment' },
        { id: 'achievements', icon: '🏆', name: 'Achievements' },
        { id: 'collections', icon: '📚', name: 'Collections' },
        { id: 'leaderboard', icon: '🥇', name: 'Leaderboard' },
        { id: 'blacksmith', icon: '⚒️', name: 'Blacksmith' }
    ],

    init() {
        this.initHamburgerMenu();
        this.initEventListeners();
    },

    initHamburgerMenu() {
        const hamburgerBtn = document.getElementById('hamburgerBtn');
        const menuOverlay = document.getElementById('menuOverlay');
        const closeMenuBtn = document.getElementById('closeMenuBtn');
        const menuItems = document.querySelectorAll('.menu-item');

        // Open menu
        hamburgerBtn.addEventListener('click', () => {
            menuOverlay.classList.add('active');
        });

        // Close menu
        closeMenuBtn.addEventListener('click', () => {
            menuOverlay.classList.remove('active');
        });

        // Close menu when clicking overlay
        menuOverlay.addEventListener('click', (e) => {
            if (e.target === menuOverlay) {
                menuOverlay.classList.remove('active');
            }
        });

        // Menu item clicks
        menuItems.forEach(item => {
            item.addEventListener('click', () => {
                const section = item.getAttribute('data-section');
                this.showSection(section);
                menuOverlay.classList.remove('active');
            });
        });

        // Close menu with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && menuOverlay.classList.contains('active')) {
                menuOverlay.classList.remove('active');
            }
        });
    },

    initEventListeners() {
        // Add any additional event listeners here
        this.initTabSwitching();
    },

    initTabSwitching() {
        // Handle tab switching in Collections and Leaderboard
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const parent = e.target.closest('.collection-tabs, .leaderboard-tabs');
                if (parent) {
                    parent.querySelectorAll('.tab-btn').forEach(tab => tab.classList.remove('active'));
                    e.target.classList.add('active');
                    
                    // Here you would add logic to switch tab content
                    // For now, it's just visual
                }
            });
        });
    },

    showSection(sectionName) {
        // Hide all sections
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
        
        // Remove active class from all menu items
        document.querySelectorAll('.menu-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Show selected section
        const targetSection = document.getElementById(sectionName);
        const targetMenuItem = document.querySelector(`[data-section="${sectionName}"]`);
        
        if (targetSection) {
            targetSection.classList.add('active');
        }
        
        if (targetMenuItem) {
            targetMenuItem.classList.add('active');
        }

        // Special handling for different sections
        this.handleSectionSwitch(sectionName);
    },

    handleSectionSwitch(sectionName) {
        switch(sectionName) {
            case 'battle':
                // Update battle-specific content
                break;
            case 'shop':
                Shop.create();
                break;
            case 'pets':
                this.updatePets();
                break;
            case 'stats':
                this.updateStatsPage();
                break;
            case 'equipment':
                // Update equipment page
                break;
            case 'achievements':
                this.updateAchievements();
                break;
            case 'collections':
                this.updateCollections();
                break;
            case 'leaderboard':
                this.updateLeaderboard();
                break;
            case 'blacksmith':
                // Update blacksmith page
                break;
        }
    },

    updateStats() {
        const player = GameState.player;
        const combat = GameState.combat;
        
        document.getElementById("level").innerText = player.level;
        document.getElementById("exp").innerText = Utils.formatNumber(player.exp);
        document.getElementById("expToLevel").innerText = Utils.formatNumber(player.expToLevel);
        document.getElementById("attack").innerText = combat.totalAttack;
        document.getElementById("critRate").innerText = combat.critRate;
        document.getElementById("critDamage").innerText = combat.critDamage;
        document.getElementById("stamina").innerText = player.stamina;
        document.getElementById("maxStamina").innerText = player.maxStamina;
        document.getElementById("gold").innerText = Utils.formatNumber(player.gold);

        // Update progress bars
        document.getElementById("expBar").style.width = (player.exp / player.expToLevel * 100) + "%";
        document.getElementById("staminaBar").style.width = (player.stamina / player.maxStamina * 100) + "%";
    },

    updateMobs() {
        GameState.mobs.forEach((mob, index) => {
            const hpElement = document.getElementById("mobHP" + index);
            const hpBarElement = document.getElementById("hpBar" + index);
            
            if (hpElement && hpBarElement) {
                hpElement.innerText = Utils.formatNumber(mob.currentHP);
                const hpPercent = (mob.currentHP / mob.maxHP) * 100;
                hpBarElement.style.width = hpPercent + "%";
            }
        });
        
        Mobs.updateAccess();
    },

    updatePets() {
        const petsList = document.getElementById("petsList");
        petsList.innerHTML = "";

        GameState.pets.forEach((pet, index) => {
            if (pet.owned) {
                const petCard = document.createElement("div");
                petCard.className = "pet-card owned";
                const feedCost = Math.max(1, Math.floor(GameState.player.petFood / 10));
                petCard.innerHTML = `
                    <h3>${pet.emoji} ${pet.name}</h3>
                    <p>Level: ${pet.level}</p>
                    <p>Attack Bonus: +${pet.baseAttack * pet.level}</p>
                    <p>Special: ${pet.bonusPerLevel * pet.level}% ${pet.type.replace('_', ' ')}</p>
                    <button ${GameState.player.petFood < feedCost ? 'disabled' : ''} onclick="Pets.feedPet(${index})">
                        Feed (${feedCost} Pet Food)
                    </button>
                `;
                petsList.appendChild(petCard);
            }
        });

        if (petsList.innerHTML === "") {
            petsList.innerHTML = "<p>No pets owned yet. Visit the shop to buy some!</p>";
        }
    },

    updateTimer() {
        const timer = GameState.stamina.currentTimer;
        let minutes = Math.floor(timer / 60);
        let seconds = timer % 60;
        document.getElementById("staminaTimer").innerText =
            minutes.toString().padStart(2,"0") + ":" +
            seconds.toString().padStart(2,"0");
    },

    updateStatsPage() {
        // Update the stats page with actual game data
        // This is placeholder - you can expand with real stats tracking
    },

    updateAchievements() {
        // Update achievements based on player progress
        // Placeholder for now
    },

    updateCollections() {
        // Update collections based on discovered monsters/items
        // Placeholder for now
    },

    updateLeaderboard() {
        // Update leaderboard data
        // Placeholder for now
    },

    updateAll() {
        Combat.calculateStats();
        this.updateStats();
        this.updateMobs();
        this.updatePets();
        Shop.create();
    },

    // Global functions for onclick handlers
    feedPet(index) {
        if (Pets.feed(index)) {
            this.updateAll();
        }
    },

    // Make allocation functions globally accessible
    allocateStatPoints(statType, amount) {
        if (Player.allocateStats(statType, amount)) {
            this.updateAll();
        }
    },

    respecStats() {
        if (Player.respecStats()) {
            this.updateAll();
        }
    }
};

// Make functions globally accessible for onclick handlers
window.UI = UI;
window.Pets = {
    feedPet: (index) => UI.feedPet(index)
};