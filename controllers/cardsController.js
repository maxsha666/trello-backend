const Card = require('../models/Card');
const List = require('../models/List'); // Asegúrate de que el modelo List exista

// @desc    Crear una nueva tarjeta
// @route   POST /api/cards
// @access  Private
exports.createCard = async (req, res) => {
  const { title, listId, boardId } = req.body;

  if (!title || !listId || !boardId) {
    return res.status(400).json({ success: false, msg: 'Por favor, proporciona un título, listId y boardId' });
  }

  try {
    const cardCount = await Card.countDocuments({ list: listId });

    const newCard = await Card.create({
      title,
      list: listId,
      board: boardId,
      position: cardCount,
    });

    res.status(201).json({
      success: true,
      data: newCard,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, msg: 'Error del servidor' });
  }
};

// --- FUNCIÓN CLAVE IMPLEMENTADA ---
// @desc    Actualizar la posición de las tarjetas (Drag and Drop)
// @route   PUT /api/cards/move
// @access  Private
exports.updateCardPosition = async (req, res) => {
  // El frontend enviará una lista de las columnas afectadas,
  // cada una con un array de los IDs de sus tarjetas en el nuevo orden.
  const { lists } = req.body;

  if (!lists) {
    return res.status(400).json({ success: false, msg: 'Faltan los datos de las listas' });
  }

  try {
    // Creamos una lista de todas las operaciones de actualización que debemos ejecutar
    const operations = lists.flatMap(list =>
      list.cards.map((cardId, index) => ({
        updateOne: {
          filter: { _id: cardId },
          update: { list: list.listId, position: index },
        },
      }))
    );

    // Ejecutamos todas las operaciones en la base de datos de una sola vez
    await Card.bulkWrite(operations);

    res.status(200).json({ success: true, msg: 'Posiciones de las tarjetas actualizadas' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, msg: 'Error del servidor al mover tarjetas' });
  }
};


// @desc    Obtener todas las tarjetas de un tablero
// @route   GET /api/cards/board/:boardId
// @access  Private
exports.getCardsByBoard = async (req, res) => {
  try {
    // Devolvemos las tarjetas ordenadas por su posición
    const cards = await Card.find({ board: req.params.boardId }).sort('position');
    if (!cards) {
      return res.status(404).json({ success: false, msg: 'No se encontraron tarjetas para este tablero' });
    }
    res.status(200).json({ success: true, data: cards });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, msg: 'Error del servidor' });
  }
};


// @desc    Eliminar una tarjeta
// @route   DELETE /api/cards/:cardId
// @access  Private
exports.deleteCard = async (req, res) => {
  try {
    const card = await Card.findById(req.params.cardId);

    if(!card) {
      return res.status(404).json({ success: false, msg: 'Tarjeta no encontrada' });
    }
    
    await card.deleteOne();

    res.status(200).json({ success: true, data: {} });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, msg: 'Error del servidor' });
  }
};