const express = require('express');
const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');
const bodyParser = require('body-parser');
const app = express();

// Config Sequelize com SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite'
});

// Modelo Livro
const Livro = sequelize.define('Livro', {
  titulo: DataTypes.STRING,
  autor: DataTypes.STRING,
  ano: DataTypes.INTEGER
});

// Configurações do Express
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Rotas
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/livros', async (req, res) => {
  const livros = await Livro.findAll();
  res.render('livros/index', { livros });
});

app.get('/livros/novo', (req, res) => {
  res.render('livros/form', { livro: {}, acao: '/livros' });
});

app.post('/livros', async (req, res) => {
  await Livro.create(req.body);
  res.redirect('/livros');
});

app.get('/livros/editar/:id', async (req, res) => {
  const livro = await Livro.findByPk(req.params.id);
  res.render('livros/form', { livro, acao: '/livros/editar/' + req.params.id });
});

app.post('/livros/editar/:id', async (req, res) => {
  await Livro.update(req.body, { where: { id: req.params.id } });
  res.redirect('/livros');
});

app.post('/livros/deletar/:id', async (req, res) => {
  await Livro.destroy({ where: { id: req.params.id } });
  res.redirect('/livros');
});

// Inicialização
sequelize.sync().then(() => {
  app.listen(3000, () => console.log('Servidor rodando em http://localhost:3000'));
});
