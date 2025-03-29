import { useEffect, useRef } from "react";
import kaplay, { Asset, GameObj, KAPLAYCtx, LevelOpt, Rect, SpriteData, Vec2 } from "kaplay";
import generarEsquemaMapa from "../src/MapsGenerator";
import generarNumerosAzar from "./utils/generarNumerosAzar";
import { Nivel1 } from "./1stLevel";

const SCREEN_RESOLUTION_X: number = window.innerWidth 
const SCREEN_RESOLUTION_Y: number = window.innerHeight 
const TILED_MAP__WIDTH_NUMBER: number = 21
const TILED_MAP_HEIGHT_NUMBER: number = 16
const TILED_WIDTH: number = SCREEN_RESOLUTION_X / TILED_MAP__WIDTH_NUMBER
const TILED_HEIGHT: number = SCREEN_RESOLUTION_Y / TILED_MAP_HEIGHT_NUMBER


export function Panel(juegoKaplay:KAPLAYCtx<{},never>) {
    // Referencia persistente para almacenar la instancia de Kaplay
    
    
  
    let lives = 3
  
     
        juegoKaplay.loadSprite("robot", "sprites/robotin.png", {
          sliceX: 4,
          sliceY: 12,
          anims: {
            right: { from: 16, to: 19, loop: false },
            up: { from: 20, to: 23, loop: false},
            down: { from: 12, to: 15, loop: false},
            left: { from: 24, to: 27, loop: false},
            quiet: { from: 0, to: 0, loop: false},
          },
        });
  
        juegoKaplay.loadSprite("knight", "sprites/p_knight_official.png", {
          sliceX: 6,
          sliceY: 8,
          anims: {
            right: { from: 6, to: 11, loop: false },
            up: { from: 36, to: 38, loop: false },
            down: { from: 24, to: 26, loop: false },
            left: { from: 5, to: 1, loop: false },
            quiet: { from: 31, to: 31, loop: false },
          },
        });
  
  
  
        juegoKaplay.loadSprite("enemy", "sprites/TNT_Blue (1).png", {
          sliceX: 7,
          sliceY: 3,
          anims: {
            left_a: { from: 20, to: 14, loop: false },
            right_a: { from: 7, to: 13, loop: false },
            quiet: { from: 0, to: 0, loop: false },
          },
        });
  
        juegoKaplay.loadSprite("scarecrow", "sprites/scarecrow.png", {
          sliceX: 1,
          sliceY: 1,
        });
  
        juegoKaplay.loadSprite("heart", "sprites/heart.png", {
          sliceX: 1,
          sliceY: 1,
        });
  
        juegoKaplay.loadSprite("title-0", "prueba/title-0.png", {
          sliceX: 1,
          sliceY: 1,
        });

        juegoKaplay.loadSprite("castillo", "sprites/buildings/Castle_Blue.png", {
          sliceX: 1,
          sliceY: 1,
        });

        juegoKaplay.loadSprite("torre", "sprites/buildings/Tower_Blue.png", {
          sliceX: 1,
          sliceY: 1,
        });
  
  
 
  

  
        
        
  
  
        // Cargar sprites adicionales
        ["up", "down", "left", "right"].forEach((dir) => {
          juegoKaplay.loadSprite(dir, `sprites/${dir}-arrow.png`);
        });
  
        juegoKaplay.loadSprite("redbox", "red-border-box.png");
        
  
        juegoKaplay.onLoad(async () => {
            //Practicando aqui
          const nivelPrincipal = generarEsquemaMapa(
            juegoKaplay,
            {
              tileWidth: TILED_WIDTH,
              tileHeight: TILED_HEIGHT,
              pos: juegoKaplay.vec2(0, 0),
            },
            `./panelv.json`,   //archivo de donde voy a extraer el mapa
            
            [ //Aca lo importante es que debo introducir el orden de las texturas en el que va, capa por capa
              {
                urlTextura: "./nivel2/Water.png",  
                dimensionTexturasX: 2, //Dimensiones de tiled
                dimensionTexturasY: 2,
                firstgid: 1 //orden en el que tiled extrae esas imagenes (esta llega a cuatro)
              }, 
              {
                urlTextura: "./nivel2/Tilemap_Flat.png",
                dimensionTexturasX: 20,
                dimensionTexturasY: 8,
                firstgid: 5 //(esta comienza en 5)
             },        
              {urlTextura: "./nivel2/Tilemap_Elevation.png",
              dimensionTexturasX: 8,
              dimensionTexturasY: 16,
              firstgid: 165
               },
               {
                urlTextura: "./nivel2/Tilemap_Flat.png",
                dimensionTexturasX: 20,
                dimensionTexturasY: 8,
                firstgid: 5 //(esta comienza en 5)
             },
             {
              urlTextura: "./nivel1/Bridge_All.png",
              dimensionTexturasX: 6,
              dimensionTexturasY: 8,
              firstgid: 293 //(esta comienza en 5)
           }         
     
            ]
          )
         .then(
                     (resultado: any) => {
                       // Jugador
                      
   
                       const player = juegoKaplay.add([
                         juegoKaplay.pos(450,109),
                         juegoKaplay.sprite("knight"),
                         juegoKaplay.scale(1),
                         juegoKaplay.health(3),
                         juegoKaplay.area(),
                         "player",
                         { z: 2 } // Asegura que el jugador esté en una capa superior
                       ]);

                       const castillo = juegoKaplay.add([
                        juegoKaplay.pos(800,-20),
                        juegoKaplay.sprite("castillo"),
                        juegoKaplay.scale(0.7),
                        juegoKaplay.area(),
                        "castillo",
                        { z: 1 } // Asegura que el jugador esté en una capa superior
                      ]);

                      const torre = juegoKaplay.add([
                        juegoKaplay.pos(630,-40),
                        juegoKaplay.sprite("torre"),
                        juegoKaplay.scale(0.7),
                        juegoKaplay.area(),
                        "torre",
                        { z: 1 } // Asegura que el jugador esté en una capa superior
                      ]);

                      torre.use("torre"); // green bean <:


                      torre.onClick(()=>{
                        juegoKaplay.destroy(torre);
                        juegoKaplay.destroy(castillo);
                        juegoKaplay.destroy(player);
                        Nivel1(juegoKaplay);
                        // We pass the component id for remove it.
                      });
         
        
         
                       // Flechas
                       const arrows = {
                         up: juegoKaplay.add([
                           juegoKaplay.pos(0, (juegoKaplay.center().y)/8),
                           juegoKaplay.sprite("up"),
                           juegoKaplay.scale(2),
                           juegoKaplay.area(),
                           { z: 1 } // Asegura que el jugador esté en una capa superior
                         ]),
                         down: juegoKaplay.add([
                           juegoKaplay.pos(0 ,(juegoKaplay.center().y)/4),
                           juegoKaplay.sprite("down"),
                           juegoKaplay.scale(2),
                           juegoKaplay.area(),
                           { z: 1 } // Asegura que el jugador esté en una capa superior
                         ]),
                         left: juegoKaplay.add([
                           juegoKaplay.pos(0,(juegoKaplay.center().y)/2),
                           juegoKaplay.sprite("left"),
                           juegoKaplay.scale(2),
                           juegoKaplay.area(),
                           { z: 1 } // Asegura que el jugador esté en una capa superior
                         ]),
                         right: juegoKaplay.add([
                           juegoKaplay.pos(0,(juegoKaplay.center().y)),
                           juegoKaplay.sprite("right"),
                           juegoKaplay.scale(2),
                           juegoKaplay.area(),
                           { z: 1 } // Asegura que el jugador esté en una capa superior
                         ]),
                       };
         
                       const velocidad = 440;
         
                       // Movimiento con teclado
                       juegoKaplay.onKeyDown("w", () => {
                         player.move(0, -velocidad);
                       });
                       juegoKaplay.onKeyDown("s", () => {
                         player.move(0, velocidad);
                       });
                       juegoKaplay.onKeyDown("a", () => {
                         player.move(-velocidad, 0);
                       });
                       juegoKaplay.onKeyDown("d", () => {
                         player.move(velocidad, 0);
                       });
         
                       // Movimiento con clic
                       arrows.up.onClick(() => {
                         player.move(0, -velocidad);
                         player.play("up");
                       });
                       arrows.down.onClick(() => {
                         player.move(0, velocidad);
                         player.play("down");
                       });
                       arrows.left.onClick(() => {
                         player.move(-velocidad, 0);
                         player.play("left");
                       });
                       arrows.right.onClick(() => {
                         player.move(velocidad, 0);
                         player.play("right");
                       });

  
  
                       //const posicionNotasY: number = 500;
                       // const posicionNotasx: number = 1000;
  
  
     
                      let puntoPartida: number = window.innerWidth/2.9
                      const puntoPartidaY:number = window.innerHeight/2
  


                     }
                   ).catch(
                     ((error:any) => {
                     })
                   )   
  
  
        }) //Fin - Onload()
  
        /*
        juegoKaplay.onUpdate(() => {
            const camX = juegoKaplay.camPos().x;
            const camY = juegoKaplay.camPos().y;
        
            juegoKaplay.getAll().forEach((obj:any) => {
                if (
                    obj.pos.x < camX - 1920 || obj.pos.x > camX + 1920 ||
                    obj.pos.y < camY - 1080 || obj.pos.y > camY + 1080
                ) {
                    obj.hidden = true;  // No dibujar objetos fuera del área visible
                } else {
                    obj.hidden = false;
                }
            });
        });    
        */  
          
        
    
      
  
     
      return () => {
        
      };
      
      
    
  
    return <canvas id="game" style={{ width: "100vw", height: "100vh" }} />;;
  }
