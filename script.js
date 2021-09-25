//#region Buttons
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

//#endregion

//#region Keys


//#endregion

const screenText = document.querySelector("#screen-text");
const setText = (string) => screenText.textContent = string;
const getText = () => screenText.textContent;
setText("0");


let displayState = "zero"; // States: zero, oneNum, numOp, twoNumOp, afterEq, error
let valOne = null;
let valTwo = null;
let solution = null;
let operator = null;


function add(num1, num2){
    return parseFloat(num1) + parseFloat(num2);
}

function subtract(num1, num2){
    return parseFloat(num1) - parseFloat(num2);
}

function multiply(num1, num2){
    return parseFloat(num1) * parseFloat(num2);
}

function divide(num1, num2){
    return parseFloat(num1) / parseFloat(num2);
}

function operate(operator, num1, num2){
    if(operator === "+"){
        let result = add(num1, num2);
        return roundNumber(result); 
    } else if(operator === "-"){
        let result = subtract(num1, num2);
        return roundNumber(result); 
    } else if(operator === "x"){
        let result = multiply(num1, num2);
        return roundNumber(result); 
    } else if(operator === "/"){
        let result = divide(num1, num2);
        return roundNumber(result); 
    } else {
        console.log("Invalid operator");
        return;
    }
}

function roundNumber(num){
    result = Math.round(num * 100) / 100;
    result = result.toString();
    if(result.indexOf(".") !== -1){
        for(i = 0; i < 3; i++){
            if(result[result.length-1] === "0" || result[result.length-1] === "."){
                result = result.substring(0,result.length - 2);
            }
        }
    }

    return result;
}

function populateDisplay(valIn, valType){
    switch(displayState){
        case "zero":
            if(valIn === "0"){
                break;
            } else if(valIn === "."){
                setText(getText() + valIn);
                valOne = "0.";
                displayState = "oneNum";
            } else if(valType === "num"){
                setText(valIn);
                displayState = "oneNum";
                valOne = valIn;
            } else if(valType === "op"){
                setText(getText() + valIn);
                valOne = 0;
                displayState = "numOp";
                operator = valIn;
            }
            break;

        case "oneNum":
            if(getText().length > 12){
                setText("Too long!");
                solution = null;
                valOne = null;
                valTwo = null;
                operator = null;
                displayState = "error";
            } else if(valIn === "." && valOne.indexOf(".") !== -1){
                break;
            } else if(valType === "num"){
                setText(getText() + valIn);
                valOne += valIn;
            } else if(valType === "op"){
                setText(getText() + valIn);
                displayState = "numOp"
                operator = valIn;
            }
            break;

        case "numOp":
            if(getText().length > 12 && valType === "num"){
                setText("Too long!");
                solution = null;
                valOne = null;
                valTwo = null;
                operator = null;
                displayState = "error";
            } else if(valIn === "."){
                valTwo = "0.";
                setText(getText() + valTwo);
                displayState = "twoNumOp";
            } else if(valType === "num"){
                setText(getText() + valIn);
                valTwo = valIn;
                displayState = "twoNumOp";
            }
            break;

        case "twoNumOp":
            if(valIn === "0" && valTwo === "0"){
                break;
            } else if(getText().length > 12 && valType === "num"){
                setText("Too long!");
                solution = null;
                valOne = null;
                valTwo = null;
                operator = null;
                displayState = "error";
            } else if(valIn === "." && valTwo.indexOf(".") !== -1){
                break;
            } else if(valType === "num"){
                setText(getText() + valIn);
                valTwo += valIn;
            } else if(valType === "op"){
                if(valTwo === "0" && operator === "/"){
                    setText(">:(");
                    solution = null;
                    valOne = null;
                    valTwo = null;
                    operator = null;
                    displayState = "error";
                } else {
                    solution = operate(operator, valOne, valTwo);
                    if(solution.length > 12){
                        setText("Too long!");
                        solution = null;
                        valOne = null;
                        valTwo = null;
                        operator = null;
                        displayState = "error";
                    } else {
                        setText(solution + valIn);
                        valOne = solution;
                        valTwo = null;
                        operator = valIn;
                        displayState = "numOp";
                    }
                }
            } else if(valType === "eq"){
                if(valTwo === "0" && operator === "/"){
                    setText(">:(");
                    valOne = null;
                    valTwo = null;
                    solution = null;
                    operator = null;
                    displayState = "error";
                } else {
                    solution = operate(operator, valOne, valTwo);
                    if(solution.length > 12){
                        setText("Too long!");
                        solution = null;
                        valOne = null;
                        valTwo = null;
                        operator = null;
                        displayState = "error";
                    } else {
                        setText(solution);
                        valOne = solution;
                        displayState = "afterEq";
                    }
                }
            }
            break;

        case "afterEq":
            if(valIn === "="){
                solution = operate(operator, valOne, valTwo);
                if(solution.length > 12){
                    setText("Too long!");
                    solution = null;
                    valOne = null;
                    valTwo = null;
                    operator = null;
                    displayState = "error";
                } else {
                    setText(solution);
                    valOne = solution;
                }
            } else if(valIn === "."){
                valOne = "0.";
                setText(valOne);
                displayState = "oneNum";
            } else if(valType === "num"){
                setText(valIn);
                valOne = valIn;
                displayState = "oneNum"; 
            } else if(valType === "op"){
                setText(getText() + valIn);
                displayState = "numOp";
                operator = valIn;
            }
            break;
        
        case "error":
            break;
    }
}

function clearDisplay(){
    valOne = null;
    valTwo = null;
    solution = null;
    operator = null;
    setText(0);
    displayState = "zero";
}

function backSpace(){
    switch(displayState){
        case "zero":
            break;
        case "oneNum":
            if(getText().length === 1){
                setText(0);
                displayState = "zero";
            } else {
                setText(getText().substring(0,getText().length - 1));
            }
            valOne = getText();
            break;

        case "numOp":
            setText(getText().substring(0,getText().length - 1));
            displayState = "oneNum";
            break;

        case "twoNumOp":
            if(valTwo.length === 1){
                displayState = "numOp";
            } else {
                valTwo = valTwo.substring(0,valTwo.length - 1);
            }
            setText(getText().substring(0,getText().length - 1));
            break;

        case "afterEq":
            if(getText().length ===1){
                setText(0);
                displayState = "zero";
            } else {
                setText(getText().substring(0,getText().length - 1));
                displayState = "oneNum";
            }
            break;
    }
}