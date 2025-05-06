'use client';
import { useEffect, useState } from "react";
import './styles.css';
import '../login.css'
import Header from "../../components/header/header";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { inflateRaw } from "zlib";

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

interface Grupo {
    id_grupo: number,
    nombre_grupo: string,
    id_curso: number | null
}

export default function EstudiantesLista() {
    const Router = useRouter();
      
    const [estudiantes, setEstudiantes] = useState<Estudiante[]>([]);
    const [estudiantesFiltrados, setEstudiantesFiltrados] = useState<Estudiante[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [fotoPerfil, setFotoPerfil] = useState<File | null>(null);
    const [habilitarGuardado, setHabilitarGuardado] = useState<boolean>(true);
    const [nuevaFoto, setNuevaFoto] = useState<boolean>(false);
    const [grupos, setGrupos] = useState<Grupo[]>([])

    const validarFormulario = (): boolean => {
        console.log("Validando Entradas de nuevo profesor")

        const { nombre, apellido, usuario, clave_acceso } = nuevoEstudiante;

        const camposValidos = [nombre, apellido, usuario, clave_acceso].every(
            (valor) => valor !== undefined && valor.trim() !== ''
        );

        console.log(camposValidos)

        return !camposValidos;
    }

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

    const [descargandoImagen, setDescargandoImagen] = useState(false);
    const [imagenDescargadaUrl, setImagenDescargadaUrl] = useState<string | null>(null);


    const filtrarEstudiantes = () => {
        const results = estudiantes.filter(estudiantes =>
            (estudiantes.nombre?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
            (estudiantes.apellido?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
            (estudiantes.usuario?.toLowerCase() || "").includes(searchTerm.toLowerCase())
        );
        setEstudiantesFiltrados(results);
    };
      

    const onEditar = async (estudiante: any) => {
        try {
            await descargarImagenPerfil(`User-${estudiante.id_estudiante}.png`)
            setEstudianteEditando({ ...estudiante});
        } catch (error) {
            console.log(error)
        }
        
    };

    
    const onGuardarEdicion = async () => {

        try {
            if (!estudianteEditando) return;
            
            Swal.fire({
                title: 'Procesando...',
                text: 'Por favor espera',
                allowOutsideClick: false,
                allowEscapeKey: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });

            console.log(estudianteEditando)

            const response = await fetch(`http://localhost:5555/estudiantes`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(estudianteEditando),
            });



            const resultadoConsulta = await response.json()
            console.log(resultadoConsulta)

            // Simulamos una función asíncrona (puedes reemplazar esto con tu fetch, por ejemplo)
            await new Promise(resolve => setTimeout(resolve, 1000)); // Espera de 1 segundos

            if(nuevaFoto && fotoPerfil){
                const formData = new FormData();
                let nuevoArchivo = null

                nuevoArchivo = new File([fotoPerfil], `User-${estudianteEditando.id_usuario.toString()}.png`, { type: fotoPerfil.type, lastModified: fotoPerfil.lastModified });
                
                formData.append('archivo', nuevoArchivo); // Agregar archivo solo si no es null
                formData.append('id_usuario', estudianteEditando.id_usuario.toString());

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
                }
            }

            Swal.fire({
                title: '¡Operación exitosa!',
                text: 'La acción se completó correctamente.',
                icon: 'success'
            });

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

            Swal.fire({
                title: "Eliminar estudiante",
                text: "La siguiente operacion no es reversible",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#df2a0a",
                cancelButtonColor: "#5d6a7c",
                confirmButtonText: "Borrar",
                showLoaderOnConfirm: true,
                preConfirm: async (login) => {
                    try {
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

                        await sleep(1000)
            
                        const arrayActualizado = estudiantes.filter(estudiante => estudiante.id_usuario !== id_estudiante)
                        console.log(arrayActualizado)
                        setEstudiantes(arrayActualizado);
                        setEstudiantesFiltrados(arrayActualizado);

                        return resultadoConsulta;
                    } catch (error) {
                        Swal.showValidationMessage(`
                            Request failed: ${error}
                        `);
                    }
                },
                allowOutsideClick: () => !Swal.isLoading()
            }).then((result) => {
                if (result.isConfirmed) {
                  Swal.fire({
                    title: "El alumno ha sido eliminado",
                    text: "El alumno ha sido borrado exitosamente",
                    icon: "success"
                  });
                }
              });


            

        } catch (error) {
            console.error("Error en la petición:", error);
        }
    };

    const onAgregarEstudiante = async () => {

        try {

        const nuevo = { ...nuevoEstudiante };

        console.log(nuevo)
        
        Swal.fire({
            title: 'Procesando...',
            text: 'Por favor espera',
            allowOutsideClick: false,
            allowEscapeKey: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        const response = await fetch(`http://localhost:5555/estudiantes`, {
            method: 'POST',
            mode: 'cors',   // Habilita CORS
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevo),
        });

        console.log(response)

        const resultadoConsulta = await response.json()
        console.log(resultadoConsulta)

        if(nuevo.foto){
            console.log("subiendo foto")
            const formData = new FormData();
            let nuevoArchivo = null
            
            setFotoPerfil(nuevoArchivo);
            
            if (fotoPerfil) {

                try {

                    console.log("Comenzando proceso de carga")

                    nuevoArchivo = new File([fotoPerfil], `User-${resultadoConsulta.id_usuario.toString()}.png`, { type: fotoPerfil.type, lastModified: fotoPerfil.lastModified });

                    formData.append('archivo', nuevoArchivo); // Agregar archivo solo si no es null
                    formData.append('id_usuario', resultadoConsulta.id_usuario.toString());

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
                    }
                }
                        
        }

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

            // Si todo sale bien, cerramos el loading y mostramos éxito
            Swal.fire({
                title: '¡Operación exitosa!',
                text: 'La acción se completó correctamente.',
                icon: 'success'
            });
        }

        } catch (error) {

            Swal.fire({
                title: '¡Error!',
                text: 'Ocurrió un problema al procesar la acción.',
                icon: 'error'
            });
            
        }
        
        

        

        
    };

    const obtenerGrupos = async () => {
        const resultado= await fetch('http://localhost:5555/grupos',{
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

    const obtenerInformacionGrupoAlumno = async (id_estudiante: number) => {
        const resultado= await fetch('http://localhost:5555/grupos/estudiante/' + id_estudiante,{
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

    const obtenerInformacionCursoDeGrupo = async (id_grupo: string) => {
        const resultado= await fetch(`http://localhost:5555/grupos/${id_grupo}/curso`,{
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

        const cargarGrupos = async () => {
            const respuesta = await obtenerGrupos();
            setGrupos([...respuesta])
        };

        cargarEstudiantes();
        cargarGrupos();
        
    }, []);
    
    useEffect(() => {
        filtrarEstudiantes();
    }, [searchTerm, estudiantes]);

    useEffect(() => {
        setHabilitarGuardado(validarFormulario())
    }, [nuevoEstudiante]);

    const handleTitleClick = () => {
        window.location.reload();
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value); // Esto ya dispara useEffect que filtra
    };

    const handleSearchClick = () => {
        filtrarEstudiantes();
    };

    const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (file) {
              if (file.type === 'image/png') {
                setNuevoEstudiante({...nuevoEstudiante, foto: file.name})
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

    const mostrarFormularioAgregar = () => {
        console.log("Mostrar formulario para agregar")
        setMostrarFormulario(true);
        setEstudianteEditando(null); // Asegúrate de que no se muestre el formulario de edición al mismo tiempo
    };

    async function descargarImagenPerfil(nombreArchivo: string) {
        setDescargandoImagen(true);
        const urlDescarga = `/descargar/imagen/${nombreArchivo}`;
    
        try {
          const response = await fetch(`http://localhost:5555${urlDescarga}`);
          console.log(response);
    
          if (!response.ok){

            try {
                setDescargandoImagen(false);
                console.log("IMAGEN VACIA")
                const fotoVacia = await fetch('/imagenvacia.png');
            
                if (!fotoVacia.ok) {
                    throw new Error('No se pudo obtener la imagen.');
                }
            
                const imagenBlob = await fotoVacia.blob();
            
                // Ahora tienes la imagen en la variable `imagenBlob`
                console.log('Imagen obtenida correctamente:', imagenBlob);
                const archivo = new File([imagenBlob], 'imagenvacia.png', { type: imagenBlob.type });
                // Crear un objeto File a partir del Blob
                
                setImagenDescargadaUrl('imagenvacia.png')
                setFotoPerfil(archivo)
            
                return;
            } catch (error) {
                console.error('Error al obtener la imagen:', error);
                return;
            }
            
          }

          const blob = await response.blob();
          const urlBlob = window.URL.createObjectURL(blob);
          setImagenDescargadaUrl(urlBlob);
          setDescargandoImagen(false);
          console.log('Imagen de perfil descargada y URL creada.');
    
        } catch (error) {
          console.error('Error al realizar la petición de descarga:', error);
          console.log(error)
          setDescargandoImagen(false);
        }
    }

    async function cargarInformacionGrupo(id_grupo:number) {
        const resultado= await fetch('http://localhost:5555/grupos/'+id_grupo,{
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

    async function gestionarCursosYHorarios(id_estudiante: number){
        console.log("gestionarCursosYHorarios()")

        const mostrarSelectorDeGrupos = async () => {
            
            const informacionGrupoEstudiante: any = await obtenerInformacionGrupoAlumno(id_estudiante);

            console.log(informacionGrupoEstudiante)

            const informacionGrupo = informacionGrupoEstudiante ? await cargarInformacionGrupo(informacionGrupoEstudiante.id_grupo) : null

            console.log(informacionGrupo)

            const optionsHTML = (informacionGrupo) 
            ? grupos.filter( (grupo:Grupo) => grupo.id_grupo !== informacionGrupo.id_grupo).map(grupo => `<option value="${grupo.id_grupo}">${grupo.nombre_grupo}</option>`).join('') 
            : grupos.map(grupo => `<option value="${grupo.id_grupo}">${grupo.nombre_grupo}</option>`).join('');

            const selectHTML: string = 
            `${
                informacionGrupo == null 
                ? `<option value="" disabled selected>-- Selecciona un grupo --</option>` 
                : `<option value="${informacionGrupo.id_grupo}" selected class="swal2-input">${informacionGrupo.nombre_grupo}</option>`
            }`;
        
            Swal.fire({
                title: "Selecciona un grupo",
                html: `
                    <select id="grupo-seleccionado" class="swal2-input">
                        ${selectHTML}
                        ${optionsHTML}
                    </select>
                `,
                showCancelButton: true,
                confirmButtonText: "Ver Grupo",
                cancelButtonText: "Cerrar",
                preConfirm: () => {
                    const grupoId = (document.getElementById("grupo-seleccionado") as HTMLSelectElement)?.value;
                    if (!grupoId) {
                        Swal.showValidationMessage('Por favor, selecciona un grupo');
                        return false;
                    }
                    return grupoId;
                }
            }).then(async (result) => {
                if (result.isConfirmed && result.value) {
                    const grupoSeleccionadoId = result.value;

                    const validarCursoGrupo: any[]= await obtenerInformacionCursoDeGrupo(grupoSeleccionadoId);
                    if(validarCursoGrupo.length > 0 ){
                        await mostrarInformacionDelGrupo(grupoSeleccionadoId, mostrarSelectorDeGrupos,informacionGrupoEstudiante,id_estudiante); // Pasar la función para volver
                    }else{
                        Swal.fire({
                            icon: "error",
                            title: "No se encontraron cursos",
                            text: "El grupo no tiene ningún curso asignado",
                          });
                    }
                    
                }
            });
        }
        
        const mostrarInformacionDelGrupo = async (grupoId: string, volverAlSelector: () => void, informacion: any, id_estudiante: number) => {
        
            if (grupoId) {


                let informacionHorario: string = ""

                const consultaNueva: boolean = (informacion !== null) ? false : true

                if(informacion !== null && grupoId === informacion.id_grupo){
                    console.log("ENTRO AQUI")
                    informacion?.informacionGrupo.forEach( (horario: any) => {
                        informacionHorario = informacionHorario + `<p><strong>${horario.dia_semana}:</strong> ${horario.hora_inicio} hasta ${horario.hora_fin}</p>`
                    })
                }else{
                    informacion = await obtenerInformacionCursoDeGrupo(grupoId);
                    console.log(informacion)
                    informacion.forEach( (horario: any) => {
                        informacionHorario = informacionHorario + `<p><strong>${horario.dia_semana}:</strong> ${horario.hora_inicio} hasta ${horario.hora_fin}</p>`
                    })
                    
                }

                const nombreCompletoProfesor = 
                    (!consultaNueva && grupoId === informacion.id_grupo) 
                    ? informacion.informacionGrupo[0].nombre + " " +  informacion.informacionGrupo[0].apellido 
                    : informacion[0].nombre + " " +   informacion[0].apellido 
                
                const id_grupo_por_asignar = 
                (!consultaNueva && grupoId === informacion.id_grupo) 
                ? informacion.id_grupo
                : informacion[0].id_grupo

                Swal.fire({
                    title: informacion.nombre_grupo,
                    html: `
                        <p><strong>Profesor:</strong> ${ nombreCompletoProfesor }</p>
                        ${informacionHorario}
                        `,
                    showCancelButton: true,
                    confirmButtonText: "Asignar estudiante a grupo",
                    cancelButtonText: "Salir",
                }).then(async (result) => {
                    if (result.isDenied) {
                         
                    } else if (result.isConfirmed) {

                        console.log(informacion.id_grupo)
                        const response = await fetch('http://localhost:5555/estudiantes/asignar/grupo', {
                            method: 'PUT',
                            headers: {
                              'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ "id_estudiante": id_estudiante, "id_grupo": id_grupo_por_asignar })
                          });
                        const data = await response.json();
                        console.log('Respuesta del servidor:', data);

                        Swal.fire({
                            title: 'Procesando...',
                            text: 'Por favor espera',
                            allowOutsideClick: false,
                            allowEscapeKey: false,
                            didOpen: () => {
                                Swal.showLoading();
                            }
                        });

                         // Simulamos una función asíncrona (puedes reemplazar esto con tu fetch, por ejemplo)
                        await new Promise(resolve => setTimeout(resolve, 1000)); // Espera de 1 segundos

                        Swal.fire("¡Aceptado!", "La información del grupo ha sido aceptada.", "success");
                        // Aquí puedes agregar la lógica para guardar o procesar la aceptación
                    } else if (result.isDismissed && result.dismiss === Swal.DismissReason.cancel) {
                        // Aquí puedes agregar la lógica para volver a la edición
                       
                    }
                });
            } else {
                Swal.fire("Error", "No se encontró información para este grupo.", "error");
            }
        }
        

       await mostrarSelectorDeGrupos();

    }

    function sleep(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }


    return (
        <>
            <Header
                text="MULTIPLAYER" onClick={() => Router.push("/videojuego")}
                text1="Panel de Juegos" onClick1={() => Router.push("/videojuego")}
                text2="Menu" onClick2={() => Router.push("/videojuego")}
                text3="Mi perfil" onClick3={() => Router.push("/videojuego")}
                text4="Salir" onClick4={() => Router.push("/videojuego")}>
            </Header>

            <div className="listado body_estudiantes">
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
                        <input
                            type="number"
                            min={0}
                            placeholder="Edad"
                            value={nuevoEstudiante.edad}
                            onChange={e => {
                                const value = e.target.value;
                                const numberValue = Number(value);
                                if (value === '' || (Number.isFinite(numberValue) && numberValue >= 0)) {
                                setNuevoEstudiante({
                                    ...nuevoEstudiante,
                                    edad: value === '' ? 0 : numberValue,
                                });
                                }
                            }}
                        />
                        <input type="text" placeholder="Cedula" value={nuevoEstudiante.cedula} onChange={e => setNuevoEstudiante({ ...nuevoEstudiante, cedula: e.target.value })} />
                        <input
                            type="file"
                            accept=".png"
                            onChange={handleFotoChange}
                        />
                        <button onClick={() => onAgregarEstudiante() } disabled={habilitarGuardado}>Guardar</button>
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
                                <th className="texto_central">Correo</th>
                                <th className="texto_central">Celular</th>
                                <th className="texto_central">Perfil</th> 
                                <th className="texto_central">Acciones</th>
                                <th className="texto_central">Cursos</th>
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
                                        <button onClick={()=>Router.push("/profile/" + estudiante.id_estudiante)}>Ver Perfil</button>
                                    </td>
                                    <td className="display_flex">
                                        <button onClick={() => onEditar(estudiante)}><img src="/icons/edit_16dp_E3E3E3_FILL0_wght400_GRAD0_opsz20.svg" alt="Icono fleca" style={{ width: 16, height: 16 }} /></button>
                                        <button onClick={() => onEliminar(estudiante.id_estudiante)}><img src="/icons/delete_16dp_E3E3E3_FILL0_wght400_GRAD0_opsz20.svg" alt="Icono fleca" style={{ width: 16, height: 16 }} /></button>
                                    </td>
                                    <td>
                                        <button onClick={() => gestionarCursosYHorarios(estudiante.id_estudiante)}>
                                            <img src="/icons/arrow_forward_16dp_E3E3E3_FILL0_wght400_GRAD0_opsz20.svg" alt="Icono fleca" style={{ width: 16, height: 16 }} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                {estudianteEditando && (
                    <div className="formulario-edicion">
                        <h3>Editando estudiante</h3>
                        <input type="text" placeholder="Apellido" value={estudianteEditando.apellido || ''} onChange={e => setEstudianteEditando({ ...estudianteEditando, apellido: e.target.value })} />
                        <input type="text" placeholder="Usuario" value={estudianteEditando.usuario || ''} onChange={e => setEstudianteEditando({ ...estudianteEditando, usuario: e.target.value })} />
                        <input type="text" placeholder="Clave" value={estudianteEditando.clave_acceso || ''} onChange={e => setEstudianteEditando({ ...estudianteEditando, clave_acceso: e.target.value })} />
                        <input type="text" placeholder="Telefono" value={estudianteEditando.telefono || ''} onChange={e => setEstudianteEditando({ ...estudianteEditando, telefono: e.target.value })} />
                        <input type="text" placeholder="Correo" value={estudianteEditando.correo || ''} onChange={e => setEstudianteEditando({ ...estudianteEditando, correo: e.target.value })} />
                        <input type="number" placeholder="Edad" value={estudianteEditando.edad ?? ''} onChange={e => setEstudianteEditando({ ...estudianteEditando, edad: Number(e.target.value) })} />
                        <input type="text" placeholder="Cedula" value={estudianteEditando.cedula || ''} onChange={e => setEstudianteEditando({ ...estudianteEditando, cedula: e.target.value })} />
                        <input type="text" placeholder="Condicion" value={estudianteEditando.condicion_medica || ''} onChange={e => setEstudianteEditando({ ...estudianteEditando, condicion_medica: e.target.value })} />
                        {imagenDescargadaUrl && (
                            <div>
                                <img
                                    src={imagenDescargadaUrl}
                                    alt="Imagen de perfil"
                                    style={{ width: '200px', height: '200px', objectFit: 'cover', borderRadius: '10px' }}
                                />
                            </div>
                        )}
                        <label htmlFor="editarImagen">Editar imagen de perfil:</label>
                            <input
                                type="file"
                                id="editarImagen"
                                accept="image/png"
                                onChange={(e) => {
                                const archivo = e.target.files?.[0];
                                if (archivo) {
                                    const nuevaUrl = URL.createObjectURL(archivo);
                                    setNuevaFoto(true)
                                    setImagenDescargadaUrl(nuevaUrl);
                                    setFotoPerfil(archivo)
                                    // Aquí podrías subirla al servidor si deseas
                                }
                                
                                }}
                        />
                        <button onClick={() => onGuardarEdicion()}>Guardar</button>
                        <button onClick={() => setEstudianteEditando(null)}>Cancelar</button>
                    </div>
                )}
            </div>
        </>
    );
}