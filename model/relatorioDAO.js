const pool = require('../config/db')

class RelatorioDAO {
    // Lista de Preços (nome, preco, categoria)
    static async listaPrecos()  {
        const query = `
            SELECT
                p.nome,
                p.preco_unitario,
                c.nome AS categoria_nome
            FROM
                produto p
            JOIN
                categoria c ON p.categoria_id = c.id
            ORDER BY
                p.nome ASC;            
        `
        const [rows] = await pool.query(query)
        return rows
    }
    // Balanço Físico/Financeiro
    static async balancoFisicoFinanceiro() {
        const query = `
            SELECT
                p.nome,
                p.quantidade_estoque,
                p.preco_unitario,
                (p.preco_unitario * p.quantidade_estoque) AS valor_total_produto,
                (SELECT SUM(preco_unitario * quantidade_estoque) FROM produto) AS valor_total_estoque
            FROM
                produto p
            ORDER BY
                p.nome ASC;        
        `
        const [rows] = await pool.query(query)
        return rows
    }
    // Estoque Crítico (abaixo da quantidade mínima)
    static async estoqueCritico() {
        const query = `
            SELECT
                nome,
                quantidade_estoque,
                quantidade_minima
            FROM
                produto
            WHERE
                quantidade_estoque < quantidade_minima
            ORDER BY
                nome ASC            
        `
        const [rows] = await pool.query(query)
        return rows
    }
    // Quantidade de Produtos por Categoria
    static async produtosPorCategoria() {
        const query = `
            SELECT
                c.nome AS categoria_nome,
                COUNT(p.id) AS quantidade_produtos
            FROM
                categoria c
            LEFT JOIN
                produto p ON c.id = p.categoria_id
            GROUP BY
                c.nome
            ORDER BY
                c.nome ASC                
        `
        const [rows] = await pool.query(query)
        return rows
    }
    // Produto que Mais Teve Entrada e Mais Teve Saída
    static async movimentoMaisAlto() {
        const query = `
            (SELECT
                'Maior Entrada' AS tipo_relatorio,
                p.nome AS nome_produto,
                m.total_movimentado AS quantidade
            FROM (
                SELECT produto_id, SUM(quantidade) AS total_movimentado
                FROM movimentacao
                WHERE tipo = 'Entrada'
                GROUP BY produto_id
                ORDER BY total_movimentado DESC
                LIMIT 1
            ) m
            JOIN produto p ON m.produto_id = p.id)

            UNION ALL

            (SELECT
                'Maior Saída' AS tipo_relatorio,
                p.nome AS nome_produto,
                m.total_movimentado AS quantidade
            FROM (
                SELECT produto_id, SUM(quantidade) AS total_movimentado
                FROM movimentacao
                WHERE tipo = 'Saída'
                GROUP BY produto_id
                ORDER BY total_movimentado DESC
                LIMIT 1
            ) m
            JOIN produto p ON m.produto_id = p.id);    
        `
        const [rows] = await pool.query(query)
        return rows
    }
}

module.exports = RelatorioDAO