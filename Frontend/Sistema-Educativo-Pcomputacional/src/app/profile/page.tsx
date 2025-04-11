'use client'
import { useEffect, useRef, useState } from "react";
import './styles.css';
import { useRouter } from "next/navigation";
import Notas  from "../../components/dnotas/dnotas";
import Foto from "../../components/foto/foto";
import Datos from  "../../components/dbasicos/dbasicos";
import Nombre from "../../components/nombre/nombre";

export default function Profile() {
  const Router = useRouter();
    return <>
      <canvas id="perfil" style={{ width: "100vw", height: "100vh", position:"absolute" }} />
      
      <div className="perfil">
          <div className="datosUsario">
            <Foto imageUrl="./cvpic.jpg"></Foto>
            <div className="titulo">
              <Nombre tituloN="Profesor" nombre="Sarai Herrera"></Nombre>
            </div>
            <Datos titulo="Cedula" descripcion="30109785"></Datos>
            <Datos titulo="Edad" descripcion="45"></Datos>
            <Datos titulo="CV" descripcion="ReferenciaApdf.pdf"></Datos>
          </div>
          <div className="datosBloques">
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
     
    </>
    
  }