const { Pool } = require("pg");
const express = require("express");
const app = express();

const pool = new Pool({
  host: process.env.HOST || "localhost",
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  allowExitOnIdle: true,
  port: 5432,
});

const ObtenerLikes = async () => {
  const { rows } = await pool.query("SELECT * FROM posts ORDER BY id");

  return rows;
};

const ObtenerLikeId = async (id) => {
  const value = [id];
  const consulta = "SELECT * FROM posts WHERE id = $1  ORDER BY id";
  const { rows } = await pool.query(consulta, value);
  return rows;
};
const AgregarLike = async (titulo, imagen, descripcion, likes) => {
  try {
    const consulta =
      "INSERT INTO posts(titulo,img,descripcion,likes) values ($1, $2, $3, $4)";
    const values = [titulo, imagen, descripcion, likes];
    const result = await pool.query(consulta, values);
  } catch (error) {
    console.log(error.code);
  }
};

const EliminarLike = async (id) => {
  try {       
    
    const consulta = "DELETE FROM posts WHERE ID = $1";
    const value = [id];    
    const result = await pool.query(consulta, value);
  } catch {
    console.log("Error");
  }
};

const ModificarLike = async (titulo, descripcion, likes, imagen, id) => {
  try {    
    const consulta =
      "UPDATE posts SET titulo = $1, descripcion = $2, likes = $3, img = $4 WHERE ID = $5";
    const values = [titulo, descripcion, likes, imagen, id];
    const result = await pool.query(consulta, values);
    return "Like modificado";
  } catch {
    console.log("Error");
  }
};
module.exports = {
  ObtenerLikes,
  AgregarLike,
  EliminarLike,
  ModificarLike,
  ObtenerLikeId,
};
