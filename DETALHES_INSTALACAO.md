# Detalhes de Instalação e Configuração

Este documento explica tudo que foi instalado e configurado para que o sistema Angular consiga buscar dados no banco Oracle.

---

## 1. Estrutura do Projeto

```
regu-angular/
├── src/app/                  # Código Angular (frontend)
├── server.js                 # Servidor Node.js/Express (backend)
├── config.env                # Configuração de conexão Oracle
├── package.json              # Dependências e scripts
├── start.bat                 # Script para Windows
└── ...
```

---

## 2. Dependências Instaladas

### Backend (Node.js)
- **express@4**: Servidor HTTP para API REST
- **oracledb**: Driver oficial para conectar Node.js ao Oracle
- **cors**: Permite requisições do Angular para o backend
- **dotenv**: Carrega variáveis de ambiente do arquivo `config.env`

### Frontend (Angular)
- **@angular/core, @angular/forms, @angular/router, etc**: Framework Angular
- **@angular/common/http**: Para fazer requisições HTTP ao backend

### Desenvolvimento
- **concurrently**: Executa frontend e backend juntos em modo dev
- **@types/express, @types/cors, @types/oracledb**: Tipagens para TypeScript

---

## 3. Configuração de Conexão com o Oracle

Arquivo: `config.env`
```
ORACLE_UPDATE_HOST=10.243.77.31
ORACLE_UPDATE_PORT=1521
ORACLE_UPDATE_SERVICE=SERVREGUPRD
ORACLE_UPDATE_USER=dbamvfor
ORACLE_UPDATE_PASSWORD=dbmv11g
```
- **Obs:** O Oracle Client deve estar instalado na máquina.

---

## 4. Scripts do package.json

- `npm run dev` — Executa backend (porta 3000) e frontend (porta 4200) juntos para desenvolvimento
- `npm run server` — Executa apenas o backend (Node.js/Express)
- `npm run start` — Executa apenas o frontend Angular

---

## 5. Como funciona a busca de dados

1. O usuário acessa a interface Angular e preenche CPF ou Atendimento.
2. O Angular faz uma requisição GET para `http://localhost:3000/api/cidadao?cpf=...` ou `?atendimento=...`
3. O backend (server.js) recebe a requisição, conecta no Oracle usando o driver `oracledb` e executa a query:
   ```sql
   SELECT tc.nm_cidadao, tc.nr_cpf, tc.nr_cep, tc.ds_logradouro as rua, 
          tc.nr_lote, tc.ds_bairro, tc.cd_uf, uf.nm_uf as Estado, 
          m.descr_munic, tl.cd_tipo_fone, tl.nr_telefone
   FROM dbamvfor.tb_cidadao tc
   LEFT JOIN dbamvfor.municipio m ON m.id_munic = tc.cd_municipio_resid
   INNER JOIN dbamvfor.uf uf ON uf.cd_uf = tc.cd_uf
   INNER JOIN dbamvfor.tb_telefone tl ON tl.cd_cidadao = tc.cd_cidadao
   WHERE tc.nr_cpf = :cpf
   ```
   ou
   ```sql
   WHERE tc.cd_cidadao = :atendimento
   ```
4. O resultado é retornado em formato JSON para o Angular, que exibe na tabela.

---

## 6. Dicas e Observações

- O backend precisa estar rodando para o frontend conseguir buscar os dados.
- O Oracle Client (Instant Client) deve estar instalado e configurado no PATH do Windows.
- O arquivo `config.env` **NÃO** deve ser versionado (está no .gitignore).
- Se mudar as credenciais do banco, edite o `config.env`.
- Se der erro de conexão, verifique firewall, usuário/senha e se o Oracle está acessível.

---

## 7. Como rodar tudo do zero

1. Instale Node.js e Oracle Client na máquina.
2. Clone o projeto e entre na pasta `regu-angular/regu-angular`.
3. Rode:
   ```bash
   npm install
   npm run dev
   ```
4. Acesse `http://localhost:4200` (dev) ou `http://localhost:3000` (produção).
