'use client';
import { useEffect, useState } from "react";
import './styles.css';
import Header from "../../components/header/header";
import { useRouter } from "next/navigation";


export default function EstudiantesLista() {
    const Router = useRouter();

    interface Estudiante {
        id: number;
        nombre: string;
        apellido: string;
        nivel: string;
        usuario: string;
        contrasenia: string;
        perfil: string;
        estado: string;
      }
      
      const [estudiantes, setEstudiantes] = useState<Estudiante[]>([]);
      const [filteredEstudiantes, setFilteredEstudiantes] = useState<Estudiante[]>([]);
      const [searchTerm, setSearchTerm] = useState('');
    
    useEffect(() => {
        obtenerProfesores();
      }, []);
      
    async function obtenerProfesores() {
        const resultado= await fetch('http://localhost:5555/profesores',{
                method: 'GET', // Método especificado
                mode: 'cors',   // Habilita CORS
                headers: {
                  'Content-Type': 'application/json'
                }
                    });
        const resultado_json= await resultado.json();
        console.log(resultado_json);

        setEstudiantes(resultado_json);
        setFilteredEstudiantes(resultado_json); // para que la tabla tenga datos visibles al inicio
    }
    
    useEffect(() => {
        filterStudents();
    }, [searchTerm, estudiantes]);
    

    const [estudianteEditando, setEstudianteEditando] = useState<{
        id: number;
        nombre: string;
        apellido: string;
        nivel: string;
        usuario: string;
        contrasenia: string;
        perfil: string;
        estado: string;
    } | null>(null);

    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [nuevoEstudiante, setNuevoEstudiante] = useState({
        nombre: '',
        apellido: '',
        nivel: '',
        usuario: '',
        contrasenia: '',
        perfil: '',
        estado: ''
    });

    useEffect(() => {
        console.log('La pantalla se montó solo una vez');
    
        // Aquí podrías cargar datos, hacer una animación, redirigir, etc.
      }, []); // <--- Esto garantiza que se ejecuta una sola vez (cuando se monta)

      const filterStudents = () => {
        const results = estudiantes.filter(estudiante =>
          (estudiante.nombre?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
          (estudiante.apellido?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
          (estudiante.nivel?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
          (estudiante.usuario?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
          (estudiante.perfil?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
          (estudiante.estado?.toLowerCase() || "").includes(searchTerm.toLowerCase())
        );
        setFilteredEstudiantes(results);
      };
      

    const onEditar = (estudiante: any) => {
        setEstudianteEditando({ ...estudiante });
    };

    const onGuardarEdicion = async () => {
        if (!estudianteEditando) return;

        try {
            const response = await fetch(`http://localhost:5555/profesores/${estudianteEditando.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(estudianteEditando),
            });

            if (response.ok) {
                const updatedList = estudiantes.map(est =>
                    est.id === estudianteEditando.id ? estudianteEditando : est
                );
                setEstudiantes(updatedList);
                setFilteredEstudiantes(updatedList);
                setEstudianteEditando(null);
            } else {
                console.error("Error al actualizar el profesor");
            }
        } catch (error) {
            console.error("Error en la petición:", error);
        }
    };

    const onEliminar = async (id: number) => {
        const confirmacion = confirm("¿Estás seguro de que quieres eliminar este estudiante?");
        if (!confirmacion) return;

        try {
            const response = await fetch(`http://localhost:5555/profesores/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setEstudiantes(estudiantes.filter(est => est.id !== id));
                setFilteredEstudiantes(filteredEstudiantes.filter(est => est.id !== id));
            } else {
                console.error("Error al eliminar el profesor");
            }
        } catch (error) {
            console.error("Error en la petición:", error);
        }
    };

    const onAgregarEstudiante = () => {
        const nuevo = { ...nuevoEstudiante, id: Date.now() };
        setEstudiantes([...estudiantes, nuevo]);
        setFilteredEstudiantes([...filteredEstudiantes, nuevo]);
        setMostrarFormulario(false); // Asegúrate de que el formulario se cierre después de guardar
        setNuevoEstudiante({
            nombre: '',
            apellido: '',
            nivel: '',
            usuario: '',
            contrasenia: '',
            perfil: '',
            estado: ''
        });
    };

    const handleTitleClick = () => {
        window.location.reload();
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        filterStudents();
    };

    const handleSearchClick = () => {
        filterStudents();
    };

    const mostrarFormularioAgregar = () => {

        console.log("Mostrar formulario para agregar")
        setMostrarFormulario(true);
        setEstudianteEditando(null); // Asegúrate de que no se muestre el formulario de edición al mismo tiempo
    };

    return (
        <>
            <Header
                text="MULTIPLAYER" onClick={() => Router.push("/videojuego")}
                text1="Panel de Juegos" onClick1={() => Router.push("/videojuego")}
                text2="Menu" onClick2={() => Router.push("/videojuego")}
                text3="Mi perfil" onClick3={() => Router.push("/videojuego")}
                text4="Salir" onClick4={() => Router.push("/videojuego")}>
            </Header>
            <button onClick={()=>obtenerProfesores()}> ObtenerProfesores </button>

                <div className="listado">
                    <div className="encabezado">
                        <div className="tituloListado" style={{ cursor: 'pointer' }}>
                            <h2 className="profesores" onClick={() => handleTitleClick()}>PROFESORES</h2>
                            <button onClick={() => mostrarFormularioAgregar()}>Agregar Profesor</button>
                        </div>
                        <div className="barraBusqueda">
                        <div className="search-input-container">
                            <input
                                type="text"
                                placeholder="Buscar profesores..."
                                value={searchTerm}
                                onChange={ e => handleSearchChange(e)}
                                className="search-input"
                            />
                            <img
                                src="./lupa-icon.png"
                                alt="Buscar"
                                className="search-icon"
                                onClick={() => handleSearchClick()}
                                style={{ cursor: 'pointer' }}
                            />
                        </div>
                    </div>
                </div>

                {mostrarFormulario && (
                    <div className="formulario-agregar">
                        <h3>Agregar Nuevo Estudiante</h3>
                        <input type="text" placeholder="Nombre" value={nuevoEstudiante.nombre} onChange={e => setNuevoEstudiante({ ...nuevoEstudiante, nombre: e.target.value })} />
                        <input type="text" placeholder="Apellido" value={nuevoEstudiante.apellido} onChange={e => setNuevoEstudiante({ ...nuevoEstudiante, apellido: e.target.value })} />
                        <input type="text" placeholder="Nivel" value={nuevoEstudiante.nivel} onChange={e => setNuevoEstudiante({ ...nuevoEstudiante, nivel: e.target.value })} />
                        <input type="text" placeholder="Usuario" value={nuevoEstudiante.usuario} onChange={e => setNuevoEstudiante({ ...nuevoEstudiante, usuario: e.target.value })} />
                        <input type="password" placeholder="Contraseña" value={nuevoEstudiante.contrasenia} onChange={e => setNuevoEstudiante({ ...nuevoEstudiante, contrasenia: e.target.value })} />
                        <input type="text" placeholder="Perfil" value={nuevoEstudiante.perfil} onChange={e => setNuevoEstudiante({ ...nuevoEstudiante, perfil: e.target.value })} />
                        <input type="text" placeholder="Estado" value={nuevoEstudiante.estado} onChange={e => setNuevoEstudiante({ ...nuevoEstudiante, estado: e.target.value })} />
                        <button onClick={() => onAgregarEstudiante()}>Guardar</button>
                        <button onClick={() => setMostrarFormulario(false)}>Cancelar</button>
                    </div>
                )}

                {!mostrarFormulario && !estudianteEditando && (
                    <table>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Nivel</th>
                                <th>Usuario</th>
                                <th>Contraseña</th>
                                <th>Perfil</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredEstudiantes.map((estudiante) => (
                                <tr key={estudiante.id}>
                                    <td>{estudiante.nombre}</td>
                                    <td>{estudiante.apellido}</td>
                                    <td>{estudiante.nivel}</td>
                                    <td>{estudiante.usuario}</td>
                                    <td>{estudiante.contrasenia}</td>
                                    <td>{estudiante.perfil}</td>
                                    <td>{estudiante.estado}</td>
                                    <td>
                                        <button onClick={() => onEditar(estudiante)}>Editar</button>
                                        <button onClick={() => onEliminar(estudiante.id)}>Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                {estudianteEditando && (
                    <div className="formulario-edicion">
                        <h3>Editando estudiante</h3>
                        <input type="text" value={estudianteEditando.nombre} onChange={e => setEstudianteEditando({ ...estudianteEditando, nombre: e.target.value })} />
                        <input type="text" value={estudianteEditando.apellido} onChange={e => setEstudianteEditando({ ...estudianteEditando, apellido: e.target.value })} />
                        <input type="text" value={estudianteEditando.nivel} onChange={e => setEstudianteEditando({ ...estudianteEditando, nivel: e.target.value })} />
                        <input type="text" value={estudianteEditando.usuario} onChange={e => setEstudianteEditando({ ...estudianteEditando, usuario: e.target.value })} />
                        <input type="password" value={estudianteEditando.contrasenia} onChange={e => setEstudianteEditando({ ...estudianteEditando, contrasenia: e.target.value })} />
                        <input type="text" value={estudianteEditando.perfil} onChange={e => setEstudianteEditando({ ...estudianteEditando, perfil: e.target.value })} />
                        <input type="text" value={estudianteEditando.estado} onChange={e => setEstudianteEditando({ ...estudianteEditando, estado: e.target.value })} />
                        <button onClick={() => onGuardarEdicion()}>Guardar</button>
                        <button onClick={() => setEstudianteEditando(null)}>Cancelar</button>
                    </div>
                )}
            </div>
        </>
    );
}