export default async function obtenerHorariosProfesor(id_profesor: number){
    const datosHorario = await fetch(`http://localhost:5555/horarios/profesor/${id_profesor}`)
    const resultadoConsulta = await datosHorario.json()
    console.log(resultadoConsulta)
    return resultadoConsulta
};

