const ProdutoDAO = require('../model/produtoDAO')

const listarProdutos = async (req, res) => {
    try {
        const produtos = await ProdutoDAO.listarTudo()

        res.json(produtos)
    } catch (err) {
        console.error('Erro no Controller ao listar produtos:', err)
        res.status(500).send('Erro interno do servidor ao buscar produtos.')
    }
}

const criarProduto = async (req, res) => {
    const {
        nome,
        preco_unitario,
        quantidade_estoque,
        quantidade_minima,
        quantidade_maxima,
        categoria_id
    } = req.body

    if (!nome || !preco_unitario || !quantidade_estoque || !quantidade_minima || !quantidade_maxima || !categoria_id) {
        return res.status(400).json({ erro: 'Todos os campos são obrigatórios para criar um produto'})
    }

    const preco = Number(preco_unitario)
    const estoque = Number(quantidade_estoque)
    const min = Number(quantidade_minima)
    const max = Number(quantidade_maxima)
    const catId = Number(categoria_id)

    if (isNaN(preco) || isNaN(estoque) || isNaN(min) || isNaN(max) || isNaN(catId)) {
        return res.status(400).json({ erro: 'Preço, quantidade e ID da categoria devem ser números válidos.'})
    }

    try {
        const novoProduto = {
            nome,
            preco_unitario: preco,
            quantidade_estoque: estoque,
            quantidade_minima: min,
            quantidade_maxima: max,
            categoria_id: catId
        }

        const novoId = await ProdutoDAO.criar(novoProduto)

        res.status(201).json({
            mensagem: 'Produto criado com sucesso!',
            id: novoId,
            ...novoProduto
        })
    } catch (err) {
        console.error('Erro no Controller ao criar produto:', err)
        res.status(500).json({ erro: 'Erro interno do servidor ao criar produto. Verifique se o ID da categoria é válido.'})
    }
}


module.exports = {
    listarProdutos,
    criarProduto
}