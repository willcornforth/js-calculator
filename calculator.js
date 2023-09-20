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

function changeInputSign()
{
    const flipSign = (input) => 
    {
        if (input > 0)
            return parseFloat("-" + input.toString());
        else
            return Math.abs(input);
    } 

    if (!sum.hasSelectedOperator)
    {
        sum.firstNumber = flipSign(sum.firstNumber);
        dispOutput.textContent = sum.firstNumber;
    }
    else
    {
        sum.secondNumber = flipSign(sum.secondNumber);
        dispOutput.textContent = sum.secondNumber;
    }
}

// Global click listener.
document.addEventListener("click", function(event)
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

    if (event.target.id == "btn-sum" &&
        sum.hasSelectedOperator &&
        Number.isFinite(sum.firstNumber) &&
        Number.isFinite(sum.secondNumber)
        )
    {
        executeSum();
    }
    else if (event.target.id == "btn-sign")
    {
        changeInputSign();
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
});