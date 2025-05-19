const express = require('express');
const JogoDAO = require("./daos/jogoDAO");
const EmpresaDAO = require("./daos/empresaDAO");
const db = require('./db').db; // Importa a instância do banco de dados

const app = express();
const APP_PORT = process.env.APP_PORT || 3000;

// Realiza uma parse do body para uma estrutura JSON
app.use(express.json());

app.listen(APP_PORT, () => {
    console.log(`Servidor rodando na porta ${APP_PORT}`);
    console.log(`Acesse a url http://localhost: ${APP_PORT}`);
});

app.get('/', (req,res) => res.send('Servidor rodando, tudo ok. Essa é a rota raiz'));

// Retorno de jogos
app.get('/jogos', (req,res) => {
    JogoDAO.findAll(req.query.categoria, (err, jogos) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(jogos);
    });
});

app.get('/jogos/:id', (req, res) => {
    const id = req.params.id;
    JogoDAO.findByID(id, (err, jogo) => {
        if (err) return res.status(500).json({ error: err.message });
        if (jogo) {
            res.json(jogo);
        } else {
            res.status(404).json("Jogo não encontrado.");
        }
    });
});

app.post('/jogos', (req, res) => {
    const { nome, categoria, ano, fkEmpresa} = req.body;
    if (!nome && !categoria && !ano && !fkEmpresa) return res.status(400).json({ error: "Campos nome, categoria e ano são obrigatórios" });
    
    JogoDAO.create(nome, categoria, ano, fkEmpresa, (err, jogo) => {
        if (err) return res.status(500).json({ error:err.message });
        res.status(201).json(jogo);
    });
});

app.put('/jogos/:id', (req, res) => {
    const { nome, categoria, ano} = req.body;    
    const id = req.params.id;

    JogoDAO.update(id, nome, categoria, ano, (err, jogo) => {
        if (err) return res.status(500).json({ error:err.message });
        if (!jogo) return res.status(404).json({ error: "Jogo não encontrado" });
        res.json(jogo);
    });
});

app.delete('/jogos/:id', (req,res) => {
    const id = req.params.id;
    
    JogoDAO.delete(id, (err, jogo) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!jogo) return res.status(404).json({ error: "Jogo não encontrado." });
        res.json({ message: "Jogo removido com sucesso." });
    });
});