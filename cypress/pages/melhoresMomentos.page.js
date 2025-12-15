class HomePage {
    open() {
      cy.visit('/');
    }
  
    validarUrlHome() {
      cy.url().should('eq', 'https://www.kasa.live/');
    }
  
    navegarParaMelhoresMomentos() {
      cy.contains('Melhores momentos').click();
    }
  
    validarTelaMelhoresMomentos() {
      cy.contains('Melhores momentos das Partidas Finalizadas').should('be.visible');
    }
  
    clicarNoVideo() {
        cy.get('img[src*="youtube.com/vi"]').first().click({ force: true });
    }
  
    validarReproducaoVideo() {
      cy.get('iframe[src*="youtube.com"]').should('exist').and('be.visible');
    }
  }
  
  export default new HomePage();
  