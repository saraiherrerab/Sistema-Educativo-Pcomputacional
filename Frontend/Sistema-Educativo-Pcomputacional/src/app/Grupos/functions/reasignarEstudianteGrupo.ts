import Estudiante from "../interfaces/estudiante.interface";

export default async function reasignarEstudianteGrupo(estudiante:Estudiante,id_grupo: number) {
    const resultado= await fetch(`http://localhost:5555/grupos/estudiante/${estudiante.id_usuario}/editar/${id_grupo}`,{
                method: 'PUT', // Método especificado
                mode: 'cors',   // Habilita CORS
                headers: {
                  'Content-Type': 'application/json'
                }
    });
    const resultado_json= await resultado.json();
    console.log(resultado_json);
    return resultado_json
}