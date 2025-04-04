import { KAPLAYCtx } from "kaplay";
import generarEsquemaMapa from "../../MapsGenerator";

const SCREEN_RESOLUTION_X: number = window.innerWidth 
const SCREEN_RESOLUTION_Y: number = window.innerHeight 
const TILED_MAP__WIDTH_NUMBER: number = 21
const TILED_MAP_HEIGHT_NUMBER: number = 16
const TILED_WIDTH: number = SCREEN_RESOLUTION_X / TILED_MAP__WIDTH_NUMBER
const TILED_HEIGHT: number = SCREEN_RESOLUTION_Y / TILED_MAP_HEIGHT_NUMBER

const ORIGINAL_GAME_SCREEN_X: number = TILED_MAP__WIDTH_NUMBER * 32
const ORIGINAL_GAME_SCREEN_Y: number =TILED_MAP_HEIGHT_NUMBER * 32
export function Nivel2(juegoKaplay:KAPLAYCtx<{},never>) {
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

        // Cargar sprites adicionales
        ["up", "down", "left", "right"].forEach((dir) => {
          juegoKaplay.loadSprite(dir, `sprites/${dir}-arrow.png`);
        });
  
        juegoKaplay.loadSprite("redbox", "red-border-box.png");
        
  
        juegoKaplay.onLoad(async () => {
            
            

            const nivelPrincipal = generarEsquemaMapa(
                juegoKaplay,
                {
                  nameFolder: "nivel1",
                  nameFile: "nivel1_mapeo.png",
                  tileWidth: TILED_WIDTH,
                  tileHeight: TILED_HEIGHT,
                  pos: juegoKaplay.vec2(0, 0),
                },
                `./nivel1/nivel1_mapeo.json`,
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
                    urlTextura: "./nivel1/Tilemap_Elevation.png",
                    dimensionTexturasX: 8,
                    dimensionTexturasY: 16,
                    firstgid: 165
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
                    firstgid: 293
                  },
                  {
                    urlTextura: "./nivel1/Rocks_01.png",
                    dimensionTexturasX: 32,
                    dimensionTexturasY: 4,
                    firstgid: 341
                  },
                  {
                    urlTextura: "./nivel1/Rocks_04.png",
                    dimensionTexturasX: 32,
                    dimensionTexturasY: 4,
                    firstgid: 469
                  },
                  {
                    urlTextura: "./nivel1/Foam.png",
                    dimensionTexturasX: 48,
                    dimensionTexturasY: 6,
                    firstgid: 597
                  },
                ]
              ).then(
                (resultado: any) => {
                  console.log(resultado)
                  // Jugador
    
                  const player = juegoKaplay.add([
                    juegoKaplay.pos(1500,-25 ),
                    juegoKaplay.sprite("knight"),
                    juegoKaplay.scale(2),
                    juegoKaplay.body(),
                    juegoKaplay.area({shape: new juegoKaplay.Rect(juegoKaplay.vec2( 30,20 ), 60, 60), // Rectángulo más pequeño
                    }),
                    juegoKaplay.health(3),
                    "player",
                    { z: 10 } // Asegura que el jugador esté en una capa superior
                  ]);
    
                  
                  
    
    
                  const redRoom = juegoKaplay.add([
                    juegoKaplay.rect(200, 500),
                    juegoKaplay.area(),
                    juegoKaplay.color(255, 0, 0),
                    juegoKaplay.pos(1920 - 200,juegoKaplay.center().y - 250),
                    "redRoom",
                    { z: 10 } // Asegura que el jugador esté en una capa superior
                  ])
    
                  // Enemigo
                  const enemy = juegoKaplay.add([
                    juegoKaplay.pos(1000,-110),
                    juegoKaplay.sprite("enemy"),
                    juegoKaplay.scale(2),
                    juegoKaplay.area({shape: new juegoKaplay.Rect(juegoKaplay.vec2( 50,80), 70, 40), // Rectángulo más pequeño
                    }),
                    juegoKaplay.body(),
                    "enemy",
                    { z: 10 } // Asegura que el jugador esté en una capa superior
                  ]);
                  
                  // Enemigo zone
                  const square = juegoKaplay.add([
                    juegoKaplay.pos(1090,-110),
                    juegoKaplay.scale(2),
                    juegoKaplay.area({shape: new juegoKaplay.Rect(juegoKaplay.vec2( 50,80), 50, 30), // Rectángulo más pequeño
                    }),
                    "square",
                    { z: 10 } // Asegura que el jugador esté en una capa superior
                  ]);
    
                  // Enemigo zone
                  const square1 = juegoKaplay.add([
                    juegoKaplay.pos(950,-110),
                    juegoKaplay.scale(2),
                    juegoKaplay.area({shape: new juegoKaplay.Rect(juegoKaplay.vec2( 50,80), 50, 30), // Rectángulo más pequeño
                    }),
                    "square",
                    { z: 10 } // Asegura que el jugador esté en una capa superior
                  ]);
    
                  const live1 = juegoKaplay.add([
                    juegoKaplay.pos(220,20),
                    juegoKaplay.sprite("heart"),
                    juegoKaplay.scale(4),
                    juegoKaplay.area({shape: new juegoKaplay.Rect(juegoKaplay.vec2( 10,5), 15, 20), // Rectángulo más pequeño
                    }),
                    juegoKaplay.body(),
                    "heart1",
                    { z: 10 } // Asegura que el jugador esté en una capa superior
                  ]);
    
                  const live2 = juegoKaplay.add([
                    juegoKaplay.pos(350,20),
                    juegoKaplay.sprite("heart"),
                    juegoKaplay.scale(4),
                    juegoKaplay.area({shape: new juegoKaplay.Rect(juegoKaplay.vec2( 10,5), 15, 20), // Rectángulo más pequeño
                    }),
                    juegoKaplay.body(),
                    "heart2",
                    { z: 10 } // Asegura que el jugador esté en una capa superior
                  ]);
    
                  
                  const live3 = juegoKaplay.add([
                    juegoKaplay.pos(480,20),
                    juegoKaplay.sprite("heart"),
                    juegoKaplay.scale(4),
                    juegoKaplay.area({shape: new juegoKaplay.Rect(juegoKaplay.vec2( 10,5), 15, 20), // Rectángulo más pequeño
                    }),
                    juegoKaplay.body(),
                    "heart3",
                    { z: 10 } // Asegura que el jugador esté en una capa superior
                  ]);
    
                  //Scarecrow
                  const scarecrow = juegoKaplay.add([
                    juegoKaplay.pos(juegoKaplay.center()),
                    juegoKaplay.sprite("scarecrow"),
                    juegoKaplay.scale(2),
                    juegoKaplay.area(),
                    juegoKaplay.body(),
                    "scarecrow",
                    { z: 10 } // Asegura que el jugador esté en una capa superior
                  ]);
    
                  // Flechas
                  const arrows = {
                    up: juegoKaplay.add([
                      juegoKaplay.pos(0, (juegoKaplay.center().y)/8),
                      juegoKaplay.sprite("up"),
                      juegoKaplay.scale(2),
                      juegoKaplay.area(),
                      { z: 10 } // Asegura que el jugador esté en una capa superior
                    ]),
                    down: juegoKaplay.add([
                      juegoKaplay.pos(0 ,(juegoKaplay.center().y)/4),
                      juegoKaplay.sprite("down"),
                      juegoKaplay.scale(2),
                      juegoKaplay.area(),
                      { z: 10 } // Asegura que el jugador esté en una capa superior
                    ]),
                    left: juegoKaplay.add([
                      juegoKaplay.pos(0,(juegoKaplay.center().y)/2),
                      juegoKaplay.sprite("left"),
                      juegoKaplay.scale(2),
                      juegoKaplay.area(),
                      { z: 10 } // Asegura que el jugador esté en una capa superior
                    ]),
                    right: juegoKaplay.add([
                      juegoKaplay.pos(0,(juegoKaplay.center().y)),
                      juegoKaplay.sprite("right"),
                      juegoKaplay.scale(2),
                      juegoKaplay.area(),
                      { z: 10 } // Asegura que el jugador esté en una capa superior
                    ]),
                  };
    
                  const velocidad = 1500;
    
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
    
                  enemy.play("quiet")
    
                  // Colisión con el enemigo
                  enemy.onCollide("player", (jugador: any) => {
                    setTimeout(() => {
                      jugador.hurt(1);
                      juegoKaplay.debug.log("¡ouch!");
                      lives--;
                      juegoKaplay.debug.log("Han pasado dos segundos");
                    }, 100); // Espera 2000 milisegundos (2 segundos)
                  });
                  // Colisión con zona enemiga
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
    
                  // Colisión con zona enemiga
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
    
                  // Intentando eliminar las vidas
                  juegoKaplay.onUpdate(()=>{
                    if (lives==3){
                      juegoKaplay.destroy(live1);
                    }else if(lives==2){
                      juegoKaplay.destroy(live2);
                    }else if(lives==1){
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
                  /*
                  player.onCollide("blueRoom", (blueRoom:any) => {
                    juegoKaplay.tween(
                      juegoKaplay.camPos().x, 
                          blueRoom.pos.x, 
                          1, 
                          (value:any) => juegoKaplay.camPos(value, juegoKaplay.camPos().y), 
                          juegoKaplay.easings.linear
                    )
                  })
                  */
    
                }
              ).catch(
                ((error:any) => {
                  console.log("Ah vaina simon")
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
  
    //return <canvas id="game" style={{ width: "100vw", height: "100vh" }} />;;
  }
/*

  */