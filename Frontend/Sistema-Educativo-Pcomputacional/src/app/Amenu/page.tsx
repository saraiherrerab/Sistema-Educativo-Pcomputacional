'use client'
import { useEffect, useRef, useState } from "react";
import './styles.css';
import { useRouter } from "next/navigation";
import MenuButton from "../../components/menuButton/menubutton";
import Saludo  from "../../components/saludo/saludo";

export default function Amenu() {
  const Router = useRouter();
    return <>
      <canvas id="menu" style={{ width: "100vw", height: "100vh", position:"relative" }} />
      
      <div className="menu">
        <Saludo usuario="admin"></Saludo>
        <div className="contenedor">
        <div className= "MButtonsContainer">

                <div className="descripcion">
                    <MenuButton imageUrl='./educacion-fisica.png' onClick={()=>Router.push("/profile")}/>
                    <span>MI PERFIL</span>
                </div>
                <div className="descripcion">
                    <MenuButton imageUrl='./game-console.png' onClick={()=>Router.push("/videojuego")}/>
                    <span>JUEGOS</span>
                </div>
                <div className="descripcion">
                    <MenuButton imageUrl='./student.png' onClick={()=>Router.push("/Aestudiantes-lista")}/>
                    <span>ESTUDIANTES</span>
                </div>
                <div className="descripcion">
                    <MenuButton imageUrl='./teacher.png' onClick={()=>Router.push("/Aprofesores-lista")}/>
                    <span>PROFESORES</span>
                </div>
                
                <div className="descripcion">
                    <MenuButton imageUrl='./grupo.png' onClick={()=>Router.push("/Aadmins-lista")}/>
                    <span>ADMINISTRADORES</span>
                </div>

                
                
        </div>
        </div>
      </div>
     
    </>
    
  }