const db = require('../database/db')

const produtoModel = {
    listarTodos(callback) {
        db.all('SELECT * FROM produtos', [], callback)
    },

    buscarPorId(id, callback) {
        db.get('SELECT *FROM produtos WHERE id = ?', [id], callback)
    },

    criar(produto, callback) {
        const { id, nome, descricao, preco, estoque} = produto
        db.run(
            'INSERT INTO produtos (id, nome, descricao, preco, estoque) VALUES (?, ?, ?, ?, ?)',
             [id, nome, descricao, preco, estoque],
             callback
        )
    },

    atualizarDescricao(id, novaDescricao, callback) {
        db.run(
            'UPDATE produtos SET descricao = ? WHERE id = ?',
            [novaDescricao, id],
            callback
        )
    },

    deletar(id, callback) {
        db.run('DELETE FROM produtos WHERE id = ?', [id], callback)
    }
}

module.exports = produtoModel