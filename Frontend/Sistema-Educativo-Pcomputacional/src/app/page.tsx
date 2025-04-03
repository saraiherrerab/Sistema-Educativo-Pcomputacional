'use client'
import { useRouter } from "next/navigation";
 import { useEffect, useRef, useState } from "react";
import Input from "../components/input/input";
import Button from "../components/button/button";
import './login.css';
import Imagen from "../components/imageRight/imageRight";

export default function Page() {
  const Router = useRouter();
    return <>
      <div className="login-container">
        <div className="form-container">
          <div className="input-container">
            <Input placeholder="Escribe tu nombre" />
            <Input placeholder="Escribe tu apellido" />
            <Button text="Aceptar" onClick={()=>Router.push("/videojuego")}/>
          </div>
        </div>
        <Imagen/>
      </div>
      
    </>
    
  }