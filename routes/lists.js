const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const List = require('../models/List');
const Board = require('../models/Board');

// @route   GET api/lists/:boardId
// @desc    Get all lists for a specific board
// @access  Private
router.get('/:boardId', auth, async (req, res) => {
  try {
    // Find the board to make sure the user has access to it
    const board = await Board.findById(req.params.boardId);
    if (!board || board.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    const lists = await List.find({ board: req.params.boardId });
    res.json(lists);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/lists
// @desc    Create a new list
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const { name, boardId } = req.body;

    const newList = new List({
      name,
      board: boardId,
      user: req.user.id
    });

    const list = await newList.save();
    res.json(list);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;