"use strict";

var input = document.querySelector("#input"),
    operator = document.querySelectorAll(".operator td"),
    numbers = document.querySelectorAll(".num td:not(.ans)"),
    result = document.querySelector(".ans"),
    clear = document.querySelector("#clear"),
    remove = document.querySelector("#remove"),
    ResultDisplayed = false;
//selecting all the elements from the html, seprate select ans and clear button


//adding click handlers to number buttons
for (let i = 0; i < numbers.length; i++) {
    numbers[i].addEventListener("click", function(e) {

        // storing current input string and its last character in variables - used later 
        var CS = input.innerHTML;
        var lastChar = CS[CS.length - 1]; 

        // if result is not displayed keep adding
        if (ResultDisplayed === false) {
            input.innerHTML += e.target.innerHTML;
        }

        else if (ResultDisplayed === true && lastChar == "+" || lastChar == "-" || 
        lastChar === "×" || lastChar === "÷") {
        // if result is displayed currently and user passed an operator
        // we need to keep adding to the string for next operation
            ResultDisplayed = false;
            input.innerHTML += e.target.innerHTML;
        }

        else {
        //if result is displayed and user pressed a number
        // we need to clear the input string and add the new input to start the new operation
            ResultDisplayed = false;
            input.innerHTML = "";
            input.innerHTML += e.target.innerHTML;

        }
    });
}

//adding click handlers to operators
for (let i = 0; i < operator.length; i++) {
    operator[i].addEventListener("click", function (e) {
        
        //storing current input string and its last character in variables - used later
        var CS = input.innerHTML;
        var lastChar = CS[CS.length -1];

        // if last character entered is an operator, replace it with the current pressed one
        if (lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷") {
            var newString = CS.substring(0, CS.length -1) + e.target.innerHTML;
            input.innerHTML = newString;
        }
        else if (CS.length == 0) {
            //if the first button pressed in an operator
            alert("enter a number first ");
        }
        else {
            //else just add an operator pressed to the input field
            input.innerHTML += e.target.innerHTML;
        }
    });
}

//onclick of equal button
result.addEventListener("click", function() {
    
    //this is the string that we will be processing
    var inputString = input.innerHTML;

    //forming an array of the numbers
    var number = inputString.split(/\+|\-|\×|\÷/g);

    //forming an array of the operators
    //first we replace all the numbers and dots with empty string and then split
    var operators = inputString.replace(/[0-9]|\./g, "").split("");

    console.log(inputString)
    console.log(number)
    console.log(operators)
    console.log("________________________")
    
    //now loop the array and doing one operation at a time.
    //first divide then multiply then subtraciton then addition
    //as this is running the numbers are altering
    //the final remaining will the answer

    var divide = operators.indexOf("÷");
    while (divide != -1) {
        number.splice(divide, 2, number[divide] / number[divide + 1]);
        operators.splice(divide, 1);
        divide = operators.indexOf("÷");
    }

    var multiply = operators.indexOf("×");
    while (multiply != -1) {
        number.splice(multiply, 2, number[multiply] * number[multiply + 1]);
        operators.splice(multiply, 1);
        multiply = operators.indexOf("×");
    }

    
    var subtract = operators.indexOf("-");
    while (subtract != -1) {
        number.splice(subtract, 2, number[subtract] - number[subtract + 1]);
        operators.splice(subtract, 1);
        subtract = operators.indexOf("-");
    }

    var addition = operators.indexOf("+");
    while (addition != -1) {
        //using parseFloat is necessary, otherwise it will result in a string concatenation
        number.splice(addition, 2, parseFloat(number[addition]) + parseFloat(number[addition + 1]));
        operators.splice(addition, 1);
        addition = operators.indexOf("+");
    }

input.innerHTML = number[0]; //display the output

//clearing the input if pressed clear
clear.addEventListener("click", function () {
    input.innerHTML = "";
})
})

//adding single character backspace
remove.addEventListener("click", function (e) {
    var v = input.innerHTML;
    var n = v.substring(0, v.length - 2)

    input.innerHTML = n;
})

//trying to add keyboard inputs into the calculator
