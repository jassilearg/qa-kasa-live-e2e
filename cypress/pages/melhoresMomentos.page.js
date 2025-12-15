class MelhoresMomentos {
  open() {
    cy.visit('/melhores-momentos');
  }

  validarUrlMelhoresMomentos() {
    cy.url({ timeout: 10000 }).should('include', '/melhores-momentos');
  }

  validarTelaMelhoresMomentos() {
    cy.contains(
      'Melhores momentos das Partidas Finalizadas',
      { timeout: 10000 }
    ).should('be.visible');
  }

  clicarNoVideo() {
    cy.get('img[src*="youtube.com/vi"]', { timeout: 10000 })
      .first()
      .should('be.visible')
      .click({ force: true });
  }

  validarModalVideoAberto() {
    cy.get('[role="dialog"]', { timeout: 10000 })
      .should('exist')
      .and('be.visible');
  }

  abrirUltimoAccordion() {
    cy.get('[id^="accordion-button-"]', { timeout: 10000 })
      .last()
      .click({ force: true });
  }

  pesquisarCampeonato(nome) {
    cy.get('input[placeholder="Pesquisar"]', { timeout: 10000 })
      .last()
      .type(nome, { force: true });
  }

  selecionarPrimeiroCampeonato() {
    cy.get('input[type="checkbox"]', { timeout: 10000 })
      .first()
      .check({ force: true });
  }
  validarCampeonatoSelecionado() {
    cy.contains('p', 'Brasileirão Série A', { timeout: 10000 })
      .should('be.visible');
  }
  
}

export default new MelhoresMomentos();
