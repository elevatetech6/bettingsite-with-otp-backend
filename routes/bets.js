const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const Bet = require('../models/Bet');
const Game = require('../models/Game');
const User = require('../models/User');

router.post('/', auth, async (req, res) => {
  const { gameId, betAmount, betOn } = req.body;

  try {
    const user = await User.findById(req.user.id).select('-password');
    const game = await Game.findById(gameId);

    if (!game) {
      return res.status(404).json({ msg: 'Game not found' });
    }

    if (!game.isActive || game.endTime < Date.now()) {
      return res.status(400).json({ msg: 'Cannot place bet on this game' });
    }

    // Calculate potential payout
    let odds;
    if (betOn === 'teamA') odds = game.odds.teamA;
    else if (betOn === 'draw') odds = game.odds.draw;
    else if (betOn === 'teamB') odds = game.odds.teamB;
    else return res.status(400).json({ msg: 'Invalid betOn value' });

    const potentialPayout = betAmount * odds;

    const newBet = new Bet({
      user: req.user.id,
      game: gameId,
      betAmount,
      betOn,
      potentialPayout,
    });

    const bet = await newBet.save();
    res.json(bet);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


router.get('/me', auth, async (req, res) => {
  try {
    const bets = await Bet.find({ user: req.user.id }).populate('game', ['title', 'startTime', 'odds']);
    res.json(bets);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;