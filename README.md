## Projeto de Testes Automatizados - Kasa Live

Objetivo
Garantir a qualidade das funcionalidades core do sistema, priorizando fluxos críticos para o usuário final.

### Estrutura do Projeto
```project-root/
│
├── cypress/
│ ├── e2e/ # Testes automatizados
│ ├── fixtures/ # Dados de teste
│ ├── support/ # Comandos e configurações customizadas
│ └── pages/ # Páginas do sistema
├── docs/ # Documentação de testes (PDFs, estratégias)
├── cypress.config.ts # Configuração do Cypress
├── package.json
└── README.md
```

### Requisitos
- Node.js >= 18
- npm ou yarn
- Cypress (instalado via `npm install`)

### Configuração
1. Instalar dependências:
```bash
npm install
```
### Executando os Testes

- Rodar todos os testes:
```bash
npx cypress run
```
- Abrir interface visual do Cypress:
```bash
npx cypress open
```

Rodar um teste específico:
```bash
npx cypress run --spec "cypress/e2e/favoritos.cy.js"

```

### Boas práticas aplicadas

- Testes independentes e reprodutíveis

- Dados centralizados em fixtures

- Page objects

- Comandos customizados em support/commands.ts

- Priorização de fluxos críticos

- Estrutura modular para facilitar manutenção e escalabilidade

### Documentação de Testes: Estratégia e Execução de Testes (Resumo)

Os testes foram planejados com foco na validação das funcionalidades centrais do sistema, priorizando fluxos críticos e de maior impacto para o usuário final. O escopo contempla testes manuais, exploratórios e automatizados, com automação direcionada a fluxos repetíveis e de alto risco funcional, utilizando Cypress.

As funcionalidades avaliadas incluem favoritos, busca de partidas, melhores momentos e integração com Google Calendar. Os cenários foram priorizados considerando impacto ao usuário, frequência de uso e risco da funcionalidade. Parte dos fluxos não foi automatizada devido a dependências externas, instabilidade de interface ou limitações de testabilidade.

A execução dos testes resultou na identificação de falhas funcionais e oportunidades de melhoria, devidamente registradas no Trello como bugs ou sugestões. Também foram realizados testes de usabilidade, baseados em heurísticas, que evidenciaram pontos de melhoria relacionados à clareza da interface, consistência visual e previsibilidade das interações.

Os testes de compatibilidade foram executados em ambiente desktop, nos navegadores Chrome e Microsoft Edge, em sistemas Linux e Windows, com resultados satisfatórios. O Safari não foi testado por limitação de ambiente.

### Documento completo
O documento completo da Estratégia e Execução de Testes está disponível em:
```bash
docs/Estratégia de Testes – Kasa Live.pdf
```
