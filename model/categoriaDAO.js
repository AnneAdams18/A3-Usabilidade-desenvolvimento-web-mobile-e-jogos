const pool = require('../config/db')

class CategoriaDAO {
    static async listarTudo() {
        const [rows] = await pool.query('SELECT * FROM categoria')
        return rows
    }

    static async criar(nome) {
        const [result] = await pool.query(
            'INSERT INTO categoria (nome) VALUES (?)',
            [nome]
        )
        return result.insertId
    }

    static async atualizar(id, nome) {
        const [result] = await pool.query(
            'UPDATE categoria SET nome = ? WHERE id = ?',
            [nome, id]
        )
        return result.affectedRows
    }

    static async excluir(id) {
        const [result] = await pool.query(
            'DELETE FROM categoria WHERE id = ?',
            [id]
        )
        return result.affectedRows
    }
}

module.exports = CategoriaDAO