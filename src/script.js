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
    'cy.log': 'Print a message to the Cypress Command Log',
    'cy.clearAllCookies': 'Clear all cookies',
    'cy.clearAllLocalStorage': 'Clear localStorage data for all origins with which the test has interacted',
    'cy.clearAllSessionStorage': 'Clear sessionStorage data for all origins with which the test has interacted',
    'cy.clearCookie': 'Clear a specific browser cookie',
    'cy.clearCookies': 'Clear browser cookies for a domain',
    'cy.clearLocalStorage': 'Clear data in localStorage for current domain and subdomain',
    'cy.clock': 'cy.clock() overrides native global functions related to time allowing them to be controlled synchronously via cy.tick() or the yielded clock object',
    'cy.debug': 'Set a debugger and log what the previous command yields',
    'cy.document': 'Get the window.document of the page that is currently active',
    'cy.fixture': 'Load a fixed set of data located in a file',
    'cy.focused': 'Get the DOM element that is currently focused',
    'cy.getAllCookies': 'Get all browser cookies',
    'cy.getAllLocalStorage': 'Get localStorage data for all origins with which the test has interacted',
    'cy.getAllSessionStorage': 'Get sessionStorage data for all origins with which the test has interacted',
    'cy.getCookie': 'Get a browser cookie by its name',
    'cy.getCookies': 'Get browser cookies for the current domain or the specified domain',
    'cy.go': 'Navigate back or forward to the previous or next URL in the browser\'s history',
    'cy.hash': 'Get the current URL hash of the page that is currently active',
    'cy.intercept': 'Spy and stub network requests and responses',
    'cy.location': 'Get the global window.location object of the page that is currently active',
    'cy.origin': 'Visit multiple domains of different origin in a single test',
    'cy.pause': 'Stop cy commands from running and allow interaction with the application under test.',
    'cy.readFile': 'Read a file and yield its contents',
    'cy.reload': 'Reload the page',
    'cy.root': 'Get the root DOM element',
    'cy.screenshot': 'Take a screenshot of the application under test',
    'cy.scrollTo': 'Scroll to a specific position',
    'cy.session': 'Cache and restore cookies, localStorage, and sessionStorage (i.e. session data) in order to recreate a consistent browser context between tests',
    'cy.setCookie': 'Set a browser cookie',
    'cy.spy': 'Wrap a method in a spy in order to record calls to and arguments of the function',
    'cy.stub': 'Replace a function, record its usage and control its behavior',
    'cy.task': 'Execute code in Node via the task plugin event',
    'cy.tick': 'Move time after overriding a native time function with cy.clock()',
    'cy.title': 'Get the document.title property of the page that is currently active',
    'cy.url': 'Get the current URL of the page that is currently active',
    'cy.viewport': 'Control the size and orientation of the screen for your application',
    'cy.wait': 'Wait for a number of milliseconds or wait for an aliased resource to resolve before moving on to the next command',
    'cy.window': 'Get the window object of the page that is currently active',
    'cy.wrap': 'Yield the object passed into .wrap(). If the object is a promise, yield its resolved value',
    'cy.writeFile': 'Write to a file with the specified contents'
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
Example: <span>cy.get('.button-class')</span>

3. cy.contains(text)
Description: Find an element by its text and optionally perform actions.
Example: <span>cy.contains('Submit').click())</span>

4. cy.contains(selector, text)
Description: Find an element by the combinatoin of its selector and text, and optionally perform actions.
Example: <span>cy.contains('a', 'Subscribe to our newsletter').click())</span>

5. cy.request(method, url)
Description: Make an HTTP request (GET, POST, etc.)
Example: <span>cy.request('GET', 'https://api.example.com/users'))</span>

6. cy.exec(command)
Description: Execute a system command (on the host machine).
Example: <span>cy.exec('ls'))</span>

7. cy.log(message)
Description: Log a message to the Cypress command log.
Example: <span>cy.log('Test completed successfully'))</span>

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
            case 'cy.pause':
              if (code.includes('(')) {
                message = `Success:\n\n${code} // Paused Cypress execution`;
                outputArea.classList.add('success');
              } else {
                message = `Error:\n\nMissing parentheses on ${code} command`;
                outputArea.classList.add('error');
              }
              break;
            case 'cy.title':
              if (code.includes('(')) {
                message = `Success:\n\n${code} // Got the document.title property of the active page`;
                outputArea.classList.add('success');
              } else {
                message = `Error:\n\nMissing parentheses on ${code} command`;
                outputArea.classList.add('error');
              }
              break;
            case 'cy.focused':
              if (code.includes('(')) {
                message = `Success:\n\n${code} // Got the DOM element that is currently focused`;
                outputArea.classList.add('success');
              } else {
                message = `Error:\n\nMissing parentheses on ${code} command`;
                outputArea.classList.add('error');
              }
              break;
            case 'cy.fixture':
              if (code.includes('(')) {
                message = `Success:\n\n${code} // Loaded a fixed set of data located in the ${code.split('(')[1].replace(')', '')} file`;
                outputArea.classList.add('success');
              } else {
                message = `Error:\n\nMissing parentheses on ${code} command`;
                outputArea.classList.add('error');
              }
              break;
            case 'cy.task':
              if (code.includes('(')) {
                message = `Success:\n\n${code} // Executed Node code via the ${code.split('(')[1].replace(')', '')} task`;
                outputArea.classList.add('success');
              } else {
                message = `Error:\n\nMissing parentheses on ${code} command`;
                outputArea.classList.add('error');
              }
              break;
            case 'cy.reload':
              if (code.includes('(')) {
                message = `Success:\n\n${code} // Reloaded the page`;
                outputArea.classList.add('success');
              } else {
                message = `Error:\n\nMissing parentheses on ${code} command`;
                outputArea.classList.add('error');
              }
              break;
            case 'cy.readFile':
              if (code.includes('(')) {
                message = `Success:\n\n${code} // Read the ${code.split('(')[1].replace(')', '')} file and yielded its contents`;
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
