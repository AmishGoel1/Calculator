const prev = document.querySelector('#up-screen');
const current = document.querySelector('#main-scr');
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const del = document.querySelector('.del');
const ac = document.querySelector('.C');
const eq = document.querySelector('.eq')
let inputValue = 0;
const calculator = {
    displayValue : '0',
    firstOperand : null,
    waitingForSecondOperand: false,
    operator : null,
}

function updateDisplay()
{
    current.textContent = calculator.displayValue;
}

numbers.forEach(number => {
    number.addEventListener('click', () => {
        inputDigit(number.textContent);
        updateDisplay();
    }
)
});

operators.forEach(oper => {
    oper.addEventListener('click', () => {
        handleOperator(oper.textContent);
        prev.textContent = calculator.displayValue + ' ' + calculator.operator;
        current.textContent = '';
        console.log(calculator.firstOperand, calculator.operator,calculator.displayValue,calculator.waitingForSecondOperand);
    }
)
});

ac.addEventListener('click', () => {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
    prev.textContent = null;
    updateDisplay();
})

eq.addEventListener('click', () => {
    handleOperator(eq.textContent);
    current.textContent = calculator.displayValue;
    prev.textContent = '';
})
del.addEventListener('click', () => {
    Delete();
})

function inputDigit(digit)
{
    const { displayValue, waitingForSecondOperand } = calculator;
    if(digit === '.' && displayValue.includes('.')) return;
    if(waitingForSecondOperand === true){
        calculator.displayValue = digit;
        calculator.waitingForSecondOperand = false;
    }
    else {
    calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }
    updateDisplay();
}

function handleOperator(nextOperator) {
    const { firstOperand, displayValue, operator } = calculator;
    inputValue = parseFloat(displayValue);
    if (operator && calculator.waitingForSecondOperand)  {
        calculator.operator = nextOperator;
        return;
    }
  
    if (firstOperand === null) {
      calculator.firstOperand = inputValue;
    }
    else if(operator)
    {
        const currentValue = firstOperand || 0;
        console.log(currentValue);
        const result = performCalculation[operator](firstOperand,inputValue)
        calculator.displayValue = parseFloat(result.toFixed(8));
        calculator.firstOperand = result;
    }
    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator;
}

const performCalculation = {
    '/': (firstOperand, secondOperand) => firstOperand / secondOperand,
  
    '*': (firstOperand, secondOperand) => firstOperand * secondOperand,
  
    '+': (firstOperand, secondOperand) => firstOperand + secondOperand,
  
    '-': (firstOperand, secondOperand) => firstOperand - secondOperand,
  
    '=': (firstOperand, secondOperand) => secondOperand
};

function Delete()
{
    if(calculator.waitingForSecondOperand = true)
    {    
        if(calculator.firstOperand = null)
        {
            return;
        }
        if(calculator.displayValue === "")
        {
            calculator.displayValue = inputValue.toString();
            calculator.operator = null;
            calculator.waitingForSecondOperand = false;
            prev.textContent = '';
            current.textContent = calculator.displayValue;
            return;
        }
     
    }
    calculator.displayValue = (calculator.displayValue).slice(0,-1);
    current.textContent = calculator.displayValue;
    console.log(calculator);
}