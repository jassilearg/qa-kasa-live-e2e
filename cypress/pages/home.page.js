class HomePage {
    open() {
      cy.visit('/');
    }

    validarUrlHome() {
      cy.location('origin', { timeout: 10000 })
        .should('eq', 'https://www.kasa.live');
    }

    digitarNomeDoTime(time) {
      cy.intercept('GET', '**/team/**').as('getTeam');

      cy.get('#filter-team', { timeout: 10000 })
        .clear({ force: true })
        .type(time, { force: true, delay: 150 });
  
      cy.wait('@getTeam');
    }

    selecionarTimeNoModal(time) {
      cy.contains(
        '#popover-body-custom-popover p',
        time,
        { timeout: 10000 }
      )
        .should('exist')
        .click({ force: true });
    }

    validarResultadoNaTela(time) {
      cy.contains('p[title]', time, { timeout: 10000 })
        .should('exist')
        .and('contain.text', time);
    }

    filtrarPorTime(time) {
      this.digitarNomeDoTime(time);
      this.selecionarTimeNoModal(time);
      this.validarResultadoNaTela(time);
    }

    digitarNomeDoCampeonato(championship) {
        cy.get('#filter-championship', { timeout: 10000 })
          .clear({ force: true })
          .type(championship, { force: true });
    }
      
    selecionarCampeonatoNoModal(championship) {
        cy.get('#popover-body-custom-popover div > div > div > div > div > div > div > p', { timeout: 15000 })
            .contains(championship, { timeout: 15000 })
            .scrollIntoView()
            .click({ force: true });
    }
      
      
    validarCampeonatoNaTela(championship) {
        cy.contains('p[title]', championship, { timeout: 10000 })
            .should('exist')
            .and('be.visible');
    }
      
    filtrarPorCampeonato(championship) {
        this.digitarNomeDoCampeonato(championship);
        this.selecionarCampeonatoNoModal(championship);
        this.validarCampeonatoNaTela(championship);
    }
}

export default new HomePage();
