import MelhoresMomentosPage from '../pages/melhoresMomentos.page';

describe('Melhores momentos', () => {
  beforeEach(() => {
    MelhoresMomentosPage.open();
    MelhoresMomentosPage.validarUrlHome();
  });

  it('Deve reproduzir o vídeo de melhores momentos', () => {
    MelhoresMomentosPage.navegarParaMelhoresMomentos();
    MelhoresMomentosPage.validarTelaMelhoresMomentos();
    MelhoresMomentosPage.clicarNoVideo();
    MelhoresMomentosPage.validarReproducaoVideo();
  });
});

