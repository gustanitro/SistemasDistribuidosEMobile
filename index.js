const express = require('express');
const fs = require("fs");

const app = express();
const arquivo = 'jogos.json'

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000')

    // Verificando se o arquivo existe
    fs.access(arquivo, fs.constants.F_OK, (err) => {
        if (err) {
            console.log(`${arquivo} não existe. Criando arquivio...`);
            let jogosIniciais = [
                {nome: "Batman Arkhan City", ano: 2013, categoria: "Luta"},
                {nome: "Batman Arkhan Knight", ano: 2012, categoria: "Foda"},
                {nome: "Batman Arkhan Origins", ano: 2014, categoria: "Luta"},
            ];
            let data = JSON.stringify(jogosIniciais);
            fs.writeFileSync(arquivo, data);
        }
    })
});

app.get('/', (req,res) => res.send('Servidor rodando, tudo ok. Essa é a rota raiz'));

// Retorno de jogos
app.get('/jogos', (req,res) => {
    let data = fs.readFileSync(arquivo);
    let jogos = JSON.parse(data);

    if (req.query.categoria) {
        jogos = jogos.filter(jogo => jogo.categoria.toLowerCase().includes(req.query.categoria.toLowerCase()));
    }

    res.send(jogos);
})

app.get('/jogos/:id', (req, res) => {
    let data = fs.readFileSync(arquivo);
    let jogos = JSON.parse(data);
    let jogo = jogos.find(jogo => jogo.id == req.params.id);

    if (jogo) {
        res.send(jogo);
    } else {
        res.status(404).send('Jogo não encontrado.');
    }
})

app.post('/jogos', (req, res) => {
    let novoJogo = req.body;
    let data = fs.readFileSync(arquivo);
    let jogos = JSON.parse(data);

    novoJogo.id = jogos.length + 1;
    jogos.push(novoJogo);

    fs.writeFileSync(arquivo, JSON.stringify(jogos));
    res.status(201).send(novoJogo);
})

app.put('/jogos/:id', (req, res) => {
    let data = fs.readFileSync(arquivo);
    let jogos = JSON.parse(data);
    let novoValor = req.body;

    let jogo = jogos.find (jogo => {
        if (jogo.id == req.params.id) {
            jogo.nome = novoValor.nome;
            jogo.categoria = novoValor.categoria;
            jogo.ano = novoValor.ano;
            fs.writeFileSync(arquivo, JSON.stringify(jogos));
            return jogo;
        }
    })

    if (jogo) {
        res.send(jogo);
    } else {
        res.status(404).send('Jogo não encontrado.')
    }
})

app.delete('/jogos/:id', (req,res) => {
    let data = fs.readFileSync(arquivo);
    let jogos = JSON.parse(data);

    if (!jogos.find(jogo => jogo.id == req.params.id)) {
        return res.status(404).send('Jogo não encontrado.');
    }

    let jogosAtualizados = jogos.filter(jogo => jogo.id != req.params.id);

    fs.writeFileSync(arquivo, JSON.stringify(jogosAtualizados));
    res.send('Jogo removido com sucesso.');
})