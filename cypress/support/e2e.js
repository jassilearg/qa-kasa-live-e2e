import './commands'
Cypress.on('uncaught:exception', (err) => {
    if (err.message.includes('reading \'document\'')) {
      return false; // impede o Cypress de falhar o teste
    }
  });
  