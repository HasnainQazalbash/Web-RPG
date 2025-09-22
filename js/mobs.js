// js/mobs.js - Mob Management
const Mobs = {
    create() {
        const mobsList = document.getElementById("mobsList");
        mobsList.innerHTML = "";
        
        GameState.mobs.forEach((mob, index) => {
            const card = document.createElement("div");
            card.classList.add("mobCard");
            card.id = "mobCard" + index;
            
            if (mob.pendingRespawn) {
                card.classList.add("respawning");
            }
            
            card.innerHTML = `
                <h3>${mob.name} (Level ${mob.levelReq}+)</h3>
                <p>HP: <span id="mobHP${index}">${Utils.formatNumber(mob.currentHP)}</span> / ${Utils.formatNumber(mob.maxHP)}</p>
                <div class="hp-bar" id="hpBar${index}" style="width:${(mob.currentHP/mob.maxHP)*100}%"></div>
                <p>Rewards: ${Utils.formatNumber(mob.expReward)} EXP, ${Utils.formatNumber(mob.goldReward)} Gold</p>
                <div class="mobActions">
                    <button data-cost="1" onclick="Combat.attackMob(${index},1)">Quick Strike (-1 Stamina)</button>
                    <button data-cost="10" onclick="Combat.attackMob(${index},10)">Power Attack (-10 Stamina)</button>
                    <button data-cost="50" onclick="Combat.attackMob(${index},50)">Devastating Blow (-50 Stamina)</button>
                </div>
            `;
            mobsList.appendChild(card);
        });
        
        this.updateAccess();
    },

    updateAccess() {
        GameState.mobs.forEach((mob, index) => {
            const card = document.getElementById("mobCard" + index);
            if (card) {
                const buttons = card.querySelectorAll(".mobActions button");

                buttons.forEach(btn => {
                    const cost = parseInt(btn.getAttribute("data-cost"));
                    btn.disabled = GameState.player.level < mob.levelReq || 
                                  GameState.player.stamina < cost || 
                                  mob.pendingRespawn;
                });

                if (GameState.player.level >= mob.levelReq && !mob.pendingRespawn) {
                    card.classList.remove("locked");
                } else {
                    card.classList.add("locked");
                }

                if (mob.pendingRespawn) {
                    card.classList.add("respawning");
                } else {
                    card.classList.remove("respawning");
                }
            }
        });
    }
};
