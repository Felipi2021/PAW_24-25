const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


router.post('/', async (req, res) => {
  try {
    const wpis = await prisma.wpis.create({
      data: {
        wpis: req.body.wpis,
        kategoriaId: req.body.kategoriaId,
      },
    });
    res.status(201).json(wpis);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const wpisy = await prisma.wpis.findMany({ include: { kategoria: true, komentarze: true } });
    res.status(200).json(wpisy);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const wpis = await prisma.wpis.findUnique({
      where: { id: parseInt(req.params.id) },
      include: { kategoria: true, komentarze: true },
    });
    if (!wpis) return res.status(404).json({ error: 'Wpis not found' });
    res.status(200).json(wpis);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const wpis = await prisma.wpis.update({
      where: { id: parseInt(req.params.id) },
      data: {
        wpis: req.body.wpis,
        kategoriaId: req.body.kategoriaId,
      },
    });
    res.status(200).json(wpis);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await prisma.wpis.delete({ where: { id: parseInt(req.params.id) } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
