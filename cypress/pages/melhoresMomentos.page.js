class MelhoresMomentos {

  seletores = {
    accordionButton: '[id^="accordion-button-"]',
    inputPesquisar: 'input[placeholder="Pesquisar"]',
    checkboxCampeonato: 'input[type="checkbox"]',
    tituloTela: 'Melhores momentos das Partidas Finalizadas',
    mensagemSemTime: 'Nenhum time foi encontrado',
    videoThumbnail: 'img[src*="youtube.com/vi"]',
    modalVideo: '[role="dialog"]'
  };

  open() {
    cy.visit('/melhores-momentos');
  }

  validarUrlMelhoresMomentos() {
    cy.url({ timeout: 10000 })
      .should('include', '/melhores-momentos');
  }

  validarTelaMelhoresMomentos() {
    cy.contains(this.seletores.tituloTela, { timeout: 10000 })
      .should('be.visible');
  }

  clicarNoPrimeiroVideo() {
    cy.get(this.seletores.videoThumbnail, { timeout: 10000 })
      .first()
      .should('be.visible')
      .click({ force: true });
  }

  validarModalVideoAberto() {
    cy.get(this.seletores.modalVideo, { timeout: 10000 })
      .should('exist')
      .and('be.visible');
  }

  abrirPrimeiroAccordion() {
    cy.get(this.seletores.accordionButton, { timeout: 10000 })
      .first()
      .click({ force: true });
  }

  abrirUltimoAccordion() {
    cy.get(this.seletores.accordionButton, { timeout: 10000 })
      .last()
      .click({ force: true });
  }

  pesquisarCampeonato(nome) {
    cy.get(this.seletores.inputPesquisar, { timeout: 10000 })
      .last()
      .clear({ force: true })
      .type(nome, { force: true });
  }

  selecionarPrimeiroCampeonato() {
    cy.get(this.seletores.checkboxCampeonato, { timeout: 10000 })
      .first()
      .check({ force: true });
  }

  validarCampeonatoSelecionado(nome = 'Brasileirão Série A') {
    cy.contains('p', nome, { timeout: 10000 })
      .should('be.visible');
  }

  pesquisarTimeInexistente(time) {
    cy.get(this.seletores.inputPesquisar, { timeout: 10000 })
      .first()
      .clear({ force: true })
      .type(time, { delay: 150 });
  }

  validarMensagemNenhumTimeEncontrado() {
    cy.contains(this.seletores.mensagemSemTime, { timeout: 10000 })
      .should('be.visible');
  }
}

export default new MelhoresMomentos();
