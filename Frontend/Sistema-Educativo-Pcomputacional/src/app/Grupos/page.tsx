'use client';
import { useState, useEffect } from 'react';
import './styles.css';
import '../login.css';
import Header from "../../components/header/header";
import { useRouter } from "next/navigation";

interface Curso {
  id_curso: number,
  nombre: string,
}

interface Grupo {
  id_grupo: number,
  nombre_grupo: string,
  id_curso: number, // relación al curso
}

interface Profesor {
  id_usuario: number,
  id_profesor: number,
  nombre: string,
  grupos_ids: number[]; // relación a grupos
}

interface Horario {
  id_horario: number,
  dia: string,
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

  // Datos de ejemplo (mock)
  const [cursos, setCursos] = useState<Curso[]>([
    { id_curso: 1, nombre: "Robótica" },
    { id_curso: 2, nombre: "Matemáticas" }
  ]);

  const [grupos, setGrupos] = useState<Grupo[]>([
    { id_grupo: 1, nombre_grupo: "Grupo A", id_curso: 1 },
    { id_grupo: 2, nombre_grupo: "Grupo B", id_curso: 1 },
    { id_grupo: 3, nombre_grupo: "Grupo C", id_curso: 2 }
  ]);

  const [profesores, setProfesores] = useState<Profesor[]>([
    { id_usuario: 101, id_profesor: 1, nombre: "Profe Ana", grupos_ids: [1, 3] },
    { id_usuario: 102, id_profesor: 2, nombre: "Profe Luis", grupos_ids: [2] }
  ]);

  const [horarios, setHorarios] = useState<Horario[]>([
    { id_horario: 1, dia: "Lunes", hora_inicio: "14:00", hora_fin: "17:00", id_grupo: 1 },
    { id_horario: 2, dia: "Martes", hora_inicio: "14:00", hora_fin: "17:00", id_grupo: 1 },
    { id_horario: 3, dia: "Miércoles", hora_inicio: "10:00", hora_fin: "12:00", id_grupo: 2 },
     { id_horario: 3, dia: "Miércoles", hora_inicio: "10:00", hora_fin: "12:00", id_grupo: 3 },
  ]);

