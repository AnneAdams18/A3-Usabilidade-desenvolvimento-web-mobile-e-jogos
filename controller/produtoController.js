const ProdutoDAO = require('../model/produtoDAO')

const validaCampos = (nome, preco_unitario, quantidade_estoque, quantidade_minima, quantidade_maxima, categoria_id) => {
    if (!nome || !preco_unitario || !quantidade_estoque || !quantidade_minima || !quantidade_maxima || !categoria_id) {
        return 'Todos os campos são obrigatórios para criar um produto'
    }

    const preco = Number(preco_unitario)
    const estoque = Number(quantidade_estoque)
    const min = Number(quantidade_minima)
    const max = Number(quantidade_maxima)
    const catId = Number(categoria_id)

    if (isNaN(preco) || isNaN(estoque) || isNaN(min) || isNaN(max) || isNaN(catId)) {
        return 'Preço, quantidade e ID da categoria devem ser números válidos.'
    }
    return {
        produto: {
            nome,
            preco_unitario: preco,
            quantidade_estoque: estoque,
            quantidade_minima: min,
            quantidade_maxima: max,
            categoria_id: catId
        },
        erro: null
    }
}

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

    const {produto, erro} = validaCampos(nome, preco_unitario, quantidade_estoque, quantidade_minima, quantidade_maxima, categoria_id)
    if (erro) {
        return res.status(400).json ({ erro })
    }

    try {
        const novoId = await ProdutoDAO.criar(produto)

        res.status(201).json({
            mensagem: 'Produto criado com sucesso!',
            id: novoId,
            nome: nome
        })
    } catch (err) {
        console.error('Erro no Controller ao criar produto:', err)
        res.status(500).json({ erro: 'Erro interno do servidor ao criar produto. Verifique se o ID da categoria é válido.'})
    }
}

const atualizarProduto = async (req, res) => {
    const {id} =  req.params
    const {
        nome,
        preco_unitario,
        quantidade_estoque,
        quantidade_minima,
        quantidade_maxima,
        categoria_id
    } = req.body

    const {produto, erro} = validaCampos(nome, preco_unitario, quantidade_estoque, quantidade_minima, quantidade_maxima, categoria_id)
    if (erro) {
        return res.status(400).json({ erro })
    }

    try {
        const linhasAfetadas = await ProdutoDAO.atualizar(id, produto)

        if (linhasAfetadas === 0) {
            return res.status(404).json({ erro: 'Produto não encontrado.'})
        }

        res.status(200).json({
            mensagem: 'Produto atualizado com sucesso!',
            id: Number(id),
            ...produto
        })
    } catch (err) {
        console.error('Erro no Controller ao atualizar produto:', err)
        res.status(500).send('Erro interno do servidor ao atualizar produto.')
    }
}

const excluirProduto = async (req, res) => {
    const { id } = req.params

    try {
        const linhasAfetadas = await ProdutoDAO.excluir(id)

        if (linhasAfetadas === 0) {
            return res.status(404).json({ erro: 'Produto não encontrado.'})
        }

        res.status(204).send()
    } catch (err) {
        console.error('Erro no Controller ao excluir produto:', err)
        res.status(500).send('Erro interno do servidor ao excluir produto.')
    }
}

module.exports = {
    listarProdutos,
    criarProduto,
    atualizarProduto,
    excluirProduto
}