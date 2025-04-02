'use client'
 import { useEffect, useRef, useState } from "react";
 import kaplay, { Asset, GameObj, KAPLAYCtx, LevelOpt, Rect, SpriteData, Vec2 } from "kaplay";
 import { Nivel1 } from "./1stLevel";
 import { Panel } from "./PanelJuegos";
 import './styles.css';

 //let respuesta=1;
 
 function Cartel(props:any) {
  // Declaración del estado con useState dentro del cuerpo del componente
 
  console.log(props);
  // Función para manejar el clic del botón
 
  return (
    <>
      {props.respuesta ? (
        <>
          <div className="button-container">
            <button onClick={() => props.cambiarRespuesta()}>Mensaje condicional</button>
          </div>
          {props.respuesta && (
            <div className="message-container">
              <p>Me duele la tripa</p>
            </div>
          )}
        </>
      ) : null}
    </>
  );

}
 const SCREEN_RESOLUTION_X: number = window.innerWidth 
 const SCREEN_RESOLUTION_Y: number = window.innerHeight 
 
 function Page() {
    const [cambiarMostrar, setState] = useState(false);
     // Función para cambiar el estado
    const amoALuis = () => {
      setState(!cambiarMostrar); // Cambia el estado entre true y false
    };
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
      Panel(juegoKaplay, setState);

         
       }
   
     resizeCanvas(); // Ajustar en la carga inicial
 
    
     return () => {
       window.removeEventListener("resize", resizeCanvas);
     };
     
     
   }, []);
 

 
   return (<> 
     
        <canvas id="game" style={{ width: "100vw", height: "100vh", position:"relative" }} />
        
      <Cartel respuesta={cambiarMostrar} cambiarRespuesta={()=>amoALuis()}/>
      </>)
     
 
 }
 
 
 
 export default Page;