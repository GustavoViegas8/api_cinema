const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const router = express.Router()
router.use(cors())

const knex = require('./dbConfig');
const upload = multer({ dest: './img' })

router.get('/', async (req, res) =>{
    try {
        const filmes = await knex('filmes').orderBy('id', 'desc')
        res.status(200).json(filmes);
    } catch (error){
        res.status(400).json({ok: 0, msg: `Erro: ${error.message}`});
    }
})

const storage = multer.diskStorage({
    destination: (req, file, callback) => callback(null, './img'),
    filename: (req, file, callback) => callback(null, Date.now() + '-' + file.originalname)
})
const upload2 = multer({ storage });

router.post('/', upload2.single('foto'), async (req, res) => {

    const { titulo, genero, sinopse, preco, duracao } = req.body;
    const foto = req.file.path;
  
    if (!titulo || !genero || !duracao || !sinopse ||!preco || !foto) {
      res.status(406).json({ ok: 0, msg: 'Titulo, Gênero, Duração, Sinopse, Preço e Foto' });
      return;
    }
    if ((req.file.mimetype != 'image/jpeg' && req.file.mimetype != 'image/png') || req.file.size > 512 * 1024) {
      fs.unlinkSync(foto);
      res.status(406).json({ ok: 0, msg: 'Imagen Invalida.' });
      return;
    }
    try {
      const novo = await knex('filmes').insert({ titulo, genero, duracao, sinopse, preco, foto });
      res.status(201).json({ ok: 1, msg: 'filme Incluido!', id: novo[0] });
    } catch (error) {
      res.status(400).json({ ok: 0, msg: `Erro: ${error.message}` });
    }
})

router.put('/:id', async (req, res) => {
  const id = req.params.id
  const preco = req.body.preco
  try {
    await knex('filmes').update({ preco }).where({ id });
    res.status(200).json({ ok: 1 });
  } catch (error) {
    res.status(400).json({ ok: 0, msg: `Erro na Alteração: ${error.message}` });
  }
})

router.delete('/:id', async (req, res) => {
  const id = req.params.id
  try {
    await knex('filmes').del().where({ id });
    res.status(200).json({ ok: 1 });
  } catch (error) {
    res.status(400).json({ ok: 0, msg: `Erro na Exclusão: ${error.message}` });
  }
})


module.exports = router;