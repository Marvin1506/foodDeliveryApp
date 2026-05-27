let pizza = [
    {
        'food': 'Pizza Margherita',
        'ingridients': 'Mit Mozarella',
        'price': '9.00€',
        'amount': 0,
        'sumPrice': [],
    },

    {
        'food': 'Pizza Tonno',
        'ingridients': 'Mit Thunfisch und Mozarella',
        'price': '10.00€',
        'amount': 0,
        'sumPrice': [],
    },

    {
        'food': 'Pizza Diavolo',
        'ingridients': 'Mit Peperoni Mozarella',
        'price': '9.50€',
        'amount': 0,
        'sumPrice': [],
    },

];

let nudeln = [
    {
        'food': 'Spaghetti Bolognese',
        'ingridients': 'Mit Tomatensoße, Hackfleisch und Parmesan',
        'price': '8.00€',
        'amount': 0,
        'sumPrice': [],
    },

    {
        'food': 'Spaghetti Polo Loco',
        'ingridients': 'Mit Hähnchenbrustfilet, Paprika und Sahnesauce',
        'price': '9.00€',
        'amount': 0,
        'sumPrice': [],
    },

    {
        'food': 'Spaghetti Tonno',
        'ingridients': 'Mit Mozarella und Thunfischpaste',
        'price': '10.00€',
        'amount': 0,
        'sumPrice': [],
    },

];

let snacks = [
    {
        'food': 'Chicken Nuggets Joppie',
        'ingridients': '12 Chicken Nuggets mit Joppiesauce',
        'price': '6.00€',
        'amount': 0,
        'sumPrice': [],
    },

    {
        'food': 'Chilli Cheese Sticks',
        'ingridients': 'Mozarella Sticks mit Hähnchenbrustfilet, Paprika und Sahnesauce',
        'price': '9.00€',
        'amount': 0,
        'sumPrice': [],
    },

    {
        'food': 'Pommes Rot Weiß',
        'ingridients': 'Große Portion Pommes mit Mayonaise und Ketchup',
        'price': '7.00€',
        'amount': 0,
        'sumPrice': [],
    },

];

let basket = [0,0,0];
var width;

function toggleBasket() {
    let basket = document.getElementById('basket-wrapper');
    width = this.innerWidth;
    if (width > 1445) {
        basket.classList.remove('display-none');
    } else {
        if (width < 1445) {
            basket.classList.add('display-none');
        }
    }
}

window.addEventListener('load', toggleBasket);
window.addEventListener('resize', toggleBasket);

function init() {
    renderPizza();
    renderNudeln();
    renderSnacks();
}

function renderPizza() {
    for (let i = 0; i < pizza.length; i++) {
        const pizzaRecipe = pizza[i];
        renderPizzaTemplateFunction(i, pizzaRecipe);
    }
}

function renderPizzaTemplateFunction(i, pizzaRecipe) {
    document.getElementById('content').innerHTML += `
        <div class="recipe-padding-div">
            <div id="recipe-border-div-pizza${i}" class="recipe-border-div">
                <div id="recipe-headline-pizza${i}" class="recipe-headline">${pizzaRecipe['food']}
                    <img onclick="basketPizza(${i})" class="recipe-cross" src="Material/Logo/Pluss.svg" alt="">
                </div>
                <div class="recipe-ingridients">${pizzaRecipe['ingridients']}</div>
                <div id="priceSnacks${i}" class="recipe-price">${pizzaRecipe['price'].replace('.', ',')}</div>
            </div>       
        </div>
        `;
}

function renderNudeln() {
    for (let i = 0; i < nudeln.length; i++) {
        const nudelRecipe = nudeln[i];
        renderNudelnTemplateFunction(i, nudelRecipe);
    }
}

