const labels = [
    "1", "2", "3",
    "4", "5", "6",
    "7", "8", "9",
    "0", "=", "+",
    "-", "*", "/", "."
];

const container = document.getElementById("buttonContainer");
const displayField = document.getElementById("displayField");
const resetButton = document.getElementById("resetButton");

// evaluate the number of tokens
function evaluateInput(input) {
    const tokens = input.trim().split(/\s+/);

    if (tokens.length === 0) return "";
    if (tokens.length === 1) return Number(tokens[0]);

    let result = Number(tokens[0]);

    for (let i = 1; i < tokens.length; i += 2) {
        const operator = tokens[i];
        const nextToken = tokens[i + 1];
        const nextNumber = nextToken !== undefined ? Number(nextToken) : 0;

        result = operate(result, nextNumber, operator); 

        if (result === "Error") return "Error"; 
    }

    return result; 
}

// track last action
let lastAction = null;

// add digit numbers
labels.forEach(label => {
    const button = document.createElement("button");
    button.className = "btn";
    button.textContent = label;
    button.style.aspectRatio = "1/1";

    // button listener
    button.addEventListener("click", () => {
        if (label === "=") {
            const value = evaluateInput(displayField.value);
            displayField.value = value === "" ? "" : String(value);
            lastAction = 'equals';
            return;
      }

      if (["+", "-", "*", "/"].includes(label)) {
        // If user clicks operator repeatedly, replace the previous operator
        if (lastAction === 'operator') {
          // remove last " <op> " (3 chars) and add the new one
          displayField.value = displayField.value.slice(0, -3) + ` ${label} `;
        } else if (lastAction === 'equals' || lastAction === 'digit' || lastAction === null) {
          // If last was equals, we want to continue from the result; just append operator
          // (If resultField is empty and operator is pressed, do nothing)
          if (displayField.value.trim() !== "") {
            displayField.value = `${displayField.value} ${label} `;
          }
        }
        lastAction = 'operator';
        return;
      }

      // If last action was 'equals' and user didn't press an operator in between,
      // start a fresh number (replace the displayed result).
      if (lastAction === 'equals') {
        displayField.value = label; // start new number
      } else {
        displayField.value += label; // continue current entry
      }
      lastAction = 'digit';
    });

    container.appendChild(button);
  });

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
