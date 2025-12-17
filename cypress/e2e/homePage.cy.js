import HomePage from '../pages/home.page';

describe('Home page', () => {
  beforeEach(() => {
    HomePage.abrirPaginaInicial();
    HomePage.validarUrlPaginaInicial();
  });

  it('CT-02.1 - Deve filtrar jogos pelo time', () => {
    HomePage.filtrarPorTime('Coritiba');
  });

  it('CT-02.2 - Deve retornar partidas da data via API', () => {
    const dataFiltro = '2025-05-10';
  
    HomePage.filtrarPorDataAPI(dataFiltro).then((results) => {
      expect(results.length).to.be.greaterThan(0);
    });
  });

  it('CT-02.3 - Deve filtrar jogos pelo campeonato', () => {
    HomePage.filtrarPorCampeonato('Brasileirão Série A');
  });

  it('CT-02.4 - Deve filtrar partidas pelo canal via UI e API', () => {
    const canal = 'GloboEsporte.com';
    const channelId = 671;

    HomePage.filtrarPorCanal(canal, channelId);
  });

});
