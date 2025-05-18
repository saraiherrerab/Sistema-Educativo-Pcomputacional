export default async function obtenerEstudiantesGrupo(id_grupo_seleccionado: number) {
    const resultado= await fetch('http://localhost:5555/grupos/estudiantes/' + id_grupo_seleccionado,{
                method: 'GET', // Método especificado
                mode: 'cors',   // Habilita CORS
                headers: {
                  'Content-Type': 'application/json'
                }
    });
    const resultado_json= await resultado.json();
    console.log(resultado_json);
    return resultado_json
}