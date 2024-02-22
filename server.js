// Importa las dependencias
const express = require('express');
const mongoose = require('mongoose');

// Configura la aplicación Express
const app = express();
app.use(express.json());

// Conexión a la base de datos MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/Escuela'); //! <------------ IMPORTANTE
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', () => {
  console.log('Conectado a la base de datos MongoDB');
});

// Define el esquema del modelo
const UsuarioSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number
});

// Define el modelo
const Usuario = mongoose.model('Usuario', UsuarioSchema);

// Ruta GET para obtener todos los usuarios
app.get('/usuarios', async (req, res) => {
  try {
      const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});



// Inicia el servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en http://localhost:${PORT}`);
});
