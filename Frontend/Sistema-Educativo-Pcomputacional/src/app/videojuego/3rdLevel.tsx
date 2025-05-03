"use client";

import {GameObj, KAPLAYCtx} from "kaplay";
import generarEsquemaMapa from "../../MapsGenerator";

let SCREEN_RESOLUTION_X = 0;
let SCREEN_RESOLUTION_Y = 0;

const TILED_MAP__WIDTH_NUMBER: number = 20
const TILED_MAP_HEIGHT_NUMBER: number = 15
const TILED_WIDTH: number = SCREEN_RESOLUTION_X / TILED_MAP__WIDTH_NUMBER
const TILED_HEIGHT: number = SCREEN_RESOLUTION_Y / TILED_MAP_HEIGHT_NUMBER

export let cambioNivel = 0;

export function Nivel3(juegoKaplay:KAPLAYCtx<{},never>, setState:any, cambiarGanar:any, Router:any) {


    juegoKaplay.loadSprite("arbol", "sprites/deco/Tree.png", {
        sliceX: 4,
        sliceY: 3,
        anims: {
          bye: { from: 8, to: 8, loop: false },
          quiet: { from: 0, to: 3, loop: true },
        },
      });

    juegoKaplay.loadSprite("title-0", "prueba/title-0.png", {
      sliceX: 1,
      sliceY: 1,
    });
        
  
    juegoKaplay.onLoad(async () => {
        //Practicando aqui
        SCREEN_RESOLUTION_X = window.innerWidth 
        SCREEN_RESOLUTION_Y = window.innerHeight 

    const nivelPrincipal = generarEsquemaMapa(
        juegoKaplay,
        {
          nameFolder: "nivel3",
          nameFile: "nivel3.png",
          tileWidth: TILED_WIDTH,
          tileHeight: TILED_HEIGHT,
          pos: juegoKaplay.vec2(0, 0),
        },
        `./nivel3/nivel3.json`,   //archivo de donde voy a extraer el mapa
        
        [ //Aca lo importante es que debo introducir el orden de las texturas en el que va, capa por capa
          {
            urlTextura: "./nivel2/Water.png",  
            dimensionTexturasX: 2, //Dimensiones de tiled
            dimensionTexturasY: 2,
            firstgid: 1 //orden en el que tiled extrae esas imagenes (esta llega a cuatro)
          }
        ]
    )
    .then(
        (resultado: any) => {
            const arbol = juegoKaplay.get("arbol")[0]
            console.log(arbol)
        }
     ) 
    .catch(
        ((error:any) => {
            console.log("lerolerolero")
        })
    )   
  
  
    }) //Fin - Onload()

}