  const [estudiantes, setEstudiantes] = useState<Estudiante[]>([
    { id_estudiante: 201, nombre: "Juan Pérez", grupos_ids: [1] },
    { id_estudiante: 202, nombre: "María López", grupos_ids: [1, 2] },
    { id_estudiante: 203, nombre: "Carlos Ruiz", grupos_ids: [3] },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [gruposFiltrados, setGruposFiltrados] = useState<Grupo[]>(grupos);
  const [profesorSeleccionado, setProfesorSeleccionado] = useState<number>(0);
  const [horariosGrupo, setHorariosGrupo] = useState<Horario[]>([]);



  // Estados para mostrar formulario o vista estudiantes
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [grupoEditando, setGrupoEditando] = useState<Grupo | null>(null);
  const [nuevoGrupo, setNuevoGrupo] = useState<Grupo>({ id_grupo: 0, nombre_grupo: '', id_curso: 0 });

  const [mostrarEstudiantesGrupo, setMostrarEstudiantesGrupo] = useState<Grupo | null>(null);

  const obtenerProfesorDeGrupo = (grupoId: number): Profesor | undefined => {
  return profesores.find(p => p.grupos_ids.includes(grupoId));
};


  useEffect(() => {
    filtrarGrupos();
  }, [searchTerm, grupos]);

  const filtrarGrupos = () => {
    const results = grupos.filter(g =>
      g.nombre_grupo.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setGruposFiltrados(results);
  };

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
  const obtenerProfesoresDelGrupo = (idGrupo: number) => {
    return profesores.filter(p => p.grupos_ids.includes(idGrupo));
  };

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
    return cursos.find(c => c.id_curso === idCurso)?.nombre || '';
  };

  // Funciones para formulario



  const mostrarFormularioAgregar = () => {
  setNuevoGrupo({ id_grupo: Date.now(), nombre_grupo: '', id_curso: 0 });
  setProfesorSeleccionado(0);
  setHorariosGrupo([]);
  setMostrarFormulario(true);
  setGrupoEditando(null);
};


  const onAgregarGrupo = () => {
    setGrupos([...grupos, nuevoGrupo]);
    setMostrarFormulario(false);
  };



const onEditar = (grupo: Grupo) => {
  setGrupoEditando({ ...grupo });
  const prof = obtenerProfesorDeGrupo(grupo.id_grupo);
  setProfesorSeleccionado(prof ? prof.id_profesor : 0);
  
  // Carga horarios actuales del grupo al estado local
  const horariosActuales = horarios.filter(h => h.id_grupo === grupo.id_grupo);
  setHorariosGrupo(horariosActuales);

  setMostrarFormulario(true);
};



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
        {!mostrarFormulario && !grupoEditando && !mostrarEstudiantesGrupo && (
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
              {gruposFiltrados.map(grupo => {
                const profesoresGrupo = obtenerProfesoresDelGrupo(grupo.id_grupo);
                const horariosGrupo = obtenerHorariosDelGrupo(grupo.id_grupo);
                const estudiantesGrupo = obtenerEstudiantesDelGrupo(grupo.id_grupo);
                const cursoNombre = obtenerCursoDelGrupo(grupo.id_curso);

                return (
                  <tr key={grupo.id_grupo}>
                    <td>{grupo.nombre_grupo}</td>
                    <td>{profesoresGrupo.map(p => p.nombre).join(", ")}</td>
                    <td>
                      {horariosGrupo.map(h => `${h.dia} ${h.hora_inicio}-${h.hora_fin}`).join("; ")}
                    </td>
                    <td>
                      {estudiantesGrupo.length}{" "}
                      <button onClick={() => onVerEstudiantes(grupo)}>Ver</button>
                    </td>
                    <td>{cursoNombre}</td>
                    <td className="display_flex">
                      <button onClick={() => onEditar(grupo)}>Editar</button>
                      <button onClick={() => onEliminar(grupo.id_grupo)}>Eliminar</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}

        {/* Formulario de grupo */}
  {(mostrarFormulario || grupoEditando) && (
    <div className="formulario-grupo">
      <h3>{grupoEditando ? "Editando Grupo" : "Agregar Nuevo Grupo"}</h3>

      {/* Nombre del grupo */}
      <label>
        Nombre del grupo:
        <input
          type="text"
          placeholder="Ej: Grupo A"
          value={grupoEditando ? grupoEditando.nombre_grupo : nuevoGrupo.nombre_grupo}
          onChange={e => {
            const val = e.target.value;
            if (grupoEditando) setGrupoEditando({ ...grupoEditando, nombre_grupo: val });
            else setNuevoGrupo({ ...nuevoGrupo, nombre_grupo: val });
          }}
        />
      </label>

      {/* Curso */}
      <label>
        Curso:
        <select
          value={grupoEditando ? grupoEditando.id_curso : nuevoGrupo.id_curso}
          onChange={e => {
            const val = parseInt(e.target.value);
            if (grupoEditando) setGrupoEditando({ ...grupoEditando, id_curso: val });
            else setNuevoGrupo({ ...nuevoGrupo, id_curso: val });
          }}
        >
          <option value={0}>Seleccione un curso</option>
          {cursos.map(curso => (
            <option key={curso.id_curso} value={curso.id_curso}>{curso.nombre}</option>
          ))}
        </select>
      </label>

      {/* Profesor */}
      <label>
        Profesor:
        <select
          value={
            grupoEditando
              ? obtenerProfesorDeGrupo(grupoEditando.id_grupo)?.id_profesor || 0
              : 0
          }
          onChange={e => {
            const val = parseInt(e.target.value);
            if (grupoEditando) {
              setGrupoEditando({ ...grupoEditando });
              setProfesorSeleccionado(val);
            } else {
              setProfesorSeleccionado(val);
            }
          }}
        >
          <option value={0}>Seleccione un profesor</option>
          {profesores.map(prof => (
            <option key={prof.id_profesor} value={prof.id_profesor}>{prof.nombre}</option>
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
                value={horario.dia}
                onChange={e => {
                  const newDia = e.target.value;
                  setHorariosGrupo(hs => hs.map((h, i) => i === idx ? { ...h, dia: newDia } : h));
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
            dia: "Lunes",
            hora_inicio: "08:00",
            hora_fin: "10:00",
            id_grupo: grupoEditando?.id_grupo ?? nuevoGrupo.id_grupo,
          };
          setHorariosGrupo([...horariosGrupo, nuevo]);
        }}>
          ➕ Agregar horario
        </button>
      </div>

      {/* Botones de acción */}
      <div className="acciones-formulario">
        <button className="btn-guardar" onClick={grupoEditando ? onGuardarEdicion : onAgregarGrupo}>
          {grupoEditando ? "Guardar Cambios" : "Agregar Grupo"}
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
