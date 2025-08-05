const e = require('express');
const express = require('express');
const app = express();
const PORT = 3000;
const sqlite3 = require('sqlite3').verbose();
const { v4: uuidv4 } = require('uuid');


app.use(express.json())

//BDD                                                               // let produtos = []

const db = new sqlite3.Database('api.db')

db.run(
  `CREATE TABLE IF NOT EXISTS produtos (
    id TEXT PRIMARY KEY,
    nome TEXT NOT NULL,
    descricao TEXT,
    preco REAL NOT NULL,
    estoque INTEGER DEFAULT 0
  )`)

//CRIAR
app.post('/produtos', (req, res) => {
  const { nome, descricao, preco, estoque } = req.body
  if ( !nome || !preco || !estoque ){
    return res.status(400).send('Campos obrigatórios faltando!')
  }

  const novoProduto = {
    id: uuidv4(),
    nome,
    descricao: descricao || null,
    preco,
    estoque,
  }

  db.run(`
    INSERT INTO produtos (id, nome, descricao, preco, estoque)
    VALUES (?, ?, ?, ?, ?)`, 
    [novoProduto.id, novoProduto.nome, novoProduto.descricao, novoProduto.preco, novoProduto.estoque],
    function(err){
      if (err){
        return console.error('Erro ao inserir: ', err.message)
      }
    }
  )

  res.status(201).send(novoProduto)
})

//LER
app.get('/produtos', (req, res) => {
  db.all('SELECT * FROM produtos', [], (err, rows) => {
    if (err) {
      console.error('Erro ao consultar os produtos: ', err.message)
      return res.status(400).json({ erro: 'Erro ao consultar produtos.' })
    }

    res.json(rows)
  })
})

//LER UNICO
app.get('/produtos/:id', (req, res) => {
  const id = req.params.id;
  
  db.get('SELECT * FROM produtos WHERE id = ?', [id], (err, row)=> {
    if (err) {
      console.error('Erro ao buscar produto: ', err.message)
      return res.status(400).json({ erro: 'Erro ao buscar produto'})
    }
  
  if (!row){
    return res.status(400).send('Produto não encontrado!')
  }

  res.json(row)
  })
})

//ATUALIZAR (INDIVIDUAL)
app.patch('/produtos/:id', (req, res) => {
  const id = req.params.id;
  const { descricao } = req.body

    if(!descricao){
      res.send('Apenas o campo de descrição pode ser alterado.')
  }

  db.get('SELECT * FROM produtos WHERE id = ?', [id], (err, row)=> {
    if (err) {
      console.error('Erro ao buscar produto: ', err.message)
      return res.status(400).json({ erro: 'Erro ao buscar produto'})
    }
  
  if (!row){
    return res.status(400).send('Produto não encontrado!')
  }

  const novaDescricao = descricao ?? row.descricao;

  db.run(
    `UPDATE produtos SET descricao = ? WHERE id = ?`,
    [novaDescricao, id],
      function(err){
        if (err){
          console.error('Erro ao atualizar: ', err.message)
          return res.status(400).json({ erro: 'Erro ao atualizar o produto!' })
        }
        res.json({
          descricao: novaDescricao
        })
      }
    )
  })
})

//DELETAR
app.delete('/produtos/:id', (req, res) => {
  const id = req.params.id
  
   db.get('SELECT * FROM produtos WHERE id = ?', [id], (err, row)=> {
    if (err) {
      console.error('Erro ao buscar produto: ', err.message)
      return res.status(400).json({ erro: 'Erro ao buscar produto'})
    }
  
    if (!row){
      return res.status(400).send('Produto não encontrado!')
    }

  db.run('DELETE FROM produtos WHERE id = ?', [id], function (err){
    if (err){
      console.error('Erro ao deletar produto:', err.message)
      return res.status(400).json({ erro: 'Erro ao deletar produto.'})
    }

    res.json({ mensagem: `Produto ${req.params.id} deletado`})
    })
  })
})


//TESTE DE PORTA
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

// pra criar app.post
// pra ler app.get
// pra ler especifico eu uso app.get --- /id
// pra atualizar tudo app.put
// pra atualizar pacialmente (propriedades) app.patch
// pra deletar app.delete