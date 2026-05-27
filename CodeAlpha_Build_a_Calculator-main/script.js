let expression = "";
const displayElement = document.getElementById("display");
const realTimeElement = document.getElementById("previous-op");

// --- Input Functions ---
function appendNumber(number) {
    if (expression === "0" && number !== ".") expression = "";
    expression += number;
    updateDisplay();
}

function appendOperator(op) {
    if (expression === "" && op !== "-") return;
    const lastChar = expression.slice(-1);
    if (["+", "-", "*", "/"].includes(lastChar)) {
        expression = expression.slice(0, -1) + op;
    } else {
        expression += op;
    }
    updateDisplay();
}

function clearScreen() {
    expression = "";
    updateDisplay();
}

function deleteLast() {
    expression = expression.slice(0, -1);
    updateDisplay();
}

// --- Calculation ---
function updateDisplay() {
    displayElement.innerText = expression || "0";
    
    // Real-time result preview
    try {
        if (expression && !["+", "-", "*", "/"].includes(expression.slice(-1))) {
            const result = eval(expression);
            realTimeElement.innerText = result !== undefined ? result : "";
        } else {
            realTimeElement.innerText = "";
        }
    } catch {
        realTimeElement.innerText = "";
    }
}

function calculate() {
    try {
        if (!expression) return;
        const result = eval(expression);
        expression = result.toString();
        realTimeElement.innerText = "";
        displayElement.innerText = expression;
    } catch {
        displayElement.innerText = "Error";
        expression = "";
    }
}

// --- Keyboard Support ---
document.addEventListener("keydown", (e) => {
    if (e.key >= 0 && e.key <= 9) appendNumber(e.key);
    if (e.key === ".") appendNumber(".");
    if (["+", "-", "*", "/"].includes(e.key)) appendOperator(e.key);
    if (e.key === "Enter" || e.key === "=") calculate();
    if (e.key === "Backspace") deleteLast();
    if (e.key === "Escape") clearScreen();
});