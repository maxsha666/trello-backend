const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Card = require('../models/Card');
const List = require('../models/List');

// @route   POST api/cards
// @desc    Create a new card
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const { title, listId } = req.body;

    // We need to find the parent list to get the board and user id
    const parentList = await List.findById(listId);
    if (!parentList) {
      return res.status(404).json({ msg: 'List not found' });
    }

    const newCard = new Card({
      title,
      list: listId,
      board: parentList.board, // Get board from parent list
      user: req.user.id
    });

    const card = await newCard.save();
    res.json(card);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/cards/:cardId
// @desc    Update a card (e.g., move to another list)
// @access  Private
router.put('/:cardId', auth, async (req, res) => {
  try {
    const { listId } = req.body;

    let card = await Card.findById(req.params.cardId);

    if (!card) return res.status(404).json({ msg: 'Card not found' });

    // Make sure user owns the card
    if (card.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    // Update the list
    card.list = listId;
    await card.save();

    res.json(card);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;