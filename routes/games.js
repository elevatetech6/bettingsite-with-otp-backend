const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const Game = require('../models/Game');


router.get('/', async (req, res) => {
  try {
    const games = await Game.find({ isActive: true }).sort({ startTime: 1 });
    res.json(games);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


router.get('/:id', async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);

    if (!game) {
      return res.status(404).json({ msg: 'Game not found' });
    }

    res.json(game);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Game not found' });
    }
    res.status(500).send('Server Error');
  }
});


router.post('/', auth, async (req, res) => {
  const { title, description, startTime, endTime, odds } = req.body;

  try {
    const newGame = new Game({
      title,
      description,
      startTime,
      endTime,
      odds,
    });

    const game = await newGame.save();
    res.json(game);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


router.put('/:id', auth, async (req, res) => {
  const { title, description, startTime, endTime, odds, result, isActive } = req.body;

  // Build game object
  const gameFields = {};
  if (title) gameFields.title = title;
  if (description) gameFields.description = description;
  if (startTime) gameFields.startTime = startTime;
  if (endTime) gameFields.endTime = endTime;
  if (odds) gameFields.odds = odds;
  if (result) gameFields.result = result;
  if (isActive !== undefined) gameFields.isActive = isActive;

  try {
    let game = await Game.findById(req.params.id);

    if (!game) return res.status(404).json({ msg: 'Game not found' });

    game = await Game.findByIdAndUpdate(
      req.params.id,
      { $set: gameFields },
      { new: true }
    );

    res.json(game);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Game not found' });
    }
    res.status(500).send('Server Error');
  }
});


router.delete('/:id', auth, async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);

    if (!game) {
      return res.status(404).json({ msg: 'Game not found' });
    }

    await Game.findByIdAndDelete(req.params.id);

    res.json({ msg: 'Game removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Game not found' });
    }
    res.status(500).send('Server Error');
  }
});


module.exports = router;