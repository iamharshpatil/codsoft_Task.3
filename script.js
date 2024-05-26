// script.js
document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    const buttons = Array.from(document.getElementsByClassName('button'));
    let operator = null;
    let currentInput = '';
    let previousInput = '';
    let resultDisplayed = false;

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const value = this.getAttribute('data-value');
            
            if (value === 'C') {
                currentInput = '';
                previousInput = '';
                operator = null;
                display.textContent = '0';
                resultDisplayed = false;
                return;
            }
            
            if (value === '=') {
                if (operator && previousInput !== '' && currentInput !== '') {
                    currentInput = eval(`${previousInput}${operator}${currentInput}`).toString();
                    display.textContent = currentInput;
                    previousInput = currentInput;
                    currentInput = '';
                    operator = null;
                    resultDisplayed = true;
                }
                return;
            }

            if (['+', '-', '*', '/'].includes(value)) {
                if (resultDisplayed) {
                    resultDisplayed = false;
                }

                if (operator && currentInput === '') {
                    operator = value;
                    display.textContent = previousInput + ' ' + operator;
                    return;
                }

                if (previousInput === '' && currentInput === '') return;

                if (previousInput !== '' && currentInput !== '') {
                    previousInput = eval(`${previousInput}${operator}${currentInput}`).toString();
                    operator = value;
                    currentInput = '';
                    display.textContent = previousInput + ' ' + operator;
                    return;
                }

                operator = value;
                previousInput = currentInput || previousInput;
                currentInput = '';
                display.textContent = previousInput + ' ' + operator;
                return;
            }

            if (value === '.' && currentInput.includes('.')) return;

            if (resultDisplayed) {
                currentInput = '';
                resultDisplayed = false;
            }

            currentInput += value;
            display.textContent = currentInput;
        });
    });
});

let clear = document.querySelector("#clear")
clear.addEventListener("click",()=>{
    location.reload();
})