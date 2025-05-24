// npm install mongodb dotenv express body-parser mongoose
// node server.js
// http://localhost:3000/
// Pressione Ctrl + C no terminal para desligar a conexão com o banco de dados.
// Crie uma pasta chamada "data" no Disco Local e dentro dessa pasta crie outra pasta chamada "db".
// C:\data\db
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

// Conexão com MongoDB
const client = new MongoClient(process.env.MONGO_URI);

let db;

async function connectDB() {
  try {
    await client.connect();
    const dbName = process.env.DB_NAME;
    db = client.db(dbName);
    console.log(`Conectado ao MongoDB - Banco: ${dbName}`);
  } catch (error) {
    console.error("Erro ao conectar ao MongoDB:", error);
    process.exit(1);
  }
}

connectDB();

// Rota de cadastro
app.post('/cadastro', async (req, res) => {
  try {
    const { nome, cpf, celular, email, senha } = req.body;

    const dados = {
      nome,
      cpf: cpf.replace(/\D/g, ''),
      celular,
      email,
      senha
    };

    const colecao = db.collection("cadastros");
    await colecao.insertOne(dados);

    res.send("Cadastro realizado com sucesso!");
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao cadastrar.");
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

// Rota de login
app.post('/login', async (req, res) => {
  try {
    const { cpf, senha } = req.body;
    const colecao = db.collection("cadastros");
    const usuario = await colecao.findOne({
      cpf: cpf.replace(/\D/g, ''),
      senha
    });

    if (usuario) {
      res.status(200).json({ sucesso: true });
    } else {
      res.status(401).json({ sucesso: false, mensagem: 'CPF ou senha inválidos.' });
    }
  } catch (error) {
    console.error("Erro na autenticação:", error);
    res.status(500).json({ sucesso: false, mensagem: 'Erro no servidor.' });
  }
});