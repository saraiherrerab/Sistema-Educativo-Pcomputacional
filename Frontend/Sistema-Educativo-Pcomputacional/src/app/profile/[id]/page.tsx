

  'use client';

import { useEffect, useState } from "react";
import './styles.css';

import Notas from "../../../components/dnotas/dnotas";
import Foto from "../../../components/foto/foto";
import Datos from "../../../components/dbasicos/dbasicos";
import Nombre from "../../../components/nombre/nombre";
import { useParams } from 'next/navigation'; // Importa useParams

interface PageProps {} // Ya no necesitamos la interfaz para params aquí

export default function Profile() {
  const params = useParams(); // Usa el hook useParams para acceder a los params
  const profileId = params.id;
  console.log("ID de la ruta dinámica:", profileId);

  const [usuario, setUsuario] = useState({ rol: "", id_usuario: "", nombre: "", cedula: "", edad: 0, curriculum: "" });
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

  const obtenerDatosUsuario = () => {
    const datos = localStorage.getItem('usuario');
    if (datos !== null) {
      const usuarioData = JSON.parse(datos);
      setUsuario(usuarioData);
      descargarImagenPerfil(`User-${usuarioData.id_usuario}.png`);
    }
  };

  useEffect(() => {
    obtenerDatosUsuario();
    return () => {
      if (imagenDescargadaUrl) {
        window.URL.revokeObjectURL(imagenDescargadaUrl);
      }
    };
  }, []);

  return (
    <div className="perfil body_profile">
                <div className="datosUsario">
              {imagenDescargadaUrl ? (
              <Foto imageUrl={imagenDescargadaUrl} />
            ) : (
              <p>{descargandoImagen ? 'Cargando imagen...' : 'Cargando imagen...'}</p>
            )}
            <div className="titulo">
              <Nombre tituloN={(usuario.rol != null || usuario.rol != "" ) ? usuario.rol : ""} nombre={usuario.nombre}></Nombre>
            </div>
            <Datos titulo="Cedula" descripcion={ usuario.cedula }></Datos>
            <Datos titulo="Edad" descripcion={ usuario.edad.toString() }></Datos>
            <Datos titulo="CV" descripcion={ usuario.curriculum }></Datos>
           
          </div>
          <div className="datosBloques">
            <div className="fila">
              <div className="notas">
                <Notas titulo="Contacto" descripcionN="Lorem Ipsum text ever since the 1500s, 
                when an unknown printer took a galley of type and scrambled it to make a 
                nknown printer took a galley of type and scrambled it to make a"></Notas>
              </div>

              <div className="notas">
                <Notas titulo="Situación médica" descripcionN="Lorem Ipsum text ever since the 1500s, 
                when an unknown printer took a galley of type and scrambled it to make a 
                unknown printer took a galley of type and scrambled it to make a"></Notas>
            </div>
            </div>

            <div className="fila fila_espacio_fondo">
              <div className="notas">
                <Notas titulo="Nivel" descripcionN="Lorem Ipsum text ever since the 1500s, when an unknown printer
                took a galley of type and scrambled it to make a 
                took a galley of type and scrambled it to make a"></Notas>
              </div>

              <div className="notas">
                <Notas titulo="Horario" descripcionN="Lorem Ipsum text ever since the 1500s, when an unknown printer took
                a galley of type and scrambled it to make a 
                a galley of type and scrambled it to make a"></Notas>
              </div>
            </div>
            

            

          </div> 
    </div>
  );
}