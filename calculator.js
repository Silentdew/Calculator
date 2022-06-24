
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
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
  }
  appendNumber (number) { /*this function is what is going to happen when a user clicks any number and it appears in the output section*/
    if (number === '.' && this.currentOperand.includes('.')) return //this statement only allows a period in the appendNumber
    this.currentOperand = this.currentOperand.toString() + number.toString() //this is to make the number be recognized as strings so they are not added together instead they are appended
  }
  chooseOperation (operation) { /*this function is what is going to happen when a user clicks any of the operation buttons*/
    if (this.currentOperand === ' ') return //this doesn't allow the display and inout of any operation as long as the previousOperand or currentOperand is empty hence the empty string
    if (this.previousOperand !== ' ') {
      this.compute() //when the previousOperand is not empty [e.g 254 +] and the currentOperand is not empty [e.g 1], it computes when you try to choose another operation [e.g -]therefore previousOperand => [255-]
    }
    this.operation = operation
    this.previousOperand = this.currentOperand // to make the initial input  move to the previousOperand thereby allowing room for new input
    this.currentOperand = ' ' //this clears out the currentOperand hence the empty string
  }

  compute () { /*this function is take all our values inside the calculator and compute a single value i.e; the answer*/
    let computation //computation is the result/answer to any calculation
    const prev = parseFloat(this.previousOperand) //this converts the string version of the values in previousOperand to actual number
    const current = parseFloat(this.currentOperand) //this converts the string version of the values in currentOperand to actual number
    if (isNaN(prev) ||  isNaN(current)) return //if we don't have a previous value in previousOperand or current value in currentOperand then the computation won't run
    switch (this.operation) {
      case '+':
        computation = prev + current
        break;
      case '-':
          computation = prev - current
          break;
      case '×':
          computation = prev * current
          break;
      case '÷':
          computation = prev / current
          break;
      default:
       return
    }
    this.currentOperand = computation
    this.operation = undefined
    this.previousOperand = ' '
  }


  updateDisplay () { /* a function to update the value inside the output section*/
    this.currentOperandTextElement.innerText = this.currentOperand
    this.previousOperandTextElement.innerText = this.previousOperand
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

equalsButton.addEventListener('click', button=> {
  calculator.compute()
  calculator.updateDisplay()
})


allclearButton.addEventListener('click', button=> {
  calculator.clear()
  calculator.updateDisplay()
})
deleteButton.addEventListener('click', button=> {
  calculator.delete()
  calculator.updateDisplay()
})
