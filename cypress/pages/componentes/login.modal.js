class ModalLogin {
    seletores = {
      botaoPerfil: '[data-cy="btn-trigger-profile"]',
      campoEmail: '[data-cy="login-email"]',
      campoSenha: '[data-cy="login-password"]',
      botaoEntrar: '[data-cy="login-submit"]',
    };
  
    abrir() {
      cy.get(this.seletores.botaoPerfil).click();
    }
  
    preencherEmail(email) {
      cy.get(this.seletores.campoEmail)
        .should('be.visible')
        .clear()
        .type(email);
    }
  
    preencherSenha(senha) {
      cy.get(this.seletores.campoSenha)
        .should('be.visible')
        .clear()
        .type(senha, { log: false });
    }
  
    clicarEntrar() {
      cy.get(this.seletores.botaoEntrar).click();
    }
  
    realizarLogin(email, senha) {
      this.abrir();
      this.preencherEmail(email);
      this.preencherSenha(senha);
      this.clicarEntrar();
    }
}
  
export default new ModalLogin();
