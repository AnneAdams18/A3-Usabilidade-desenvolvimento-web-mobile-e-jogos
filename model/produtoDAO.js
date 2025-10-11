const pool = require('../config/db')

class ProdutoDAO {
    static async listarTudo(){
        const query = `
            SELECT
                p.id,
                p.nome,
                p.preco_unitario,
                p.quantidade_estoque,
                p.quantidade_minima,
                p.quantidade_maxima,
                c.nome AS categoria_nome,
                p.categoria_id
            FROM
                produto p
            JOIN
                categoria c ON p.categoria_id = c.id
            ORDER BY
                p.nome;        
        `
        try {
            const [rows] = await pool.query(query)
            return rows
        } catch(error) {
            console.error('Erro no DAO ao listar produtos:', error)
            throw error
        }
    }

    static async criar(produto) {
        const {nome, preco_unitario, quantidade_estoque, quantidade_minima, quantidade_maxima, categoria_id} = produto
        
        const query = `
            INSERT INTO produto
            (nome, preco_unitario, quantidade_estoque, quantidade_minima, quantidade_maxima, categoria_id)
            VALUES (?, ?, ?, ?, ?, ?)
        `

        const params = [
            nome,
            preco_unitario,
            quantidade_estoque,
            quantidade_minima,
            quantidade_maxima,
            categoria_id
        ]

        try {
            const [result] = await pool.query(query, params)
            return result.insertId
        } catch(error) {
            console.error('Erro no DAO ao criar produto', error)
            throw error
        }
    }

    static async atualizar(id, produto) {
        const {nome, preco_unitario, quantidade_estoque, quantidade_minima, quantidade_maxima, categoria_id} = produto

        const query = `
            UPDATE produto SET
                nome = ?,
                preco_unitario = ?,
                quantidade_estoque = ?,
                quantidade_minima = ?,
                quantidade_maxima = ?,
                categoria_id = ?
            WHERE id = ?    
        `

        const params = [
            nome,
            preco_unitario,
            quantidade_estoque,
            quantidade_minima,
            quantidade_maxima,
            categoria_id,
            id
        ]

        try {
            const [result] = await pool.query(query, params)
            return result.affectedRows
        } catch (error) {
            console.error('Erro no DAO ao atualizar produto:', error)
            throw error
        }
    }

    static async excluir(id) {
        const [result] = await pool.query(
            'DELETE FROM produto WHERE id = ?',
            [id]
        )
        return result.affectedRows
    }
}

module.exports = ProdutoDAO