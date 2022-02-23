class Calculator{
    constructor(previousTextElement,currentTextElement){
        this.previousOperandTextElement = previousTextElement
        this.currentOperandTextElement = currentTextElement
        this.clear()
    
    }

clear(){
    this.currentOperand = '0'
    this.previuosOperand = ''
    this.operation = undefined
    this.previousOperandTextElement.innerText = ''
   
}

delete(){
    if( this.currentOperand.toString().length <= 1)return this.currentOperand = 0
    this.currentOperand = this.currentOperand.toString().slice(0,-1)

}
appendNumber(number){
    if(number === '.' && this.currentOperand.includes('.'))return
    this.currentOperand =  this.currentOperand.toString() + number.toString();
}

chooseOperation(operator){
if(this.currentOperand === "0")return
if(this.previuosOperand !== ""){
    this.compute()
}
this.operation = operator
this.previuosOperand = this.currentOperand
this.currentOperand = ""
}

compute(){
let computation 
const prev = parseFloat(this.previuosOperand)
const cur = parseFloat(this.currentOperand)
if(isNaN(prev) ||isNaN(cur))return
switch(this.operation){
    case '+':
    computation = prev + cur
    break;
    case '-':
        computation = prev - cur
        break;
    case '*':
         computation = prev * cur
         break;
    case '/':
       computation = prev / cur
          break;
    default:
        return
}
this.currentOperand = computation
this.operation = undefined
this.previuosOperand = ""
}
updateDisplay(){
    this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
    if(this.operation != null){
        this.previousOperandTextElement.innerText =  this.getDisplayNumber(this.previuosOperand) + " " + this.operation
    }
}


getDisplayNumber(number){
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split(".")[1]
    let integerDisplay
    if(isNaN(integerDigits)) integerDisplay = ""
    else integerDisplay = integerDigits.toLocaleString("en", {maximumFractionDigits: 0})
    if(decimalDigits == null) return integerDisplay
    return `${integerDisplay}.${decimalDigits}`
}
}

const numberButtons = document.querySelectorAll("#number")
const operationButtons = document.querySelectorAll('#operatoin')
const equalsButton = document.querySelector('#equals')
const deleteButton = document.querySelector('#delete')
const allClearButton = document.querySelector('#all-clear')
const previousOperandTextElement = document.querySelector('#previous-operand')
const currentOperandTextElement = document.querySelector('#current-operand')

const calculator = new Calculator(previousOperandTextElement,
    currentOperandTextElement)

    numberButtons.forEach(button => {
        button.addEventListener('click',() => {
            calculator.appendNumber(button.innerText)
            calculator.updateDisplay()
        })
    })

 operationButtons.forEach(button => {
     button.addEventListener("click", () => {
         calculator.chooseOperation(button.innerText)
         calculator.updateDisplay()
     })
 })   

 equalsButton.addEventListener("click", () => {
    calculator.compute()
    calculator.updateDisplay()
})

 
    allClearButton.addEventListener("click", () => {
        calculator.clear()
        calculator.updateDisplay()
    })



    deleteButton.addEventListener("click", () => {
        calculator.delete()
        calculator.updateDisplay()
    })
 