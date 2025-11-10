import express from "express";
import cors from "cors";
import { routerUsuarios } from "./usuarios.js";
import { routerNotas } from "./notas.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/usuarios", routerUsuarios);
app.use("/api/notas", routerNotas);

const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));

