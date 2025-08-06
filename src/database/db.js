const sqlite3 = require('sqlite3').verbose();
const path = require('path')



const db = new sqlite3.Database(path.resolve(__dirname, 'banco.sqlite'), (err) =>{
    if (err){
        console.error('Erro ao conectar ao banco: ', err.message)
    } else {
        console.log('Conectado ao SQLite!')
    }
})

db.run(
  `CREATE TABLE IF NOT EXISTS produtos (
    id TEXT PRIMARY KEY,
    nome TEXT NOT NULL,
    descricao TEXT,
    preco REAL NOT NULL,
    estoque INTEGER DEFAULT 0
  )`
)

module.exports = db