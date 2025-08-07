const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const produtoModel = require('../src/Model/produtosModel'); 
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); 

// Handlebars
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({ defaultLayout: 'main', layoutsDir: path.join(__dirname, 'views/layouts') }));
app.set('view engine', 'handlebars');

// Rotas
// app.use('/produtos', produtosRoute);

// Redirecionar / para /produtos
app.get('/', (req, res) => {
  res.redirect('/produtos');
});

// criar
app.post('/produtos', (req, res) => {
  const novoProduto = req.body;
  
  produtoModel.criar(novoProduto, (err) => {
    if (err) return res.status(400).json({ erro: 'Erro ao criar produto' });
    res.status(201).json(novoProduto);
  });
});

// listar todos
app.get('/produtos', (req, res) => {
  produtoModel.listarTodos((err, produtos) => {
    if (err) return res.status(500).json({ erro: 'Erro ao listar produtos' });
    res.status(200).json(produtos);
  });
});

//obter produto pelo ID
app.get('/produtos/:id', (req, res) => {
  const id = req.params.id;
  
  produtoModel.obterPorId(id, (err, produto) => {
    if (err) return res.status(500).json({ erro: 'Erro ao obter produto' });
    if (!produto) return res.status(404).json({ erro: 'Produto não encontrado' });
    res.status(200).json(produto);
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em: http://localhost:${PORT}`);
});
