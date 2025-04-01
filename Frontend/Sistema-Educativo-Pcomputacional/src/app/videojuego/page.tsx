'use client'
 import { useEffect, useRef, useState } from "react";
 import kaplay, { Asset, GameObj, KAPLAYCtx, LevelOpt, Rect, SpriteData, Vec2 } from "kaplay";
 import { Nivel1 } from "./1stLevel";
 import { Panel } from "./PanelJuegos";
 
 
 const SCREEN_RESOLUTION_X: number = window.innerWidth 
 const SCREEN_RESOLUTION_Y: number = window.innerHeight 
 
 function Page() {
   
   const juegoKaplayRef = useRef<any>(null);
 
   useEffect(() => {
   
       
     const resizeCanvas = () => {
       const canvas = document.getElementById("game") as HTMLCanvasElement;
       if (canvas) {
         canvas.width = window.innerWidth //TILED_PIXEL_DIMENSION * MAX_TILED_PIXEL_WIDTH;
         canvas.height = window.innerHeight //TILED_PIXEL_DIMENSION * MAX_TILED_PIXEL_HEIGTH;
       }
     };
     
     
     // Inicializar Kaplay solo si no está creado
     if (!juegoKaplayRef.current) {
       juegoKaplayRef.current = kaplay({
         width:  SCREEN_RESOLUTION_X,//TILED_PIXEL_DIMENSION * MAX_TILED_PIXEL_WIDTH,*/ // Ancho dinámico
         height: SCREEN_RESOLUTION_Y,/*TILED_PIXEL_DIMENSION * 15, */// Alto dinámico
         letterbox: false,
         global: false,
         debug: true, // Cambiar a false en producción
         debugKey: "f1",
         canvas: document.getElementById("game") as HTMLCanvasElement,
         pixelDensity: 1,
       });
 
       const juegoKaplay = juegoKaplayRef.current;
       juegoKaplay.setBackground(71,171,169)
       juegoKaplay.loadRoot("./");
      // Nivel1(juegoKaplay);
      Panel(juegoKaplay);
         
       }
   
     resizeCanvas(); // Ajustar en la carga inicial
 
    
     return () => {
       window.removeEventListener("resize", resizeCanvas);
     };
     
     
   }, []);
 
   const amoALuis = () => {
     setState(false);
     
   };
 
   const [cambiarMostrar, setState] = useState(true);
 
   return (<>
     <canvas id="game" style={{ width: "100vw", height: "100vh", position:"relative" }} />
     <div style={{
           position: "absolute",
           top: "20px", // Ajusta la posición según sea necesario
           left: "50%",
           transform: "translateX(-50%)", // Centrar horizontalmente
           color: "white",
           backgroundColor: "rgba(0, 0, 0, 0.5)", // Fondo semitransparente
           padding: "10px",
           borderRadius: "5px",
           fontSize: "20px",
     }}><button onClick={amoALuis}> Mensaje condicional</button>  </div>
     {cambiarMostrar?<div style={{
           position: "absolute",
           top: "40px", // Ajusta la posición según sea necesario
           left: "50%",
           transform: "translateX(-50%)", // Centrar horizontalmente
           color: "white",
           backgroundColor: "rgba(0, 0, 0, 0.5)", // Fondo semitransparente
           padding: "10px",
           borderRadius: "5px",
           fontSize: "20px",
     }}><p>Me duele la tripa</p></div>:null}
     
      </>)
 
 }
 
 
 
 export default Page;