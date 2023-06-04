require("dotenv").config();
const express = require("express");
const app = express();
const PORT = parseInt(process.env.PORT, 10) || 3000;
const cors = require("cors");

app.listen(PORT, console.log(`Escuchando por el puerto ${PORT}`));
app.use(express.json());
app.use(cors());

const {
  ObtenerLikes,
  AgregarLike,
  EliminarLike,
  ModificarLike,
  ObtenerLikeId
} = require("./consultas");

app.get("/likes", async (req, res) => {
  try {
    const data = await ObtenerLikes();
    res.status(200).json(data);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get("/likes/:id", async (req, res) => {
  try {
    
    const data = await ObtenerLikeId(req.params.id);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.post("/likes", async (req, res) => {
  try {
    const payload = req.body;

    if (payload == undefined) {
      res.status(400).send("Cuerpo vacío");
      return;
    }
    const { titulo, imagen, descripcion, likes } = req.body;
    await AgregarLike(titulo, imagen, descripcion, likes);
    //res.status(200).send("Like a " + titulo + " sumado")
    res.status(200).send("Like a " + titulo + " agregado");
  } catch ({ code, message }) {
    res.status(code).send(message);
  }
});

app.delete("/likes/:id", async (req, res) => {
  try {
    
    const {id} = req.params;    
    await EliminarLike(id);
    res.send("Like " + id + " eliminado").json();
  } catch (error) {
    res.status(code).send(message);
  }
});

app.put("/likes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, descripcion, likes, imagen } = req.body;
    await ModificarLike(titulo, descripcion, likes, imagen, id);
    res.send("Like " + id + " actualizado");
  } catch (error) {
    res.send(error);
  }
});
