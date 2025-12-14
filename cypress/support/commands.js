import ModalLogin from '../pages/componentes/login.modal';

Cypress.Commands.add('login', (usuario) => {
  cy.fixture(usuario).then((dados) => {
    cy.get('body').then(($body) => {
      if ($body.find('[data-cy="btn-trigger-profile"]').length > 0) {
        ModalLogin.realizarLogin(dados.email, dados.senha);
      } else {
        cy.log('Usuário já autenticado');
      }
    });
  });
});
