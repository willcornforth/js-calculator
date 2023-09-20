// Global vars
let sum = {
    firstNumber: 0,
    secondNumber: 0,
    operator: 0,
    result: 0,
    hasSelectedOperator: false,
}
const dispOutput = document.querySelector("#disp-output");

function handlePressedNumber(numPressed)
{
    const parseNewNum = (currNum, numPressed) => {
        let newNum = currNum.toString() + numPressed
        return parseFloat(newNum);
    }
   
    if(!sum.hasSelectedOperator) 
    {
        // Handle first number
        sum.firstNumber = parseNewNum(sum.firstNumber, numPressed);
        dispOutput.textContent = sum.firstNumber;
    }
    else 
    {
        // Handle second number
        sum.secondNumber = parseNewNum(sum.secondNumber, numPressed);
        dispOutput.textContent = sum.secondNumber;
    }
}

function handlePressedOperator(opPressed)
{
    if (Number.isFinite(sum.firstNumber) && sum.firstNumber != undefined)
    {
        sum.hasSelectedOperator = true;
        sum.operator = opPressed;
    }
}

function executeSum()
{
    if (sum.hasSelectedOperator &&
    Number.isFinite(sum.firstNumber) &&
    Number.isFinite(sum.secondNumber))
    {
        switch(sum.operator)
        {
            case '/':
                sum.result = sum.firstNumber / sum.secondNumber;
                break;
            case '*':
                sum.result = sum.firstNumber * sum.secondNumber;
                break;
            case '+':
                sum.result = sum.firstNumber + sum.secondNumber;
                break;
            case '-':
                sum.result = sum.firstNumber - sum.secondNumber;
                break;
            case '%':
                sum.result = sum.firstNumber / 100;
                break;
        }

        dispOutput.textContent = sum.result;
        postSum();
    }
}

function postSum()
{
    // Push result as next first number to use.
    sum.firstNumber = sum.result;
    sum.secondNumber = 0;
    sum.operator = 0;
    sum.result = 0;
    sum.hasSelectedOperator = false;
}

function clearSum()
{
    sum.firstNumber = 0;
    sum.secondNumber = 0;
    sum.operator = 0;
    sum.result = 0;
    sum.hasSelectedOperator = false;

    dispOutput.textContent = "CLR";
}

function handleMiscOperators(targetId)
{
    const flipSign = (input) => 
    {
        if (input > 0)
            return parseFloat("-" + input.toString());
        else
            return Math.abs(input);
    } 
    const appendDecimal = (input) => 
    {
        if (input.toString().slice(-1) != '.')
            return input.toString() + '.';
        else
            return input.toString().substring(0, input.toString().length - 1);
    }
    const doBackspace = (input) => {
        return parseFloat(input.toString().substring(0, input.toString().length - 1));
    }

    if (!sum.hasSelectedOperator)
    {
        if (targetId == "btn-sign")
        {
            sum.firstNumber = flipSign(sum.firstNumber);
        }
        else if (targetId == "btn-dec") 
        {
            sum.firstNumber = appendDecimal(sum.firstNumber);
        }
        else if (targetId == "btn-backspace")
        {
            sum.firstNumber = doBackspace(sum.firstNumber);
        }
        dispOutput.textContent = sum.firstNumber;
    }
    else
    {
        if (targetId == "btn-sign")
        {
            sum.secondNumber = flipSign(sum.secondNumber);
        }
        else if (targetId == "btn-dec")
        {
            sum.secondNumber = appendDecimal(sum.secondNumber);
        }
        else if (targetId == "btn-backspace")
        {
            sum.secondNumber = doBackspace(sum.secondNumber);
        }
        dispOutput.textContent = sum.secondNumber;
    }
}

function postPress()
{
    const delta = dispOutput.textContent.length - 11;

   if (delta > 0) 
        dispOutput.textContent = dispOutput.textContent.substring(0, 11);
}

// Global click listener.
document.addEventListener("click", (event) =>
{
    console.log(event.target.id);

    const buttonEnum = {
        "btn-0": 0,
        "btn-1": 1,
        "btn-2": 2,
        "btn-3": 3,
        "btn-4": 4,
        "btn-5": 5,
        "btn-6": 6,
        "btn-7": 7,
        "btn-8": 8,
        "btn-9": 9,
    }

    const operatorEnum = {
        "btn-plus": '+',
        "btn-minus": '-',
        "btn-mul": '*',
        "btn-div": '/',
        "btn-percent": '%',        
    }

    if (event.target.id == "btn-sum")
    {
        executeSum();
    }
    else if (event.target.id == "btn-dec" || event.target.id == "btn-sign" || event.target.id == "btn-backspace")
    {
        handleMiscOperators(event.target.id);
    }
    else if (event.target.id == "btn-clr")
    {
        clearSum();
    }
    else if (buttonEnum[event.target.id] != undefined) 
    {
        handlePressedNumber(buttonEnum[event.target.id]);
    }
    else if (operatorEnum[event.target.id] != undefined) 
    {
        handlePressedOperator(operatorEnum[event.target.id]);
    }

    postPress();
});

document.addEventListener("keydown", (event) => 
{
    const keyPressed = parseInt(event.key);
    if (keyPressed)
    {
        handlePressedNumber(keyPressed);
    }
    else
    {
        switch(event.key)
        {
            case "Backspace":
                handleMiscOperators("btn-backspace");
                break;
            case "*":
                handlePressedOperator("*");
                break;
            case "/":
                handlePressedOperator("/");
                break;
            case "+":
                handlePressedOperator("+");
                break;
            case "-":
                handlePressedOperator("-");
                break;
            case "Enter":
                executeSum();
                break;
            default:
                console.log(event);
                    break;
        }
    }
    postPress();
});