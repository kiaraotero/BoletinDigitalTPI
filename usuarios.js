import express from "express";
import bcrypt from "bcrypt";
import { db } from "./db.js";

export const routerUsuarios = express.Router();

//  REGISTRO
routerUsuarios.post("/registro", (req, res) => {
  const { nombre, dni, email, password, rol } = req.body;

  if (!nombre || !dni || !email || !password || !rol)
    return res.status(400).json({ mensaje: "Faltan datos para registrar." });

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) return res.status(500).json({ mensaje: "Error al encriptar contraseña." });

    const sql = "INSERT INTO usuarios (nombre, dni, email, password, rol) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, [nombre, dni, email, hash, rol], (error) => {
      if (error) return res.status(500).json({ mensaje: "Error al registrar usuario." });
      res.json({ mensaje: "✅ Usuario registrado correctamente." });
    });
  });
});

//  LOGIN
routerUsuarios.post("/login", (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM usuarios WHERE email = ?";

  db.query(sql, [email], (error, results) => {
    if (error) return res.status(500).json({ mensaje: "Error al buscar usuario." });
    if (results.length === 0) return res.status(401).json({ mensaje: "Usuario no encontrado." });

    const usuario = results[0];
    bcrypt.compare(password, usuario.password, (err, coincide) => {
      if (!coincide) return res.status(401).json({ mensaje: "Contraseña incorrecta." });
      res.json({ mensaje: "✅ Inicio de sesión exitoso", usuario });
    });
  });
});

//  LISTAR USUARIOS
routerUsuarios.get("/", (req, res) => {
  const sql = "SELECT id, nombre, dni, email, rol FROM usuarios";
  db.query(sql, (error, results) => {
    if (error) return res.status(500).json({ mensaje: "Error al obtener usuarios." });
    res.json(results);
  });
});
