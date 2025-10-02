const express = require('express')
const router = express.Router()
const {listarCategorias} = require('../controller/categoriaController')

router.get('/', listarCategorias)

module.exports = router