document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login');
  const loginButton = document.querySelector('#login form button');
  const mainContent = document.querySelector('.content');
  const logoutButton = document.getElementById('logoutButton');
  const sandwichMenu = document.getElementById('sandwich-menu');
  const dropdownMenu = document.getElementById('dropdown-menu');
  const codeInput = document.getElementById('codeInput');
  const runButton = document.getElementById('runButton');

  lucide.createIcons();

  loginButton.addEventListener('click', event => {
    event.preventDefault();
    loginForm.style.display = 'none';
    mainContent.style.display = 'flex';
    sandwichMenu.style.display = 'flex';
  });

  sandwichMenu.addEventListener('click', () => {
    dropdownMenu.classList.toggle('show');
  });

  document.addEventListener('click', event => {
    if (!sandwichMenu.contains(event.target) && !dropdownMenu.contains(event.target)) {
      dropdownMenu.classList.remove('show');
    }
  });

  logoutButton.addEventListener('click', () => {
    loginForm.style.display = 'flex';
    mainContent.style.display = 'none';
    sandwichMenu.style.display = 'none';
    dropdownMenu.classList.remove('show');
  });

  codeInput.addEventListener('input', () => {
    runButton.disabled = !codeInput.value.trim();
  });

  runButton.addEventListener('click', runCode);

  function runCode() {
    const code = document.getElementById('codeInput').value;
    const outputArea = document.getElementById('outputArea');

    outputArea.textContent = "Running... Please wait.";

    setTimeout(() => {
      if (code === 'help') {
        outputArea.innerHTML = `Visit the below URL, then access the Commands link on the left menu item to get a list of all available Cypress commands:\n\n<a href="https://docs.cypress.io/api/table-of-contents" target="_blank" rel="noopener noreferrer">https://docs.cypress.io/api/table-of-contents</a>`;
      } else {
        const message = Math.random() < 0.01
        ? "There's a glitch in the Matrix."
        : `Code executed successfully:\n\n${code}`;

        outputArea.textContent = message;
      }
    }, 2000);
  }
});
