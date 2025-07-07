const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Intenta conectarse usando la URL de nuestro archivo .env
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Si la conexión es exitosa, muestra este mensaje en la consola
    console.log(`MongoDB Conectado: ${conn.connection.host}`);
  } catch (error) {
    // Si hay un error, muestra el error y cierra el proceso
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;