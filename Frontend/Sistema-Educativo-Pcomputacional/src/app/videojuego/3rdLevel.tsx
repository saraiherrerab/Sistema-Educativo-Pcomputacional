import { GameObj, KAPLAYCtx } from "kaplay";
import generarEsquemaMapa from "../../MapsGenerator";

export function Nivel3(juegoKaplay:KAPLAYCtx<{},never>) {

        const SCREEN_RESOLUTION_X: number = window.innerWidth 
        const SCREEN_RESOLUTION_Y: number = window.innerHeight 
        const TILED_MAP__WIDTH_NUMBER: number = 20
        const TILED_MAP_HEIGHT_NUMBER: number = 15
        const TILED_WIDTH: number = SCREEN_RESOLUTION_X / TILED_MAP__WIDTH_NUMBER
        const TILED_HEIGHT: number = SCREEN_RESOLUTION_Y / TILED_MAP_HEIGHT_NUMBER

        const ORIGINAL_GAME_SCREEN_X: number = TILED_MAP__WIDTH_NUMBER * 32
        const ORIGINAL_GAME_SCREEN_Y: number =TILED_MAP_HEIGHT_NUMBER * 32

        console.log("Comenzando a generar nivel 2")
        console.log(juegoKaplay.get("*"))

        let lives = 3

  
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
  
        juegoKaplay.loadSprite("enemigo", "sprites/TNT_Blue (1).png", {
          sliceX: 7,
          sliceY: 3,
          anims: {
            left_a: { from: 20, to: 14, loop: false },
            right_a: { from: 7, to: 13, loop: false },
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
  

  
        juegoKaplay.loadSprite("heart", "sprites/heart.png", {
          sliceX: 1,
          sliceY: 1,
        });

        juegoKaplay.loadSprite("cartel", "sprites/cartel.jpeg", {
          sliceX: 1,
          sliceY: 1,
        });
  


        // Cargar sprites adicionales
        ["up", "down", "left", "right"].forEach((dir) => {
          juegoKaplay.loadSprite(dir, `sprites/${dir}-arrow.png`);
        });
  
        juegoKaplay.loadSprite("redbox", "red-border-box.png");
        
  
        juegoKaplay.onLoad(async () => {

            generarEsquemaMapa(
                juegoKaplay,
                {
                  nameFolder: "nivel3",
                  nameFile: "nivel3.png",
                  tileWidth: TILED_WIDTH,
                  tileHeight: TILED_HEIGHT,
                  pos: juegoKaplay.vec2(0, 0),
                },
                `./nivel3/nivel3.json`,
                [
                  {
                    urlTextura: "./nivel1/Water.png",
                    dimensionTexturasX: 2,
                    dimensionTexturasY: 2,
                    firstgid: 1
                  },
                  {
                    urlTextura: "./nivel1/Tilemap_Flat.png",
                    dimensionTexturasX: 20,
                    dimensionTexturasY: 8,
                    firstgid: 5
                  },
                  {
                    urlTextura: "./nivel1/Tilemap_Flat.png",
                    dimensionTexturasX: 20,
                    dimensionTexturasY: 8,
                    firstgid: 5
                  },
                  {
                    urlTextura: "./nivel1/Bridge_All.png",
                    dimensionTexturasX: 6,
                    dimensionTexturasY: 8,
                    firstgid: 165
                  },
                  {
                    urlTextura: "./nivel1/Rocks_01.png",
                    dimensionTexturasX: 32,
                    dimensionTexturasY: 4,
                    firstgid: 213
                  },
                ]
              ).then(
                (resultado: any) => {
                  
                  console.log("Resultado de generar nivel 2")
                  console.log(juegoKaplay.get("*"))
                  console.log(juegoKaplay.get("player"))

                  const player = juegoKaplay.get("player")[0]
                  const enemigo = juegoKaplay.get("enemy")[0]
                  const arbol = juegoKaplay.get("arbol")[0]
                  const cartel = juegoKaplay.get("cartel")[0]
                  

                  console.log(player)
                  console.log(enemigo)
                  console.log(juegoKaplay.get("enemy"))
                  console.log(arbol)
                  console.log(cartel)
                  console.log(enemigo.pos.x)
                  console.log(enemigo.pos.y)

                  const enemigos = juegoKaplay.get("enemy")
                  const arboles= juegoKaplay.get("arbol")
                  
                  arboles.forEach( (arbol: GameObj<any>) => {
                    arbol.play("quiet");
                  })

                  enemigos.forEach( (enemigo: GameObj<any>) => {

                    let squareDer = juegoKaplay.add([
                      juegoKaplay.pos(enemigo.pos.x + (TILED_WIDTH / 2),enemigo.pos.y - (TILED_HEIGHT / 2)),
                      juegoKaplay.scale(1),
                      juegoKaplay.area({shape: new juegoKaplay.Rect(juegoKaplay.vec2(0,0), TILED_WIDTH, TILED_HEIGHT), // Rectángulo más pequeño
                      }),
                      "square",
                      { z: 2 } // Asegura que el jugador esté en una capa superior
                    ]);
  
                    let squareIzq = juegoKaplay.add([
                      juegoKaplay.pos(enemigo.pos.x - 3*(TILED_WIDTH / 2),enemigo.pos.y - (TILED_HEIGHT / 2)),
                      juegoKaplay.scale(1),
                      juegoKaplay.area({shape: new juegoKaplay.Rect(juegoKaplay.vec2(0,0), TILED_WIDTH, TILED_HEIGHT), // Rectángulo más pequeño
                      }),
                      "square",
                      { z: 2 } // Asegura que el jugador esté en una capa superior
                    ]);

                    
  
                    squareDer.onCollide("player", (jugador: any) => {
                      setTimeout(() => {
                        jugador.hurt(1);
                        lives--;
                        juegoKaplay.debug.log("¡ouch!");
                        enemigo.play("right_a");
                        jugador.move(4875, 0);
                        juegoKaplay.debug.log("Han pasado dos segundos");
                      }, 100); // Espera 2000 milisegundos (2 segundos)
                    });
  
                    squareIzq.onCollide("player", (jugador: any) => {
                      setTimeout(() => {
                        jugador.hurt(1);
                        lives--;
                        juegoKaplay.debug.log("¡ouch!");
                        enemigo.play("right_a");
                        jugador.move(-4875, 0);
                        juegoKaplay.debug.log("Han pasado dos segundos");
                      }, 100); // Espera 2000 milisegundos (2 segundos)
                    });
                  })
                  
                  enemigo.onCollide("player", (jugador: any) => {
                    setTimeout(() => {
                      jugador.hurt(1);
                      lives--;
                      juegoKaplay.debug.log("¡ouch!");
                      enemigo.play("right_a");
                      jugador.move(9750, 0);
                      juegoKaplay.debug.log("Han pasado dos segundos");
                    }, 100); // Espera 2000 milisegundos (2 segundos)
                  });
                  
                  const redRoom = juegoKaplay.add([
                    juegoKaplay.rect(200, 500),
                    juegoKaplay.area(),
                    juegoKaplay.color(255, 0, 0),
                    juegoKaplay.pos(1920 - 200,juegoKaplay.center().y - 250),
                    "redRoom",
                    { z: 10 } // Asegura que el jugador esté en una capa superior
                  ])

                  
    
                  const live1 = juegoKaplay.add([
                    juegoKaplay.pos(1210,20),
                    juegoKaplay.sprite("heart"),
                    juegoKaplay.scale(2),
                    juegoKaplay.area({shape: new juegoKaplay.Rect(juegoKaplay.vec2( 10,5), 15, 20), // Rectángulo más pequeño
                    }),
                    "heart1",
                    { z: 10 } // Asegura que el jugador esté en una capa superior
                  ]);
    
                  const live2 = juegoKaplay.add([
                    juegoKaplay.pos(1270,20),
                    juegoKaplay.sprite("heart"),
                    juegoKaplay.scale(2),
                    juegoKaplay.area({shape: new juegoKaplay.Rect(juegoKaplay.vec2( 10,5), 15, 20), // Rectángulo más pequeño
                    }),
                    "heart2",
                    { z: 10 } // Asegura que el jugador esté en una capa superior
                  ]);
         
                  const live3 = juegoKaplay.add([
                    juegoKaplay.pos(1330,20),
                    juegoKaplay.sprite("heart"),
                    juegoKaplay.scale(2),
                    juegoKaplay.area({shape: new juegoKaplay.Rect(juegoKaplay.vec2( 10,5), 15, 20), // Rectángulo más pequeño
                    }),

                    "heart3",
                    { z: 10 } // Asegura que el jugador esté en una capa superior
                  ]);
    
                  // Flechas
                  const arrows = {
                    up: juegoKaplay.add([
                      juegoKaplay.pos(juegoKaplay.center().x+570,SCREEN_RESOLUTION_Y - 480 ),
                      juegoKaplay.sprite("up"),
                      juegoKaplay.scale(4),
                      juegoKaplay.area(),
                      { z: 1 } // Asegura que el jugador esté en una capa superior
                    ]),
                    down: juegoKaplay.add([
                      juegoKaplay.pos(juegoKaplay.center().x+558,SCREEN_RESOLUTION_Y - 360 ),
                      juegoKaplay.sprite("down"),
                      juegoKaplay.scale(4),
                      juegoKaplay.area(),
                      { z: 1 } // Asegura que el jugador esté en una capa superior
                    ]),
                    left: juegoKaplay.add([
                      juegoKaplay.pos(juegoKaplay.center().x+510,SCREEN_RESOLUTION_Y - 430 ),
                      juegoKaplay.sprite("left"),
                      juegoKaplay.scale(4),
                      juegoKaplay.area(),
                      { z: 1 } // Asegura que el jugador esté en una capa superior
                    ]),
                    right: juegoKaplay.add([
                      juegoKaplay.pos(juegoKaplay.center().x+620,SCREEN_RESOLUTION_Y - 430 ),
                      juegoKaplay.sprite("right"),
                      juegoKaplay.scale(4),
                      juegoKaplay.area(),
                      { z: 1 } // Asegura que el jugador esté en una capa superior
                    ]),
                  };
    
                  const velocidad = 64;
    
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
                    player.moveBy(juegoKaplay.vec2(0,-velocidad*0.7 ));
                    //calcularMovimientoPersonaje(player)
                    player.play("up");
                  });
                  arrows.down.onClick(() => {
                    player.moveBy(juegoKaplay.vec2(0,velocidad*0.7));
                    player.play("down");
                  });
                  arrows.left.onClick(() => {
                    player.moveBy(juegoKaplay.vec2(-velocidad*1.1 ,0));
                    player.play("left");
                  });
                  arrows.right.onClick(() => {
                    player.moveBy(juegoKaplay.vec2(velocidad*1.1,0));
                    player.play("right");
                  });
    
                  enemigo.play("quiet")
    
                  // Colisión con el enemigo
                  enemigo.onCollide("player", (jugador: any) => {
                    setTimeout(() => {
                      jugador.hurt(1);
                      juegoKaplay.debug.log("¡ouch!");
                      lives--;
                      juegoKaplay.debug.log("Han pasado dos segundos");
                    }, 100); // Espera 2000 milisegundos (2 segundos)
                  });
                  /*
                  square.onCollide("player", (jugador: any) => {
                    setTimeout(() => {
                      jugador.hurt(1);
                      lives--;
                      juegoKaplay.debug.log("¡ouch!");
                      enemy.play("right_a");
                      jugador.move(6500, 0);
                      juegoKaplay.debug.log("Han pasado dos segundos");
                    }, 100); // Espera 2000 milisegundos (2 segundos)
                  });
    
                  square1.onCollide("player", (jugador: any) => {
                    setTimeout(() => {
                      jugador.hurt(1);
                      juegoKaplay.debug.log("¡ouch!");
                      enemy.play("left_a");
                      jugador.move(-6500, 0);
                      lives--;
                      juegoKaplay.debug.log("Han pasado dos segundos");
                    }, 100);
                  });
                  */
                  // Intentando eliminar las vidas
                  juegoKaplay.onUpdate(()=>{
                    if (lives<3){
                      juegoKaplay.destroy(live1);
                    }else if(lives<2){
                      juegoKaplay.destroy(live2);
                    }else if(lives<1){
                      juegoKaplay.destroy(live3);
                    };
                  })
    
    
    
                  player.onDeath(() => {
                    juegoKaplay.destroy(player);
                  });
                  
                  console.log("IMPRIMIENDO COORDENADAS DE BORDE")
                  console.log({
                    1: {x: redRoom.pos.x, y: 0},
                    2: {x: redRoom.pos.x + redRoom.width, y: 0},
                    3: {x:0,y:redRoom.pos.y + redRoom.height},
                    4: {x: redRoom.pos.x + redRoom.width, y: redRoom.pos.y + redRoom.height}
                  })
    
                  console.log("IMPRIMIENDO COORDENADAS DE JUGADOR")
                  console.log({
                    1: {x: player.pos.x, y: 0},
                    2: {x: player.pos.x + player.width, y: 0},
                    3: {x:0,y:player.pos.y + player.height},
                    4: {x: player.pos.x + player.width, y: player.pos.y + player.height}
                  })
                  
                  player.onCollide("redRoom", (redRoom:any) => {
                    console.log("SIGUIENTE NIVEl")
                    
                    juegoKaplay.tween(
                      juegoKaplay.camPos().x, 
                          redRoom.pos.x + redRoom.width + 1920/ 2, 
                          1, 
                          (value:any) => juegoKaplay.camPos(value, juegoKaplay.camPos().y), 
                          juegoKaplay.easings.linear
                    )
                    
                  })
    
                }
              ).catch(
                ((error:any) => {
                  console.log(error)
                })
              )
  
  
        }) //Fin - Onload()

  }