const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CardSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  // Link a la lista a la que pertenece esta tarjeta
  list: {
    type: Schema.Types.ObjectId,
    ref: 'List'
  },
  // Link al tablero (para facilitar búsquedas)
  board: {
    type: Schema.Types.ObjectId,
    ref: 'Board'
  },
  // Link al usuario dueño
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Card', CardSchema);