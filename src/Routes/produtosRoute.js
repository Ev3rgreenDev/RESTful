const express = require('express')
const router = express.Router()

const produtoController = require('../Controller/produtosController')

router.post('/', produtoController.criar)
router.get('/', produtoController.listar)
router.get('/:id', produtoController.buscar)
router.patch('/:id', produtoController.atualizarDescricao)
router.delete('/:id', produtoController.deletar)

module.exports = router