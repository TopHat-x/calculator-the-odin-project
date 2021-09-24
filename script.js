const btn0 = document.querySelector("#btn0");
const btn1 = document.querySelector("#btn1");
const btn2 = document.querySelector("#btn2");
const btn3 = document.querySelector("#btn3");
const btn4 = document.querySelector("#btn4");
const btn5 = document.querySelector("#btn5");
const btn6 = document.querySelector("#btn6");
const btn7 = document.querySelector("#btn7");
const btn8 = document.querySelector("#btn8");
const btn9 = document.querySelector("#btn9");
const btnDecimal = document.querySelector("#btn-decimal");
const btnAdd = document.querySelector("#btn-add");
const btnSub = document.querySelector("#btn-sub");
const btnMult = document.querySelector("#btn-mult");
const btnDiv = document.querySelector("#btn-div");
const btnEqual = document.querySelector("#btn-equal");
const btnClear = document.querySelector("#btn-clear");
const btnBackSpace = document.querySelector("#btn-backspace");

btn0.addEventListener('click', () => {populateDisplay("0", "num")});
btn1.addEventListener('click', () => {populateDisplay("1", "num")});
btn2.addEventListener('click', () => {populateDisplay("2", "num")});
btn3.addEventListener('click', () => {populateDisplay("3", "num")});
btn4.addEventListener('click', () => {populateDisplay("4", "num")});
btn5.addEventListener('click', () => {populateDisplay("5", "num")});
btn6.addEventListener('click', () => {populateDisplay("6", "num")});
btn7.addEventListener('click', () => {populateDisplay("7", "num")});
btn8.addEventListener('click', () => {populateDisplay("8", "num")});
btn9.addEventListener('click', () => {populateDisplay("9", "num")});
btnDecimal.addEventListener('click', () => {populateDisplay(".", "num")});
btnAdd.addEventListener('click', () => {populateDisplay("+", "op")});
btnSub.addEventListener('click', () => {populateDisplay("-", "op")});
btnMult.addEventListener('click', () => {populateDisplay("x", "op")});
btnDiv.addEventListener('click', () => {populateDisplay("/", "op")});
btnEqual.addEventListener('click', () => {populateDisplay("=", "eq")});
btnClear.addEventListener('click', () => {clearDisplay()});
btnBackSpace.addEventListener('click', () => {backSpace()});

const screenText = document.querySelector("#screen-text");
const setText = (string) => screenText.textContent = string;
const getText = () => screenText.textContent;
setText("0");

let displayState = "zero"; // States: zero, oneNum, numOp, twoNumOp


function add(num1, num2){
    return num1 + num2;
}

function subtract(num1, num2){
    return num1 - num2;
}

function multiply(num1, num2){
    return num1 * num2;
}

function divide(num1, num2){
    return num1 / num2;
}

function operate(operator, num1, num2){
    if(operator === "+"){
        return add(num1, num2);
    } else if(operator === "-"){
        return subtract(num1, num2);
    } else if(operator === "*"){
        return multiply(num1, num2);
    } else if(operator === "/"){
        return divide(num1, num2);
    } else {
        console.log("Invalid operator");
        return;
    }
}

function populateDisplay(valIn, valType){
    switch(displayState){
        case "zero":
            if(valType === "num"){
                setText(valIn);
                displayState = "oneNum";
            }
            break;
        case "oneNum":
            if(valType === "num"){
                setText(getText() + valIn);
            } else if(valType === "op"){
                setText(getText() + valIn);
                displayState = "numOp"
            }
            break;
        case "numOp":
            if(valType === "num"){
                setText(getText() + valIn);
                displayState = "twoNumOp";
            }
            break;
        case "twoNumOp":
            if(valType === "num"){
                setText(getText() + valIn);
            } else if(valType === "op"){
                showResult();
                setText(getText() + valIn);
                displayState = "numOp";
            } else if(valType === "eq"){
                showResult();
                displayState = "oneNum";
            }
            break;
    }
}

function clearDisplay(){
    setText(0);
    displayState = "zero";
}

function backSpace(){
    if(getText().length === 1){
        setText(0);
    } else {
        setText(getText().substring(0, getText().length -1));
    }
}

function showResult(){
    return;
}



