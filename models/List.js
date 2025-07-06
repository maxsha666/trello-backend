const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ListSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  // Link al tablero al que pertenece esta lista
  board: {
    type: Schema.Types.ObjectId,
    ref: 'Board'
  },
  // Link al usuario dueño del tablero (para permisos)
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('List', ListSchema);