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




export function Nivel4(juegoKaplay:KAPLAYCtx<{},never>, setState:any, cambiarGanar:any,setStateA:any, cambiarGanarA:any,setState1:any, cambiarGanar1:any, Router:any) {
    // Referencia persistente para almacenar la instancia de Kaplay
   // setState(false);

    function sleep(ms: number) {
      return new Promise(resolve => setTimeout(resolve, ms));   
    }
   
    juegoKaplay.loadSprite("construccion3", "sprites/buildings/House_Blue.png", {
      sliceX: 1,
      sliceY: 1,
    });

    juegoKaplay.loadSprite("construccion2", "sprites/buildings/House_Destroyed.png", {
      sliceX: 1,
      sliceY: 1,
    });

    juegoKaplay.loadSprite("construccion", "sprites/buildings/House_Construction.png", {
      sliceX: 1,
      sliceY: 1,
    });

    juegoKaplay.loadSprite("House_Blue", "sprites/buildings/House_Blue.png", {
      sliceX: 1,
      sliceY: 1,
    });

    juegoKaplay.loadSprite("Tower_Blue", "sprites/buildings/Tower_Blue.png", {
      sliceX: 1,
      sliceY: 1,
    });
  
    juegoKaplay.loadSprite("nomo", "sprites/characters/Pawn_Purple.png", {
      sliceX: 6,
      sliceY: 6,
      anims: {
        right: { from: 18, to: 23, loop: false },
        quiet: { from: 0, to: 0, loop: false },
      },
    });

    juegoKaplay.loadSprite("arbol", "sprites/deco/Tree.png", {
      sliceX: 4,
      sliceY: 3,
      anims: {
        bye: { from: 8, to: 8, loop: false },
        quiet: { from: 0, to: 3, loop: true },
      },
    });

     juegoKaplay.loadSprite("rock", "sprites/deco/Rocks_01.png", {
          sliceX: 8,
          sliceY: 1,
          anims: {
            quiet: { from: 0, to: 7, loop: true },
          },
        });

        juegoKaplay.loadSprite("oveja", "sprites/deco/HappySheep_Bouncing.png", {
          sliceX: 6,
          sliceY: 1,
          anims: {
            quiet: { from: 0, to: 5, loop: true },
          },
        });
  




    juegoKaplay.loadSprite("heart", "sprites/heart.png", {
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

    let semicorchea1: GameObj;
    let semicorchea2: GameObj;
    let semicorchea3:GameObj;

 

    juegoKaplay.loadSound("sonidoPrueba", "button_09-190435.mp3");
    const P1= juegoKaplay.loadSound("P1", "./sounds/P1.mp3");
    juegoKaplay.loadSound("P2", "./sounds/P2.mp3");
    juegoKaplay.loadSound("P3", "./sounds/P3.mp3");
    juegoKaplay.loadSound("P4", "./sounds/P4.mp3");
    juegoKaplay.loadSound("P5", "./sounds/P5.mp3");
    juegoKaplay.loadSound("P6", "./sounds/P6.mp3");
    juegoKaplay.loadSound("A0", "./sounds/A0.mp3");
    juegoKaplay.loadSound("A1", "./sounds/A1.mp3");
    juegoKaplay.loadSound("A2", "./sounds/A2.mp3");
  
    juegoKaplay.loadSprite("redbox", "red-border-box.png");
        
  
    juegoKaplay.onLoad(async () => {
        //Practicando aqui
        SCREEN_RESOLUTION_X = window.innerWidth 
        SCREEN_RESOLUTION_Y = window.innerHeight 

      const nivelPrincipal = generarEsquemaMapa(
        juegoKaplay,
        {
          nameFolder: "nivel2",
          nameFile: "prueba3.png",
          tileWidth: TILED_WIDTH,
          tileHeight: TILED_HEIGHT,
          pos: juegoKaplay.vec2(0, 0),
        },
        `./fonditosari.json`,   //archivo de donde voy a extraer el mapa
        
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
          }

              
  
        ]
      )
      .then(  
        async (resultado: any) => {
        
          console.log("Resultado de generar nivel 2")
          console.log(juegoKaplay.get("*"))
          const ovejas= juegoKaplay.get("oveja")
          console.log(ovejas)

          const nomo = juegoKaplay.get("nomo")[0]
          console.log(nomo)
          const arbol = juegoKaplay.get("arbol")[0]
          console.log(arbol, {frame: 1})
          const construccion = juegoKaplay.get("construccion")[0]
          const construccion2 = juegoKaplay.get("construccion2")[0]
          const construccion3 = juegoKaplay.get("construccion3")[0]
          const colisiones = juegoKaplay.get("colisiones")
          console.log(colisiones);
          let esPrimeraRonda = true;

        /* const casa = juegoKaplay.add([
            juegoKaplay.pos(400,-5),
            juegoKaplay.sprite("casa1"),
            juegoKaplay.scale(0.8),
            juegoKaplay.health(3),
            juegoKaplay.area(),
            "casa",
            { z: 1 } // Asegura que el jugador esté en una capa superior
        ]);*/

          const velocidad = 440;

          const circle1 = juegoKaplay.add([
            juegoKaplay.pos(juegoKaplay.center().x - juegoKaplay.center().x / 4 -30, juegoKaplay.center().y + juegoKaplay.center().y / 2 + juegoKaplay.center().y / 6),
            juegoKaplay.sprite("notas_circulo1", {frame: 0}),
            juegoKaplay.area(),
            juegoKaplay.scale(0.20),
            { z: 1},// Asegura que el jugador esté en una capa superior,
          ])

          const circle2 = juegoKaplay.add([
            juegoKaplay.pos(juegoKaplay.center().x -30, juegoKaplay.center().y + juegoKaplay.center().y / 2 + juegoKaplay.center().y / 6),
            juegoKaplay.sprite("notas_circulo1", {frame: 0}),
            juegoKaplay.area(),
            juegoKaplay.scale(0.20),
            { z: 1},// Asegura que el jugador esté en una capa superior,
          ])

          const circle3 = juegoKaplay.add([
            juegoKaplay.pos(juegoKaplay.center().x + juegoKaplay.center().x / 4 -30, juegoKaplay.center().y + juegoKaplay.center().y / 2 + juegoKaplay.center().y / 6),
            juegoKaplay.sprite("notas_circulo1", {frame: 0}),
            juegoKaplay.area(),
            juegoKaplay.scale(0.20),
            { z: 1},// Asegura que el jugador esté en una capa superior,
          ])

          let puntoPartida: number = window.innerWidth/3
          let puntoPartidaY:number = window.innerHeight/2

          // Array para almacenar los sprites de notas creados
          let spritesNotas: GameObj[] = []; // Asegúrate de usar el tipo correcto para los sprites en Kaboom.js
        
          function validarAciertos(){
            if(aciertos==1){
                      
              
              construccion.destroy();
                
              console.log("El mensaje es: " + aciertos);
              cambiarGanar(true);
              setState(true);
              setTimeout(() => {
                setState(false);
              }, 4000); 
              
            
              ultimo = patronesdinamicos();
            
        
            }else if(aciertos==2){
              
            
              console.log("El mensaje es: " + aciertos);
              setState(true);
              cambiarGanar(true);
              setTimeout(() => {
                setState(false);
              }, 4000); 
              
              ultimo = patronesdinamicos();
        
            }else if(aciertos==3){
              
              console.log("El mensaje es: " + aciertos);
              //patronesdinamicos().clear;
              
              cambiarGanar(true);
              /*window.location.href=window.location.href;*/
              
            //setTimeout(()=>{
              construccion2.destroy();
              ovejas.forEach( (oveja: GameObj<any>) => {
                oveja.play("quiet");

              })

              cambiarGanarA(true); 
              setStateA(true);
                      
              setTimeout(() => {
                setStateA(false);
                window.location.href = window.location.href;
              }, 5000);
                          
                
            // },200);
            
            
            colisiones.forEach( (colision: GameObj<any>) => {
                          
              colision.destroy();
            })
              
              
        
              
        
              
        
            }
          };
        
          function limpiarNotas() {
            
            spritesNotas = juegoKaplay.get("notas1");
            console.log(spritesNotas);
            spritesNotas.forEach((spritesNotas:any)=>{
              spritesNotas.destroy();
            })
            puntoPartida = window.innerWidth/3
            puntoPartidaY= window.innerHeight/2
          }

          circle1.onClick( () => {

            circle1.play("hover");
            // Espera un tiempo (por ejemplo, 0.4 segundos) y luego vuelve a "run"
            juegoKaplay.wait(0.4, () => {
                circle1.play("default");
            });


            
            juegoKaplay.play("A0", {
              volume: 1, 
              speed: 1.5, 
              loop: false, 
            });

            if(ultimo == 0){
  
              nomo.play("right");
              arbol.play("bye");
              aciertos++;
              validarAciertos();
              setTimeout(() => {
                arbol.play("quiet");
              }, 2000); 
              
            }else{
              console.log("Fallaste" +ultimo)
              setState(true);
              cambiarGanar(false);
              ultimo = patronesdinamicos();
              setTimeout(() => {
                setState(false);
              }, 2000); 
            }
            

          })

          circle2.onClick( () => {

            circle2.play("hover");
            juegoKaplay.wait(0.4, () => {
              circle2.play("default");
            });
            
            juegoKaplay.play("A1", {
              volume: 1, 
              speed: 1.5, 
              loop: false, 
            });

        
            if(ultimo == 1){
  
              nomo.play("right");
              arbol.play("bye");
              aciertos++;
              validarAciertos();
              //console.log("El mensaje es: " + aciertos);
              setTimeout(() => {
                arbol.play("quiet");
              }, 2000); 
            
            }else{
            console.log("Fallaste"+ultimo)
            setState(true);
            cambiarGanar(false);
            ultimo = patronesdinamicos();
            setTimeout(() => {
              setState(false);
            }, 2000); 
            }
            
          })

          circle3.onClick( () => {

            circle3.play("hover");
            juegoKaplay.wait(0.4, () => {
              circle3.play("default");
            });
            
            juegoKaplay.play("A2", {
              volume: 1, 
              speed: 1.5, 
              loop: false, 
            });
            if(ultimo == 2){
  
              nomo.play("right");
              arbol.play("bye");
              aciertos++;
              validarAciertos();
              //console.log("El mensaje es: " + aciertos);
              setTimeout(() => {
                arbol.play("quiet");
              }, 2000); 
              
            }else{
              console.log("Fallaste" +ultimo)
              setState(true);
              cambiarGanar(false);
              ultimo = patronesdinamicos();
              setTimeout(() => {
                setState(false);
              }, 2000); 
            }
            
          })
        

          await sleep(1000)
          /* Reproducir notas de pruebas */
          circle1.play("hover", {speed: 4});
          juegoKaplay.play("A0", {
              volume: 1, 
              speed: 1, 
              loop: false, 
          });

          juegoKaplay.wait(1, () => {
            circle1.play("default");
          });

          await sleep(1000)
          
          circle1.play("hover", {speed: 4});
          juegoKaplay.play("A0", {
              volume: 1, 
              speed: 1, 
              loop: false, 
          });

          juegoKaplay.wait(1, () => {
            circle1.play("default");
          });
     
          await sleep(1000)

          circle1.play("hover", {speed: 4});
          juegoKaplay.play("A0", {
              volume: 1, 
              speed: 1, 
              loop: false, 
          });

          juegoKaplay.wait(1, () => {
            circle1.play("default");
          });

          await sleep(1000)

          /* Sonido de Segundo Botón */

          circle2.play("hover", {speed: 4});
          juegoKaplay.play("A1", {
              volume: 1, 
              speed: 1, 
              loop: false, 
          });

          juegoKaplay.wait(1, () => {
            circle2.play("default");
          });

          await sleep(1000)
          
          circle2.play("hover", {speed: 4});
          juegoKaplay.play("A1", {
              volume: 1, 
              speed: 1, 
              loop: false, 
          });

          juegoKaplay.wait(1, () => {
            circle2.play("default");
          });
     
          await sleep(1000)

          circle2.play("hover", {speed: 4});
          juegoKaplay.play("A1", {
              volume: 1, 
              speed: 1, 
              loop: false, 
          });

          juegoKaplay.wait(1, () => {
            circle2.play("default");
          });

          await sleep(1000)

          /* Sonido de Tercer Botón */

        circle3.play("hover", {speed: 4});
          juegoKaplay.play("A2", {
              volume: 1, 
              speed: 1, 
              loop: false, 
          });

          juegoKaplay.wait(1, () => {
            circle3.play("default");
          });

          await sleep(1000)
          
          circle3.play("hover", {speed: 4});
          juegoKaplay.play("A2", {
              volume: 1, 
              speed: 1, 
              loop: false, 
          });

          juegoKaplay.wait(1, () => {
            circle3.play("default");
          });
     
          await sleep(1000)

          circle3.play("hover", {speed: 4});
          juegoKaplay.play("A2", {
              volume: 1, 
              speed: 1, 
              loop: false, 
          });

          juegoKaplay.wait(1, () => {
            circle3.play("default");
          });

          await sleep(1000)


          /*********************************/

          juegoKaplay.wait(1, () => {
            setState1(true);
            setTimeout(() => {
              setState1(false);
            }, 10000); 
            circle1.play("default");
          });

          cambiarGanar1(true);

          await sleep(1000)


          
          function patronesdinamicos() {
            spritesNotas = juegoKaplay.get("notas1");
            console.log(spritesNotas);
            spritesNotas.forEach((spritesNotas:any)=>{
              spritesNotas.destroy();
            })
            puntoPartida = window.innerWidth/3
            puntoPartidaY= window.innerHeight/2
          
            const patrones = [
              [0, 1, 2, 0, 1, 2, 0, 1, 2],
              [0, 2, 0, 2, 0, 2, 0, 2, 0],
              [0, 0, 0, 1, 1, 1, 2, 2, 2],
              [1, 2, 0, 1, 2, 0, 1, 2, 0],
              [2, 1, 0, 2, 1, 0, 2, 1, 0],
              [0, 0, 1, 1, 0, 0, 1, 1, 0],
            ];
          
            const numeros = generarNumerosAzar();
            const patron = patrones[numeros[0]];
            const ultimo = patron[patron.length - 1];
            const secuencia = patron.slice(0, -1);
          
            let delay = esPrimeraRonda ? 5000 : 350; // 10s la primera vez, luego normal
            esPrimeraRonda = false; // Marcar como no primera ronda
          
            secuencia.forEach((numeroAzar: number) => {
              setTimeout(() => {
                switch (numeroAzar) {
                  case 0:
                    nuevoSprite = juegoKaplay.add([
                      juegoKaplay.pos(puntoPartida, juegoKaplay.center().y / 2 + puntoPartidaY - 80),
                      juegoKaplay.sprite("notas1"),
                      juegoKaplay.scale(0.1),
                      { z: 2 },
                      "notas1"
                    ]);
                    nuevoSprite.frame = 1;
                    juegoKaplay.play("A0", { volume: 1, speed: 1.5, loop: false });
                    break;
                  case 1:
                    nuevoSprite = juegoKaplay.add([
                      juegoKaplay.pos(puntoPartida, juegoKaplay.center().y / 2 + puntoPartidaY - 80),
                      juegoKaplay.sprite("notas1"),
                      juegoKaplay.scale(0.1),
                      { z: 2 },
                      "notas1"
                    ]);
                    nuevoSprite.frame = 0;
                    juegoKaplay.play("A1", { volume: 1, speed: 1.5, loop: false });
                    break;
                  case 2:
                    nuevoSprite = juegoKaplay.add([
                      juegoKaplay.pos(puntoPartida, juegoKaplay.center().y / 2 + puntoPartidaY - 80),
                      juegoKaplay.sprite("notas1"),
                      juegoKaplay.scale(0.1),
                      { z: 2 },
                      "notas1"
                    ]);
                    nuevoSprite.frame = 2;
                    juegoKaplay.play("A2", { volume: 1, speed: 1.5, loop: false });
                    break;
                }
          
                puntoPartida += 70;
                if (nuevoSprite) spritesNotas.push(nuevoSprite);
              }, delay);
          
              delay += 400;
            });
          
            return ultimo;
          }

          let ultimo = patronesdinamicos();

          
          

        }
      ).catch(
        ((error:any) => {
          console.log("lerolerolero")
        })
      )   
    
    }) //Fin - Onload()
         
    
  }
    
      //return <canvas id="game" style={{ width: "100vw", height: "100vh" }} />;;
      
    