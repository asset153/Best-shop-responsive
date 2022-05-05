const form = document.querySelector("form.calculator__container__form");
const containerFromNewElement = document.querySelector(".calculator__container__pricing");

const Calculator = function (productsQuantity = 0, estimatedOrdersInMonth = 0, choosePackage = "", accounting = false, terminal = false) {

    this.state = {
        productsQuantity,
        estimatedOrdersInMonth,
        choosePackage,
        accounting,
        terminal,
    };

    this.counters = {
        forProducts: 0.5,
        forOrders: 0.25,
    };

    this.HTMLelements = {
        divProducts: document.createElement("div"),
        divOrders: document.createElement("div"),
        divPackage: document.createElement("div"),
        divAccounting: document.createElement("div"),
        divPaymentTerminal: document.createElement("div"),
        divTotalSum: document.createElement("div"),
    };
};

Calculator.prototype.calcFuncQuantity = function () {
    return Number(this.state.productsQuantity) * Number(this.counters.forProducts);
};

Calculator.prototype.calcFuncOrdersInMonth = function () {
    return Number(this.state.estimatedOrdersInMonth) * Number(this.counters.forOrders);
};

Calculator.prototype.calcFuncChoosePackage = function () {
    switch (this.state.choosePackage) {
        case "Basic":
            return 0;
        case "Professional":
            return 25;
        case "Premium":
            return 60;
        default:
            return null;
    }
};

Calculator.prototype.calcFuncAccounting = function () {
    return this.state.accounting ? 35 : "";
};

Calculator.prototype.calcFuncTerminal = function () {
    return this.state.terminal ? 5 : "";
};

Calculator.prototype.createTotalSum = function (products, orders, choosePackage,  accounting, terminal) {
    const total = products + orders + choosePackage + accounting + terminal;
    this.HTMLelements.divTotalSum.classList.add("calculator__container__pricing__item-totalSum");
    this.HTMLelements.divTotalSum.innerHTML = `<span>Total</span><span>$${Number(total).toFixed(2)}</span>`
    return total <= 0 ? containerFromNewElement.removeChild(this.HTMLelements.divTotalSum) : containerFromNewElement.appendChild(this.HTMLelements.divTotalSum);
};

Calculator.prototype.createNewItemForInputNumber = function (tag, stateName, state, counter, func) {
    tag.classList.add("calculator__container__pricing__item");
    tag.innerHTML = `<span>${stateName}</span><span>${state} * $${counter}</span><span>$${func}</span>`
    return state.length <= 0 ? containerFromNewElement.removeChild(tag) : containerFromNewElement.appendChild(tag);
};

Calculator.prototype.createNewItemForCheck = function (tag, stateName, state, func) {
    const ifBoolean = state === true || state === false;
    tag.classList.add("calculator__container__pricing__item");
    tag.innerHTML = `<span>${stateName}</span><span>${ifBoolean ? "" : state}</span><span>$${func}</span>`
    return !state ? containerFromNewElement.removeChild(tag) : containerFromNewElement.appendChild(tag);
};

const c1 = new Calculator();

for(let el of form.elements) {
        el.addEventListener("input", function () {
            switch (el.id) {
                case "productsQuantity":
                    c1.state.productsQuantity = this.value;
                    c1.createNewItemForInputNumber(c1.HTMLelements.divProducts, "Products", c1.state.productsQuantity, c1.counters.forProducts, c1.calcFuncQuantity());
                    break;
                case "estimatedOrdersInMonth":
                    c1.state.estimatedOrdersInMonth = this.value;
                    c1.createNewItemForInputNumber(c1.HTMLelements.divOrders,"Orders", c1.state.estimatedOrdersInMonth, c1.counters.forOrders, c1.calcFuncOrdersInMonth());
                    break;
                case "package":
                    c1.state.choosePackage = this.options[this.selectedIndex].innerText;
                    c1.createNewItemForCheck(c1.HTMLelements.divPackage,"Package", c1.state.choosePackage, c1.calcFuncChoosePackage());
                    break;
                case "accounting":
                    c1.state.accounting = this.checked;
                    c1.createNewItemForCheck(c1.HTMLelements.divAccounting,"Accounting", c1.state.accounting, c1.calcFuncAccounting());
                    break;
                case "paymentTerminal":
                    c1.state.terminal = this.checked;
                    c1.createNewItemForCheck(c1.HTMLelements.divPaymentTerminal,"Terminal", c1.state.terminal, c1.calcFuncTerminal());
                    break;
                default:
                    return null;
            }
            c1.createTotalSum(c1.calcFuncQuantity(), c1.calcFuncOrdersInMonth(), c1.calcFuncChoosePackage(), c1.calcFuncAccounting(), c1.calcFuncTerminal());
        });
}