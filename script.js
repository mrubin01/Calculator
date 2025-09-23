const labels = [
    "1", "2", "3",
    "4", "5", "6",
    "7", "8", "9",
    "0", "=", "+",
    "-", "*", "/"
];

const container = document.getElementById("buttonContainer");
const displayField = document.getElementById("displayField");
const resetButton = document.getElementById("resetButton");

// evaluate the number of tokens
function evaluateInput(input) {
    const tokens = input.trim().split(/\s+/);

    if (tokens.length < 3) return input;

    let result = Number(tokens[0]);

    for (let i = 1; i < tokens.length; i += 2) {
        const operator = tokens[i];
        const nextNumber = Number(tokens[i + i]);

        result = operate(result, nextNumber, operator); 

        if (result === "Error") return "Error"; 
    }

    return result; 
}

let evaluateFlag = false;

labels.forEach(label => {
    const button = document.createElement("button");
    button.className = "btn";
    button.textContent = label;
    button.style.aspectRatio = "1/1";

    // button listener
    button.addEventListener("click", () => {
        if (label === "=") {
            displayField.value = evaluateInput(displayField.value);
            evaluateFlag = true;
        } else if (["+", "-", "*", "/"].includes(label)) {
            displayField.value += ` ${label} `;
            evaluateFlag = false;
        } else {
            if (evaluateFlag) {
                displayField.value = label;
                evaluateFlag = false;
            } else {
                displayField.value = label;
            }
        }
    })
    container.appendChild(button);
})

function add(n1, n2) {
    return n1 + n2;
}

function subtract(n1, n2) {
    return n1 - n2;
}

function multiply(n1, n2) {
    return n1 * n2;
}

function divide(n1, n2) {
    return n2 !== 0 ? n1 / n2 : "Error";
}

function operate(n1, n2, operator) {
    if (operator === "+") {
        return add(n1, n2); 
    } else if (operator === "-") {
        return subtract(n1, n2);
    } else if (operator === "*") {
        return multiply(n1, n2);
    } else if (operator === "/") {
        return divide(n1, n2);
    }
}

// listener for the reset button
resetButton.addEventListener("click", () => {
  displayField.value = "";
});
