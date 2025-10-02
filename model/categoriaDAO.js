const pool = require('../config/db')

class CategoriaDAO {
    static async listarTudo() {
        const [rows] = await pool.query('SELECT * FROM categoria')
        return rows
    }
}

module.exports = CategoriaDAO