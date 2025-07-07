const List = require('../models/List');
const Board = require('../models/Board');

exports.createList = async (req, res) => {
  const { title, boardId } = req.body;

  try {
    const board = await Board.findById(boardId);
    if (!board) {
      return res.status(404).json({ msg: 'Board not found' });
    }

    const listCount = await List.countDocuments({ board: boardId });

    const newList = new List({
      title,
      board: boardId,
      position: listCount,
    });

    const list = await newList.save();

    board.lists.push(list.id);
    await board.save();

    res.json(list);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};