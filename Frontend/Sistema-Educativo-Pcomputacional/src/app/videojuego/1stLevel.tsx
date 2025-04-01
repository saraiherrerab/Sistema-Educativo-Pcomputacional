import {KAPLAYCtx} from "kaplay";
import generarEsquemaMapa from "../../MapsGenerator";
import generarNumerosAzar from "../../utils/generarNumerosAzar";

export let cambioNivel = 0;


export function Nivel1(juegoKaplay:KAPLAYCtx<{},never>) {
  const SCREEN_RESOLUTION_X: number = window.innerWidth 
  const SCREEN_RESOLUTION_Y: number = window.innerHeight 
  const TILED_MAP__WIDTH_NUMBER: number = 21
  const TILED_MAP_HEIGHT_NUMBER: number = 16
  const TILED_WIDTH: number = SCREEN_RESOLUTION_X / TILED_MAP__WIDTH_NUMBER
  const TILED_HEIGHT: number = SCREEN_RESOLUTION_Y / TILED_MAP_HEIGHT_NUMBER
    // Referencia persistente para almacenar la instancia de Kaplay
    console.log(juegoKaplay)
    
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

    juegoKaplay.loadSprite("notas", "nivel2/notas_musicales.png", {
      sliceX: 3,
      sliceY: 1
    });
  
    juegoKaplay.loadSprite("notas_circulo", "nivel2/notas_musicales_con_circulo.png", {
      sliceX: 3,
      sliceY: 1
    });

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


      generarEsquemaMapa(
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

          const player = juegoKaplay.get("player")[0]

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
        const puntoPartidaY:number = window.innerHeight/2

        const patrones = [
          [0, 1, 2, 0, 1, 2, 0, 1, 2], //0 
          [2, 2, 1, 1, 0, 0, 2, 2, 1], //1
          [0, 0, 0, 1, 1, 1, 2, 2, 2], //2
          [1, 2, 0, 1, 2, 0, 1, 2, 0], //3
          [2, 1, 0, 2, 1, 0, 2, 1, 0], //4
          [0, 0, 1, 1, 0, 0, 1, 1, 0] //5
        ];

        let delay = 1000; // Inicializar el retraso
        const numeros = generarNumerosAzar();
        console.log(numeros)
        console.log(patrones[numeros[0]])
        const ultimo = patrones[numeros[0]][patrones[numeros[0]].length - 1];
        patrones[numeros[0]] = patrones[numeros[0]].slice(0, -1);
        //let cancion = numeros[0]
        patrones[numeros[0]].forEach((numeroAzar: number) => {
          console.log("Estudiando el número:", numeroAzar  )
          console.log(`Ubicando en x:${puntoPartida} y:${((juegoKaplay.center().y) / 2 ) + puntoPartidaY}` )
          setTimeout(() => {
            switch(numeroAzar){
              case 0:
                const semicorchea = juegoKaplay.add([
                  juegoKaplay.pos(puntoPartida,((juegoKaplay.center().y / 2 )) + puntoPartidaY),
                  juegoKaplay.sprite("notas"),
                  juegoKaplay.scale(0.1),
                  { z: 2 }, // Asegura que el jugador esté en una capa superior,
                ])
                semicorchea.frame = 0
                puntoPartida = puntoPartida + 70
                juegoKaplay.play("A0", {
                volume: 1, 
                speed: 1, 
                loop: false, 
              });
                
              break;
              case 1:
                const semicorchea2 = juegoKaplay.add([
                  juegoKaplay.pos( puntoPartida ,((juegoKaplay.center().y) / 2 ) + puntoPartidaY),
                  juegoKaplay.sprite("notas"),
                  juegoKaplay.scale(0.1),
                  { z: 2 } // Asegura que el jugador esté en una capa superior
                ])
                semicorchea2.frame = 1
                puntoPartida = puntoPartida + 70
                juegoKaplay.play("A1", {
                  volume: 1, 
                  speed: 1, 
                  loop: false, 
                });
                break;

              case 2:
                const semicorchea3 = juegoKaplay.add([
                  juegoKaplay.pos(puntoPartida ,((juegoKaplay.center().y) / 2 ) + puntoPartidaY),
                  juegoKaplay.sprite("notas"),
                  juegoKaplay.scale(0.1),
                  { z: 2 } // Asegura que el jugador esté en una capa superior
                ])

                semicorchea3.frame = 2
                puntoPartida = puntoPartida + 70

                juegoKaplay.play("A2", {
                  volume: 1, 
                  speed: 1, 
                  loop: false, 
                });
                
              break;
            }
          }, delay); // Retrasar la reproducción según el valor de 'delay'
          delay += 1000; // Incrementar el retraso para el siguiente sonido (ajusta el valor según sea necesario)
        });
        

        circle1.onClick( () => {
          juegoKaplay.play("A0", {
            volume: 1, 
            speed: 1, 
            loop: false, 
          });
          if(ultimo === 1){
            console.log("Ganaste")
          }else{
            console.log("Fallaste")
          }
          })
          circle2.onClick( () => {
          juegoKaplay.play("A1", {
            volume: 1, 
            speed: 1, 
            loop: false, 
          });
          if(ultimo === 0){
            console.log("Ganaste")
          }else{
            console.log("Fallaste")
          }
          })

          circle3.onClick( () => {
          juegoKaplay.play("A2", {
            volume: 1, 
            speed: 1, 
            loop: false, 
          });
          if(ultimo === 2){
            console.log("Ganaste")
          }else{
            console.log("Fallaste")
          }
          })


          player.onDeath(() => {
            juegoKaplay.destroy(player);
          });
        
        }
          ).catch(
            ((error:any) => {
              console.log(error)
            })
          )   
  
  
        }) //Fin - Onload()
  
    //return <canvas id="game" style={{ width: "100vw", height: "100vh" }} />;;
  }


