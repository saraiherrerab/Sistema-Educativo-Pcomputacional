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
  id_curso: number,
}

interface Profesor {
  id_usuario: number,
  id_profesor: number,
  nombre: string,
  grupos_ids: number[],
}

export default function GruposYCursos() {
  const Router = useRouter();

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

  const [searchTerm, setSearchTerm] = useState('');
  const [cursosFiltrados, setCursosFiltrados] = useState<Curso[]>(cursos);

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [nuevoCurso, setNuevoCurso] = useState<Curso>({ id_curso: 0, nombre: '' });
  const [cursoEditando, setCursoEditando] = useState<Curso | null>(null);

  useEffect(() => {
    filtrarCursos();
  }, [searchTerm, cursos]);

  const filtrarCursos = () => {
    const results = cursos.filter(c =>
      c.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCursosFiltrados(results);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchClick = () => {
    filtrarCursos();
  };

  const handleTitleClick = () => {
    setSearchTerm('');
    setCursosFiltrados(cursos);
  };

  const mostrarFormularioAgregar = () => {
    setNuevoCurso({ id_curso: Date.now(), nombre: '' });
    setMostrarFormulario(true);
  };

  const onAgregarCurso = () => {
    setCursos([...cursos, nuevoCurso]);
    setMostrarFormulario(false);
  };

  const onEditar = (curso: Curso) => {
    setCursoEditando({ ...curso });
  };

  const onGuardarEdicion = () => {
    if (!cursoEditando) return;
    const actualizados = cursos.map(c =>
      c.id_curso === cursoEditando.id_curso ? cursoEditando : c
    );
    setCursos(actualizados);
    setCursoEditando(null);
  };

  const onEliminar = (id: number) => {
    const actualizados = cursos.filter(c => c.id_curso !== id);
    setCursos(actualizados);
  };

  const obtenerGruposDelCurso = (idCurso: number) =>
    grupos.filter(g => g.id_curso === idCurso);

  const obtenerProfesoresDelCurso = (idCurso: number) => {
    const gruposDelCurso = obtenerGruposDelCurso(idCurso).map(g => g.id_grupo);
    return profesores.filter(p =>
      p.grupos_ids.some(grupoId => gruposDelCurso.includes(grupoId))
    );
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
            <h2 className="cursos" onClick={handleTitleClick}>CURSOS</h2>
            <button onClick={mostrarFormularioAgregar}>Agregar Cursos</button>
          </div>
          <div className="barraBusqueda">
            <div className="search-input-container">
              <input
                type="text"
                placeholder="Buscar cursos..."
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
        </div>

        {/* Mostrar tabla de cursos */}
        {!mostrarFormulario && !cursoEditando && (
          <>
            <table className="laTabla">
              <thead>
                <tr>
                  <th>Curso</th>
                  <th>Grupos</th>
                  <th>Profesores</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {cursosFiltrados.map(curso => {
                  const gruposCurso = obtenerGruposDelCurso(curso.id_curso);
                  const profesoresCurso = obtenerProfesoresDelCurso(curso.id_curso);

                  return (
                    <tr key={curso.id_curso}>
                      <td style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {curso.nombre}
                        {/* Icono lápiz para editar */}
                        <button
                          onClick={() => onEditar(curso)}
                        >
                          Editar
                        </button>
                      </td>
                      <td>{gruposCurso.map(g => g.nombre_grupo).join(", ")}</td>
                      <td>{profesoresCurso.map(p => p.nombre).join(", ")}</td>
                      <td className="display_flex">
                        <button onClick={() => onEliminar(curso.id_curso)}>Eliminar</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* Botón debajo de la tabla */}
            <button onClick={() => Router.push('/Grupos')}>
              Gestionar grupos
            </button>
          </>
        )}

        {/* Formulario para agregar curso */}
        {mostrarFormulario && (
          <div className="formulario-agregar">
            <h3>Agregar Nuevo Curso</h3>
            <input
              type="text"
              placeholder="Nombre"
              value={nuevoCurso.nombre}
              onChange={e => setNuevoCurso({ ...nuevoCurso, nombre: e.target.value })}
            />
            <button onClick={onAgregarCurso} disabled={!nuevoCurso.nombre.trim()}>Guardar</button>
            <button onClick={() => setMostrarFormulario(false)}>Cancelar</button>
          </div>
        )}

        {/* Formulario para editar curso */}
        {cursoEditando && (
          <div className="formulario-edicion">
            <h3>Editando curso</h3>
            <input
              type="text"
              placeholder="Nombre"
              value={cursoEditando.nombre || ''}
              onChange={e => setCursoEditando({ ...cursoEditando, nombre: e.target.value })}
            />
            <button onClick={onGuardarEdicion} disabled={!cursoEditando.nombre.trim()}>Guardar</button>
            <button onClick={() => setCursoEditando(null)}>Cancelar</button>
          </div>
        )}
      </div>
    </>
  );
}

