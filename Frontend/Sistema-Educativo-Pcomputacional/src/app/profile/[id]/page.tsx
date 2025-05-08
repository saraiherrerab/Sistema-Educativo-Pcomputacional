

  'use client';

import { useEffect, useState } from "react";
import './styles.css';
import '../../login.css'

import Notas from "../../../components/dnotas/dnotas";
import Foto from "../../../components/foto/foto";
import Datos from "../../../components/dbasicos/dbasicos";
import Nombre from "../../../components/nombre/nombre";
import { useParams } from 'next/navigation'; // Importa useParams
import { useRouter } from "next/navigation";

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
  condicion_medica: string,
  eficiencia_algoritmica: number,
  reconocimiento_patrones: boolean, 
  abstraccion: boolean,
  asociacion: boolean,
  construccion_algoritmos: boolean,
  p_actividades_completadas: number,
  tipo_premiacion: string,
  id_grupo: number,
  rol: string
}

interface Consulta_Horario {
  apellido: string;
  dia_semana: string;
  hora_fin: string;
  hora_inicio: string;
  id_curso: number;
  id_grupo: number;
  id_horario: number;
  id_profesor: number;
  nombre: string;
  nombre_curso: string;
  nombre_grupo: string;
}

export default function Profile() {
  const params = useParams(); // Usa el hook useParams para acceder a los params
  const profileId = params.id;
  console.log("ID de la ruta dinámica:", profileId);

  const [usuario, setUsuario] = useState<Estudiante>(
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
      id_estudiante: 0,
      condicion_medica: "",
      eficiencia_algoritmica: 0,
      reconocimiento_patrones: false,
      abstraccion: false,
      asociacion: false,
      construccion_algoritmos: false,
      p_actividades_completadas: 0,
      tipo_premiacion: "",
      id_grupo: 0,
      rol: ""
    }
  );
  const [horarios, setHorarios] = useState<Consulta_Horario[]>([])
  const [descargandoImagen, setDescargandoImagen] = useState(false);
  const [imagenDescargadaUrl, setImagenDescargadaUrl] = useState<string | null>(null);

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
      alert('Error al realizar la petición de descarga.');
      setDescargandoImagen(false);
    }
  }


  const obtenerDatosUsuario = async () => {
    
    const datosEstudiante = await fetch("http://localhost:5555/estudiantes/" + profileId)
    const resultadoConsulta = await datosEstudiante.json()
    console.log(resultadoConsulta)
    const responseRol = await fetch('http://localhost:5555/rol', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id_usuario: resultadoConsulta.id_usuario })
    });
    const dataRol = await responseRol.json();
    console.log(dataRol.obtener_rol_usuario)

    const resultadoHorarios = await obtenerHorariosAlumno(resultadoConsulta.id_grupo)
    console.log(resultadoHorarios)
    setHorarios ([...resultadoHorarios])
    console.log(horarios)
    setUsuario({...resultadoConsulta, rol: dataRol.obtener_rol_usuario})
    await descargarImagenPerfil(`User-${resultadoConsulta.id_usuario}.png`);
  };

  const obtenerHorariosAlumno = async (id_grupo: number) => {
    
    const datosHorario = await fetch(`http://localhost:5555/grupos/${id_grupo}/curso`)
    const resultadoConsulta = await datosHorario.json()
    console.log(resultadoConsulta)
    return resultadoConsulta;
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
            <Nombre tituloN={(usuario.rol != null || usuario.rol != "" ) ? usuario.rol : ""} nombre={usuario.nombre + " " + usuario.apellido}></Nombre>
            </div>
            <Datos titulo="Cedula" descripcion={ usuario.cedula }></Datos>
            <Datos titulo="Edad" descripcion={ usuario.edad.toString() }></Datos>
            <button onClick={()=>Router.push("/reportes/" + profileId)}>Ver Reportes</button>
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
                                  <Notas titulo="Situación Médica" descripcionN={[{titulo: "", descripcion: usuario.condicion_medica}]}></Notas>
                              </div>
                          </div>
          
                          <div className="fila fila_espacio_fondo">
                              <div className="notas">
                                <div className="notas-section">
                                  <h2 className="tituloNotas"><strong>Curso</strong></h2>
                                  <h2 className="tituloNotas"><strong>{(horarios[0]) ? horarios[0].nombre_grupo : ""}</strong></h2>
                                  <p><strong>Profesor: </strong>{(horarios[0]) ? horarios[0].nombre + " " + horarios[0].apellido : ""}</p>
                                  <p>{(horarios[0]) ? horarios[0].nombre_curso : ""}</p>
                                  
                                  
                                </div>
                              </div>
                              <div className="notas">
                                <div className="notas-section">
                                    <h2 className="tituloNotas"><strong>Horarios: </strong></h2>
                                    {
                                      horarios && horarios.length > 0
                                      ? 
                                      horarios.map((horario: Consulta_Horario, index: number) => (
                                              <p key={index}>{`${horario.dia_semana} desde ${horario.hora_inicio} hasta las ${horario.hora_fin}`}</p>
                                      ))
                                      : 
                                      null
                                  }
                                  </div>
                                
                              </div>
                          </div>
                      </div> 
    </div>
  );
}