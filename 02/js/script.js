"use strict";

let buttons = document.querySelectorAll(".toBasket"); // массив кнопок
let productsArr = []; // определяю массив для будущих объектов товаров
let basket = document.querySelector(".basketInnings"); // содержима блока корзины

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function (e) {
        buttons.buttonNumber = i;
        makeProductArray(e);
    });
};

/**
 * Формирует начальный объект с информацией о товаре
 *
 * @param {*} e принимает нажатие по кнопке "в корзину"
 * @returns {product} возвращает объект с информацией о товаре
 */
function getProduct(e) {
    let product = {
        productId: buttons.buttonNumber, // номер кнопки в коллекции buttons
        name: e.target.parentNode.querySelector("h2").innerText, // получаю название товара
        price: e.target.parentNode.querySelector(".price").innerText, // получаю цену товара
        totalPrice: e.target.parentNode.querySelector(".price").innerText, // назначаю цену "итого"
        productsQuantity: 1 // начальное количество товара
    }
    return product;
};

/**
 * Функция формирует массив объектов с информацией о товаре
 *
 * @param {*} arg
 */
function makeProductArray(arg) {
    let productExists = productsArr.find(id => id.productId == buttons.buttonNumber);
    // наличие товара в массиве объектов

    if (productsArr.length == 0 || !productExists) { // если массив пустой
        productsArr.push(new getProduct(arg)); // добавляю объект
    } else if (productExists) {
        // если в массиве уже есть объект, которому соответствует номер нажатой кнопки

        productsArr.find(id => id.productId == buttons.buttonNumber).productsQuantity++;
        //увеличиваю количество

        let qntt = productsArr.find(id => id.productId == buttons.buttonNumber).productsQuantity; // количество
        let prc = productsArr.find(id => id.productId == buttons.buttonNumber).price; // цена
        productsArr.find(id => id.productId == buttons.buttonNumber).totalPrice = qntt * prc;
        // обновляю цену "итого"
    }
    updateBasket();
};

/**
 * Функция заполняет корзину товарами
 *
 */
function updateBasket() {
    let basketTotals = 0; // итого
    let basketDivs = basket.querySelectorAll("div"); // дивы в блоке корзины
    for (let j = 0; j < basketDivs.length; j++) {
        basket.querySelector("div").remove(); // чищу все все дивы в корзине, чтобы при добавлении товара корзина обновлялась
    }
    for (let i = 0; i < productsArr.length; i++) {
        basket.insertBefore(document.createElement("div"), document.querySelector(".basketTotal")).innerHTML =
            `<b>${productsArr[i].name}</b>: <span class="quantity">${productsArr[i].price} <i class="fas fa-ruble-sign"></i> * ${productsArr[i].productsQuantity} шт.</span>`;
            // добавляю в корзину дивы с названием товара, его ценой и количеством

        basketTotals += +productsArr[i].totalPrice; // подбиваю "итого"
    }
    basket.querySelector(".total").innerText = basketTotals; // пишу "итого" в корзину
}