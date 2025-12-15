import HomePage from '../pages/home.page';

describe('Home page', () => {
  beforeEach(() => {
    HomePage.open();
    HomePage.validarUrlHome();
  });

  it('Deve filtrar jogos pelo time', () => {
    HomePage.filtrarPorTime('Coritiba');
  });

  it('Deve filtrar jogos pelo campeonato', () => {
    HomePage.filtrarPorCampeonato('Brasileirão Série A');
  });

  it('Deve retornar partidas da data via API', () => {
    const dataFiltro = '2025-05-10';
  
    HomePage.filtrarPorDataAPI(dataFiltro).then((results) => {
      expect(results.length).to.be.greaterThan(0);
    });
  });

  it('Deve filtrar partidas pelo canal via UI e API', () => {
    const canal = 'GloboEsporte.com';
    const channelId = 671;

    HomePage.filtrarPorCanal(canal, channelId);
  });
});
