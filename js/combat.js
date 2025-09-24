// js/combat.js - Combat System
const Combat = {
    calculateStats() {
        let totalAttack = GameState.player.baseAttack;
        let damageMultiplier = 1; // Removed dragon bonus
        let critRate = 5;
        let critDamage = 150;

        // Add pet bonuses
        GameState.pets.forEach(pet => {
            if (pet.owned && pet.level > 0) {
                totalAttack += pet.baseAttack * pet.level;
                
                if (pet.type === "damage") {
                    damageMultiplier += (pet.bonusPerLevel * pet.level) / 100;
                } else if (pet.type === "crit_rate") {
                    critRate += pet.bonusPerLevel * pet.level;
                } else if (pet.type === "crit_damage") {
                    critDamage += pet.bonusPerLevel * pet.level;
                }
            }
        });

        GameState.combat.totalAttack = Math.floor(totalAttack * damageMultiplier);
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
        // Removed Dragon.gainExp(damage);
        
        Utils.showLootNotification(mob.expReward, mob.goldReward);

        // Respawn after 3 seconds
        setTimeout(() => {
            mob.currentHP = mob.maxHP;
            mob.pendingRespawn = false;
            UI.updateAll();
        }, 3000);
    }
};