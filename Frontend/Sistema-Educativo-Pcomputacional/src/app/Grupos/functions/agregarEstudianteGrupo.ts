import Estudiante from "../interfaces/estudiante.interface";

export default async function agregarEstudianteGrupo(estudiante:Estudiante,id_grupo: number) {
    const resultado= await fetch(`http://localhost:5555/grupos/estudiante/${estudiante.id_usuario}/agregar/${id_grupo}`,{
                method: 'POST', // Método especificado
                mode: 'cors',   // Habilita CORS
                headers: {
                  'Content-Type': 'application/json'
                }
    });
    const resultado_json= await resultado.json();
    console.log(resultado_json);
    return resultado_json
}