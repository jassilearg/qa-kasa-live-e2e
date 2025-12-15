import HomePage from '../pages/home.page';

describe('Home page', () => {
  beforeEach(() => {
    HomePage.open();
    HomePage.validarUrlHome();
  });

  it('Deve filtrar jogos pelo time', () => {
    HomePage.filtrarPorTime('Coritiba');
  });

  it('Deve filtrar jogos pelo campeonato Brasileirão Série A', () => {
    HomePage.filtrarPorCampeonato('Brasileirão Série A');
  });

  it('Deve retornar partidas da data via API', () => {
    const dataFiltro = '2025-05-10';
  
    HomePage.filtrarPorDataAPI(dataFiltro).then((results) => {
      expect(results.length).to.be.greaterThan(0);
    });
  });

});
