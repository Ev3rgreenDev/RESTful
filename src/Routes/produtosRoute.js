const express = require('express')
const router = express.Router()

const produtoController = require('../Controller/produtosController')
const produtosRoute = require('../Routes/produtosRoute');

router.post('/', produtoController.criar)
router.get('/api', produtoController.listar)
router.get('/:id', produtoController.buscar)
router.patch('/:id', produtoController.atualizarDescricao)
router.delete('/:id', produtoController.deletar)
router.get('/', produtoController.renderizarLista);



// router.post('/add', (req, res) => {
//     let {}
// })


module.exports = router