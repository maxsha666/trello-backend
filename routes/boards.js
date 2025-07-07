const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  createBoard,
  getBoards,
  getBoardById,
} = require('../controllers/boardsController');

router.route('/').post(auth, createBoard).get(auth, getBoards);
router.route('/:boardId').get(auth, getBoardById);

module.exports = router;