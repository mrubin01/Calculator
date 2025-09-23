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

    // listener: to be implemented
    button.addEventListener("click", () => {
        if (label === "=") {
            try {
                displayField.value = math.evaluate(displayField); 
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
    return n1 / n2;
}

function operate(n1, n2, operator) {
    if (operator === "+") {
        add(n1, n2); 
    } else if (operator === "-") {
        subtract(n1, n2);
    } else if (operator === "*") {
        multiply(n1, n2);
    } else if (operator === "/") {
        divide(n1, n2);
    }
}

// add listener for the reset button
resetButton.addEventListener("click", () => {
  resultField.value = "";
});
