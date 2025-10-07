const CategoriaDAO = require('../model/categoriaDAO')

const listarCategorias = async (req, res) => {
    try{
        const categorias = await CategoriaDAO.listarTudo()

        res.json(categorias)
    } catch (err) {
        console.error('Erro no Controller ao listar categorias:', err)
        res.status(500).send('Erro interno do servidor')
    }
}

const criarCategoria = async (req, res) => {
    const {nome} = req.body

    if(!nome) {
        return res.status(400).json({ erro: 'O nome da categoria é obrigatório.'})
    }

    try{
        const novoId = await CategoriaDAO.criar(nome)

        res.status(201).json({
            mensagem: 'Categoria criada com sucesso!',
            id: novoId,
            nome: nome
        })
    } catch (err) {
        console.error('Erro no Controller ao criar categoria:', err)
        res.status(500).send('Erro interno do servidor ao criar categoria.')
    }
}

const atualizarCategoria = async (req, res) => {
    const { id } = req.params
    const { nome } = req.body

    if (!nome) {
        return res.status(400).json({ erro: 'O nome da categoria é obrigatório.'})
    }

    try{
        const linhasAfetadas = await CategoriaDAO.atualizar(id,nome)

        if(linhasAfetadas === 0) {
            return res.status(404).json({ erro: 'Categoria não encontrada.'})
        }

        res.status(200).json({
            mensagem: 'Categoria atualizada com sucesso!',
            id: Number(id),
            nome: nome
        })
    } catch (err) {
        console.error('Erro no Controller ao atualizar categoria:', err)
        res.status(500).send('Erro interno do servidor ao atualizar categoria.')
    }
}

const excluirCategoria = async (req, res) => {
    const { id } = req.params

    try{
        const linhasAfetadas = await CategoriaDAO.excluir(id)

        if (linhasAfetadas === 0) {
            return res.status(404).json({ erro: 'Categoria não encontrada.'})
        }

        res.status(204).send()

    } catch (err) {
        console.error('Erro no Controller ao excluir categoria:', err)
        res.status(500).send('Erro interno do servidor ao excluir categoria.')
    }
}

module.exports = {
    listarCategorias,
    criarCategoria,
    atualizarCategoria,
    excluirCategoria
}