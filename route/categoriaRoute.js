const express = require('express')
const router = express.Router()
const {listarCategorias, criarCategoria, atualizarCategoria, excluirCategoria} = require('../controller/categoriaController')

router.get('/', listarCategorias)
router.post('/', criarCategoria)
router.put('/:id', atualizarCategoria)
router.delete('/:id', excluirCategoria)

module.exports = router