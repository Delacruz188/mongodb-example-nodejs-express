// Importa las dependencias
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Configura la aplicación Express
const app = express();
app.use(express.json());
app.use(cors());

// Conexión a la base de datos MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/proyecto_node_1");
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Error de conexión a MongoDB:"));
db.once("open", () => {
  console.log("Conectado a la base de datos MongoDB");
});

// Define el esquema del modelo

let califSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: [true, "Property is required"],
  },
  materiaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Materia",
    required: [true, "Property is required"],
  },
  calificacion: {
    type: Number,
    required: [true, "Property is required"],
  },
});

const userSchema = new mongoose.Schema({
  nombre: String,
});

// Define el modelo
const Calificacion = mongoose.model("Calificaciones", califSchema);
const Usuario = mongoose.model("Usuarios", userSchema);

// Ruta GET para obtener todos los usuarios
app.get("/calificaciones", async (req, res) => {
  try {
    const calificaciones = await Calificacion.find();
    // const usuarios = await Usuario.findById(req.params.userId);

    let nuevasCalif = await Promise.all(
      calificaciones.map(async (element) => {
        const userInfo = await Usuario.findById(element.userId);
        return {
          userInfo,
          calificacion: element.calificacion,
        };
      })
    );

    res.json(nuevasCalif);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Inicia el servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en http://localhost:${PORT}`);
});
