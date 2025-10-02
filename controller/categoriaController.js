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

module.exports = {
    listarCategorias
}