function renderNudelnTemplateFunction(i, nudelRecipe) {
    document.getElementById('content2').innerHTML += `
        <div class="recipe-padding-div">
            <div id="recipe-border-div-nudeln${i}" class="recipe-border-div">
                <div id="recipe-headline-nudeln${i}" class="recipe-headline">${nudelRecipe['food']}
                    <img onclick="basketNudeln(${i})" class="recipe-cross" src="Material/Logo/Pluss.svg" alt="">
                </div>
                <div class="recipe-ingridients">${nudelRecipe['ingridients']}</div>
                <div id="priceSnacks${i}" class="recipe-price">${nudelRecipe['price'].replace('.', ',')}</div>
            </div>
        </div>
        `; 
}

function renderSnacks() {
    for (let i = 0; i < snacks.length; i++) {
        const snackRecipe = snacks[i];
        renderSnacksTemplateFunction(i, snackRecipe);
    }
}

function renderSnacksTemplateFunction(i, snackRecipe) {
    document.getElementById('content3').innerHTML += `
        <div class="recipe-padding-div">
            <div id="recipe-border-div-snacks${i}" class="recipe-border-div">
                <div class="recipe-headline">${snackRecipe['food']}
                    <img onclick="basketSnacks(${i})" class="recipe-cross" src="Material/Logo/Pluss.svg" alt="">
                </div>
                <div class="recipe-ingridients">${snackRecipe['ingridients']}</div>
                <div id="priceSnacks${i}" class="recipe-price">${snackRecipe['price'].replace('.', ',')}</div>
            </div>
        </div>
        `;
}

function updatePizzaCounterAndPriceMinus(index) {
    const pizzaArray = pizza[index];
    let counterBasket = document.getElementById(`counter-pizza-basket${index}`);
    let priceBasketPizza = document.getElementById(`price-margin${index}`);
    let pricePizza = parseFloat(pizzaArray['price'].replace('€', '').replace(',', '.'));

    if (pizzaArray['amount'] == 1) {
        deleteFoodPizza(index);
    } else {
        pizzaArray['amount']--;
        let finalPizzaPrice = pizzaArray['amount'] * pricePizza;
        pizzaArray['sumPrice'].splice(0, 1, finalPizzaPrice);
        priceBasketPizza.innerHTML = `${finalPizzaPrice.toFixed(2).replace('.', ',')}€`;
        counterBasket.innerHTML = pizzaArray['amount'];
    }
    sumOfPizzaBasket();
    sumOfCompleteBasket();
}

function updatePizzaCounterAndPricePlus(index) {
    const pizzaArray = pizza[index];
    let counterBasket = document.getElementById(`counter-pizza-basket${index}`);
    let priceBasketPizza = document.getElementById(`price-margin${index}`);
    let pricePizza = parseFloat(pizzaArray['price'].replace('€', '').replace(',', '.'));

    pizzaArray['amount']++;
    let finalPizzaPrice = pizzaArray['amount'] * pricePizza;
    pizzaArray['sumPrice'].splice(0, 1, finalPizzaPrice);
    priceBasketPizza.innerHTML = `${finalPizzaPrice.toFixed(2).replace('.', ',')}€`;
    counterBasket.innerHTML = pizzaArray['amount'];
    sumOfPizzaBasket();
    sumOfCompleteBasket();
}


function basketPizza(i) {
    const pizzaArray = pizza[i];
    let pricePizza = parseFloat(pizzaArray['price'].replace('€', '').replace(',', '.'));

    if (pizzaArray['amount'] < 1) {
        pizzaArray['amount']++;
        pizzaArray['sumPrice'].splice(0, 1, pricePizza);
        basketPizzaInnerHtml (i, pizzaArray);
    } else {
        updatePizzaCounterAndPricePlus(i);
    }
    sumOfPizzaBasket();
    sumOfCompleteBasket();
}

