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
            return 0;
    }
};

Calculator.prototype.calcFuncAccounting = function () {
    return this.state.accounting ? 35 : 0;
};

Calculator.prototype.calcFuncTerminal = function () {
    return this.state.terminal ? 5 : 0;
};

Calculator.prototype.checkItem = function (state, item, func) {
    if(state.length > 0) {
        item.classList.remove("d-none");
        if(item.id === "itemProductsQuantity" || "itemEstimatedOrdersInMonth") {
            item.children[1].innerText = `$${state}`;
            item.children[2].innerText = `$${func}`;
        }
        if(item.id === "itemPackage") {
            item.children[1].innerText = `${state}`;
            item.children[2].innerText = `$${func}`;
        }
    }else if(state) {
        item.classList.remove("d-none");
        item.children[1].innerText = `$${func}`;
    }
    else {
        item.classList.add("d-none");
    }
};

Calculator.prototype.createTotalSum = function (...args) {
    const total = args.reduce((prev, curr) => prev + curr);

    if(total > 0) {
        containerFromNewElement.children['totalSum'].classList.remove("d-none");
        containerFromNewElement.children['totalSum'].children[1].innerText = `$${Number(total).toFixed(2)}`;
    } else {
        containerFromNewElement.children['totalSum'].classList.add("d-none");
    }
};

const c1 = new Calculator();

for(let el of form.elements) {

        el.addEventListener("input", function () {
            switch (el.id) {
                case "productsQuantity":
                    c1.state.productsQuantity = this.value;
                    c1.checkItem(c1.state.productsQuantity, containerFromNewElement.children['itemProductsQuantity'], c1.calcFuncQuantity());
                    break;
                case "estimatedOrdersInMonth":
                    c1.state.estimatedOrdersInMonth = this.value;
                    c1.checkItem(c1.state.estimatedOrdersInMonth, containerFromNewElement.children['itemEstimatedOrdersInMonth'], c1.calcFuncOrdersInMonth());
                    break;
                case "package":
                    c1.state.choosePackage = this.options[this.selectedIndex].innerText;
                    c1.checkItem(c1.state.choosePackage, containerFromNewElement.children['itemPackage'], c1.calcFuncChoosePackage());
                    break;
                case "accounting":
                    c1.state.accounting = this.checked;
                    c1.checkItem(c1.state.accounting, containerFromNewElement.children['itemAccounting'], c1.calcFuncAccounting());
                    break;
                case "paymentTerminal":
                    c1.state.terminal = this.checked;
                    c1.checkItem(c1.state.terminal, containerFromNewElement.children['itemPaymentTerminal'], c1.calcFuncTerminal());
                    break;
                default:
                    return null;
            }
            c1.createTotalSum(c1.calcFuncQuantity(), c1.calcFuncOrdersInMonth(), c1.calcFuncChoosePackage(), c1.calcFuncAccounting(), c1.calcFuncTerminal());
        });
}