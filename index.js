const express = require('express')
const app = express()
const port = 3000

// Importa o roteador de categorias (deve vir antes de ser usado)
const categoriaRoute = require('./route/categoriaRoute')

// MIDDLEWARES GLOBAIS
// 1. Essencial: permite que a API leia o corpo de requisições JSON
app.use(express.json())

// NOVO MIDDLEWARE DE LOG PARA DEBUG
// Esta função será executada para CADA requisição e imprime o método e o caminho
app.use((req, res, next) => {
    console.log(`[DEBUG LOG] Método: ${req.method}, Caminho: ${req.path}`);
    next(); // Continua para a próxima rota
});


// ROTAS DE DIAGNÓSTICO
app.get('/', (req, res) => {
    res.send('API do Gerenciador de estoque funcionando!')
})

// ROTA TEMPORÁRIA DE TESTE (PUT /teste)
app.put('/teste', (req, res) => {
    res.send('Teste PUT Funcionando!');
})

// ROTAS DA APLICAÇÃO
app.use('/categoria', categoriaRoute)

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`)
})
