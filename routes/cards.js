const express = require('express');
const router = express.Router();

const {
  createCard,
  getCardsByBoard,
  updateCardPosition,
  deleteCard,
} = require('../controllers/cardsController');

// Conectamos cada función del controlador a una ruta específica y un método HTTP

// Ruta para crear una nueva tarjeta
router.post('/', createCard);

// Ruta para obtener todas las tarjetas de un tablero específico
router.get('/board/:boardId', getCardsByBoard);

// Ruta para actualizar las posiciones de las tarjetas (Drag & Drop)
// Usamos PUT porque estamos actualizando un recurso existente
router.put('/move', updateCardPosition);

// Ruta para eliminar una tarjeta por su ID
router.delete('/:cardId', deleteCard);

module.exports = router;