function updateNudelnCounterAndPricePlus(index) {
    const nudelnArray = nudeln[index];
    let counterBasket = document.getElementById(`counter-nudeln-basket${index}`);
    let priceBasketNudeln = document.getElementById(`price-margin-nudeln${index}`);
    let priceNudeln = parseFloat(nudelnArray['price'].replace('€', '').replace(',', '.'));
    nudelnArray['amount']++;
    let finalNudelnPrice = nudelnArray['amount'] * priceNudeln;
    nudelnArray['sumPrice'].splice(0, 1, finalNudelnPrice);
    priceBasketNudeln.innerHTML = `${finalNudelnPrice.toFixed(2).replace('.', ',')}€`;
    counterBasket.innerHTML = nudelnArray['amount'];
    sumOfNudelnBasket();
    sumOfCompleteBasket();
}

function updateNudelnCounterAndPriceMinus(index) {
    const nudelnArray = nudeln[index];
    let counterBasket = document.getElementById(`counter-nudeln-basket${index}`);
    let priceBasketNudeln = document.getElementById(`price-margin-nudeln${index}`);
    let priceNudeln = parseFloat(nudelnArray['price'].replace('€', '').replace(',', '.'));

    if (nudelnArray['amount'] == 1) {
        deleteFoodNudeln(index);
    } else {
        nudelnArray['amount']--;
        let finalNudelnPrice = nudelnArray['amount'] * priceNudeln;
        nudelnArray['sumPrice'].splice(0, 1, finalNudelnPrice);
        priceBasketNudeln.innerHTML = `${finalNudelnPrice.toFixed(2).replace('.', ',')}€`;
        counterBasket.innerHTML = nudelnArray['amount'];
    }
    sumOfNudelnBasket();
    sumOfCompleteBasket();
}

function basketNudeln(i) {
    const nudelnArray = nudeln[i];
    let priceNudeln = parseFloat(nudelnArray['price'].replace('€', '').replace(',', '.'));

    if(nudelnArray['amount'] < 1) {
        nudelnArray['amount']++;
        nudelnArray['sumPrice'].splice(0, 1, priceNudeln);
        basketNudelnInnerHtml(i, nudelnArray);
    } else {
        updateNudelnCounterAndPricePlus(i);
    }
    sumOfNudelnBasket();
    sumOfCompleteBasket();
}

function updateSnacksCounterAndPricePlus(index) {
    const snacksArray = snacks[index];
    let counterBasket = document.getElementById(`counter-snacks-basket${index}`);
    let priceBasketSnacks = document.getElementById(`price-margin-snacks${index}`);
    let priceSnacks = parseFloat(snacksArray['price'].replace('€', '').replace(',', '.'));
    snacksArray['amount']++;
    let finalSnacksPrice = snacksArray['amount'] * priceSnacks;
    snacksArray['sumPrice'].splice(0, 1, finalSnacksPrice);
    priceBasketSnacks.innerHTML = `${finalSnacksPrice.toFixed(2).replace('.', ',')}€`;
    counterBasket.innerHTML = snacksArray['amount'];
    sumOfSnacksBasket();
    sumOfCompleteBasket();
}

function updateSnacksCounterAndPriceMinus(index) {
    const snacksArray = snacks[index];
    let counterBasket = document.getElementById(`counter-snacks-basket${index}`);
    let priceBasketSnacks = document.getElementById(`price-margin-snacks${index}`);
    let priceSnacks = parseFloat(snacksArray['price'].replace('€', '').replace(',', '.'));

    if (snacksArray['amount'] == 1) {
        deleteFoodSnacks(index);
    } else {
        snacksArray['amount']--;
        let finalSnacksPrice = snacksArray['amount'] * priceSnacks;
        snacksArray['sumPrice'].splice(0, 1, finalSnacksPrice);
        priceBasketSnacks.innerHTML = `${finalSnacksPrice.toFixed(2).replace('.', ',')}€`;
        counterBasket.innerHTML = snacksArray['amount'];
    }
    sumOfSnacksBasket();
    sumOfCompleteBasket();
}

