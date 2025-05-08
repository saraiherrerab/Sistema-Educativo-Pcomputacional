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

function CartelNivel1(props:any) {
  // Declaración del estado con useState dentro del cuerpo del componente
 
  console.log(props);
  // Función para manejar el clic del botón
 
  return (
    <>

      {props.respuesta ? (
        <>
          {props.respuesta && (
            <div className="message-container-nivel1">
              
            </div>
          )}
        </>
      ) : null}
    </>
  );

}

function CartelA(props:any) {
  // Declaración del estado con useState dentro del cuerpo del componente
 
  
  console.log(props);
  // Función para manejar el clic del botón
 
  return (
    <>

      {props.respuesta ? (
        <>
          {props.respuesta && (
            <div className="message-containerA">
              
            </div>
          )}
        </>
      ) : null}
    </>
  );

}

function CartelB(props:any) {
  // Declaración del estado con useState dentro del cuerpo del componente
 
  
  console.log(props);
  // Función para manejar el clic del botón
 
  return (
    <>

      {props.respuesta ? (
        <>
          {props.respuesta && (
            <div className="message-containerB">
              
            </div>
          )}
        </>
      ) : null}
    </>
  );

}

function CartelC(props:any) {
  // Declaración del estado con useState dentro del cuerpo del componente
 
  
  console.log(props);
  // Función para manejar el clic del botón
 
  return (
    <>

      {props.respuesta ? (
        <>
          {props.respuesta && (
            <div className="message-containerC">
              
            </div>
          )}
        </>
      ) : null}
    </>
  );

}
 function Cartel3(props:any) {
  // Declaración del estado con useState dentro del cuerpo del componente
 
  console.log(props);
  // Función para manejar el clic del botón
 
  return (
    <>

      {props.respuesta ? (
        <>
          {props.respuesta && (
            <div className="message-container3">
              
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
    const [cambiarMostrar1, setState1] = useState(false);
    const [ganar1, cambiarGanar1] = useState(true);
    const [cambiarMostrar, setState] = useState(false);
    const [cambiarMostrar3, setState3] = useState(false);
    const [cambiarMostrarA, setStateA] = useState(false);
    const [cambiarMostrarB, setStateB] = useState(false);
    const [cambiarMostrarC, setStateC] = useState(false);
    const [ganar, cambiarGanar] = useState(true);
    const [ganar3, cambiarGanar3] = useState(true);
    const [ganarA, cambiarGanarA] = useState(true);
    const [ganarB, cambiarGanarB] = useState(true);
    const [ganarC, cambiarGanarC] = useState(true);
    const Router= useRouter();
     // Función para cambiar el estado
    const amoALuis = () => {
      setState(!cambiarMostrar); // Cambia el estado entre true y false
    };
    const amoALuis1 = () => {
      setState(!cambiarMostrar); // Cambia el estado entre true y false
    };
    const amoALuis3 = () => {
      setState3(!cambiarMostrar3); // Cambia el estado entre true y false
    };
    const amoALuisA = () => {
      setStateA(!cambiarMostrarA); // Cambia el estado entre true y false
    };

    const amoALuisB = () => {
      setStateB(!cambiarMostrarB); // Cambia el estado entre true y false
    };

    const amoALuisC = () => {
      setStateC(!cambiarMostrarC); // Cambia el estado entre true y false
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
       Panel(juegoKaplay, setState, cambiarGanar,cambiarGanar3,setState3,cambiarGanarA, setStateA,cambiarGanarB, setStateB,
        cambiarGanarC, setStateC,cambiarGanar1, setState1, Router);

         
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

        <Cartel3 
            respuesta={cambiarMostrar3} 
            cambiarRespuesta={() => amoALuis3()} 
            mensaje={ganar3 ? "Correcto, sigue así" : "Oh no, intenta de nuevo"} 
            cambiarGanar3={() => cambiarGanar3(true)} 
        />

        <CartelA 
            respuesta={cambiarMostrarA} 
            cambiarRespuesta={() => amoALuisA()} 
            mensaje={ganarA ? "Correcto, sigue así" : "Oh no, intenta de nuevo"} 
            cambiarGanarA={() => cambiarGanarA(true)} 
        />

        <CartelB 
            respuesta={cambiarMostrarB} 
            cambiarRespuesta={() => amoALuisB()} 
            mensaje={ganarA ? "Correcto, sigue así" : "Oh no, intenta de nuevo"} 
            cambiarGanarA={() => cambiarGanarB(true)} 
        />

        <CartelC 
            respuesta={cambiarMostrarC} 
            cambiarRespuesta={() => amoALuisC()} 
            mensaje={ganarC ? "Correcto, sigue así" : "Oh no, intenta de nuevo"} 
            cambiarGanarC={() => cambiarGanarC(true)} 
        />

        <CartelNivel1 
            respuesta={cambiarMostrar1} 
            cambiarRespuesta={() => amoALuis1()} 
            mensaje={ganar1 ? "Correcto, sigue así" : "Oh no, intenta de nuevo"} 
            cambiarGanar1={() => cambiarGanar1(true)} 
        />
      </>)
     
 
 }
 
 
 
 export default Page;