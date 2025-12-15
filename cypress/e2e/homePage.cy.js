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
});
