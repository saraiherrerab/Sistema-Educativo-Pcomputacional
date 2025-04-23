'use client';
import { useEffect, useState } from "react";
import './styles.css';
import Header from "../../components/header/header";
import { useRouter } from "next/navigation";


export default function EstudiantesLista() {
    const Router = useRouter();

    interface Estudiante {
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
        id_estudiante: number,
        condicion_medica: string
    }
      
      const [estudiantes, setEstudiantes] = useState<Estudiante[]>([]);
      const [estudiantesFiltrados, setEstudiantesFiltrados] = useState<Estudiante[]>([]);
      const [searchTerm, setSearchTerm] = useState('');

    async function obtenerEstudiantes() : Promise<Estudiante[]>{
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

        // Este useEffect se ejecuta una sola vez al montar el componente
    useEffect(() => {
        const cargarEstudiantes = async () => {
            const respuesta = await obtenerEstudiantes();
            setEstudiantes(respuesta);
        };
    
        cargarEstudiantes();
    }, []);
    
    useEffect(() => {
        filtrarEstudiantes();
    }, [searchTerm, estudiantes]);
    

    const [estudianteEditando, setEstudianteEditando] = useState<Estudiante | null>(null);

    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [nuevoEstudiante, setNuevoEstudiante] = useState<Estudiante>({
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
        id_estudiante: 0,
        condicion_medica: ""
    });


    const filtrarEstudiantes = () => {
        const results = estudiantes.filter(estudiantes =>
            (estudiantes.nombre?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
            (estudiantes.apellido?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
            (estudiantes.usuario?.toLowerCase() || "").includes(searchTerm.toLowerCase())
        );
        setEstudiantesFiltrados(results);
    };
      

    const onEditar = (estudiante: any) => {
        setEstudianteEditando({ ...estudiante});
    };

    
    const onGuardarEdicion = async () => {
        
        

        try {
            if (!estudianteEditando) return;
            console.log(estudianteEditando)
            const response = await fetch(`http://localhost:5555/estudiantes`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(estudianteEditando),
            });

            const resultadoConsulta = await response.json()
            console.log(resultadoConsulta)

            const updatedList = estudiantes.map((estudiante:Estudiante) =>
                estudiante.id_estudiante === estudianteEditando.id_estudiante
                  ? { ...estudianteEditando }  // Solo cambiamos el atributo necesario
                  : estudiante
            );

            setEstudiantes(updatedList);
            setEstudiantesFiltrados(updatedList);
            setEstudianteEditando(null);
  
        } catch (error) {
            console.error("Error en la petición:", error);
        }
            
    };
    

    const onEliminar = async (id_estudiante: number) => {
    
        try {

            const confirmacion = confirm("¿Estás seguro de que quieres eliminar este estudiante?");
            if (!confirmacion) return;

            console.log("Eliminando")

            const response = await fetch(`http://localhost:5555/estudiantes`, {
                method: 'DELETE',
                mode: 'cors',   // Habilita CORS
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({id: id_estudiante}),
            });

            console.log(estudiantes)

            const resultadoConsulta = await response.json()
            console.log(resultadoConsulta)

            const arrayActualizado = estudiantes.filter(estudiante => estudiante.id_usuario !== id_estudiante)
            console.log(arrayActualizado)
            setEstudiantes(arrayActualizado);
            setEstudiantesFiltrados(arrayActualizado);

        } catch (error) {
            console.error("Error en la petición:", error);
        }
    };

    

    const onAgregarEstudiante = async () => {
        
        const nuevo = { ...nuevoEstudiante };
        
        const response = await fetch(`http://localhost:5555/estudiantes`, {
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
            setEstudiantes([...estudiantes, nuevo]);
            setEstudiantesFiltrados([...estudiantesFiltrados, nuevo]);
            setMostrarFormulario(false); // Asegúrate de que el formulario se cierre después de guardar
            setNuevoEstudiante({
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
                id_estudiante: 0,
                condicion_medica: ""
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
        filtrarEstudiantes();
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

            <div className="listado">
                <div className="encabezado">
                    <div className="tituloListado" style={{ cursor: 'pointer' }}>
                        <h2 className="estudiantes" onClick={() => handleTitleClick()}>ESTUDIANTES</h2>
                        <button onClick={() => mostrarFormularioAgregar()}>Agregar Estudiante</button>
                    </div>
                    <div className="barraBusqueda">
                    <div className="search-input-container">
                        <input
                            type="text"
                            placeholder="Buscar estudiantes..."
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
                    <input type="text" placeholder="Usuario" value={nuevoEstudiante.usuario} onChange={e => setNuevoEstudiante({ ...nuevoEstudiante, usuario: e.target.value })} />
                    <input type="text" placeholder="Clave" value={nuevoEstudiante.clave_acceso} onChange={e => setNuevoEstudiante({ ...nuevoEstudiante, clave_acceso: e.target.value })} />
                    <input type="text" placeholder="Telefono" value={nuevoEstudiante.telefono} onChange={e => setNuevoEstudiante({ ...nuevoEstudiante, telefono: e.target.value })} />
                    <input type="text" placeholder="Correo" value={nuevoEstudiante.correo} onChange={e => setNuevoEstudiante({ ...nuevoEstudiante, correo: e.target.value })} />
                    <input type="number" placeholder="Edad" value={nuevoEstudiante.edad} onChange={e => setNuevoEstudiante({ ...nuevoEstudiante, edad: (e.target.value) as unknown as number})} />
                    <input type="text" placeholder="Cedula" value={nuevoEstudiante.cedula} onChange={e => setNuevoEstudiante({ ...nuevoEstudiante, cedula: e.target.value })} />
                    <input type="text" placeholder="Foto" value={nuevoEstudiante.foto} onChange={e => setNuevoEstudiante({ ...nuevoEstudiante, foto: e.target.value })} />
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
                            <th>Usuario</th>
                            <th>Clave</th>
                            <th>Correo</th>
                            <th>Celular</th>
                            <th>Perfil</th> 
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {estudiantesFiltrados.map((estudiante) => (
                            <tr key={estudiante.id_estudiante}>
                                <td>{estudiante.nombre ? estudiante.nombre : "null"}</td>
                                <td>{estudiante.apellido ? estudiante.apellido : "null"}</td>
                                
                                <td>{estudiante.usuario ? estudiante.usuario : "null"}</td>
                                <td>{estudiante.clave_acceso ? estudiante.clave_acceso : "null"}</td>

                                <td>{estudiante.correo ? estudiante.correo : "null"}</td>
                                <td>{estudiante.telefono ? estudiante.telefono : "null"}</td>
                                <td>
                                    <button onClick={()=>Router.push("/profile")}>Ver Perfil</button>
                                </td>
                                <td>
                                    <button onClick={() => onEditar(estudiante)}>Editar</button>
                                    <button onClick={() => onEliminar(estudiante.id_estudiante)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {estudianteEditando && (
                <div className="formulario-edicion">
                    <h3>Editando estudiante</h3>
                    <input type="text" placeholder="Nombre" value={estudianteEditando.nombre} onChange={e => setEstudianteEditando({ ...estudianteEditando, nombre: e.target.value })} />
                    <input type="text" placeholder="Apellido" value={estudianteEditando.apellido} onChange={e => setEstudianteEditando({ ...estudianteEditando, apellido: e.target.value })} />
                    <input type="text" placeholder="Usuario" value={estudianteEditando.usuario} onChange={e => setEstudianteEditando({ ...estudianteEditando, usuario: e.target.value })} />
                    <input type="text" placeholder="Clave" value={estudianteEditando.clave_acceso} onChange={e => setEstudianteEditando({ ...estudianteEditando, clave_acceso: e.target.value })} />
                    <input type="text" placeholder="Telefono" value={estudianteEditando.telefono} onChange={e => setEstudianteEditando({ ...estudianteEditando, telefono: e.target.value })} />
                    <input type="text" placeholder="Correo" value={estudianteEditando.correo} onChange={e => setEstudianteEditando({ ...estudianteEditando, correo: e.target.value })} />
                    <input type="number" placeholder="Edad" value={estudianteEditando.edad} onChange={e => setEstudianteEditando({ ...estudianteEditando, edad: (e.target.value) as unknown as number})} />
                    <input type="text" placeholder="Cedula" value={estudianteEditando.cedula} onChange={e => setEstudianteEditando({ ...estudianteEditando, cedula: e.target.value })} />
                    <input type="text" placeholder="Foto" value={estudianteEditando.foto} onChange={e => setEstudianteEditando({ ...estudianteEditando, foto: e.target.value })} />
                    <input type="text" placeholder="Condicion" value={estudianteEditando.condicion_medica} onChange={e => setEstudianteEditando({ ...estudianteEditando, foto: e.target.value })} />
                    <button onClick={() => onGuardarEdicion()}>Guardar</button>
                    <button onClick={() => setEstudianteEditando(null)}>Cancelar</button>
                </div>
            )}
            </div>
        </>
    );
}