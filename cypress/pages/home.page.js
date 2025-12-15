class HomePage {
  seletores = {
    inputFiltroTime: '#filter-team',
    inputFiltroCampeonato: '#filter-championship',
    itemPopover: '#popover-body-custom-popover',
    resultadoTime: 'p[title]',
    inputFiltroStreaming: '#filter-streaming',
    abaMelhoresMomentos: 'Melhores momentos',
    tituloMelhoresMomentos: 'Melhores momentos das Partidas Finalizadas',
    miniaturaYoutube: 'img[src*="youtube.com/vi"]',
    iframeYoutube: 'iframe[src*="youtube.com"]',
    botaoPesquisa: '#popover-trigger-custom-popover > div.css-0 > div > div:nth-child(2) > div > div > svg',
    mensagemSemResultados: 'main > div > div > p',
  };

  abrirPaginaInicial() {
    cy.visit('/');
  }

  validarUrlPaginaInicial() {
    cy.location('origin', { timeout: 10000 }).should('eq', 'https://www.kasa.live');
  }

  digitarNomeDoTime(time) {
    cy.intercept('GET', '**/team/**').as('getTeam');

    cy.get(this.seletores.inputFiltroTime, { timeout: 10000 })
      .clear({ force: true })
      .type(time, { force: true, delay: 150 });

    cy.wait('@getTeam');
  }

  selecionarTimeNoModal(time) {
    cy.contains(`${this.seletores.itemPopover} p`, time, { timeout: 10000 })
      .should('exist')
      .click({ force: true });
  }

  validarTimeNaTela(time) {
    cy.contains(this.seletores.resultadoTime, time, { timeout: 10000 })
      .should('exist')
      .and('contain.text', time);
  }

  filtrarPorTime(time) {
    this.digitarNomeDoTime(time);
    this.selecionarTimeNoModal(time);
    this.validarTimeNaTela(time);
  }

  digitarNomeDoCampeonato(campeonato) {
    cy.get(this.seletores.inputFiltroCampeonato, { timeout: 10000 })
      .clear({ force: true })
      .type(campeonato, { force: true });
  }

  selecionarCampeonatoNoModal(campeonato) {
    cy.get(`${this.seletores.itemPopover} div > div > div > div > div > div > div > p`, { timeout: 15000 })
      .contains(campeonato, { timeout: 15000 })
      .scrollIntoView()
      .click({ force: true });
  }

  validarCampeonatoNaTela(campeonato) {
    cy.contains(this.seletores.resultadoTime, campeonato, { timeout: 10000 })
      .should('exist')
      .and('be.visible');
  }

  filtrarPorCampeonato(campeonato) {
    this.digitarNomeDoCampeonato(campeonato);
    this.selecionarCampeonatoNoModal(campeonato);
    this.validarCampeonatoNaTela(campeonato);
  }

  filtrarPorDataAPI(data) {
    return cy.request({
      method: 'GET',
      url: 'https://kasa-live.api.dev.loomi.com.br/api/1.0/match/',
      qs: {
        date_start: data,
        date_end: data,
        page: 1,
        ordering: 'DESC',
        status: 'ENDED',
        with_channel: true,
      }
    }).then((resposta) => {
      expect(resposta.status).to.eq(200);
      expect(resposta.body.results).to.be.an('array');
      expect(resposta.body.results.length).to.be.greaterThan(0);

      resposta.body.results.forEach((partida) => {
        const dataPartida = partida.datetime.split('T')[0];
        expect(dataPartida).to.eq(data);
      });

      cy.log('Partidas retornadas:', resposta.body.results.map(p => `${p.team_a.name} vs ${p.team_b.name}`).join(', '));
      return cy.wrap(resposta.body.results);
    });
  }

  filtrarPorCanal(canal, channelId) {
    cy.get(this.seletores.inputFiltroStreaming).type(canal);

    cy.get('body').then(($body) => {
      if ($body.find('.chakra-modal__body button').length > 0) {
        cy.get('.chakra-modal__body button').contains(canal).click();
        cy.log('Canal selecionado via interface');
      } else {
        cy.log(`O canal "${canal}" não está visível na interface`);
      }
    });

    return cy.request({
      method: 'GET',
      url: `https://www.kasa.live/_next/data/zY0MwD27k5U6rQOUXbn35/busca.json`,
      qs: { channel_name: canal, channel_id: channelId }
    }).then((resposta) => {
      expect(resposta.status).to.eq(200);
      expect(resposta.body).to.have.property('pageProps');
      expect(resposta.body.pageProps).to.have.property('dehydratedState');
      expect(resposta.body.pageProps.dehydratedState).to.have.property('queries');

      const consultas = resposta.body.pageProps.dehydratedState.queries;
      expect(consultas.length).to.be.greaterThan(0);
      const existeCanal = consultas.some(q => q.queryKey.includes(canal));
      expect(existeCanal).to.eq(true);

      cy.log(`Canal "${canal}" encontrado via API em queries: ${consultas.map(q => q.queryKey).join(' | ')}`);
    });
  }

  navegarParaMelhoresMomentos() {
    cy.contains(this.seletores.abaMelhoresMomentos).click();
  }

  validarTelaMelhoresMomentos() {
    cy.contains(this.seletores.tituloMelhoresMomentos).should('be.visible');
  }

  clicarNoVideo() {
    cy.get(this.seletores.miniaturaYoutube).first().click({ force: true });
  }

  validarReproducaoVideo() {
    cy.get(this.seletores.iframeYoutube).should('exist').and('be.visible');
  }

  clicarBotaoPesquisa() {
    cy.get(this.seletores.botaoPesquisa, { timeout: 10000 }).click({ force: true });
  }

  validarMensagemSemResultados() {
    cy.contains(
      'Sem resultados de busca para partidas ao vivo, seleção de melhores partidas, próximas partidas e partidas finalizadas.',
      { timeout: 10000 }
    ).should('be.visible');
  }

  buscarTimeSemResultados(time) {
    cy.get(this.seletores.inputFiltroTime, { timeout: 10000 })
      .clear({ force: true })
      .type(time, { force: true, delay: 150 });

    cy.get(this.seletores.inputFiltroTime)
      .type('{enter}', { force: true });

    cy.contains(
      'Sem resultados de busca para partidas ao vivo, seleção de melhores partidas, próximas partidas e partidas finalizadas.',
      { timeout: 10000 }
    ).should('exist');
    
  }
}

export default new HomePage();
