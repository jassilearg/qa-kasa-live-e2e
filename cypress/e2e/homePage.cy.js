import HomePage from '../pages/home.page';

describe('Home page', () => {
  beforeEach(() => {
    HomePage.open()
    cy.login('usuario');
  });

  it('', () => {
    
  });
});
