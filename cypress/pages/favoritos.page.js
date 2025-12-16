class FavoritosPage {
    seletores = {
      botaoFavoritarTime: '[data-cy="btn-favorite-team"]',
      botaoConfirmarTimes: '[data-cy="btn-submit-teams"]',
      cardTimeFavorito: '.css-1ubyim7',
      modalSelecaoTimes: '[role="dialog"]',
    };

    open(){
       cy.visit('/favoritos');
      }

    esperarPaginaPronta() {
      cy.url({ timeout: 10000 }).should('include', '/favoritos');
        cy.get(this.seletores.botaoFavoritarTime, { timeout: 10000 })
        .should('exist');
    }

    clicarEmFavoritarTime() {
      cy.get(this.seletores.botaoFavoritarTime, { timeout: 10000 })
        .should('exist')
        .scrollIntoView()
        .click({ force: true });
    }
    adicionarPrimeiroTimeDaLista() {
        cy.get('button')
          .contains(/^Add$/)
          .first()
          .should('exist')
          .click({ force: true });
    }

    confirmarSelecaoDeTimes() {
      cy.get(this.seletores.botaoConfirmarTimes, { timeout: 10000 })
        .should('exist')
        .scrollIntoView()
        .click({ force: true });
    }
  
    validarTimeFavoritado() {
      cy.get(this.seletores.cardTimeFavorito, { timeout: 10000 })
        .first()
        .should('exist');
    }

    favoritarPrimeiroTime() {
      this.clicarEmFavoritarTime();
      this.adicionarPrimeiroTimeDaLista();
      this.confirmarSelecaoDeTimes();
      this.validarTimeFavoritado();
    }
}
  
export default new FavoritosPage();
