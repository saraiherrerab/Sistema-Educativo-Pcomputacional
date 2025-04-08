import {GameObj, KAPLAYCtx} from "kaplay";
import generarEsquemaMapa from "../../MapsGenerator";
import generarNumerosAzar from "../../utils/generarNumerosAzar";
import { useEffect, useRef, useState } from "react";
//import './styles.css';



const SCREEN_RESOLUTION_X: number = window.innerWidth 
const SCREEN_RESOLUTION_Y: number = window.innerHeight 
const TILED_MAP__WIDTH_NUMBER: number = 21
const TILED_MAP_HEIGHT_NUMBER: number = 16
const TILED_WIDTH: number = SCREEN_RESOLUTION_X / TILED_MAP__WIDTH_NUMBER
const TILED_HEIGHT: number = SCREEN_RESOLUTION_Y / TILED_MAP_HEIGHT_NUMBER
let aciertos = 0;
let nuevoSprite: GameObj;
export let cambioNivel = 0;




export function Nivel1(juegoKaplay:KAPLAYCtx<{},never>, setState:any) {
    // Referencia persistente para almacenar la instancia de Kaplay
   // setState(false);
    juegoKaplay.loadSprite("casa3", "sprites/buildings/House_Blue.png", {
      sliceX: 1,
      sliceY: 1,
    });

    juegoKaplay.loadSprite("casa2", "sprites/buildings/House_Destroyed.png", {
      sliceX: 1,
      sliceY: 1,
    });

    juegoKaplay.loadSprite("casa1", "sprites/buildings/House_Construction.png", {
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
  
    juegoKaplay.loadSprite("pawn", "sprites/characters/Pawn_Purple.png", {
      sliceX: 6,
      sliceY: 6,
      anims: {
        right: { from: 18, to: 23, loop: false },
        quiet: { from: 0, to: 0, loop: false },
      },
    });

    juegoKaplay.loadSprite("tree", "sprites/deco/Tree.png", {
      sliceX: 4,
      sliceY: 3,
      anims: {
        bye: { from: 8, to: 8, loop: false },
        quiet: { from: 0, to: 3, loop: true },
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

    juegoKaplay.loadSprite("notas", "nivel2/notas_musicales.png", {
      sliceX: 3,
      sliceY: 1
    });
  
    juegoKaplay.loadSprite("notas_circulo", "nivel2/notas_musicales_con_circulo.png", {
      sliceX: 3,
      sliceY: 1
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
          nameFolder: "nivel2",
          nameFile: "prueba3.png",
          tileWidth: TILED_WIDTH,
          tileHeight: TILED_HEIGHT,
          pos: juegoKaplay.vec2(0, 0),
        },
        `./fondomusical.json`,   //archivo de donde voy a extraer el mapa
        
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
        (resultado: any) => {
        
          // Jugador
          const player = juegoKaplay.add([
            juegoKaplay.pos(730, 5),
            juegoKaplay.sprite("pawn"),
            juegoKaplay.scale(1),
            juegoKaplay.health(3),
            juegoKaplay.area(),
            "player",
            { z: 1 } // Asegura que el jugador esté en una capa superior
          ]);

          const tree = juegoKaplay.add([
            juegoKaplay.pos(810,-5),
            juegoKaplay.sprite("tree"),
            juegoKaplay.scale(0.8),
            juegoKaplay.health(3),
            juegoKaplay.area(),
            "tree",
            { z: 1 } // Asegura que el jugador esté en una capa superior
          ]);
          

         /* const casa = juegoKaplay.add([
            juegoKaplay.pos(400,-5),
            juegoKaplay.sprite("casa1"),
            juegoKaplay.scale(0.8),
            juegoKaplay.health(3),
            juegoKaplay.area(),
            "casa",
            { z: 1 } // Asegura que el jugador esté en una capa superior
          ]);*/


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
            const intervalId = setInterval(() => {
              player.move(velocidad, 0);
              player.play("right"); // Reproduce la animación
          }, 500); // Ajusta el tiempo según la duración de la animación
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

          const circle1 = juegoKaplay.add([
          juegoKaplay.pos(juegoKaplay.center().x - juegoKaplay.center().x / 4, juegoKaplay.center().y + juegoKaplay.center().y / 2 + juegoKaplay.center().y / 6),
          juegoKaplay.sprite("notas_circulo", {frame: 0}),
          juegoKaplay.area(),
          juegoKaplay.scale(0.20),
          { z: 1},// Asegura que el jugador esté en una capa superior,
          ])

          const circle2 = juegoKaplay.add([
          juegoKaplay.pos(juegoKaplay.center().x, juegoKaplay.center().y + juegoKaplay.center().y / 2 + juegoKaplay.center().y / 6),
          juegoKaplay.sprite("notas_circulo", {frame: 1}),
          juegoKaplay.area(),
          juegoKaplay.scale(0.20),
          { z: 1},// Asegura que el jugador esté en una capa superior,
          ])

          const circle3 = juegoKaplay.add([
          juegoKaplay.pos(juegoKaplay.center().x + juegoKaplay.center().x / 4, juegoKaplay.center().y + juegoKaplay.center().y / 2 + juegoKaplay.center().y / 6),
          juegoKaplay.sprite("notas_circulo", {frame: 2}),
          juegoKaplay.area(),
          juegoKaplay.scale(0.20),
          { z: 1},// Asegura que el jugador esté en una capa superior,
          ])

        let puntoPartida: number = window.innerWidth/3
        let puntoPartidaY:number = window.innerHeight/2
        //let spritecito="";

         /* function clean(spritecito: any){
            juegoKaplay.destroy(spritecito);
          };*/

// Array para almacenar los sprites de notas creados
  let spritesNotas: GameObj[] = []; // Asegúrate de usar el tipo correcto para los sprites en Kaboom.js

  function validarAciertos(){
    if(aciertos==1){
              
      const casa1 = juegoKaplay.add([
        juegoKaplay.pos(400,-5),
        juegoKaplay.sprite("casa1"),
        juegoKaplay.scale(0.8),
        juegoKaplay.health(3),
        juegoKaplay.area(),
        "casa",
        { z: 1 } // Asegura que el jugador esté en una capa superior
      ]);
      console.log("El mensaje es: " + aciertos);
      setState(true);
      
     
      ultimo = patronesdinamicos();
     

    }else if(aciertos==2){
      
      const casa2 = juegoKaplay.add([
        juegoKaplay.pos(400,-5),
        juegoKaplay.sprite("casa2"),
        juegoKaplay.scale(0.8),
        juegoKaplay.health(3),
        juegoKaplay.area(),
        "casa",
        { z: 1 } // Asegura que el jugador esté en una capa superior
      ]);
      console.log("El mensaje es: " + aciertos);
      setState(true);
      
      
      ultimo = patronesdinamicos();

    }else if(aciertos==3){
      const casa3 = juegoKaplay.add([
        juegoKaplay.pos(400,-5),
        juegoKaplay.sprite("casa3"),
        juegoKaplay.scale(0.8),
        juegoKaplay.health(3),
        juegoKaplay.area(),
        "casa",
        { z: 1 } // Asegura que el jugador esté en una capa superior
      ]);
      console.log("El mensaje es: " + aciertos);
      //patronesdinamicos().clear;
      
      
      
      ultimo = patronesdinamicos();

    }
  };


  function limpiarNotas() {
    
    spritesNotas = juegoKaplay.get("notas");
    console.log(spritesNotas);
    spritesNotas.forEach((spritesNotas:any)=>{
      spritesNotas.destroy();
    })
    puntoPartida = window.innerWidth/3
    puntoPartidaY= window.innerHeight/2
  }

  function patronesdinamicos() {
    // Limpia los sprites de notas anteriores
    limpiarNotas();

    const patrones = [
      [0, 1, 2, 0, 1, 2, 0, 1, 2,],
      [0, 2, 0, 2, 0, 2, 0, 2, 0,],
      [0, 0, 0, 1, 1, 1, 2, 2, 2,],
      [1, 2, 0, 1, 2, 0, 1, 2, 0,],
      [2, 1, 0, 2, 1, 0, 2, 1, 0,],
      [0, 0, 1, 1, 0, 0, 1, 1, 0,],
    ];

    let delay = 500; // Inicializar el retraso
    const numeros = generarNumerosAzar();
    console.log(numeros);
    console.log(patrones[numeros[0]]);
    const ultimo = patrones[numeros[0]][patrones[numeros[0]].length - 1];
    patrones[numeros[0]] = patrones[numeros[0]].slice(0, -1);

    // Iterar sobre el patrón seleccionado
    patrones[numeros[0]].forEach((numeroAzar: number) => {
      setTimeout(() => {
        

        switch (numeroAzar) {
          case 0:
            nuevoSprite = juegoKaplay.add([
              juegoKaplay.pos(
                puntoPartida,
                juegoKaplay.center().y / 2 + puntoPartidaY
              ),
              juegoKaplay.sprite("notas"),
              juegoKaplay.scale(0.1),
              { z: 2 },
              "notas"
            ]);
            nuevoSprite.frame = 1;
            puntoPartida += 70;
            juegoKaplay.play("A0", { volume: 1, speed: 1.5, loop: false });
            break;

          case 1:
            nuevoSprite = juegoKaplay.add([
              juegoKaplay.pos(
                puntoPartida,
                juegoKaplay.center().y / 2 + puntoPartidaY
              ),
              juegoKaplay.sprite("notas"),
              juegoKaplay.scale(0.1),
              { z: 2 },
              "notas"
            ]);
            nuevoSprite.frame = 0;
            puntoPartida += 70;
            juegoKaplay.play("A1", { volume: 1, speed: 1.5, loop: false });
            break;

          case 2:
            nuevoSprite = juegoKaplay.add([
              juegoKaplay.pos(
                puntoPartida,
                juegoKaplay.center().y / 2 + puntoPartidaY
              ),
              juegoKaplay.sprite("notas"),
              juegoKaplay.scale(0.1),
              { z: 2 },
              "notas"
            ]);
            nuevoSprite.frame = 2;
            puntoPartida += 70;
            juegoKaplay.play("A2", { volume: 1, speed: 1.5, loop: false });
            break;
        }

        // Agrega el sprite al array para rastrear todos los sprites creados
        if (nuevoSprite) {
          spritesNotas.push(nuevoSprite);
        }
      }, delay);

      delay += 1000; // Incrementar el retraso para el siguiente sprite
    });

    return ultimo; // Retorna el último valor del patrón
  }


        let ultimo = patronesdinamicos();
        

        circle1.onClick( () => {
          juegoKaplay.play("A0", {
            volume: 1, 
            speed: 1.5, 
            loop: false, 
          });
          if(ultimo == 0){

            player.play("right");
            tree.play("bye");
            aciertos++;
            validarAciertos();
            
          }else{
            console.log("Fallaste" +ultimo)
          }
          })
          circle2.onClick( () => {
          juegoKaplay.play("A1", {
            volume: 1, 
            speed: 1.5, 
            loop: false, 
          });
          if(ultimo == 1){

            player.play("right");
            tree.play("bye");
            aciertos++;
            validarAciertos();
            //console.log("El mensaje es: " + aciertos);
           
          }else{
            console.log("Fallaste"+ultimo)
          }
          })

          circle3.onClick( () => {
          juegoKaplay.play("A2", {
            volume: 1, 
            speed: 1.5, 
            loop: false, 
          });
          if(ultimo == 2){

            player.play("right");
            tree.play("bye");
            aciertos++;
            validarAciertos();
            //console.log("El mensaje es: " + aciertos);
            
          }else{
            console.log("Fallaste"+ultimo)
          }
          })

         

          player.onDeath(() => {
            juegoKaplay.destroy(player);
          });

          
        
        }
        
        
          ).catch(
            ((error:any) => {
              console.log("lerolerolero")
            })
          )   
  
  
        }) //Fin - Onload()
       
  
}
  
    //return <canvas id="game" style={{ width: "100vw", height: "100vh" }} />;;
    
  


