
class Calculator {
  constructor (previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement /*by doing this we set our output to the calculator class*/
    this.currentOperandTextElement = currentOperandTextElement
    this.clear() /*we call this function because we want the output section to be empty as sson as we start the calculator*/
  }

  clear() { /*this function is what is going to happen when the output section is cleared (when the AC button is clicked)*/
    this.currentOperand = ''
    this.previousOperand = ''
    this.operation = undefined /*this is so that any operation is not selected/working when the output section is cleared*/
  }
  delete() {

  }
  appendNumber (number) { /*this function is what is going to happen when a user clicks any number and it appears in the output section*/
    if (number === '.' && this.currentOperand.includes('.')) return //this statement only allows a period in the appendNumber
    this.currentOperand = this.currentOperand.toString() + number.toString() //this is to make the number be recognized as strings so they are not added together instead they are appended
  }
  chooseOperation (operation) { /*this function is what is going to happen when a user clicks any of the operation buttons*/

  }
  compute () { /*this function is take all our values inside the calculator and compute a single value i.e; the answer*/

  }
  updateDisplay () { /* a function to update the value inside the output section*/
    this.currentOperandTextElement.innerText = this.currentOperand
  }
}


const numberButtons = document.querySelectorAll('[data-number]') /*to select all our data-number elements. We use documentquerySelectorAll because there are multiple elements involved*/
const operationButtons = document.querySelectorAll('[data-operation]') /*to select all our data-operation elements*/
const allclearButton = document.querySelector('[data-allclear]')
const deleteButton = document.querySelector('[data-delete]')
const equalsButton = document.querySelector('[data-equals]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator (previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
  button.addEventListener('click',  () => {
    calculator.appendNumber(button.innerText) /*check timeline 20:29*/
    calculator.updateDisplay()
  })
})

operationButtons.forEach(button => {
  button.addEventListener('click',  () => {
    calculator.chooseOperation(button.innerText) /*check timeline 23:25*/
    calculator.updateDisplay()
  })
})
