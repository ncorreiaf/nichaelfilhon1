const express = require('express');
const path = require('path');
const { sequelize } = require('./models');
const livroRoutes = require('./routes/livros');

const app = express();

// Configuração Express
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Rotas
app.get('/', (req, res) => res.render('index'));
app.use('/livros', livroRoutes);

// Inicialização do servidor
const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
});
const session = require('express-session');
app.use(session({ secret: 'seuSegredo', resave: false, saveUninitialized: true }));

app.use((req, res, next) => {
  res.locals.message = req.session.message;
  delete req.session.message;
  next();
});
