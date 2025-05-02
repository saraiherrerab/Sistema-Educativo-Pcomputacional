'use client';
import { useEffect, useState } from "react";
import './styles.css';
import '../login.css'
import Header from "../../components/header/header";
import { useRouter } from "next/navigation";

import Swal from 'sweetalert2'


export default function ProfesoresLista() {
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
    const [fotoPerfil, setFotoPerfil] = useState<File | null>(null);
    const [subiendo, setSubiendo] = useState(false);


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

    const [habilitarGuardado, setHabilitarGuardado] = useState<boolean>(true);

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

    const validarFormulario = (): boolean => {
        console.log("Validando Entradas de nuevo profesor")

        const { nombre, apellido, usuario, clave_acceso } = nuevoProfesor;

        const camposValidos = [nombre, apellido, usuario, clave_acceso].every(
            (valor) => valor !== undefined && valor.trim() !== ''
        );

        console.log(camposValidos)

        return !camposValidos;
    }

    useEffect(() => {
        setHabilitarGuardado(validarFormulario())
    }, [nuevoProfesor]);

    const filtrarProfesores = () => {
        const results = profesores.filter(profesores =>
            (profesores.nombre?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
            (profesores.apellido?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
            (profesores.usuario?.toLowerCase() || "").includes(searchTerm.toLowerCase())
        );
        setProfesoresFiltrados(results);
    };
      
    const onEditar = (profesor: any) => {
        console.log(profesor)
        setProfesorEditando({ ...profesor });
    };

    const onGuardarEdicion = async () => {
        
        try {
            if (!profesorEditando) return;

            console.log(profesorEditando)

            Swal.fire({
                title: 'Procesando...',
                text: 'Por favor espera',
                allowOutsideClick: false,
                allowEscapeKey: false,
                didOpen: () => {
                  Swal.showLoading();
                }
            });

            const response = await fetch(`http://localhost:5555/profesores`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(profesorEditando),
            });

            // Simulamos una función asíncrona (puedes reemplazar esto con tu fetch, por ejemplo)
            await new Promise(resolve => setTimeout(resolve, 1000)); // Espera de 1 segundos

            const resultadoConsulta = await response.json()
            console.log(resultadoConsulta)

            // Si todo sale bien, cerramos el loading y mostramos éxito
            Swal.fire({
                title: '¡Operación exitosa!',
                text: 'La acción se completó correctamente.',
                icon: 'success'
              });

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

            Swal.fire({
                title: "¿Estás seguro que quieres eliminar al profesor?",
                text: "Los cambios no son reversibles",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#d33000",
                cancelButtonColor: "#0053d3",
                confirmButtonText: "Borrar",
                showLoaderOnConfirm: true,
                preConfirm: async () => {
                    // Sleep de 1 segundo para que se vea la animación
                    await new Promise(resolve => setTimeout(resolve, 1000));

                    // Haces el fetch dentro de preConfirm
                    const response = await fetch(`http://localhost:5555/profesores`, {
                    method: 'DELETE',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id: id_profesor }),
                    });

                    const resultadoConsulta = await response.json();
                    return resultadoConsulta;
                }
                }).then((result) => {
                if (result.isConfirmed) {
                    console.log("Resultado de la consulta:", result.value);

                    const arrayActualizado = profesores.filter(profesor => profesor.id_usuario !== id_profesor);
                    setProfesores(arrayActualizado);
                    setProfesoresFiltrados(arrayActualizado);

                    Swal.fire({
                    title: "El profesor ha sido borrado",
                    text: "La eliminación se ha ejecutado exitosamente",
                    icon: "success"
                    });
                }
                });


           

        } catch (error) {
            console.error("Error en la petición:", error);
        }
    };  

    const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
          if (file.type === 'image/png') {
            setNuevoProfesor({...nuevoProfesor, foto: file.name})
            setFotoPerfil(file);
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Por favor, selecciona solo archivos con formato PNG.',
            }).then(() => {
              e.target.value = '';
              setFotoPerfil(null);
            });
          }
        } else {
          setFotoPerfil(null);
        }
      };

    const onAgregarProfesor = async () => {
        
        const nuevo = { ...nuevoProfesor };

        Swal.fire({
            title: 'Procesando...',
            text: 'Por favor espera',
            allowOutsideClick: false,
            allowEscapeKey: false,
            didOpen: () => {
              Swal.showLoading();
            }
        });

          try {

            
            const response = await fetch(`http://localhost:5555/profesores`, {
                method: 'POST',
                mode: 'cors',   // Habilita CORS
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(nuevo),
            });

            // Simulamos una función asíncrona (puedes reemplazar esto con tu fetch, por ejemplo)
            await new Promise(resolve => setTimeout(resolve, 1000)); // Espera de 1 segundos
    
            console.log(response)
    
            const resultadoConsulta = await response.json()
            console.log(resultadoConsulta)

            if(nuevo.foto){
                console.log("subiendo foto")
                setSubiendo(true)
                const formData = new FormData();
                let nuevoArchivo = null
                
                setFotoPerfil(nuevoArchivo);
                
                if (fotoPerfil) {

                    nuevoArchivo = new File([fotoPerfil], `User-${resultadoConsulta.id_usuario.toString()}.png`, { type: fotoPerfil.type, lastModified: fotoPerfil.lastModified });

                    formData.append('archivo', nuevoArchivo); // Agregar archivo solo si no es null
                    formData.append('id_usuario', resultadoConsulta.id_usuario.toString());

                    try {
                        const response = await fetch('http://localhost:5555/cargar/archivo/imagen', {
                            method: 'POST',
                            body: formData,
                        });
        
                        const data = await response.json();
        
                        // Simulamos una función asíncrona (puedes reemplazar esto con tu fetch, por ejemplo)
                        await new Promise(resolve => setTimeout(resolve, 1000)); // Espera de 1 segundos
        
                        if (response.ok) {
                            Swal.fire({ icon: 'success', title: 'Éxito', text: data.mensaje });
                            // Opcional: Actualizar el estado local con la nueva URL de la foto
                            console.log('URL de la foto subida:', data.archivo.url);
                        } else {
                            Swal.fire({ icon: 'error', title: 'Error', text: data.mensaje || 'Error al subir la imagen.' });
                        }
                        } catch (error) {
                        console.error('Error al enviar la petición:', error);
                        Swal.fire({ icon: 'error', title: 'Error', text: 'Error al conectar con el servidor.' });
                        } finally {
                            setSubiendo(false);
                        }
                  }
                
            }
    
            if(response.status === 200){
                setNuevoProfesor({...resultadoConsulta})
                setProfesores([...profesores, nuevoProfesor]);
                setProfesoresFiltrados([...profesoresFiltrados, nuevoProfesor]);
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
            
        
            // Si todo sale bien, cerramos el loading y mostramos éxito
            Swal.fire({
              title: '¡Operación exitosa!',
              text: 'La acción se completó correctamente.',
              icon: 'success'
            });
            
          } catch (error) {
            // Si algo falla, podrías mostrar otro modal de error
            Swal.fire({
              title: '¡Error!',
              text: 'Ocurrió un problema al procesar la acción.',
              icon: 'error'
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

    const gestionarGrupos = (id_usuario: number) => {
        console.log(id_usuario)
    }

    return (
        <>
            <Header
                text="MULTIPLAYER" onClick={() => Router.push("/Amenu")}
                text1="Panel de Juegos" onClick1={() => Router.push("/videojuego")}
                text2="Menu" onClick2={() => Router.push("/Amenu")}
                text3="Mi perfil" onClick3={() => Router.push("/profile")}
                text4="Salir" onClick4={() => Router.push("/")}>
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
                    <input type="text" placeholder="Telefono" value={nuevoProfesor.telefono} onChange={e => setNuevoProfesor({ ...nuevoProfesor, telefono: e.target.value })} />
                    <input type="text" placeholder="Correo" value={nuevoProfesor.correo} onChange={e => setNuevoProfesor({ ...nuevoProfesor, correo: e.target.value })} />
                    <input type="number" placeholder="Edad" value={nuevoProfesor.edad} onChange={e => setNuevoProfesor({ ...nuevoProfesor, edad: (e.target.value) as unknown as number})} />
                    <input type="text" placeholder="Cedula" value={nuevoProfesor.cedula} onChange={e => setNuevoProfesor({ ...nuevoProfesor, cedula: e.target.value })} />
                    <input
                        type="file"
                        accept=".png"
                        onChange={handleFotoChange}
                    />
                    <button onClick={() => onAgregarProfesor()} disabled={habilitarGuardado}>Guardar</button>
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
                            <th>Perfil</th> 
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
                                    <button onClick={()=>Router.push("/profile-prof/"+profesor.id_profesor)}>Ver Perfil</button>
                                </td>
                                <td>
                                    <button onClick={() => onEditar(profesor)}>Editar</button>
                                    <button onClick={() => onEliminar(profesor.id_profesor)}>Eliminar</button>
                                    <button onClick={() => gestionarGrupos(profesor.id_profesor)}><img src="/icons/arrow_forward_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg" alt="Home icon" width={24} height={24} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {profesorEditando && ! mostrarFormulario && (
                <div className="formulario-edicion">
                    <h3>Editando profesor</h3>
                    <input type="text" placeholder="Nombre" value={(profesorEditando.nombre)} onChange={e => setProfesorEditando({ ...profesorEditando, nombre: e.target.value })} />
                    <input type="text" placeholder="Apellido" value={(profesorEditando.apellido)} onChange={e => setProfesorEditando({ ...profesorEditando, apellido: e.target.value })} />
                    <input type="text" placeholder="Usuario" value={(profesorEditando.usuario)} onChange={e => setProfesorEditando({ ...profesorEditando, usuario: e.target.value })} />
                    <input type="text" placeholder="Clave" value={(profesorEditando.clave_acceso)} onChange={e => setProfesorEditando({ ...profesorEditando, clave_acceso: e.target.value })} />
                    <input type="text" placeholder="Telefono" value={(profesorEditando.telefono) ? (profesorEditando.telefono) : ""} onChange={e => setProfesorEditando({ ...profesorEditando, telefono: e.target.value })} />
                    <input type="email" placeholder="Correo" value={(profesorEditando.correo) ? (profesorEditando.correo) : ""} onChange={e => setProfesorEditando({ ...profesorEditando, correo: e.target.value })} />
                    <input type="number" placeholder="Edad" value={(profesorEditando.edad) ? (profesorEditando.edad) : 0} onChange={e => setProfesorEditando({ ...profesorEditando, edad: (e.target.value) as unknown as number})} />
                    <input type="text" placeholder="Cedula" value={(profesorEditando.cedula) ? (profesorEditando.cedula) : ""} onChange={e => setProfesorEditando({ ...profesorEditando, cedula: e.target.value })} />
                    <input type="text" placeholder="Foto" value={(profesorEditando.foto) ? profesorEditando.foto : "" } onChange={e => setProfesorEditando({ ...profesorEditando, foto: e.target.value })} />
                    <button onClick={() => onGuardarEdicion()}>Guardar</button>
                    <button onClick={() => setProfesorEditando(null)}>Cancelar</button>
                </div>
            )}
            </div>
        </>
    );
}