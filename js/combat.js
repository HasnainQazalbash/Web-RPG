// js/combat.js - Combat System
const Combat = {
    calculateStats() {
        // Base attack calculation: base 5 + allocated points * 50
        let baseAttackDamage = (GameState.player.baseAttack + GameState.player.allocatedStats.attack) * 50;
        
        // Pet attack bonuses
        let petAttackBonus = 0;
        GameState.pets.forEach(pet => {
            if (pet.owned && pet.level > 0) {
                petAttackBonus += pet.baseAttack * pet.level;
            }
        });
        
        // Calculate bonus damage percentage from pets
        let bonusDamagePercent = 0;
        let critRate = 0;
        let critDamage = 50; // Base 50%
        
        GameState.pets.forEach(pet => {
            if (pet.owned && pet.level > 0) {
                if (pet.type === "damage") {
                    bonusDamagePercent += pet.bonusPerLevel * pet.level;
                } else if (pet.type === "crit_rate") {
                    critRate += pet.bonusPerLevel * pet.level;
                } else if (pet.type === "crit_damage") {
                    critDamage += pet.bonusPerLevel * pet.level;
                }
            }
        });

        // Final calculations
        let totalAttack = baseAttackDamage + petAttackBonus;
        totalAttack = Math.floor(totalAttack * (1 + bonusDamagePercent / 100));

        GameState.combat.totalAttack = totalAttack;
        GameState.combat.bonusDamage = bonusDamagePercent;
        GameState.combat.critRate = critRate;
        GameState.combat.critDamage = critDamage;
    },

    calculateDamage(baseAttack, staminaCost) {
        let baseDamage = baseAttack * staminaCost;
        let isCrit = Math.random() < (GameState.combat.critRate / 100);
        let finalDamage = isCrit ? baseDamage * (GameState.combat.critDamage / 100) : baseDamage;
        
        return { damage: finalDamage, isCrit };
    },

    attackMob(mobIndex, staminaCost) {
        const mob = GameState.mobs[mobIndex];
        
        if (!Player.spendStamina(staminaCost) || mob.pendingRespawn) {
            return;
        }

        const { damage, isCrit } = this.calculateDamage(GameState.combat.totalAttack, staminaCost);
        
        // Show damage popup
        const mobCard = document.getElementById("mobCard" + mobIndex);
        Utils.showDamagePopup(damage, isCrit, mobCard);

        // Apply damage
        if (mob.currentHP > 0) {
            mob.currentHP = Math.max(0, mob.currentHP - damage);

            // If mob dies
            if (mob.currentHP <= 0) {
                this.killMob(mobIndex, damage);
            }
        }

        UI.updateAll();
    },

    killMob(mobIndex, damage) {
        const mob = GameState.mobs[mobIndex];
        mob.currentHP = 0;
        mob.pendingRespawn = true;

        // Rewards
        Player.gainExp(mob.expReward);
        Player.gainGold(mob.goldReward);
        
        Utils.showLootNotification(mob.expReward, mob.goldReward);

        // Respawn after 3 seconds
        setTimeout(() => {
            mob.currentHP = mob.maxHP;
            mob.pendingRespawn = false;
            UI.updateAll();
        }, 3000);
    }
};

// Make Combat globally accessible
window.Combat = Combat;