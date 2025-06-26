# Sistema de Busca de Cidadãos - Regu Angular

Sistema simples para buscar dados de cidadãos no banco Oracle, desenvolvido em Angular com backend Node.js/Express.

## Funcionalidades

- Busca de cidadãos por CPF ou número de atendimento
- Interface moderna e responsiva
- Conexão direta com banco Oracle
- Exibição dos resultados em tabela organizada

## Pré-requisitos

- Node.js (versão 18 ou superior)
- Oracle Client instalado no sistema
- Acesso ao banco Oracle com as credenciais configuradas

## Instalação

1. Clone o repositório
2. Instale as dependências:
```bash
npm install
```

## Configuração

1. Verifique se o arquivo `config.env` está configurado com as credenciais corretas do Oracle:
```
ORACLE_UPDATE_HOST=10.243.77.31
ORACLE_UPDATE_PORT=1521
ORACLE_UPDATE_SERVICE=SERVREGUPRD
ORACLE_UPDATE_USER=dbamvfor
ORACLE_UPDATE_PASSWORD=dbmv11g
```

2. Certifique-se de que o Oracle Client está instalado e configurado no sistema.

## Executando o Projeto

### Desenvolvimento
Para executar o projeto em modo de desenvolvimento (servidor + frontend):
```bash
npm run dev
```

### Produção
1. Build do projeto Angular:
```bash
npm run build
```

2. Executar apenas o servidor (que serve o frontend também):
```bash
npm run server
```

## Uso

1. Acesse a aplicação no navegador: `http://localhost:3000`
2. Digite um CPF ou número de atendimento nos campos correspondentes
3. Clique em "Pesquisar" para buscar os dados
4. Os resultados serão exibidos na tabela abaixo

## Estrutura do Projeto

```
regu-angular/
├── src/
│   ├── app/
│   │   ├── cidadao-busca/          # Componente principal de busca
│   │   ├── services/
│   │   │   └── cidadao.ts          # Serviço para API
│   │   └── app.*                   # Arquivos principais do Angular
│   └── ...
├── server.js                       # Servidor Express/Node.js
├── config.env                      # Configurações do banco
└── package.json
```

## API Endpoints

- `GET /api/cidadao?cpf={cpf}` - Busca por CPF
- `GET /api/cidadao?atendimento={atendimento}` - Busca por número de atendimento

## Tecnologias Utilizadas

- **Frontend**: Angular 20, TypeScript, SCSS
- **Backend**: Node.js, Express, OracleDB
- **Banco de Dados**: Oracle Database

## Suporte

Para dúvidas ou problemas, verifique:
1. Se o Oracle Client está instalado corretamente
2. Se as credenciais no `config.env` estão corretas
3. Se há conectividade com o banco Oracle
