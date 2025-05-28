// npm install mongodb dotenv express body-parser mongoose bcrypt cors
// node server.js
// http://localhost:3000/
// Pressione Ctrl + C no terminal para desligar a conexão com o banco de dados.
// Crie uma pasta chamada "data" no Disco Local e dentro dessa pasta crie outra pasta chamada "db".
// C:\data\db
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');

// Inicializa o app
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
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
    console.log(`✅ Conectado ao MongoDB - Banco: ${dbName}`);
  } catch (error) {
    console.error("❌ Erro ao conectar ao MongoDB:", error);
    process.exit(1);
  }
}

connectDB();

// Rota de cadastro
app.post('/cadastro', async (req, res) => {
  try {
    const { nome, cpf, celular, email, senha } = req.body;

    if (!nome || !cpf || !celular || !email || !senha) {
      return res.status(400).send("⚠️ Todos os campos são obrigatórios.");
    }

    const colecao = db.collection("cadastros");
    const cpfFormatado = cpf.replace(/\D/g, '');
    const usuarioExistente = await colecao.findOne({ cpf: cpfFormatado });

    if (usuarioExistente) {
      return res.status(409).send("⚠️ CPF já cadastrado.");
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const dados = {
      nome,
      cpf: cpfFormatado,
      celular,
      email,
      senha: senhaHash
    };

    await colecao.insertOne(dados);

    res.send("✅ Cadastro realizado com sucesso!");
  } catch (err) {
    console.error("❌ Erro no cadastro:", err);
    res.status(500).send("Erro ao cadastrar.");
  }
});

// Rota de login
app.post('/login', async (req, res) => {
  try {
    const { cpf, senha } = req.body;

    if (!cpf || !senha) {
      return res.status(400).json({ sucesso: false, mensagem: "⚠️ CPF e senha são obrigatórios." });
    }

    const cpfFormatado = cpf.replace(/\D/g, '');
    const colecao = db.collection("cadastros");
    const usuario = await colecao.findOne({ cpf: cpfFormatado });

    if (usuario && await bcrypt.compare(senha, usuario.senha)) {
      res.status(200).json({ sucesso: true, mensagem: "✅ Login realizado com sucesso!" });
    } else {
      res.status(401).json({ sucesso: false, mensagem: "❌ CPF ou senha inválidos." });
    }
  } catch (error) {
    console.error("❌ Erro na autenticação:", error);
    res.status(500).json({ sucesso: false, mensagem: "Erro no servidor." });
  }
});

// Inicializa o servidor
app.listen(port, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${port}`);
});