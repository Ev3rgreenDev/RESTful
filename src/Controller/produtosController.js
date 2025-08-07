const produtoModel = require('../Model/produtosModel')
const { v4: uuidv4 } = require('uuid');

const produtoController = {
    criar(req, res) {
        const { nome, descricao, preco, estoque } = req.body
        const id = uuidv4()

        const novoProduto = { id, nome, descricao, preco, estoque }

        produtoModel.criar(novoProduto, (err) => {
            if (err) 
                return res.status(400).json({ erro: 'Erro ao criar produto' })
            
            res.status(201).json(novoProduto)
        })
    },
   
    listar(req, res) {
        produtoModel.listarTodos((err, rows) => {
            if (err) 
                return res.status(400).json({ erro: 'Erro ao buscar produtos.' })

            res.json(rows)
        })
    },

    buscar(req, res) {
        produtoModel.buscarPorId(req.params.id, (err, produto) => {
            if (err)
                return res.status(400).json({ erro: 'Erro ao buscar produto.' })

            if (!produto)
                return res.status(400).json({ erro: 'Produto não encontrado.' })

            res.json(produto)
        })
    },

    atualizarDescricao(req, res) {
        const {descricao} = req.body
        const {id} = req.params

        produtoModel.atualizarDescricao(id, descricao, (err) => {
            if (err)
                return res.status(400).json({ erro: 'Erro ao atualizar produto.' })
            
            res.json({ descricao: descricao })
        })
    },

    deletar(req, res) {
        produtoModel.deletar(req.params.id, (err) => {
            if (err)
                return res.status(400).json({ erro: 'Erro ao deletar o produto' })

            res.json({ mensagem: 'Produto deletado com sucesso' })
        })
    },

    renderizarLista(req, res) {
        produtoModel.listarTodos((err, produtos) => {
            if (err) return res.status(500).send('Erro ao carregar a página.');

            res.render('index', { produtos });
        });
    }
}

module.exports = produtoController