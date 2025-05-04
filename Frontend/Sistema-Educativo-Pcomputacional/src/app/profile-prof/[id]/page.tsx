'use client'
import { useEffect, useRef, useState } from "react";
import './styles.css';
import { useRouter } from "next/navigation";
import Notas  from "../../../components/dnotas/dnotas";
import Foto from "../../../components/foto/foto";
import Datos from  "../../../components/dbasicos/dbasicos";
import Nombre from "../../../components/nombre/nombre";
import { useParams } from 'next/navigation'; // Importa useParams

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
    curriculum: string,
    formacion: string
}

interface descripcionesNota {
    titulo: string,
    descripcion: string
}

interface Cursos {
    id_curso: number,
    nombre_curso: string
}

interface Horarios {
    dia_semana: string,
    hora_fin: string,
    hora_inicio: string,
    id_curso: number,
    id_horario: number,
    id_profesor: number
}

export default function Profileprof() {
    const params = useParams(); // Usa el hook useParams para acceder a los params
    const profileId = params.id;
    console.log("ID de la ruta dinámica:", profileId);
  
    const [usuario, setUsuario] = useState<Profesor>(
        {
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
            curriculum: "",
            formacion: ""
        }
    );

    const [horarios, setHorarios] = useState<Horarios[]>([])
    const [cursos, setCursos] = useState<Cursos[]>([])

    const [descargandoImagen, setDescargandoImagen] = useState(false);
    const [imagenDescargadaUrl, setImagenDescargadaUrl] = useState<string | null>(null);
  
    async function descargarImagenPerfil(nombreArchivo: string) {
      setDescargandoImagen(true);
      const urlDescarga = `/descargar/imagen/${nombreArchivo}`;
  
      try {
        const response = await fetch(`http://localhost:5555${urlDescarga}`);
        console.log(response);
  
        if (!response.ok) {
          let errorMessage = 'Error desconocido';
          try {
            const errorData = await response.json();
            errorMessage = errorData.mensaje || errorMessage;
          } catch (e) {
            console.error('La respuesta de error no era JSON:', e);
          }
          console.error('Error al descargar la imagen:', errorMessage);
          alert(`Error al descargar la imagen: ${errorMessage}`);
          setDescargandoImagen(false);
          return;
        }
  
        const blob = await response.blob();
        const urlBlob = window.URL.createObjectURL(blob);
        setImagenDescargadaUrl(urlBlob);
        setDescargandoImagen(false);
        console.log('Imagen de perfil descargada y URL creada.');
  
      } catch (error) {
        console.error('Error al realizar la petición de descarga:', error);
        alert('Error al realizar la petición de descarga.');
        setDescargandoImagen(false);
      }
    }
  
    const obtenerDatosUsuario = async () => {
      
      const datosProfesor = await fetch("http://localhost:5555/profesores/" + profileId)
      const resultadoConsulta = await datosProfesor.json()
      console.log(resultadoConsulta)
      setUsuario({...resultadoConsulta})
      await descargarImagenPerfil(`User-${resultadoConsulta.id_usuario}.png`);
      await obtenerHorariosProfesor();
      await obtenerCursosProfesor();
    };

    const obtenerHorariosProfesor = async () => {
      
        const datosHorario = await fetch(`http://localhost:5555/profesores/${profileId}/horarios/`)
        const resultadoConsulta = await datosHorario.json()
        console.log(resultadoConsulta)
        setHorarios([...resultadoConsulta])
    
    };

    const obtenerCursosProfesor = async () => {
      
        const datosCursos = await fetch(`http://localhost:5555/profesores/cursos/inscritos/${profileId}`)
        const resultadoConsulta = await datosCursos.json()
        console.log(resultadoConsulta)
        setCursos([...resultadoConsulta])
    };
  
    useEffect(() => {
      obtenerDatosUsuario();
      return () => {
        if (imagenDescargadaUrl) {
          window.URL.revokeObjectURL(imagenDescargadaUrl);
        }
      };
    }, []);

  const Router = useRouter();

    return (
        <div className="perfil body_profile">
            <div className="datosUsario">
                    {imagenDescargadaUrl ? (
                    <Foto imageUrl={imagenDescargadaUrl} />
                  ) : (
                    <p>{descargandoImagen ? 'Cargando imagen...' : 'Cargando imagen...'}</p>
                  )}
                  <div className="titulo">
                  <Nombre tituloN="PROFESOR" nombre={usuario.nombre + " " + usuario.apellido}></Nombre>
                  </div>
                  <Datos titulo="Cedula" descripcion={ usuario.cedula }></Datos>
                  <Datos titulo="Edad" descripcion={ usuario.edad.toString() }></Datos>
            </div>
            <div className="datosBloques">
                <div className="fila">
                    <div className="notas">
                        <Notas titulo="Contacto" descripcionN={
                            [
                                {titulo: "Teléfono", descripcion: usuario.telefono},
                                {titulo: "Correo", descripcion: usuario.correo},
                            ]}></Notas>
                    </div>

                    <div className="notas">
                        <Notas titulo="Formación" descripcionN={[{titulo: "", descripcion: usuario.formacion}]}></Notas>
                    </div>
                </div>

                <div className="fila fila_espacio_fondo">
                    <div className="notas">
                        <Notas titulo="Cursos" descripcionN={[{titulo: "", descripcion: ""}]}  cursos_profesor={cursos}></Notas>
                    </div>
                    <div className="notas">
                        <Notas titulo="Horario" descripcionN={[{titulo: "", descripcion: ""}]} horarios_profesor={horarios}></Notas>
                    </div>
                </div>
            </div> 
        </div>
    )
            
    
  }