function basketSnacks(i) {
    const snacksArray = snacks[i];
    let priceSnacks = parseFloat(snacksArray['price'].replace('€', '').replace(',', '.'));

    if (snacksArray['amount'] < 1) {
        snacksArray['amount']++;
        snacksArray['sumPrice'].splice(0, 1, priceSnacks);
        basketSnacksInnerHtml (i, snacksArray);
    } else {
        updateSnacksCounterAndPricePlus(i);
    }    
    sumOfSnacksBasket();
    sumOfCompleteBasket();
}

function deleteFoodSnacks(foodIndex) {
    let foodDiv = document.getElementById(`type-of-snacks${foodIndex}`);
    const snacksArray = snacks[foodIndex];
    snacksArray['amount'] = 0;
    let snackPriceReset = 0;

    snacksArray['sumPrice'].splice(0, 3, snackPriceReset);
    sumOfSnacksBasket();
    sumOfCompleteBasket();
    foodDiv.remove();
}

function deleteFoodNudeln(foodIndex) {
    let foodDiv = document.getElementById(`type-of-nudeln${foodIndex}`);
    const nudelnArray = nudeln[foodIndex];
    nudelnArray['amount'] = 0;
    let nudelnPriceReset = 0;

    nudelnArray['sumPrice'].splice(0, 3, nudelnPriceReset);
    sumOfNudelnBasket();
    sumOfCompleteBasket();
    foodDiv.remove();
}

function deleteFoodPizza(foodIndex) {
    let foodDiv = document.getElementById(`type-of-pizza${foodIndex}`);
    const pizzaArray = pizza[foodIndex];
    pizzaArray['amount'] = 0;
    let pizzaPriceReset = 0;

    pizzaArray['sumPrice'].splice(0, 3, pizzaPriceReset);
    sumOfPizzaBasket();
    sumOfCompleteBasket();
    foodDiv.remove();
}
// Hier wird der Preis der Pizzen in den Basket gepushed um nachher alles zu summieren.
function sumOfPizzaBasket() {
    let sumofPizza = 0;
    let finalPriceDiv = document.getElementById('total-price');

    pizza.forEach(pizzaitem => {
        pizzaitem.sumPrice.forEach(pizzaPriceItem => {
            sumofPizza += parseFloat(pizzaPriceItem);
        });
    });
    basket.splice(0, 1, sumofPizza);
}

function sumOfNudelnBasket() {
    let sumOfNudeln = 0;
    let finalPriceDiv = document.getElementById('total-price');

    nudeln.forEach(nudelnTypeItem => {
        nudelnTypeItem.sumPrice.forEach(nudelnPriceItem => {
            sumOfNudeln += parseFloat(nudelnPriceItem);
        });
    });
    basket.splice(1, 1, sumOfNudeln);
}

function sumOfSnacksBasket() {
    let sumOfSnacks = 0;
    let finalPriceDiv = document.getElementById('total-price');

    snacks.forEach(snacksTypeItem => {
        snacksTypeItem.sumPrice.forEach(snacksPriceItem => {
            sumOfSnacks += parseFloat(snacksPriceItem);
        });
    });
    basket.splice(2, 1, sumOfSnacks);
}

function sumOfCompleteBasket() {
    let sumOfBasket = 0;
    let finalPriceDiv = document.getElementById('total-price');
    let basketButtonPrice = document.getElementById('button-content');

    for (let i = 0; i < basket.length; i++) {
        sumOfBasket += basket[i];
    }

    finalPriceDiv.innerHTML = `Gesamtpreis ${sumOfBasket.toFixed(2).replace('.', ',')}€`;
    basketButtonPrice.innerHTML = `Warenkorb <br> ${sumOfBasket.toFixed(2).replace('.', ',')}€`;
}

