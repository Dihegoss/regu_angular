const express = require('express');
const cors = require('cors');
const oracledb = require('oracledb');
const path = require('path');
require('dotenv').config({ path: './config.env' });

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Configuração do Oracle
const dbConfig = {
  user: process.env.ORACLE_UPDATE_USER,
  password: process.env.ORACLE_UPDATE_PASSWORD,
  connectString: `${process.env.ORACLE_UPDATE_HOST}:${process.env.ORACLE_UPDATE_PORT}/${process.env.ORACLE_UPDATE_SERVICE}`,
  poolMin: 10,
  poolMax: 10,
  poolIncrement: 0
};

// Inicializar pool de conexões
async function initialize() {
  try {
    await oracledb.createPool(dbConfig);
    console.log('Pool de conexões Oracle criado com sucesso');
  } catch (err) {
    console.error('Erro ao criar pool de conexões:', err);
  }
}

// API para buscar dados do cidadão
app.get('/api/cidadao', async (req, res) => {
  const { cpf, atendimento } = req.query;
  
  if (!cpf && !atendimento) {
    return res.status(400).json({ error: 'CPF ou Atendimento é obrigatório' });
  }

  let connection;
  try {
    connection = await oracledb.getConnection();
    
    let query = `
      SELECT tc.nm_cidadao, tc.nr_cpf, tc.nr_cep, tc.ds_logradouro as rua, 
             tc.nr_lote, tc.ds_bairro, tc.cd_uf, uf.nm_uf as Estado, 
             m.descr_munic, tl.cd_tipo_fone, tl.nr_telefone
      FROM dbamvfor.tb_cidadao tc
      LEFT JOIN dbamvfor.municipio m ON m.id_munic = tc.cd_municipio_resid
      INNER JOIN dbamvfor.uf uf ON uf.cd_uf = tc.cd_uf
      INNER JOIN dbamvfor.tb_telefone tl ON tl.cd_cidadao = tc.cd_cidadao
      WHERE 1=1
    `;
    
    const binds = [];
    
    if (cpf) {
      query += ` AND tc.nr_cpf = :cpf`;
      binds.push(cpf);
    }
    
    if (atendimento) {
      query += ` AND tc.cd_cidadao = :atendimento`;
      binds.push(atendimento);
    }

    const result = await connection.execute(query, binds, {
      outFormat: oracledb.OUT_FORMAT_OBJECT
    });

    res.json(result.rows);
  } catch (err) {
    console.error('Erro na consulta:', err);
    res.status(500).json({ error: 'Erro interno do servidor' });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error('Erro ao fechar conexão:', err);
      }
    }
  }
});

// Rota para servir arquivos estáticos do Angular (após build)
app.use(express.static(path.join(__dirname, 'dist/regu-angular/browser')));

// Rota para servir o Angular (deve ser a última)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/regu-angular/browser/index.html'));
});

// Inicializar e iniciar servidor
initialize().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Acesse: http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('Erro ao inicializar:', err);
}); 