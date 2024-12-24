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

  const cypressCommands = {
    'cy.visit': 'Visit a URL',
    'cy.get': 'Get DOM elements by selector',
    'cy.contains': 'Find elements by text and optionally click',
    'cy.request': 'Make an HTTP request',
    'cy.exec': 'Execute a system command',
    'cy.log': 'Print a message to the Cypress Command Log'
  };

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
    outputArea.classList.remove('success');
    outputArea.classList.remove('error');
    outputArea.classList.remove('warning');

    setTimeout(() => {

      if (code === 'help') {
        const helpMessage = `Common Cypress commands and examples:

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
        outputArea.classList.add('error');

        outputArea.textContent = message;

        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      } else {
        message = `Code executed successfully:\n\n${code}`;

        const command = code.split('(')[0];

        if (cypressCommands.hasOwnProperty(command)) {
          switch (command) {
            case 'cy.visit':
              if (code.includes('(')) {
                message = `Success:\n\n${code} // Visited URL ${code.split('(')[1].replace(')', '')}`;
                outputArea.classList.add('success');
              } else {
                message = `Error:\n\nMissing parentheses on ${code} command`;
                outputArea.classList.add('error');
              }
              break;
            case 'cy.get':
              if (code.includes('(')) {
                message = `Success:\n\n${code} // Got element by selector ${code.split('(')[1].replace(')', '')}`;
                outputArea.classList.add('success');
              } else {
                message = `Error:\n\nMissing parentheses on ${code} command`;
                outputArea.classList.add('error');
              }
              break;
            case 'cy.exec':
              if (code.includes('(')) {
                message = `Success:\n\n${code} // Executed system command ${code.split('(')[1].replace(')', '')}`;
                outputArea.classList.add('success');
              } else {
                message = `Error:\n\nMissing parentheses on ${code} command`;
                outputArea.classList.add('error');
              }
              break;
            case 'cy.log':
              if (code.includes('(')) {
                message = `Success:\n\n${code} // Logged message ${code.split('(')[1].replace(')', '')}`;
                outputArea.classList.add('success');
              } else {
                message = `Error:\n\nMissing parentheses on ${code} command`;
                outputArea.classList.add('error');
              }
              break;
            default:
              message = `Warning:\n\nThe command \`${command}\` has not been implemented yet.`;
              outputArea.classList.add('warning');
              break;
          }
        } else {
          message = `Error:\n\nInvalid Cypress command: ${code}`;
          outputArea.classList.add('error');
        }

        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });

        outputArea.textContent = message;
      }

      runButton.disabled = false;
      runButton.classList.remove('loading');
      runButton.innerHTML = 'Run';
    }, 2000);
  }
});
