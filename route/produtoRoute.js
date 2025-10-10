const express = require('express')
const router = express.Router()
const { listarProdutos, criarProduto} = require('../controller/produtoController')

router.get('/', listarProdutos)
router.post('/', criarProduto)

module.exports = router