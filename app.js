const displayEquation = document.querySelector('.displayEquation');
const displayMain = document.querySelector('.displayMain');
const tempResult = document.querySelector('.tempResult');
const num = document.querySelectorAll('.number')
const operation = document.querySelectorAll('.operation')
const equal = document.querySelector('.equal')
const clearAll = document.querySelector('.clear-all')
const clearLastEntity = document.querySelector('.last-entity')

let disEquationNum = '';
let disMainNum = '';
let result = null;
let lastOperation = '';
let haveDot = false;

//Returning the number and decimal condition
num.forEach((number) => {
    number.addEventListener('click', (e) => {
        //chekcing if we clicking the dot and we dont have dot previously in our number
        if (e.target.innerText === '.' && !haveDot) {
            haveDot = true;
        } else if (e.target.innerText === '.' && haveDot) {
            return;
        }
        disMainNum += e.target.innerText;
        displayMain.innerText = disMainNum;

    });
});

operation.forEach(operation => {
    operation.addEventListener('click', (e) => {
        if (!disMainNum) return;
        haveDot = false;
        const operationName = e.target.innerText;
        if (disEquationNum && disMainNum && lastOperation) {
            mathOperation();
        } else {
            result = parseFloat(disMainNum);
        }
        clearVar(operationName);
        lastOperation = operationName
        console.log(result)
    })
})

function clearVar(name = '') {
    disEquationNum += disMainNum + '' + name + ' ';
    displayEquation.innerText = disEquationNum;
    displayMain.innerText = '';
    disMainNum = '';
    tempResult.innerText = result;
}


//Creating the Math Operations
function mathOperation() {
    if (lastOperation === '*') {
        result = parseFloat(result) * parseFloat(disMainNum);
    } else if (lastOperation === '/') {
        result = parseFloat(result) / parseFloat(disMainNum);
    } else if (lastOperation === '-') {
        result = parseFloat(result) - parseFloat(disMainNum);
    } else if (lastOperation === '+') {
        result = parseFloat(result) + parseFloat(disMainNum);
    }
}


//Creating the equals Function
equal.addEventListener('click', (e) => {
    if (!displayEquation || !disMainNum) return;
    haveDot = false;
    mathOperation();
    clearVar();
    displayMain.innerText = result;
    tempResult.innerText = '';
    disEquationNum = result;
    disMainNum = '';
})


//Creating the Clear all operation (C)
clearAll.addEventListener('click', (e) => {
    displayEquation.innerText = '0';
    displayMain.innerText = '0';
    tempResult.innerText = '0';
    disEquationNum = '';
    disMainNum = '';
    result = '';
})


//Creating the clear last entity opertaion (CE)
clearLastEntity.addEventListener('click', (e) => {
    displayMain.innerText = '';
    disMainNum = '';
})

//Creating input for keyboard 
window.addEventListener('keydown', (e) => {
    if (
        e.key === '0' ||
        e.key === '1' ||
        e.key === '2' ||
        e.key === '3' ||
        e.key === '4' ||
        e.key === '5' ||
        e.key === '6' ||
        e.key === '7' ||
        e.key === '8' ||
        e.key === '9' ||
        e.key === '.'
    ) {
        clickButton(e.key);
    } else if (
        e.key === '*' ||
        e.key === '/' ||
        e.key === '%' ||
        e.key === '+' ||
        e.key === '-'
    ) {
        clickOperation(e.key)
    } else if (
        e.key == 'Enter' || e.key === '='
    ) {
        clickEqual(e.key)
    }
});


//Creating the function for the button key stroke to input the numbers
function clickButton(key) {
    num.forEach(button => {
        if (button.innerText === key) {
            button.click();
        }
    })
}

//Creating the function for the button key stroke to input the opertaions
function clickOperation(key) {
    operation.forEach(button => {
        if (button.innerText === key) {
            button.click();
        }
    })
}


//Creating the Equal function for keyboard
function clickEqual(key) {
    equal.click(key);
};
