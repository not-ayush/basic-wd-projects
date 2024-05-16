const clear = document.querySelector("#clear");
const equals = document.querySelector("#equals");
const back = document.querySelector("#back");
const neg = document.querySelector("#neg");
const display = document.querySelector("#display");
const nums = document.querySelectorAll(".operand");
const operators = document.querySelectorAll(".operator");

let displayStack = ["", "", ""];

function updateDisplay() {
    display.textContent = displayStack.join("");
}

clear.addEventListener("click", () => {
    displayStack = ["", "", ""];
    updateDisplay();
});

neg.addEventListener("click", () => {
    if (displayStack[1] == "") {
        if (displayStack[0].startsWith("-"))
            displayStack[0] = displayStack[0].substring(1);
        else displayStack[0] = "-" + displayStack[0];
    } else {
        if (displayStack[2].startsWith("-"))
            displayStack[2] = displayStack[2].substring(1);
        else displayStack[2] = "-" + displayStack[2];
    }
    updateDisplay();
});

equals.addEventListener("click", () => {
    display.textContent = compute();
    displayStack = ["", "", ""];
});

back.addEventListener("click", () => {
    for (let i = 2; i >= 0; i--) {
        if (displayStack[i] != '') {
            displayStack[i] = displayStack[i].substring(0,displayStack[i].length - 1 )
            updateDisplay()
            return
        }
    }
});

nums.forEach((num) => {
    num.addEventListener("click", (e) => {
        let temp = e.target.textContent;
        if (displayStack[1] == "" && displayStack[2] == "")
            displayStack[0] += temp;
        else if (displayStack[0] != "" && displayStack[1] != "")
            displayStack[2] += temp;
        updateDisplay();
    });
});

operators.forEach((op) => {
    op.addEventListener("click", (e) => {
        let temp = e.target.textContent;
        // according to what state is there, put the operator or compute next state
        if (displayStack[0] != "" && displayStack[2] == ""){
            displayStack[1] = temp;
            updateDisplay();
        } else if (displayStack.every((e) => {return e != "";})) {
            if (displayStack[1] == '/' && displayStack[2] == '0') { // zero divide with operator pressed
                displayStack = ["", "", ""]
                display.textContent = "don't do that"
            } else  {
                displayStack = [compute().toString(), temp, ""];
                updateDisplay();
            }
        }
        
    });
});

function compute() {
    let exp = displayStack.join("");
    let regex = /(-?\d*)([\*+-\/])(-?\d*)/g;
    let matchObj = exp.matchAll(regex);
    let matchArr = Array.from(matchObj)[0]; // get the first (also the only) match
    let A = Number(matchArr[1]);
    let operator = matchArr[2];
    let B = Number(matchArr[3]);
    switch (operator) {
        case "+":
            return A + B;
        case "/":
            if (B == 0) {
                return "don't do that"
            }
            return (A / B).toFixed(3);
        case "-":
            return A - B;
        case "*":
            return A * B;
    }
}

