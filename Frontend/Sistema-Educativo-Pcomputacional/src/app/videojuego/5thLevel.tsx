"use client";

import {GameObj, KAPLAYCtx} from "kaplay";
import generarEsquemaMapa from "../../MapsGenerator";
import generarNumerosAzar from "../../utils/generarNumerosAzar";

let SCREEN_RESOLUTION_X = 0;
let SCREEN_RESOLUTION_Y = 0;

const TILED_MAP__WIDTH_NUMBER: number = 21
const TILED_MAP_HEIGHT_NUMBER: number = 16
const TILED_WIDTH: number = SCREEN_RESOLUTION_X / TILED_MAP__WIDTH_NUMBER
const TILED_HEIGHT: number = SCREEN_RESOLUTION_Y / TILED_MAP_HEIGHT_NUMBER
let aciertos = 0;
let nuevoSprite: GameObj;
export let cambioNivel = 0;




export function Nivel5(juegoKaplay:KAPLAYCtx<{},never>, setState:any, cambiarGanar:any,setStateA:any, cambiarGanarA:any,setState1:any, cambiarGanar1:any, Router:any) {
    // Referencia persistente para almacenar la instancia de Kaplay
   // setState(false);

    
   
   



    juegoKaplay.loadSprite("arbol", "sprites/a-arbol/arbolicon.jpg", {
      sliceX: 1,
      sliceY: 1,
    });
    juegoKaplay.loadSprite("ardilla", "sprites/a-arbol/ardillaicon.jpg", {
      sliceX: 1,
      sliceY: 1,
    });
    juegoKaplay.loadSprite("manzana", "sprites/a-arbol/manzanaicon.jpg", {
      sliceX: 1,
      sliceY: 1,
    });
    juegoKaplay.loadSprite("palito", "sprites/a-arbol/palitoicon.jpg", {
      sliceX: 1,
      sliceY: 1,
    });

    juegoKaplay.loadSprite("arco", "sprites/a-paraguas/arcoicon.jpg", {
      sliceX: 1,
      sliceY: 1,
    });
    
    juegoKaplay.loadSprite("gota", "sprites/a-paraguas/gotaicon.jpg", {
      sliceX: 1,
      sliceY: 1,
    });

    juegoKaplay.loadSprite("nube", "sprites/a-paraguas/nubeicon.jpg", {
      sliceX: 1,
      sliceY: 1,
    });

    juegoKaplay.loadSprite("paraguas", "sprites/a-paraguas/paraguasicon.jpg", {
      sliceX: 1,
      sliceY: 1,
    });

    juegoKaplay.loadSprite("espatula", "sprites/a-pizza/espatulaicon.jpg", {
      sliceX: 1,
      sliceY: 1,
    });

    juegoKaplay.loadSprite("hamburguesa", "sprites/a-pizza/hamburguesaicon.jpg", {
      sliceX: 1,
      sliceY: 1,
    });

    juegoKaplay.loadSprite("pizza", "sprites/a-pizza/pizzaicon.jpg", {
      sliceX: 1,
      sliceY: 1,
    });

    juegoKaplay.loadSprite("rebanada", "sprites/a-pizza/rebanadaicon.jpg", {
      sliceX: 1,
      sliceY: 1,
    });

    juegoKaplay.loadSprite("miniplaneta", "sprites/a-planeta/planetachiquiicon.jpg", {
      sliceX: 1,
      sliceY: 1,
    });

    juegoKaplay.loadSprite("planeta", "sprites/a-planeta/planetaicon.jpg", {
      sliceX: 1,
      sliceY: 1,
    });

    juegoKaplay.loadSprite("satelite", "sprites/a-planeta/sateliteicon.jpg", {
      sliceX: 1,
      sliceY: 1,
    });

    juegoKaplay.loadSprite("sol", "sprites/a-planeta/solicon.jpg", {
      sliceX: 1,
      sliceY: 1,
    });

    juegoKaplay.loadSprite("carro", "sprites/a-semaforo/carroicon.jpg", {
      sliceX: 1,
      sliceY: 1,
    });

    juegoKaplay.loadSprite("cruce", "sprites/a-semaforo/cruceicon.jpg", {
      sliceX: 1,
      sliceY: 1,
    });

    juegoKaplay.loadSprite("luces", "sprites/a-semaforo/lucesicon.jpg", {
      sliceX: 1,
      sliceY: 1,
    });

    juegoKaplay.loadSprite("semaforo", "sprites/a-semaforo/semaforoicon.jpg", {
      sliceX: 1,
      sliceY: 1,
    });

    juegoKaplay.loadSprite("title-0", "prueba/title-0.png", {
      sliceX: 1,
      sliceY: 1,
    });

    juegoKaplay.loadSprite("notas1", "nivel2/notas_musicales1.png", {
      sliceX: 3,
      sliceY: 1
    });
  
    juegoKaplay.loadSprite("notas_circulo1", "nivel4/Activacion_notas.png", {
      sliceX: 3,
      sliceY: 2,
      anims: {
        default: { from: 0, to: 0, loop: false } ,
        hover: { from: 0, to: 2, loop: false},
      },
    });

   

    

    let puedePresionar: boolean = false;
        
  
    juegoKaplay.onLoad(async () => {
        //Practicando aqui
        SCREEN_RESOLUTION_X = window.innerWidth 
        SCREEN_RESOLUTION_Y = window.innerHeight 

      const nivelPrincipal = generarEsquemaMapa(
        juegoKaplay,
        {
          nameFolder: "nivel5",
          nameFile: "fondo.png",
          tileWidth: TILED_WIDTH,
          tileHeight: TILED_HEIGHT,
          pos: juegoKaplay.vec2(0, 0),
        },
        `./nivel5/fondo.json`,   //archivo de donde voy a extraer el mapa
        
        [ //Aca lo importante es que debo introducir el orden de las texturas en el que va, capa por capa
          {
            urlTextura: "./nivel1/fondo.jpg",  
            dimensionTexturasX: 32, //Dimensiones de tiled
            dimensionTexturasY: 21,
            firstgid: 1 //orden en el que tiled extrae esas imagenes (esta llega a cuatro)
          },
          
              
  
        ]
      )
      .then(  
        async (resultado: any) => {
        

          

            
                 
          

        }
      ).catch(
        ((error:any) => {
          console.log("lerolerolero")
        })
      )   
    
    }) //Fin - Onload()
         
    
  }
    
      //return <canvas id="game" style={{ width: "100vw", height: "100vh" }} />;;
      
    