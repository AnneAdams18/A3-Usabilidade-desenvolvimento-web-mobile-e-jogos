const express = require('express')
const app = express()
const port = 3000

//  Importação das Rotas
const categoriaRoute = require('./route/categoriaRoute')
const produtoRoute = require('./route/produtoRoute')

// MIDDLEWARES GLOBAIS
// Permite que a API leia o corpo de requisições JSON
app.use(express.json())

// Middleware de Log 
app.use((req, res, next) => {
    console.log(`[DEBUG LOG] Método: ${req.method}, Caminho: ${req.path}`);
    next(); 
});

// Rotas de diagnóstico
app.get('/', (req, res) => {
    res.send('API do Gerenciador de estoque funcionando!')
})

// Rotas da aplicação
app.use('/categoria', categoriaRoute)
app.use('/produto', produtoRoute)

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`)
})
