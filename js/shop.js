// js/shop.js - Shop System
const Shop = {
    create() {
        const shopItems = document.getElementById("shopItems");
        shopItems.innerHTML = "";

        // Pet Food
        const petFoodItem = document.createElement("div");
        petFoodItem.className = "shop-item";
        petFoodItem.innerHTML = `
            <div>
                <h4>🍖 Pet Food</h4>
                <p>Feed your pets to level them up</p>
                <p>Owned: ${GameState.player.petFood}</p>
            </div>
            <button onclick="Shop.buyPetFood()">Buy (50 Gold)</button>
        `;
        shopItems.appendChild(petFoodItem);

        // Pets
        GameState.pets.forEach((pet, index) => {
            const petItem = document.createElement("div");
            petItem.className = "shop-item";
            const cost = pet.owned ? "OWNED" : `${pet.baseCost} Gold`;
            petItem.innerHTML = `
                <div>
                    <h4>${pet.emoji} ${pet.name}</h4>
                    <p>${pet.description}</p>
                    <p>Base Attack: +${pet.baseAttack} per level</p>
                </div>
                <button ${pet.owned ? 'disabled' : ''} onclick="Shop.buyPet(${index})">${cost}</button>
            `;
            shopItems.appendChild(petItem);
        });
    },

    buyPetFood() {
        if (Pets.buyFood()) {
            UI.updateAll();
        }
    },

    buyPet(index) {
        if (Pets.buy(index)) {
            UI.updateAll();
        }
    }
};