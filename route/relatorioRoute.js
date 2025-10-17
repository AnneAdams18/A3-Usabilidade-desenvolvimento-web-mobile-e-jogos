const express = require('express')
const router = express.Router()
const {
    listaPrecos, 
    balancoFisicoFinanceiro, 
    estoqueCritico, 
    produtosPorCategoria, 
    movimentoMaisAlto 
} = require('../controller/relatorioController');

router.get('/lista-precos', listaPrecos);
router.get('/balanco-fisico-financeiro', balancoFisicoFinanceiro);
router.get('/estoque-critico', estoqueCritico);
router.get('/produtos-por-categoria', produtosPorCategoria);
router.get('/movimento-mais-alto', movimentoMaisAlto);

module.exports = router;