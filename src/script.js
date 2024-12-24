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
    codeInput.value = '';
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
    const code = codeInput.value;
    const outputArea = document.getElementById('outputArea');

    runButton.disabled = true;
    runButton.classList.add('loading');
    runButton.innerHTML = '<div class="spinner"></div> Running...';

    outputArea.textContent = "Running... Please wait.";
    outputArea.classList.remove('error-message');

    setTimeout(() => {
      if (code === 'help') {
        const helpMessage = `Common Cypress Commands and Examples:

1. cy.visit(url)
Description: Navigate to a specific URL.
Example: cy.visit('https://example.com')

2. cy.get(selector)
Description: Get a DOM element based on a selector.
Example: cy.get('.button-class')

3. cy.contains(text)
Description: Find an element by its text and optionally perform actions.
Example: cy.contains('Submit').click()

4. cy.contains(selector, text)
Description: Find an element by the combinatoin of its selector and text, and optionally perform actions.
Example: cy.contains('a', 'Subscribe to our newsletter').click()

5. cy.request(method, url)
Description: Make an HTTP request (GET, POST, etc.)
Example: cy.request('GET', 'https://api.example.com/users')

6. cy.exec(command)
Description: Execute a system command (on the host machine).
Example: cy.exec('ls')

7. cy.log(message)
Description: Log a message to the Cypress command log.
Example: cy.log('Test completed successfully')

For more details, visit the <a href="https://docs.cypress.io/api/table-of-contents" target="_blank" rel="noopener noreferrer">official Cypress API documentation</a>.`;

        outputArea.innerHTML = helpMessage;

        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      } else if (Math.random() < 0.01) {
        message = "There's a glitch in the Matrix.";
        isError = true;
        outputArea.classList.add('error-message');

        outputArea.textContent = message;

        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      } else {
        message = `Code executed successfully:\n\n${code}`;

        outputArea.textContent = message;
      }

      runButton.disabled = false;
      runButton.classList.remove('loading');
      runButton.innerHTML = 'Run';
    }, 2000);
  }
});
