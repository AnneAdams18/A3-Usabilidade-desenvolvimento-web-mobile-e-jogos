const RelatorioDAO = require('../model/relatorioDAO')

const gerarRelatorio = (daoMethod) => async (req, res) => {
    try {
        const dados = await RelatorioDAO[daoMethod]()
        res.json(dados)
    } catch (err) {
        console.error(`Erro ao gerar relatório ${daoMethod}:`, err)
        res.status(500).send('Erro interno do servidor ao gerar relatório.')
    }
}

const listaPrecos = gerarRelatorio('listaPrecos')
const balancoFisicoFinanceiro = gerarRelatorio('balancoFisicoFinanceiro')
const estoqueCritico = gerarRelatorio('estoqueCritico')
const produtosPorCategoria = gerarRelatorio('produtosPorCategoria')
const movimentoMaisAlto = gerarRelatorio('movimentoMaisAlto')

module.exports = {
    listaPrecos,
    balancoFisicoFinanceiro,
    estoqueCritico,
    produtosPorCategoria,
    movimentoMaisAlto
}