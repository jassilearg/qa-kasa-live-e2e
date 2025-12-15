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
      ).should('exist')
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

    filtrarPorDataAPI(date) {
      return cy.request({
        method: 'GET',
        url: 'https://kasa-live.api.dev.loomi.com.br/api/1.0/match/',
        qs: {
          date_start: date,
          date_end: date,
          page: 1,
          ordering: 'DESC',
          status: 'ENDED',
          with_channel: true,
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.results).to.be.an('array');
        expect(response.body.results.length).to.be.greaterThan(0);
    
        response.body.results.forEach((match) => {
          const matchDate = match.datetime.split('T')[0];
          expect(matchDate).to.eq(date);
        });
    
        cy.log('Partidas retornadas:', response.body.results.map(m => `${m.team_a.name} vs ${m.team_b.name}`).join(', '));
        return cy.wrap(response.body.results);
      });
    }


    filtrarPorCanal(canal, channelId) {
      cy.get('#filter-streaming').type(canal);
  
      cy.get('body').then(($body) => {
        if ($body.find('.chakra-modal__body button').length > 0) {
          cy.get('.chakra-modal__body button').contains(canal).click();
          cy.log('Canal selecionado via UI');
        } else {
          cy.log(`O canal "${canal}" não está visível na interface`);
        }
      });
  
      return cy.request({
        method: 'GET',
        url: `https://www.kasa.live/_next/data/zY0MwD27k5U6rQOUXbn35/busca.json`,
        qs: {
          channel_name: canal,
          channel_id: channelId
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('pageProps');
        expect(response.body.pageProps).to.have.property('dehydratedState');
        expect(response.body.pageProps.dehydratedState).to.have.property('queries');
  
        const queries = response.body.pageProps.dehydratedState.queries;
        expect(queries.length).to.be.greaterThan(0);
  
        const hasChannel = queries.some(q => q.queryKey.includes(canal));
        expect(hasChannel).to.eq(true);
  
        cy.log(`Canal "${canal}" encontrado via API em queries: ${queries.map(q => q.queryKey).join(' | ')}`);
      });
    }
}

export default new HomePage();
