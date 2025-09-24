// js/utils.js - Utility Functions
const Utils = {
    formatNumber(num) {
        if (num >= 1000000000) return (num / 1000000000).toFixed(1) + 'B';
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return num.toString();
    },

    showDamagePopup(damage, isCrit, element) {
        const popup = document.createElement('div');
        popup.className = 'damage-popup';
        if (isCrit) popup.classList.add('crit-damage');
        popup.textContent = (isCrit ? 'CRIT! ' : '') + '-' + Utils.formatNumber(Math.floor(damage));
        
        const rect = element.getBoundingClientRect();
        popup.style.left = (rect.left + rect.width/2) + 'px';
        popup.style.top = rect.top + 'px';
        
        document.body.appendChild(popup);
        
        setTimeout(() => {
            document.body.removeChild(popup);
        }, 1000);
    },

    showLootNotification(exp, gold) {
        const notification = document.getElementById('lootNotification');
        notification.textContent = `+${Utils.formatNumber(exp)} EXP, +${Utils.formatNumber(gold)} Gold!`;
        notification.classList.add('show');
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, 2000);
    }
};