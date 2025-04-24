'use client'
import { useRouter } from "next/navigation";
 import { useEffect, useRef, useState } from "react";
import Input from "../components/input/input";
import Button from "../components/button/button";
import './login.css';
import Imagen from "../components/imageRight/imageRight";

export default function Page() {

  const validarUsuario = async (usuario_val: string, clave_acceso_val: string) => {
    try {
      console.log(usuario_val)
      console.log(clave_acceso_val)
      const response = await fetch('http://localhost:5555/validar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ usuario: usuario_val, clave_acceso: clave_acceso_val })
      });
  
      const data = await response.json();
      console.log('Respuesta del servidor:', data);
  
      if (data) {
        // Lógica si el usuario fue encontrado
        const responseRol = await fetch('http://localhost:5555/rol', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id_usuario: data.id_usuario })
        });
        const dataRol = await responseRol.json();
        console.log(dataRol.obtener_rol_usuario)
        if(dataRol.obtener_rol_usuario === "ADMINISTRADOR"){
          Router.push("./Amenu")
        }else if(dataRol.obtener_rol_usuario === "PROFESOR"){
          Router.push("./menu")
        }else if(dataRol.obtener_rol_usuario === "ESTUDIANTE"){
          Router.push("./videojuego")
        }else{
          Router.push("./")
        }
      } else {
        // Lógica si no se encontró el usuario
        alert('Usuario o clave incorrectos');
      }
    } catch (error) {
      console.error('Error al validar usuario:', error);
      alert('Ocurrió un error al validar');
    }
  }

  const [usuario, setUsuario] = useState('');
  const [claveAcceso, setClaveAcceso] = useState('');


  const Router = useRouter();
    return <>
      <div className="login-container">
        <div className="form-container">
          <div className="input-container">
          <input
            type="text"
            placeholder="Usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={claveAcceso}
            onChange={(e) => setClaveAcceso(e.target.value)}
          />
          <button type="submit" onClick={() => validarUsuario(usuario,claveAcceso)}>Iniciar sesión</button>
          </div>
        </div>
        <Imagen/>
      </div>
      
    </>
    
  }