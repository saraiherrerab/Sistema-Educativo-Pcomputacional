export default async function obtenerHorariosAlumno(id_grupo: number){
  try {
    const datosHorario = await fetch(`http://localhost:5555/horarios/grupo/${id_grupo}`)
    const resultadoConsulta = await datosHorario.json()
    console.log(resultadoConsulta)
    return resultadoConsulta;
  } catch (error) {
    console.error("Hubo un problema en la función obtenerHorariosAlumno()")
    return []
  }

  };
