const mongoose = require('mongoose');
// No necesitamos bcryptjs aquí porque el controlador se encargará de la encriptación

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// La función de auto-encriptación ha sido eliminada.

module.exports = mongoose.model('User', UserSchema);