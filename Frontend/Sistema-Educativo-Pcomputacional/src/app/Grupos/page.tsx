'use client';
import { useState, useEffect } from 'react';
import './styles.css';
import '../login.css';
import Header from "../../components/header/header";
import { useRouter } from "next/navigation";
import obtenerGrupos from './functions/obtenerGrupos';
import obtenerCursos from '../GruposYCursos/functions/obtenerCursos';
import Curso from './interfaces/curso.interface';
import obtenerProfesores from './functions/obtenerProfesores';
import obtenerHorariosGrupo from './functions/obtenerHorariosGrupo';

interface Grupo {
  id_grupo: number,
  nombre_grupo: string,
  id_curso: number, // relación al curso
  id_profesor_grupo: number
}

interface Profesor {
  id_usuario: number,
  id_profesor: number,
  nombre: string,
  apellido: string,
  grupos_ids?: number[]; // relación a grupos
}

interface Horario {
  id_horario: number,
  dia_semana: string,
  hora_inicio: string,
  hora_fin: string,
  id_grupo: number,
}

interface Estudiante {
  id_estudiante: number,
  nombre: string,
  grupos_ids: number[], // relación a grupos
}

export default function Grupos() {
  const Router = useRouter();

  


  const [grupos, setGrupos] = useState<Grupo[]>([]);
  const [grupoEditando, setGrupoEditando] = useState<Grupo>({ id_grupo: 0, nombre_grupo: '', id_curso: 0, id_profesor_grupo: 0 });
  const [nuevoGrupo, setNuevoGrupo] = useState<Grupo>({ id_grupo: 0, nombre_grupo: '', id_curso: 0, id_profesor_grupo: 0 });

// Datos de ejemplo (mock)
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [profesores, setProfesores] = useState<Profesor[]>([]);
  const [horarios, setHorarios] = useState<Horario[]>([]);
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [gruposFiltrados, setGruposFiltrados] = useState<Grupo[]>(grupos);
  const [profesorSeleccionado, setProfesorSeleccionado] = useState<number>(0);
  const [horariosGrupo, setHorariosGrupo] = useState<Horario[]>([]);

  // Estados para mostrar formulario o vista estudiantes
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  

  const [mostrarEstudiantesGrupo, setMostrarEstudiantesGrupo] = useState<Grupo | null>(null);

  const [controlador,setControlador] = useState<string>("AGREGAR")

  const obtenerProfesorDeGrupo = (grupoId: number): Profesor | undefined => {
  return profesores.find(p => p.grupos_ids?.includes(grupoId));
};


  useEffect(() => {
  const cargarDatos = async () => {
    try {
      const [profesores, cursos, grupos] = await Promise.all([
        obtenerProfesores(),
        obtenerCursos(),
        obtenerGrupos()
      ]);

      console.log('%cProfesores:', 'color: red;', profesores);
      console.log('%cCursos:', 'color: red;', cursos);
      console.log('%cGrupos:', 'color: red;', grupos);

      setProfesores(profesores);
      setCursos(cursos);
      setGrupos(grupos);
    } catch (error) {
      console.error('Error al cargar los datos:', error);
    }
  };

  cargarDatos();
}, []);

const [horariosPorGrupo, setHorariosPorGrupo] = useState<{ [id: number]: string }>({});
useEffect(() => {
  const cargarHorarios = async () => {
    const nuevosHorarios: { [id: number]: string } = {};

    for (const grupo of gruposFiltrados) {
      const horarios = await obtenerHorariosGrupo(grupo.id_grupo);
      nuevosHorarios[grupo.id_grupo] = horarios
        .map((h: any) => `${h.dia_semana}: ${h.hora_inicio} a ${h.hora_fin}`)
        .join(', ');
    }

    setHorariosPorGrupo(nuevosHorarios);
  };

  if (gruposFiltrados.length > 0) {
    cargarHorarios();
  }
}, [gruposFiltrados]);


const [profesoresPorGrupo, setProfesoresPorGrupo] = useState<{ [id: number]: string }>({});
useEffect(() => {
  const cargarProfesores = async () => {
    const nuevosProfesores: { [id: number]: string } = {};

    for (const grupo of gruposFiltrados) {
      try {
        const res = await fetch(`http://localhost:5555/grupos/profesores/${grupo.id_grupo}`);
        const profesores = await res.json();

        nuevosProfesores[grupo.id_grupo] = profesores.map((p: any) => `${p.nombre} ${p.apellido}`).join(', ');
      } catch (error) {
        console.error(`Error cargando profesores para grupo ${grupo.id_grupo}:`, error);
        nuevosProfesores[grupo.id_grupo] = "Error al cargar";
      }
    }

    setProfesoresPorGrupo(nuevosProfesores);
  };

  if (gruposFiltrados.length > 0) {
    cargarProfesores();
  }
}, [gruposFiltrados]);

useEffect(() => {
  const filtrarGrupos = () => {
    const results = grupos.filter(g =>
      g.nombre_grupo.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setGruposFiltrados(results);
  };

  filtrarGrupos();
}, [searchTerm, grupos]); // 👈 Se agregó "grupos" como dependencia

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchClick = () => {
    filtrarGrupos();
  };

  const handleTitleClick = () => {
    setSearchTerm('');
    setGruposFiltrados(grupos);
  };

  // Obtener profesor(es) asignados a un grupo
  /*
  const obtenerProfesoresDelGrupo = (idGrupo: number) => {
    return profesores.filter(p => p.grupos_ids.includes(idGrupo));
  };
  */

  // Obtener horarios de un grupo
  const obtenerHorariosDelGrupo = (idGrupo: number) => {
    return horarios.filter(h => h.id_grupo === idGrupo);
  };

  // Obtener estudiantes de un grupo
  const obtenerEstudiantesDelGrupo = (idGrupo: number) => {
    return estudiantes.filter(e => e.grupos_ids.includes(idGrupo));
  };

  // Obtener curso del grupo
  const obtenerCursoDelGrupo = (idCurso: number) => {
    return cursos.find(c => c.id_curso === idCurso)?.nombre_curso || '';
  };

  // Funciones para formulario



  const mostrarFormularioAgregar = () => {
  setNuevoGrupo({ id_grupo: 0, nombre_grupo: '', id_curso: 0, id_profesor_grupo: 0});
  setProfesorSeleccionado(0);
  setHorariosGrupo([]);
  setMostrarFormulario(true);
  setGrupoEditando({ id_grupo: 0, nombre_grupo: '', id_curso: 0, id_profesor_grupo: 0 });
};


  const onAgregarGrupo = () => {
    setGrupos([...grupos, nuevoGrupo]);
    setMostrarFormulario(false);
  };



const onEditar = (grupo: Grupo) => {

  setGrupoEditando({ ...grupo });
  /*
  const prof = obtenerProfesorDeGrupo(grupo.id_grupo);
  setProfesorSeleccionado(prof ? prof.id_profesor : 0);
  
  // Carga horarios actuales del grupo al estado local
  const horariosActuales = horarios.filter(h => h.id_grupo === grupo.id_grupo);
  setHorariosGrupo(horariosActuales);
  */

  setMostrarFormulario(true);
};


/*
  const onGuardarEdicion = () => {
  if (!grupoEditando) return;

  // Actualizar grupos
  const actualizados = grupos.map(g =>
    g.id_grupo === grupoEditando.id_grupo ? grupoEditando : g
  );
  setGrupos(actualizados);

  // Actualizar profesores: 
  // 1) Remover grupo del profesor anterior
  // 2) Asignar grupo al profesor seleccionado

  setProfesores(prevProfesores => {
    return prevProfesores.map(prof => {
      // Si este profesor tenía este grupo, removerlo
      if (prof.grupos_ids.includes(grupoEditando.id_grupo)) {
        return {
          ...prof,
          grupos_ids: prof.id_profesor === profesorSeleccionado
            ? prof.grupos_ids // si es el nuevo profesor, dejar igual (se añade después)
            : prof.grupos_ids.filter(id => id !== grupoEditando.id_grupo)
        };
      }
      return prof;
    }).map(prof => {
      // Si es el profesor seleccionado, agregar el grupo si no lo tiene
      if (prof.id_profesor === profesorSeleccionado) {
        if (!prof.grupos_ids.includes(grupoEditando.id_grupo)) {
          return { ...prof, grupos_ids: [...prof.grupos_ids, grupoEditando.id_grupo] };
        }
      }
      return prof;
    });
  });

    // Actualizar horarios (remplazar horarios del grupo)
    setHorarios(prevHorarios => {
    // Quitar horarios antiguos del grupo
    const filtrados = prevHorarios.filter(h => h.id_grupo !== grupoEditando.id_grupo);
    // Agregar los horarios nuevos/actualizados
    return [...filtrados, ...horariosGrupo];
    });


  setGrupoEditando(null);
  setMostrarFormulario(false);
};
*/

  const onEliminar = (id: number) => {
    const actualizados = grupos.filter(g => g.id_grupo !== id);
    setGrupos(actualizados);
  };

  // Mostrar lista estudiantes grupo
  const onVerEstudiantes = (grupo: Grupo) => {
    setMostrarEstudiantesGrupo(grupo);
  };

  const onVolverListaGrupos = () => {
    setMostrarEstudiantesGrupo(null);
  };

  /* Funciones Principales */

  const crearNuevoGrupo = async () => {

    console.log('\x1b[1m\x1b[31m%s\x1b[0m', 'Iniciando crearNuevoGrupo()');

    console.log(nuevoGrupo)

    const resultado= await fetch('http://localhost:5555/grupos', {
        method: 'POST', // Método especificado
        mode: 'cors',   // Habilita CORS
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevoGrupo)
    });
    const resultado_json= await resultado.json();
    console.log(resultado_json);

    if(horariosGrupo.length > 0){
      try {
          const response = await fetch('http://localhost:5555/horarios/grupo/agregar', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id_grupo: resultado_json.id_grupo, arregloHorarios: [...horariosGrupo] })
          });

        const data = await response.json();
        console.log('%cRespuesta del servidor:', 'color: green;', data);
      } catch (error) {
        console.error('Error al enviar los horarios:', error);
      }
    }

    console.log('\x1b[1m\x1b[31m%s\x1b[0m', 'Finalizando crearNuevoGrupo()');
    
    setGrupos([...grupos, nuevoGrupo])
    setMostrarFormulario(false);

  }

  const borrarGrupoSeleccionado = async (id_grupo_seleccionado: number) => {
    console.log('\x1b[1m\x1b[31m%s\x1b[0m', 'Iniciando borrarGrupoSeleccionado()');

    console.log(nuevoGrupo)

    const resultado= await fetch('http://localhost:5555/grupos/' + id_grupo_seleccionado, {
        method: 'DELETE', // Método especificado
        mode: 'cors',   // Habilita CORS
        headers: {
          'Content-Type': 'application/json'
        }
    });
    const resultado_json= await resultado.json();
    console.log(resultado_json);

    console.log('\x1b[1m\x1b[31m%s\x1b[0m', 'Finalizando borrarGrupoSeleccionado()');
    
    setGrupos([...grupos.filter( (grupo) => grupo.id_grupo !== id_grupo_seleccionado)])
    
    return resultado_json
  }

  const editarGrupoSeleccionado = async (grupo_seleccionado: Grupo) => {
    console.log('\x1b[1m\x1b[31m%s\x1b[0m', 'Iniciando editarGrupoSeleccionado()');

    setControlador("EDITAR")
    setMostrarFormulario(true)
    
    console.log(grupo_seleccionado)

    setGrupoEditando({...grupo_seleccionado})

    const consultaHorarios = await obtenerHorariosGrupo(grupo_seleccionado.id_grupo);
    console.log(consultaHorarios)

    setHorariosGrupo([...consultaHorarios])


    console.log('\x1b[1m\x1b[31m%s\x1b[0m', 'Finalizando editarGrupoSeleccionado()');
  }

  const guardarEdicionGrupoSeleccionado = async () => {
    console.log('\x1b[1m\x1b[31m%s\x1b[0m', 'Iniciando editarGrupoSeleccionado()');

    const resultado= await fetch('http://localhost:5555/grupos/', {
        method: 'PUT', // Método especificado
        mode: 'cors',   // Habilita CORS
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(grupoEditando)
    });
    const resultado_json= await resultado.json();
    console.log(resultado_json);

    if(horariosGrupo.length > 0){
      try {

        const horariosAnteriores = await obtenerHorariosGrupo(grupoEditando.id_grupo)
        console.log(horariosAnteriores)

        if(horariosAnteriores.length > 0) {
          const response = await fetch('http://localhost:5555/horarios/grupo/modificar', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id_grupo: grupoEditando.id_grupo, arregloHorarios: [...horariosGrupo] })
          });
          const data = await response.json();
          console.log('%cRespuesta del servidor:', 'color: green;', data);
        }else{
          const response = await fetch('http://localhost:5555/horarios/grupo/agregar', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id_grupo: grupoEditando.id_grupo, arregloHorarios: [...horariosGrupo] })
          });
          const data = await response.json();
          console.log('%cRespuesta del servidor:', 'color: green;', data);
        }
          
      } catch (error) {
        console.error('Error al enviar los horarios:', error);
      }
    }

    setControlador("AGREGAR")
    setMostrarFormulario(false)

    const actualizados = grupos.map(grupo =>
      grupo.id_grupo === grupoEditando.id_grupo ? grupoEditando : grupo
    );
    setGrupos(actualizados);
    setGrupoEditando({ id_grupo: 0, nombre_grupo: '', id_curso: 0, id_profesor_grupo: 0 });
    console.log('\x1b[1m\x1b[31m%s\x1b[0m', 'Finalizando editarGrupoSeleccionado()');
  }

  return (
    <>
      <Header
        text="MULTIPLAYER" onClick={() => Router.push("/videojuego")}
        text1="Panel de Juegos" onClick1={() => Router.push("/videojuego")}
        text2="Menu" onClick2={() => Router.push("/videojuego")}
        text3="Mi perfil" onClick3={() => Router.push("/videojuego")}
        text4="Salir" onClick4={() => Router.push("/videojuego")}
      />

      <div className="listado body_estudiantes">
        <div className="encabezado">
          <div className="tituloListado" style={{ cursor: 'pointer' }}>
            <h2 className="cursos" onClick={handleTitleClick}>GRUPOS</h2>
            {!mostrarEstudiantesGrupo && !mostrarFormulario && (
              <button onClick={mostrarFormularioAgregar}>Agregar Grupo</button>
            )}
            {mostrarEstudiantesGrupo && (
              <button onClick={onVolverListaGrupos}>Volver a grupos</button>
            )}
          </div>
          {!mostrarEstudiantesGrupo && (
            <div className="barraBusqueda">
              <div className="search-input-container">
                <input
                  type="text"
                  placeholder="Buscar grupos..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="search-input"
                />
                <img
                  src="./lupa-icon.png"
                  alt="Buscar"
                  className="search-icon"
                  onClick={handleSearchClick}
                  style={{ cursor: 'pointer' }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Mostrar tabla o lista de estudiantes */}
        {!mostrarFormulario && (
          <table className="laTabla">
            <thead>
              <tr>
                <th>Grupo</th>
                <th>Profesor</th>
                <th>Horarios</th>
                <th>Estudiantes</th>
                <th>Curso</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {gruposFiltrados.map(grupo => (
                <tr key={grupo.id_grupo}>
                  <td>{grupo.nombre_grupo}</td>
                  <td>{profesoresPorGrupo[grupo.id_grupo] || "Cargando..."}</td>
                  <td>{horariosPorGrupo[grupo.id_grupo] || "Cargando..."}</td>
                  <td>
                    <button onClick={() => onVerEstudiantes(grupo)}>Ver</button>
                  </td>
                  <td className="display_flex">
                    <button onClick={() => editarGrupoSeleccionado(grupo)}>Editar</button>
                    <button onClick={() => borrarGrupoSeleccionado(grupo.id_grupo)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Formulario de grupo */}
        {(mostrarFormulario) && (
          <div className="formulario-grupo">
            <h3>{(controlador !== "AGREGAR") ? "Editando Grupo" : "Agregar Nuevo Grupo"}</h3>

            {/* Nombre del grupo */}
            <label>
              Nombre del grupo:
              <input
                type="text"
                placeholder="Ej: Grupo A"
                value={(controlador !== "AGREGAR") ? grupoEditando.nombre_grupo : nuevoGrupo.nombre_grupo}
                onChange={e => {
                  const val = e.target.value;
                  if ((controlador !== "AGREGAR")){
                    setGrupoEditando({ ...grupoEditando, nombre_grupo: val });
                  }else{
                    setNuevoGrupo({...nuevoGrupo, nombre_grupo: val})
                  }
                    
                }}
              />
            </label>

            {/* Curso */}
            <label>
              Curso:
              <select
                value={(controlador !== "AGREGAR") ? grupoEditando.id_curso : nuevoGrupo.id_curso}
                onChange={e => {
                  const val = parseInt(e.target.value);
                  if ((controlador !== "AGREGAR")){
                    setGrupoEditando({ ...grupoEditando, id_curso: val });
                  }else{
                    setNuevoGrupo({ ...nuevoGrupo, id_curso: val });
                  } 
                }}
              >
                <option value={0}>Seleccione un curso</option>
                {cursos.map(curso => (
                  <option key={curso.id_curso} value={curso.id_curso}>{curso.nombre_curso}</option>
                ))}
              </select>
            </label>

            {/* Profesor */}
            <label>
              Profesor:
              <select
                value={(controlador !== "AGREGAR") ? grupoEditando.id_profesor_grupo : nuevoGrupo.id_profesor_grupo}
                onChange={e => {
                  const val = parseInt(e.target.value);
                  if((controlador !== "AGREGAR")){
                    setGrupoEditando({...grupoEditando, id_profesor_grupo: val})
                  }else{
                    setNuevoGrupo({...nuevoGrupo, id_profesor_grupo: val})
                  }
                }}
              >
                <option value={0}>Seleccione un profesor</option>
                {profesores.map(prof => (
                  <option key={prof.id_profesor} value={prof.id_profesor}>{prof.nombre + " " + prof.apellido}</option>
                ))}
              </select>
            </label>

            {/* Horarios */}
            <div className="horarios-section">
              <h4>Horarios</h4>
              {horariosGrupo.map((horario, idx) => (
                <div key={horario.id_horario} className="horario-item">
                  <label>Día:
                    <select
                      value={horario.dia_semana}
                      onChange={e => {
                        const newDia = e.target.value;
                        setHorariosGrupo(hs => hs.map((h, i) => i === idx ? { ...h, dia_semana: newDia } : h));
                      }}
                    >
                      {["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"].map(dia => (
                        <option key={dia} value={dia}>{dia}</option>
                      ))}
                    </select>
                  </label>

                  <label>Hora inicio:
                    <input
                      type="time"
                      value={horario.hora_inicio}
                      onChange={e => {
                        const newHoraInicio = e.target.value;
                        setHorariosGrupo(hs => hs.map((h, i) => i === idx ? { ...h, hora_inicio: newHoraInicio } : h));
                      }}
                    />
                  </label>

                  <label>Hora fin:
                    <input
                      type="time"
                      value={horario.hora_fin}
                      onChange={e => {
                        const newHoraFin = e.target.value;
                        setHorariosGrupo(hs => hs.map((h, i) => i === idx ? { ...h, hora_fin: newHoraFin } : h));
                      }}
                    />
                  </label>

                  <button className="btn-eliminar" onClick={() => {
                    setHorariosGrupo(hs => hs.filter((_, i) => i !== idx));
                  }}>
                    ❌
                  </button>
                </div>
              ))}

              <button className="btn-agregar-horario" onClick={() => {
                const nuevo: Horario = {
                  id_horario: Date.now(),
                  dia_semana: "Lunes",
                  hora_inicio: "08:00",
                  hora_fin: "10:00",
                  id_grupo: (controlador !== "AGREGAR") ? grupoEditando.id_grupo : nuevoGrupo.id_grupo,
                };
                setHorariosGrupo([...horariosGrupo, nuevo]);
              }}>
                ➕ Agregar horario
              </button>
            </div>

            {/* Botones de acción */}
            <div className="acciones-formulario">
              <button className="btn-guardar" onClick={() => {
                if (controlador !== "AGREGAR") {
                  guardarEdicionGrupoSeleccionado();
                } else {
                  crearNuevoGrupo();
                }}}
            >
                {(controlador !== "AGREGAR") ? "Guardar Cambios" : "Agregar Grupo"}
              </button>
              <button onClick={() => setMostrarFormulario(false)}>Cancelar</button>
            </div>
          </div>
        )}




{/* Lista de estudiantes de un grupo */}




    {mostrarEstudiantesGrupo && (
      <div className="tabla-estudiantes">
        <h3>Estudiantes de {mostrarEstudiantesGrupo.nombre_grupo}</h3>
        <ul>
          {obtenerEstudiantesDelGrupo(mostrarEstudiantesGrupo.id_grupo).map(est => (
            <li key={est.id_estudiante}>{est.nombre}</li>
          ))}
        </ul>
      </div>
    )}
  </div>
</>);
}
