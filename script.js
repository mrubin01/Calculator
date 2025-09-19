const labels = [
    "1", "2", "3",
    "4", "5", "6",
    "7", "8", "9",
    "0", "=", "+",
    "-", "*", "/"
];

const container = document.getElementById("buttonContainer");

labels.forEach(label => {
    const button = document.createElement("button");
    button.className = "btn";
    button.textContent = label;
    container.appendChild(button);
})
