const codeInput = document.getElementById('codeInput');
const runButton = document.getElementById('runButton');

codeInput.addEventListener('input', () => {
  runButton.disabled = !codeInput.value.trim();
});

function runCode() {
  const code = document.getElementById('codeInput').value;
  const outputArea = document.getElementById('outputArea');

  // Simulating running the code
  outputArea.textContent = "Running... Please wait.";

  setTimeout(() => {
    const message = Math.random() < 0.01
      ? "There's a glitch in the Matrix"
      : `Code executed successfully:\n\n${code}`;

    // In real-world cases, we'd send the code to a backend for evaluation
    outputArea.textContent = message;
  }, 2000);
}
