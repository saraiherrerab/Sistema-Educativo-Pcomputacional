'use client';
import { useEffect, useState } from "react";
import './styles.css';
import Header from "../../components/header/header";
import { useRouter } from "next/navigation";


export default function EstudiantesLista() {
    const Router = useRouter();

    interface Profesor {
        id_usuario: number,
        telefono: string,
        nombre: string,
        apellido: string,
        correo: string,
        edad: number,
        foto: string,
        usuario: string,
        clave_acceso: string,
        cedula: string,
        id_profesor: number,
        curriculum: string
    }
      
      const [profesores, setProfesores] = useState<Profesor[]>([]);
      const [profesoresFiltrados, setProfesoresFiltrados] = useState<Profesor[]>([]);
      const [searchTerm, setSearchTerm] = useState('');

    async function obtenerProfesores() : Promise<Profesor[]>{
        const resultado= await fetch('http://localhost:5555/profesores',{
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

        // Este useEffect se ejecuta una sola vez al montar el componente
    useEffect(() => {
        const cargarProfesores = async () => {
            const respuesta = await obtenerProfesores();
            setProfesores(respuesta);
        };
    
        cargarProfesores();
    }, []);
    
    useEffect(() => {
        filtrarProfesores();
    }, [searchTerm, profesores]);
    

    const [profesorEditando, setProfesorEditando] = useState<Profesor | null>(null);

    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [nuevoProfesor, setNuevoProfesor] = useState<Profesor>({
        id_usuario: 0,
        telefono: "",
        nombre: "",
        apellido: "",
        correo: "",
        edad: 0,
        foto: "",
        usuario: "",
        clave_acceso: "",
        cedula: "",
        id_profesor: 0,
        curriculum: ""
    });


    const filtrarProfesores = () => {
        const results = profesores.filter(profesores =>
            (profesores.nombre?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
            (profesores.apellido?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
            (profesores.usuario?.toLowerCase() || "").includes(searchTerm.toLowerCase())
        );
        setProfesoresFiltrados(results);
    };
      

    const onEditar = (estudiante: any) => {
        setProfesorEditando({ ...estudiante });
    };

    
    const onGuardarEdicion = async () => {
        
        

        try {
            if (!profesorEditando) return;
            console.log(profesorEditando)
            const response = await fetch(`http://localhost:5555/profesores`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(profesorEditando),
            });

            const resultadoConsulta = await response.json()
            console.log(resultadoConsulta)

            const updatedList = profesores.map((profesor:Profesor) =>
                profesor.id_profesor === profesorEditando.id_profesor
                  ? { ...profesorEditando }  // Solo cambiamos el atributo necesario
                  : profesor
            );

            setProfesores(updatedList);
            setProfesoresFiltrados(updatedList);
            setProfesorEditando(null);
  
        } catch (error) {
            console.error("Error en la petición:", error);
        }
            
    };
    

    const onEliminar = async (id_profesor: number) => {
    
        try {

            const confirmacion = confirm("¿Estás seguro de que quieres eliminar este estudiante?");
            if (!confirmacion) return;

            console.log("Eliminando")

            const response = await fetch(`http://localhost:5555/profesores`, {
                method: 'DELETE',
                mode: 'cors',   // Habilita CORS
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({id: id_profesor}),
            });

            console.log(profesores)

            const resultadoConsulta = await response.json()
            console.log(resultadoConsulta)

            const arrayActualizado = profesores.filter(profesor => profesor.id_usuario !== id_profesor)
            console.log(arrayActualizado)
            setProfesores(arrayActualizado);
            setProfesoresFiltrados(arrayActualizado);

        } catch (error) {
            console.error("Error en la petición:", error);
        }
    };

    

    const onAgregarProfesor = async () => {
        
        const nuevo = { ...nuevoProfesor };
        
        const response = await fetch(`http://localhost:5555/profesores`, {
            method: 'POST',
            mode: 'cors',   // Habilita CORS
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    nombre: nuevo.nombre,
                    apellido: nuevo.apellido,
                    usuario: nuevo.usuario,
                    clave_acceso: nuevo.clave_acceso
                }
            ),
        });

        console.log(response)

        const resultadoConsulta = await response.json()
        console.log(resultadoConsulta)

        if(response.status === 200){
            setProfesores([...profesores, nuevo]);
            setProfesoresFiltrados([...profesoresFiltrados, nuevo]);
            setMostrarFormulario(false); // Asegúrate de que el formulario se cierre después de guardar
            setNuevoProfesor({
                id_usuario: 0,
                telefono: "",
                nombre: "",
                apellido: "",
                correo: "",
                edad: 0,
                foto: "",
                usuario: "",
                clave_acceso: "",
                cedula: "",
                id_profesor: 0,
                curriculum: ""
            });
        }
        
    };
    

    const handleTitleClick = () => {
        window.location.reload();
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value); // Esto ya dispara useEffect que filtra
    };

    const handleSearchClick = () => {
        filtrarProfesores();
    };

    const mostrarFormularioAgregar = () => {
        console.log("Mostrar formulario para agregar")
        setMostrarFormulario(true);
        setProfesorEditando(null); // Asegúrate de que no se muestre el formulario de edición al mismo tiempo
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
                    <h3>Agregar Nuevo Profesor</h3>
                    <input type="text" placeholder="Nombre" value={nuevoProfesor.nombre} onChange={e => setNuevoProfesor({ ...nuevoProfesor, nombre: e.target.value })} />
                    <input type="text" placeholder="Apellido" value={nuevoProfesor.apellido} onChange={e => setNuevoProfesor({ ...nuevoProfesor, apellido: e.target.value })} />
                    <input type="text" placeholder="Usuario" value={nuevoProfesor.usuario} onChange={e => setNuevoProfesor({ ...nuevoProfesor, usuario: e.target.value })} />
                    <input type="text" placeholder="Clave" value={nuevoProfesor.clave_acceso} onChange={e => setNuevoProfesor({ ...nuevoProfesor, clave_acceso: e.target.value })} />
                    <button onClick={() => onAgregarProfesor()}>Guardar</button>
                    <button onClick={() => setMostrarFormulario(false)}>Cancelar</button>
                </div>
            )}

            {!mostrarFormulario && !profesorEditando && (
                <table>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Usuario</th>
                            <th>Clave</th>
                            <th>Correo</th>
                            <th>Celular</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {profesoresFiltrados.map((profesor) => (
                            <tr key={profesor.id_profesor}>
                                <td>{profesor.nombre ? profesor.nombre : "null"}</td>
                                <td>{profesor.apellido ? profesor.apellido : "null"}</td>
                                
                                <td>{profesor.usuario ? profesor.usuario : "null"}</td>
                                <td>{profesor.clave_acceso ? profesor.clave_acceso : "null"}</td>

                                <td>{profesor.correo ? profesor.correo : "null"}</td>
                                <td>{profesor.telefono ? profesor.telefono : "null"}</td>
                                <td>
                                    <button onClick={() => onEditar(profesor)}>Editar</button>
                                    <button onClick={() => onEliminar(profesor.id_profesor)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {profesorEditando && (
                <div className="formulario-edicion">
                    <h3>Editando profesor</h3>
                    <input type="text" value={profesorEditando.nombre} onChange={e => setProfesorEditando({ ...profesorEditando, nombre: e.target.value })} />
                    <input type="text" value={profesorEditando.apellido} onChange={e => setProfesorEditando({ ...profesorEditando, apellido: e.target.value })} />
                    <input type="text" value={profesorEditando.usuario} onChange={e => setProfesorEditando({ ...profesorEditando, usuario: e.target.value })} />
                    <input type="text" value={profesorEditando.clave_acceso} onChange={e => setProfesorEditando({ ...profesorEditando, clave_acceso: e.target.value })} />
                    <button onClick={() => onGuardarEdicion()}>Guardar</button>
                    <button onClick={() => setProfesorEditando(null)}>Cancelar</button>
                </div>
            )}
            </div>
        </>
    );
}