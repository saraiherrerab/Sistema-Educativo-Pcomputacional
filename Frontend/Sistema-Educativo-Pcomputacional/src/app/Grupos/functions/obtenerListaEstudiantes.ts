import Estudiante from "../interfaces/estudiante.interface";

export default async function obtenerEstudiantes() : Promise<Estudiante[]>{
        const resultado= await fetch('http://localhost:5555/estudiantes',{
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