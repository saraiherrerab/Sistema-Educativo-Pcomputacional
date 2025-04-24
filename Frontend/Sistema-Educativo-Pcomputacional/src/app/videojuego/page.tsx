'use client'

 import { useEffect, useRef, useState } from "react";
 import kaplay from "kaplay";
 import { Panel } from "./PanelJuegos";
 import './styles.css';
import { useRouter } from "next/navigation";



 //let respuesta=1;


 
 function Cartel(props:any) {
  // Declaración del estado con useState dentro del cuerpo del componente
 
  console.log(props);
  // Función para manejar el clic del botón
 
  return (
    <>

      {props.respuesta ? (
        <>
          {props.respuesta && (
            <div className="message-container">
              <p className="elmensaje">  {props.mensaje}</p>
            </div>
          )}
        </>
      ) : null}
    </>
  );

}
 let SCREEN_RESOLUTION_X: number = 0;
 let SCREEN_RESOLUTION_Y: number = 0;
 
 function Page() {
    const [cambiarMostrar, setState] = useState(false);
    const [ganar, cambiarGanar] = useState(true);
    const Router= useRouter();
     // Función para cambiar el estado
    const amoALuis = () => {
      setState(!cambiarMostrar); // Cambia el estado entre true y false
    };
   const juegoKaplayRef = useRef<any>(null);
 
   useEffect(() => {
    SCREEN_RESOLUTION_X = window.innerWidth 
    SCREEN_RESOLUTION_Y = window.innerHeight 
    const resizeCanvas = () => {
      const canvas = document.getElementById("game") as HTMLCanvasElement;
      if (canvas) {
        canvas.width = window.innerWidth 
        canvas.height = window.innerHeight 
      }
    };
     
     
     // Inicializar Kaplay solo si no está creado
     if (!juegoKaplayRef.current) {
       juegoKaplayRef.current = kaplay({
         width:  SCREEN_RESOLUTION_X,
         height: SCREEN_RESOLUTION_Y,
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
      Panel(juegoKaplay, setState, cambiarGanar, Router);

         
       }
   
    resizeCanvas(); // Ajustar en la carga inicial
 
    
    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
     
  }, []);
 

 
   return (<> 
     
        <canvas id="game" style={{ width: "100vw", height: "100vh", position:"relative" }} />
        
        <Cartel 
            respuesta={cambiarMostrar} 
            cambiarRespuesta={() => amoALuis()} 
            mensaje={ganar ? "Correcto, sigue así" : "Oh no, intenta de nuevo"} 
            cambiarGanar={() => cambiarGanar(true)} 
        />
      </>)
     
 
 }
 
 
 
 export default Page;