function basketPizzaInnerHtml(i, pizzaArray) {
    let basket = document.getElementById('basket-order');
    basket.innerHTML += `
        <div class="type-of-pizza" id="type-of-pizza${i}">
            <div class="basket-headline">${pizzaArray['food']}</div>
            <div class="icon-section-basket">
                <svg onclick="updatePizzaCounterAndPriceMinus(${i})" class="minus-basket" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><g><path style="fill:#ff8e31;" d="M125.61,71.238H2.39c-1.32,0-2.39-1.07-2.39-2.39v-9.787c0-1.32,1.07-2.39,2.39-2.39h123.22c1.32,0,2.39,1.07,2.39,2.39v9.787C128,70.168,126.93,71.238,125.61,71.238z"/></g></svg>
                <div id="counter-pizza-basket${i}">${pizzaArray['amount']}</div>
                <svg onclick="updatePizzaCounterAndPricePlus(${i})" class="plus-basket" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path class="cls-1" d="M.5,8.5v-1h15v1Z" fill="#ff8e31"/><path class="cls-1" d="M8.5,15.5h-1V.5h1Z" fill="#ff8e31"/></svg>
                <svg id="bin-basket-pizza${i}" onclick="deleteFoodPizza(${i})" class="bin-basket" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20,10H4V21a1,1,0,0,0,1,1H19a1,1,0,0,0,1-1ZM9,18a1,1,0,0,1-2,0V14a1,1,0,0,1,2,0Zm4,0a1,1,0,0,1-2,0V14a1,1,0,0,1,2,0Zm4,0a1,1,0,0,1-2,0V14a1,1,0,0,1,2,0ZM22,5V8H2V5A1,1,0,0,1,3,4H8V3A1,1,0,0,1,9,2h6a1,1,0,0,1,1,1V4h5A1,1,0,0,1,22,5Z" fill="#ff8e31"/></svg>
                <div id="price-margin${i}" class="price-margin">${pizzaArray['price'].replace('.', ',')}</div>
            </div>
        </div>
    `;
}

function basketNudelnInnerHtml(i, nudelnArray) {
    let basket = document.getElementById('basket-order');
    basket.innerHTML += `
        <div id="type-of-nudeln${i}">
            <div class="basket-headline">${nudelnArray['food']}</div>
            <div class="icon-section-basket">
                <svg onclick="updateNudelnCounterAndPriceMinus(${i})" class="minus-basket" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><g><path style="fill:#ff8e31;" d="M125.61,71.238H2.39c-1.32,0-2.39-1.07-2.39-2.39v-9.787c0-1.32,1.07-2.39,2.39-2.39h123.22c1.32,0,2.39,1.07,2.39,2.39v9.787C128,70.168,126.93,71.238,125.61,71.238z"/></g></svg>
                <div id="counter-nudeln-basket${i}">${nudelnArray['amount']}</div>
                <svg onclick="updateNudelnCounterAndPricePlus(${i})" class="plus-basket" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path class="cls-1" d="M.5,8.5v-1h15v1Z" fill="#ff8e31"/><path class="cls-1" d="M8.5,15.5h-1V.5h1Z" fill="#ff8e31"/></svg>
                <svg id="bin-basket-nudeln${i}" onclick="deleteFoodNudeln(${i})" class="bin-basket" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20,10H4V21a1,1,0,0,0,1,1H19a1,1,0,0,0,1-1ZM9,18a1,1,0,0,1-2,0V14a1,1,0,0,1,2,0Zm4,0a1,1,0,0,1-2,0V14a1,1,0,0,1,2,0Zm4,0a1,1,0,0,1-2,0V14a1,1,0,0,1,2,0ZM22,5V8H2V5A1,1,0,0,1,3,4H8V3A1,1,0,0,1,9,2h6a1,1,0,0,1,1,1V4h5A1,1,0,0,1,22,5Z" fill="#ff8e31"/></svg>
                <div id="price-margin-nudeln${i}" class="price-margin">${nudelnArray['price'].replace('.', ',')}</div>
            </div>
        </div>
    `;
}

