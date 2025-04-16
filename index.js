// CRIANDO SERVIDOR DO TIPO HTTP QUE RESPONDE NA PORTA 3000

const express = require('express'); // Importação do express (framework para web e APIs no Node.js)

const app = express(); // Instancia do objeto app na classe express, com ele podemos configurar rotas e iniciar o servidor.

const pessoas = [ // Array que simula um banco de dados em memoria.
    {nome: "Gustavo", idade: 20},
    {nome: "Astrolábio", idade: 1},
    {nome: "Arnold", idade: 3},
    {nome: "Maria Eduarda", idade: 18},
];

// Define a rota raiz ("/"), que é acessada via método HTTP GET.
// req é o objeto da requisição e res é o da resposta.
// Quando alguém acessa http://localhost:3000/, será exibida a mensagem "Servidor esta funcionando corretamente" no navegador e "Alguém acionou a rota raíz" no terminal.
app.get('/', (req, res) => {
    console.log("Alguém acionou a rota raíz");
    return res.send("Servidor esta funcionando corretamente");
});

// Rotas referentes ao CRUD de pessoas
// /pessoas também responde a um GET.
// Quando o usuário acessa http://localhost:3000/pessoas, o servidor responde com o JSON contendo todas as pessoas.
app.get('/pessoas', (req,res) => {
    return res.json(pessoas);
});

// Essa rota usa parâmetros na URL. O :id indica um valor dinâmico. Ex: http://localhost:3000/pessoas/1
// req.params é um objeto contendo os parâmetros passados na URL.
// pessoas[id] retorna o objeto correspondente ao índice passado.
app.get('/pessoas/:id', (req,res) => {
    const { id } = req.params;
    return res.json(pessoas[id]);
});

//http://localhost:3000
// Inicia o servidor na porta 3000
app.listen(3000);