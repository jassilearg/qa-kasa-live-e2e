import FavoritosPage from '../pages/favoritos.page';

describe('Favoritos — Favoritar time', () => {
  beforeEach(() => {
    FavoritosPage.open();
    cy.login('usuario');
    cy.intercept('GET', '**/user/profile/**').as('getProfile');
    cy.wait('@getProfile');
    cy.visit('/favoritos');
    cy.url({ timeout: 10000 }).should('include', '/favoritos');
    FavoritosPage.esperarPaginaPronta();
  });

  it('CT-01 - Deve favoritar um time com sucesso', () => {
    FavoritosPage.favoritarPrimeiroTime();
  });
});