function basketSnacksInnerHtml(i, snacksArray) {
    let basket = document.getElementById('basket-order');
    basket.innerHTML += `
        <div id="type-of-snacks${i}">
            <div class="basket-headline">${snacksArray['food']}</div>
            <div class="icon-section-basket">
                <svg onclick="updateSnacksCounterAndPriceMinus(${i})" class="minus-basket" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><g><path style="fill:#ff8e31;" d="M125.61,71.238H2.39c-1.32,0-2.39-1.07-2.39-2.39v-9.787c0-1.32,1.07-2.39,2.39-2.39h123.22c1.32,0,2.39,1.07,2.39,2.39v9.787C128,70.168,126.93,71.238,125.61,71.238z"/></g></svg>
                <div id="counter-snacks-basket${i}">${snacksArray['amount']}</div>
                <svg onclick="updateSnacksCounterAndPricePlus(${i})" class="plus-basket" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path class="cls-1" d="M.5,8.5v-1h15v1Z" fill="#ff8e31"/><path class="cls-1" d="M8.5,15.5h-1V.5h1Z" fill="#ff8e31"/></svg>
                <svg id="bin-basket-snacks${i}" onclick="deleteFoodSnacks(${i})" class="bin-basket" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20,10H4V21a1,1,0,0,0,1,1H19a1,1,0,0,0,1-1ZM9,18a1,1,0,0,1-2,0V14a1,1,0,0,1,2,0Zm4,0a1,1,0,0,1-2,0V14a1,1,0,0,1,2,0Zm4,0a1,1,0,0,1-2,0V14a1,1,0,0,1,2,0ZM22,5V8H2V5A1,1,0,0,1,3,4H8V3A1,1,0,0,1,9,2h6a1,1,0,0,1,1,1V4h5A1,1,0,0,1,22,5Z" fill="#ff8e31"/></svg>
                <div id="price-margin-snacks${i}" class="price-margin">${snacksArray['price'].replace('.', ',')}</div>
            </div>
        </div>
    `;
}

function showBasketButtonMobileTablet() {
    let basket = document.getElementById('basket-wrapper');

    if (basket.classList.contains('display-none')) {
        basket.classList.remove('display-none');
    } else {
        basket.classList.add('display-none');
    }
}

function orderButtonCounterAndPriceReset() {
    let thanksForYourOrderDiv = document.getElementById('content-basket-handy-tablet');
    let whiteBackgroundDiv = document.getElementById('white-background-div');

    whiteBackgroundDiv.classList.remove('display-none');
    thanksForYourOrderDiv.classList.remove('display-none');
    submitSnacksOrder();
    submitPizzaOrder();
    submitNudelnOrder();
}

function submitSnacksOrder() {
    for (let i = 0; i < snacks.length; i++) {
        let snackBasketItem = document.getElementById(`type-of-snacks${i}`);
        if (snackBasketItem) {
            deleteFoodSnacks(i);
        }
    }
}

function submitPizzaOrder() {
    for (let i = 0; i < pizza.length; i++) {
        let pizzaBasketItem = document.getElementById(`type-of-pizza${i}`);
        if (pizzaBasketItem) {
            deleteFoodPizza(i);
        }
    }
}

function submitNudelnOrder() {
    for (let i = 0; i < nudeln.length; i++) {
        let nudelnBasketItem = document.getElementById(`type-of-nudeln${i}`);
        if(nudelnBasketItem) {
            deleteFoodNudeln(i);
        }
    }
}

function backToWebsite() {
    let thanksForYourOrderDiv = document.getElementById('content-basket-handy-tablet');
    let whiteBackgroundDiv = document.getElementById('white-background-div');

    whiteBackgroundDiv.classList.add('display-none');
    thanksForYourOrderDiv.classList.add('display-none');
    toggleBasket();
}