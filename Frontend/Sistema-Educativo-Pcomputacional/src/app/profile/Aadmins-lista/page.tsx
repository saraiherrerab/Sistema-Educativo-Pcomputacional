'use client';
import { useEffect, useState } from "react";
import './styles.css';
import Header from "../../components/header/header";
import { useRouter } from "next/navigation";


export default function AdministradoresLista() {
    const Router = useRouter();

    interface Administrador {
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
        id_admin: number,
        curriculum: string
    }
      
      const [administradores_, setAdministradores] = useState<Administrador[]>([]);
      const [administradoresFiltrados, setAdministradoresFiltrados] = useState<Administrador[]>([]);
      const [searchTerm, setSearchTerm] = useState('');

    async function obtenerAdministradores() : Promise<Administrador[]>{
        const resultado= await fetch('http://localhost:5555/administradores',{
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
        const cargarAdministradores = async () => {
            const respuesta = await obtenerAdministradores();
            setAdministradores(respuesta);
        };
    
       cargarAdministradores();
    }, []);
    
    useEffect(() => {
        filtrarAdministradores();
    }, [searchTerm, administradores_]);
    

    const [administradorEditando, setAdministradorEditando] = useState<Administrador | null>(null);

    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [nuevoAdministrador, setNuevoAdministrador] = useState<Administrador>({
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
        id_admin: 0,
        curriculum: ""
    });


    const filtrarAdministradores = () => {
        console.log(administradores_);
        
        const results = administradores_.filter(admin =>
            (admin.nombre?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
            (admin.apellido?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
            (admin.usuario?.toLowerCase() || "").includes(searchTerm.toLowerCase())
        );
        
       setAdministradoresFiltrados(results);
    };
      

    const onEditar = (administrador: any) => {
        setAdministradorEditando({ ...administrador });
    };

    
    const onGuardarEdicion = async () => {
        
        

        try {
            if (!administradorEditando) return;
            console.log(administradorEditando)
            const response = await fetch(`http://localhost:5555/administradores`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(administradorEditando),
            });

            const resultadoConsulta = await response.json()
            console.log(resultadoConsulta)

            const updatedList = administradores_.map((administrador:Administrador) =>
                administrador.id_admin === administradorEditando.id_admin
                  ? { ...administradorEditando }  // Solo cambiamos el atributo necesario
                  : administrador
            );

            setAdministradores(updatedList);
            setAdministradoresFiltrados(updatedList);
            setAdministradorEditando(null);
  
        } catch (error) {
            console.error("Error en la petición:", error);
        }
            
    };
    

    const onEliminar = async (id_administrador: number) => {
    
        try {

            const confirmacion = confirm("¿Estás seguro de que quieres eliminar este administrador?");
            if (!confirmacion) return;

            console.log("Eliminando")

            const response = await fetch(`http://localhost:5555/administradores`, {
                method: 'DELETE',
                mode: 'cors',   // Habilita CORS
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({id: id_administrador}),
            });

            console.log(administradores_)

            const resultadoConsulta = await response.json()
            console.log(resultadoConsulta)

            const arrayActualizado = administradores_.filter(administrador => administrador.id_usuario !== id_administrador)
            console.log(arrayActualizado)
            setAdministradores(arrayActualizado);
            setAdministradoresFiltrados(arrayActualizado);

        } catch (error) {
            console.error("Error en la petición:", error);
        }
    };

    

    const onAgregarAdministrador = async () => {
        
        const nuevo = { ...nuevoAdministrador };
        
        const response = await fetch(`http://localhost:5555/administradores`, {
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
            setAdministradores([...administradores_, nuevo]);
            setAdministradoresFiltrados([...administradoresFiltrados, nuevo]);
            setMostrarFormulario(false); // Asegúrate de que el formulario se cierre después de guardar
            setNuevoAdministrador({
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
                id_admin: 0,
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
        filtrarAdministradores();
    };

    const mostrarFormularioAgregar = () => {
        console.log("Mostrar formulario para agregar")
        setMostrarFormulario(true);
        setAdministradorEditando(null); // Asegúrate de que no se muestre el formulario de edición al mismo tiempo
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
                        <h2 className="administradores" onClick={() => handleTitleClick()}>ADMINISTRADORES</h2>
                        <button onClick={() => mostrarFormularioAgregar()}>Agregar Administradores</button>
                    </div>
                    <div className="barraBusqueda">
                    <div className="search-input-container">
                        <input
                            type="text"
                            placeholder="Buscar administradores..."
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
                    <h3>Agregar Nuevo Administrador</h3>
                    <input type="text" placeholder="Nombre" value={nuevoAdministrador.nombre} onChange={e => setNuevoAdministrador({ ...nuevoAdministrador, nombre: e.target.value })} />
                    <input type="text" placeholder="Apellido" value={nuevoAdministrador.apellido} onChange={e => setNuevoAdministrador({ ...nuevoAdministrador, apellido: e.target.value })} />
                    <input type="text" placeholder="Usuario" value={nuevoAdministrador.usuario} onChange={e => setNuevoAdministrador({ ...nuevoAdministrador, usuario: e.target.value })} />
                    <input type="text" placeholder="Clave" value={nuevoAdministrador.clave_acceso} onChange={e => setNuevoAdministrador({ ...nuevoAdministrador, clave_acceso: e.target.value })} />
                    <input type="text" placeholder="Telefono" value={nuevoAdministrador.telefono} onChange={e => setNuevoAdministrador({ ...nuevoAdministrador, telefono: e.target.value })} />
                    <input type="text" placeholder="Correo" value={nuevoAdministrador.correo} onChange={e => setNuevoAdministrador({ ...nuevoAdministrador, correo: e.target.value })} />
                    <input type="number" placeholder="Edad" value={nuevoAdministrador.edad} onChange={e => setNuevoAdministrador({ ...nuevoAdministrador, edad: (e.target.value) as unknown as number})} />
                    <input type="text" placeholder="Cedula" value={nuevoAdministrador.cedula} onChange={e => setNuevoAdministrador({ ...nuevoAdministrador, cedula: e.target.value })} />
                    <input type="text" placeholder="Foto" value={nuevoAdministrador.foto} onChange={e => setNuevoAdministrador({ ...nuevoAdministrador, foto: e.target.value })} />
                    <button onClick={() => onAgregarAdministrador()}>Guardar</button>
                    <button onClick={() => setMostrarFormulario(false)}>Cancelar</button>
                </div>
            )}

            {!mostrarFormulario && !administradorEditando && (
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
                        {administradoresFiltrados.map((administrador) => (
                            <tr key={administrador.id_admin}>
                                <td>{administrador.nombre ? administrador.nombre : "null"}</td>
                                <td>{administrador.apellido ? administrador.apellido : "null"}</td>
                                
                                <td>{administrador.usuario ? administrador.usuario : "null"}</td>
                                <td>{administrador.clave_acceso ? administrador.clave_acceso : "null"}</td>

                                <td>{administrador.correo ? administrador.correo : "null"}</td>
                                <td>{administrador.telefono ? administrador.telefono : "null"}</td>
                                <td>
                                    <button onClick={()=>Router.push("/profile")}>Ver Perfil</button>
                                </td>
                                <td>
                                    <button onClick={() => onEditar(administrador)}>Editar</button>
                                    <button onClick={() => onEliminar(administrador.id_admin)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {administradorEditando && (
                <div className="formulario-edicion">
                    <h3>Editando administrador</h3>
                    <input type="text" placeholder="Nombre" value={administradorEditando.nombre} onChange={e => setAdministradorEditando({ ...administradorEditando, nombre: e.target.value })} />
                    <input type="text" placeholder="Apellido" value={administradorEditando.apellido} onChange={e => setAdministradorEditando({ ...administradorEditando, apellido: e.target.value })} />
                    <input type="text" placeholder="Usuario" value={administradorEditando.usuario} onChange={e => setAdministradorEditando({ ...administradorEditando, usuario: e.target.value })} />
                    <input type="text" placeholder="Clave" value={administradorEditando.clave_acceso} onChange={e => setAdministradorEditando({ ...administradorEditando, clave_acceso: e.target.value })} />
                    <input type="text" placeholder="Telefono" value={administradorEditando.telefono} onChange={e => setAdministradorEditando({ ...administradorEditando, telefono: e.target.value })} />
                    <input type="text" placeholder="Correo" value={administradorEditando.correo} onChange={e => setAdministradorEditando({ ...administradorEditando, correo: e.target.value })} />
                    <input type="number" placeholder="Edad" value={administradorEditando.edad} onChange={e => setAdministradorEditando({ ...administradorEditando, edad: (e.target.value) as unknown as number})} />
                    <input type="text" placeholder="Cedula" value={administradorEditando.cedula} onChange={e => setAdministradorEditando({ ...administradorEditando, cedula: e.target.value })} />
                    <input type="text" placeholder="Foto" value={administradorEditando.foto} onChange={e => setAdministradorEditando({ ...administradorEditando, foto: e.target.value })} />
                    <button onClick={() => onGuardarEdicion()}>Guardar</button>
                    <button onClick={() => setAdministradorEditando(null)}>Cancelar</button>
                </div>
            )}
            </div>
        </>
    );
}