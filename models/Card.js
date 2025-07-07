const mongoose = require('mongoose');

const CardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
  },
  description: {
    type: String,
  },
  // --- CAMBIO IMPORTANTE ---
  // Añadimos una referencia a la lista a la que pertenece la tarjeta.
  // Esto es crucial para saber dónde renderizar la tarjeta.
  list: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'List',
    required: true,
  },
  // --- NUEVO CAMPO ---
  // Este campo almacenará el orden de la tarjeta dentro de su lista.
  // Un número más bajo significa que está más arriba en la lista.
  position: {
    type: Number,
    required: true,
  },
  // Añadimos una referencia al tablero para consultas más eficientes si es necesario.
  board: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Board',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Card', CardSchema);