const express = require('express')
const app = express()
const port = 3000

const categoriaRoute = require('./route/categoriaRoute')

app.use(express.json())

app.get('/', (req, res) => {
    res.send('API do Gerenciador de estoque funcionando!')
})

app.use('/categoria', categoriaRoute)

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`)
})