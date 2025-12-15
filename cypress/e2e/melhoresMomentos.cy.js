import MelhoresMomentos from '../pages/melhoresMomentos.page';

describe('Melhores momentos', () => {
  beforeEach(() => {
    MelhoresMomentos.open();
    MelhoresMomentos.validarUrlMelhoresMomentos();
  });

  it('Deve reproduzir o vídeo de melhores momentos', () => {
    MelhoresMomentos.validarTelaMelhoresMomentos();
    MelhoresMomentos.clicarNoVideo();
    MelhoresMomentos.validarModalVideoAberto();
  });

  it('Deve exibir vídeos ao pesquisar por campeonato', () => {
    MelhoresMomentos.abrirUltimoAccordion();
    MelhoresMomentos.pesquisarCampeonato('Brasileirão Série A');
    MelhoresMomentos.selecionarPrimeiroCampeonato();
    MelhoresMomentos.validarCampeonatoSelecionado();
  });
});
