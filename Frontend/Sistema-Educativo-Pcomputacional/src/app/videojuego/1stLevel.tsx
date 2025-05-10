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

interface NotasEstudiante {
  id_estudiante: number;
  eficiencia_algoritmica: number;
  reconocimiento_patrones: string;
  identificacion_errores: string;
  abstraccion: string;
  asociacion: string;
  construccion_algoritmos: string;
  p_actividades_completadas: number;
  tipo_premiacion: string; // o string[], si es un arreglo
}


export function Nivel1(juegoKaplay:KAPLAYCtx<{},never>, setState:any, cambiarGanar:any,setStateA:any, cambiarGanarA:any,setState1:any, cambiarGanar1:any, Router:any, usuario: any) {

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

    juegoKaplay.loadSprite("notas", "nivel2/notas_musicales.png", {
      sliceX: 3,
      sliceY: 1
    });
  
    juegoKaplay.loadSprite("notas_circulo", "nivel2/notas_musicales_con_circulo.png", {
      sliceX: 3,
      sliceY: 1
    });

    const cargarEvaluacionEstudiante = async (datos: NotasEstudiante) => {
      try {
        const response = await fetch('http://localhost:5555/estudiantes/establecer/notas', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            // CORS: solo es necesario en el servidor, pero puedes incluir el header Origin si necesario
          },
          body: JSON.stringify(datos),
          mode: 'cors', // Habilita CORS
        });

        const result = await response.json();
        console.log(result);
      } catch (error) {
        console.error("Error al actualizar las notas:", error);
      }
    }

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

        console.log(usuario)

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

       
        (resultado: any) => {

          cambiarGanar1(true);
          setState1(true);
          setTimeout(() => {
            setState1(false);
          }, 10000); 

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

          const velocidad = 440;

          const circle1 = juegoKaplay.add([
            juegoKaplay.pos(juegoKaplay.center().x - juegoKaplay.center().x / 4 -30, juegoKaplay.center().y + juegoKaplay.center().y / 2 + juegoKaplay.center().y / 6),
            juegoKaplay.sprite("notas_circulo", {frame: 0}),
            juegoKaplay.area(),
            juegoKaplay.scale(0.20),
            { z: 1},// Asegura que el jugador esté en una capa superior,
          ])
  
          const circle2 = juegoKaplay.add([
          juegoKaplay.pos(juegoKaplay.center().x -30, juegoKaplay.center().y + juegoKaplay.center().y / 2 + juegoKaplay.center().y / 6),
          juegoKaplay.sprite("notas_circulo", {frame: 1}),
          juegoKaplay.area(),
          juegoKaplay.scale(0.20),
          { z: 1},// Asegura que el jugador esté en una capa superior,
          ])
  
          const circle3 = juegoKaplay.add([
          juegoKaplay.pos(juegoKaplay.center().x + juegoKaplay.center().x / 4 -30, juegoKaplay.center().y + juegoKaplay.center().y / 2 + juegoKaplay.center().y / 6),
          juegoKaplay.sprite("notas_circulo", {frame: 2}),
          juegoKaplay.area(),
          juegoKaplay.scale(0.20),
          { z: 1},// Asegura que el jugador esté en una capa superior,
          ])
  
          let puntoPartida: number = window.innerWidth/3
          let puntoPartidaY:number = window.innerHeight/2

          // Array para almacenar los sprites de notas creados
          let spritesNotas: GameObj[] = []; // Asegúrate de usar el tipo correcto para los sprites en Kaboom.js
  
          async function validarAciertos(){
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

              if(usuario.rol === "ESTUDIANTE"){

                const obtenerDatosUsuario = async (estudiante_seleccionado: number) => {
    
                  const datosEstudiante = await fetch("http://localhost:5555/estudiantes/" + estudiante_seleccionado)
                  const resultadoConsulta = await datosEstudiante.json()
                  console.log(resultadoConsulta)

                  return resultadoConsulta

                };

                const datosEstudiante = await obtenerDatosUsuario(usuario.id_usuario)

                console.log(datosEstudiante)
                
                const datosUsuario: NotasEstudiante = {
                  id_estudiante: datosEstudiante.id_usuario,
                  eficiencia_algoritmica: datosEstudiante.eficiencia_algoritmica,
                  reconocimiento_patrones: "EN PROCESO",
                  identificacion_errores: datosEstudiante.identificacion_errores,
                  abstraccion: datosEstudiante.abstraccion,
                  asociacion: datosEstudiante.asociacion,
                  construccion_algoritmos: datosEstudiante.construccion_algoritmos,
                  p_actividades_completadas: datosEstudiante.p_actividades_completadas,
                  tipo_premiacion: datosEstudiante.tipo_premiacion // o string[], si es un arreglo
                }

                const respuestaEvaluacion = await cargarEvaluacionEstudiante(datosUsuario)
                console.log(respuestaEvaluacion)
              
              }else{
                console.log("GANO PERO NO ES ESTUDIANTE")
              }
            
              colisiones.forEach( (colision: GameObj<any>) => { 
                colision.destroy();
              })
                      
              const esperar = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
              await esperar(5000); // espera 5 segundos
              setStateA(false);
              //window.location.href = window.location.href

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
        
          function patronesdinamicos(patrones: number[][] = [
              [0, 1, 2, 0, 1, 2, 0, 1, 2],
              [0, 2, 0, 2, 0, 2, 0, 2, 0],
              [0, 0, 0, 1, 1, 1, 2, 2, 2],
              [1, 2, 0, 1, 2, 0, 1, 2, 0],
              [2, 1, 0, 2, 1, 0, 2, 1, 0],
              [0, 0, 1, 1, 0, 0, 1, 1, 0],
            ], ultimoPatron?: number) {

              limpiarNotas();

              

              const indicesDisponibles = patrones
              .map((_, idx) => idx)
              .filter((idx) => idx !== ultimoPatron);

            // Elegir un índice aleatorio diferente al último
            const nuevoIndice = indicesDisponibles[Math.floor(Math.random() * indicesDisponibles.length)];
            const patron = patrones[nuevoIndice];
            const secuencia = patron.slice(0, -1);

            if(!ultimoPatron){
                console.log("REPRODUCIENDO PRIMER PATRON")
                console.log(patron)
              }else{
                console.log("REPRODUCIENDO PROXIMO PATRON PATRON")
                console.log(patron)
              }
          
            const numeros = generarNumerosAzar();
            const ultimo = patron[patron.length - 1];
            /*
            const patron = patrones[numeros[0]];
            const ultimo = patron[patron.length - 1];
            const secuencia = patron.slice(0, -1);
            */
            let delay = esPrimeraRonda ? 5000 : 350; // 10s la primera vez, luego normal
            esPrimeraRonda = false; // Marcar como no primera ronda
          
            secuencia.forEach((numeroAzar: number) => {
              setTimeout(() => {
                switch (numeroAzar) {
                  case 0:
                    nuevoSprite = juegoKaplay.add([
                      juegoKaplay.pos(puntoPartida, juegoKaplay.center().y / 2 + puntoPartidaY - 80),
                      juegoKaplay.sprite("notas"),
                      juegoKaplay.scale(0.1),
                      { z: 2 },
                      "notas"
                    ]);
                    nuevoSprite.frame = 1;
                    juegoKaplay.play("A0", { volume: 1, speed: 1.5, loop: false });
                    break;
                  case 1:
                    nuevoSprite = juegoKaplay.add([
                      juegoKaplay.pos(puntoPartida, juegoKaplay.center().y / 2 + puntoPartidaY - 80),
                      juegoKaplay.sprite("notas"),
                      juegoKaplay.scale(0.1),
                      { z: 2 },
                      "notas"
                    ]);
                    nuevoSprite.frame = 0;
                    juegoKaplay.play("A1", { volume: 1, speed: 1.5, loop: false });
                    break;
                  case 2:
                    nuevoSprite = juegoKaplay.add([
                      juegoKaplay.pos(puntoPartida, juegoKaplay.center().y / 2 + puntoPartidaY - 80),
                      juegoKaplay.sprite("notas"),
                      juegoKaplay.scale(0.1),
                      { z: 2 },
                      "notas"
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
          
            return [ultimo, (ultimoPatron) ? nuevoIndice : -1 ];
          }

          const patronesJuego = [
          [0, 1, 2, 0, 1, 2, 0, 1, 2],
          [0, 2, 0, 2, 0, 2, 0, 2, 0],
          [0, 0, 0, 1, 1, 1, 2, 2, 2],
          [1, 2, 0, 1, 2, 0, 1, 2, 0],
          [2, 1, 0, 2, 1, 0, 2, 1, 0],
          [0, 0, 1, 1, 0, 0, 1, 1, 0],
          ]
  
          let ultimo = patronesdinamicos(patronesJuego);

          circle1.onClick( () => {
            juegoKaplay.play("A0", {
              volume: 1, 
              speed: 1.5, 
              loop: false, 
            });
            if(ultimo[0] == 0){
  
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
              const ultimoIndice = ultimo[1]
              ultimo = patronesdinamicos(patronesJuego,ultimoIndice);
              setTimeout(() => {
                setState(false);
              }, 2000); 
            }
          })

          circle2.onClick( () => {
          juegoKaplay.play("A1", {
            volume: 1, 
            speed: 1.5, 
            loop: false, 
          });
          if(ultimo[0] == 1){

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
            const ultimoIndice = ultimo[1]
            ultimo = patronesdinamicos(patronesJuego,ultimoIndice);
            setTimeout(() => {
              setState(false);
            }, 2000); 
          }
          })

          circle3.onClick( () => {
          juegoKaplay.play("A2", {
            volume: 1, 
            speed: 1.5, 
            loop: false, 
          });
          if(ultimo[0] == 2){

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
            const ultimoIndice = ultimo[1]
            ultimo = patronesdinamicos(patronesJuego,ultimoIndice);
            setTimeout(() => {
              setState(false);
            }, 2000); 
          }
          })
  
           
  
            
  
            
          
          }
          
          
        ).catch(
              ((error:any) => {
                console.log("lerolerolero")
              })
        )   
    
    
      }) //Fin - Onload()
         
    
  }
    
      //return <canvas id="game" style={{ width: "100vw", height: "100vh" }} />;;
      
    