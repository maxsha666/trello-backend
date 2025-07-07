const Board = require('../models/Board');
const List = require('../models/List');

exports.createBoard = async (req, res) => {
  const { title } = req.body;
  try {
    const newBoard = new Board({
      title,
      owner: req.user.id,
    });
    const board = await newBoard.save();
    res.json(board);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getBoards = async (req, res) => {
  try {
    const boards = await Board.find({ owner: req.user.id }).sort({ createdAt: -1 });
    res.json(boards);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getBoardById = async (req, res) => {
    try {
      const board = await Board.findById(req.params.boardId).populate({
        path: 'lists',
        model: 'List',
      });
  
      if (!board) {
        return res.status(404).json({ msg: 'Board not found' });
      }
  
      if (board.owner.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'User not authorized' });
      }
  
      res.json({ success: true, data: board });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
};