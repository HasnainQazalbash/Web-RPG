// js/ui.js - UI Management
const UI = {
    showSection(sectionName) {
        // Hide all sections
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
        
        // Remove active class from all buttons
        document.querySelectorAll('.menu button').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Show selected section
        document.getElementById(sectionName).classList.add('active');
        document.getElementById(sectionName + 'Btn').classList.add('active');
    },

    updateStats() {
        const player = GameState.player;
        const combat = GameState.combat;
        const dragon = GameState.dragon;
        
        document.getElementById("level").innerText = player.level;
        document.getElementById("exp").innerText = Utils.formatNumber(player.exp);
        document.getElementById("expToLevel").innerText = Utils.formatNumber(player.expToLevel);
        document.getElementById("attack").innerText = combat.totalAttack;
        document.getElementById("critRate").innerText = combat.critRate;
        document.getElementById("critDamage").innerText = combat.critDamage;
        document.getElementById("stamina").innerText = player.stamina;
        document.getElementById("maxStamina").innerText = player.maxStamina;
        document.getElementById("gold").innerText = Utils.formatNumber(player.gold);
        document.getElementById("dragonLevel").innerText = dragon.level;
        document.getElementById("dragonExp").innerText = dragon.exp;
        document.getElementById("dragonExpToLevel").innerText = dragon.expToLevel;
        document.getElementById("dragonBonus").innerText = dragon.bonus;

        // Update progress bars
        document.getElementById("expBar").style.width = (player.exp / player.expToLevel * 100) + "%";
        document.getElementById("staminaBar").style.width = (player.stamina / player.maxStamina * 100) + "%";
        document.getElementById("dragonExpBar").style.width = (dragon.exp / dragon.expToLevel * 100) + "%";
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
    }
};

// Make feedPet globally accessible for onclick handlers
window.Pets = {
    ...Pets,
    feedPet: (index) => UI.feedPet(index)
};