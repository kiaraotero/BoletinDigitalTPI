//  ESTUDIANTE - VER SUS NOTAS
const boletinBody = document.getElementById("boletinBody");
if (boletinBody) {
  //  en un sistema real, usarías el ID del usuario logueado
  const alumno_id = 1; // ejemplo: estudiante con ID 1

  fetch(`${API_URL}/notas`)
    .then(res => res.json())
    .then(data => {
      const notasAlumno = data.filter(n => n.alumno_id === alumno_id);
      boletinBody.innerHTML = notasAlumno.map(n => `
        <tr>
          <td>${n.materia}</td>
          <td class="${n.nota >= 7 ? 'nota-alta' : 'nota-baja'}">${n.nota}</td>
          <td>${n.nota >= 7 ? 'Aprobado' : 'Desaprobado'}</td>
        </tr>
      `).join("");
    })
    .catch(err => {
      boletinBody.innerHTML = `<tr><td colspan="3">Error al cargar las notas.</td></tr>`;
      console.error(err);
    });
}
