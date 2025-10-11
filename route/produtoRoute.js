const express = require('express')
const router = express.Router()
const { listarProdutos, criarProduto, atualizarProduto, excluirProduto} = require('../controller/produtoController')

router.get('/', listarProdutos)
router.post('/', criarProduto)
router.put('/:id', atualizarProduto)
router.delete('/:id', excluirProduto)

module.exports = router