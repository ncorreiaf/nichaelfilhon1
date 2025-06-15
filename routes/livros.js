const express = require('express');
const router = express.Router();
const { Livro } = require('../models');

// Listar livros
router.get('/', async (req, res) => {
  try {
    const livros = await Livro.findAll();
    res.render('livros/index', { livros });
  } catch (err) {
    console.error('Erro ao listar livros:', err);
    res.status(500).send('Erro interno');
  }
});

// Form de novo livro
router.get('/novo', (req, res) => {
  res.render('livros/form', { livro: {}, acao: '/livros' });
});

// Criar livro
router.post('/', async (req, res) => {
  try {
    await Livro.create(req.body);
    res.redirect('/livros');
  } catch (err) {
    console.error('Erro ao criar livro:', err);
    res.status(500).send('Erro ao criar livro');
  }
});

// Editar livro
router.get('/editar/:id', async (req, res) => {
  try {
    const livro = await Livro.findByPk(req.params.id);
    res.render('livros/form', { livro, acao: `/livros/editar/${req.params.id}` });
  } catch (err) {
    console.error('Erro ao buscar livro:', err);
    res.status(500).send('Erro interno');
  }
});

// Salvar edição
router.post('/editar/:id', async (req, res) => {
  try {
    await Livro.update(req.body, { where: { id: req.params.id } });
    res.redirect('/livros');
  } catch (err) {
    console.error('Erro ao atualizar livro:', err);
    res.status(500).send('Erro ao atualizar livro');
  }
});

// Deletar livro
router.post('/deletar/:id', async (req, res) => {
  try {
    await Livro.destroy({ where: { id: req.params.id } });
    res.redirect('/livros');
  } catch (err) {
    console.error('Erro ao deletar livro:', err);
    res.status(500).send('Erro ao deletar livro');
  }
});

module.exports = router;
req.session.message = 'Livro criado com sucesso!';
req.session.message = 'Livro atualizado com sucesso!';
req.session.message = 'Livro deletado com sucesso!';
req.session.message = 'Erro ao criar livro';
req.session.message = 'Erro ao atualizar livro';
req.session.message = 'Erro ao deletar livro';
