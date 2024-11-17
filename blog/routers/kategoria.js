const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.post('/', async (req, res) => {
  try {
    const kategoria = await prisma.kategoria.create({
      data: { nazwa: req.body.nazwa },
    });
    res.status(201).json(kategoria);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const kategorie = await prisma.kategoria.findMany({ include: { wpis: true } });
    res.status(200).json(kategorie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const kategoria = await prisma.kategoria.findUnique({
      where: { id: parseInt(req.params.id) },
      include: { wpis: true },
    });
    if (!kategoria) return res.status(404).json({ error: 'Kategoria not found' });
    res.status(200).json(kategoria);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const kategoria = await prisma.kategoria.update({
      where: { id: parseInt(req.params.id) },
      data: { nazwa: req.body.nazwa },
    });
    res.status(200).json(kategoria);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await prisma.kategoria.delete({ where: { id: parseInt(req.params.id) } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
