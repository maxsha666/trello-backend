const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BoardSchema = new Schema({
  // Aquí creamos la relación con el usuario
  user: {
    type: Schema.Types.ObjectId, // Almacenará el ID de un usuario
    ref: 'User'                  // Hace referencia a nuestro modelo 'User'
  },
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Board', BoardSchema);