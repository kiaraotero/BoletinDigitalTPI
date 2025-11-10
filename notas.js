import express from "express";
import { db } from "./db.js";

export const routerNotas = express.Router();

// Agregar nota
routerNotas.post("/crear", (req, res) => {
  const { alumno_id, materia, nota } = req.body;
  if (!alumno_id || !materia || !nota)
    return res.status(400).json({ mensaje: "Faltan datos para registrar la nota." });

  const sql = "INSERT INTO notas (alumno_id, materia, nota) VALUES (?, ?, ?)";
  db.query(sql, [alumno_id, materia, nota], (err) => {
    if (err) return res.status(500).json({ mensaje: "Error al guardar la nota." });
    res.json({ mensaje: "✅ Nota registrada correctamente." });
  });
});

// Listar notas
routerNotas.get("/", (req, res) => {
  db.query("SELECT * FROM notas", (err, results) => {
    if (err) return res.status(500).json({ mensaje: "Error al obtener notas." });
    res.json(results);
  });
});
