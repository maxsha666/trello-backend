const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Board = require('../models/Board');
const List = require('../models/List');
const Card = require('../models/Card');

// @route   GET api/boards
// @desc    Get all boards for a user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const boards = await Board.find({ user: req.user.id }).sort({ date: -1 });
    res.json(boards);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/boards
// @desc    Create a new board
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const { name } = req.body;

    const newBoard = new Board({
      name,
      user: req.user.id
    });

    const board = await newBoard.save();
    res.json(board);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// --- NUEVA RUTA ---
// @route   GET api/boards/:id
// @desc    Get all data for a single board (board, lists, and cards)
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    // Busca el tablero, las listas y las tarjetas en paralelo para más eficiencia
    const board = await Board.findById(req.params.id);
    const lists = await List.find({ board: req.params.id });
    const cards = await Card.find({ board: req.params.id });

    if (!board) {
      return res.status(404).json({ msg: 'Board not found' });
    }

    // Asegúrate de que el usuario sea el dueño del tablero
    if (board.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not Authorized' });
    }
    
    res.json({ board, lists, cards });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


module.exports = router;