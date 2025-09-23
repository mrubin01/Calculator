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

labels.forEach(label => {
    const button = document.createElement("button");
    button.className = "btn";
    button.textContent = label;
    button.style.aspectRatio = "1/1";

    // button listener
    button.addEventListener("click", () => {
        if (label === "=") {
            try {

                const tokens = displayField.value.trim().split(" ");
                if (tokens.length === 3) {
                    const [n1, operator, n2] = tokens;
                    const result = operate(Number(n1), Number(n2), operator);      
                    displayField.value = result;
                } else {
                    displayField.value = "Error";
                }
                
            } catch {
                displayField.value = "Error"; 
            }
        } else if (["+", "-", "*", "/"].includes(label)) {
            displayField.value += ` ${label} `; 
        } else {
            displayField.value += label; 
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
