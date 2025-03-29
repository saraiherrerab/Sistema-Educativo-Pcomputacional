import { KAPLAYCtx } from "kaplay";
import generarEsquemaMapa from "./MapsGenerator";

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
                  tileWidth: TILED_WIDTH,
                  tileHeight: TILED_HEIGHT,
                  pos: juegoKaplay.vec2(0, 0),
                },
                `./nivel2/prueba2.json`,
                [
                  {
                    urlTextura: "./nivel2/Water.png",
                    dimensionTexturasX: 2,
                    dimensionTexturasY: 2,
                    firstgid: 1
                  },
                  {
                    urlTextura: "./nivel2/Tilemap_Flat.png",
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
                    urlTextura: "./nivel2/Tilemap_Flat.png",
                    dimensionTexturasX: 20,
                    dimensionTexturasY: 8,
                    firstgid: 5
                  }
                ]
              )
            .then(
                (resultado: any) => {
                // Jugador
    
                const player = juegoKaplay.add([
                    juegoKaplay.pos(1300,50 ),
                    juegoKaplay.sprite("knight"),
                    juegoKaplay.scale(2),
                    juegoKaplay.body(),
                    juegoKaplay.area({shape: new juegoKaplay.Rect(juegoKaplay.vec2( 30,20 ), 60, 60), // Rectángulo más pequeño
                    }),
                    juegoKaplay.health(3),
                    "player",
                    { z: 1 } // Asegura que el jugador esté en una capa superior
                ]);
    
                const live1 = juegoKaplay.add([
                    juegoKaplay.pos(220,20),
                    juegoKaplay.sprite("heart"),
                    juegoKaplay.scale(4),
                    juegoKaplay.area({shape: new juegoKaplay.Rect(juegoKaplay.vec2( 10,5), 15, 20), // Rectángulo más pequeño
                    }),
                    juegoKaplay.body(),
                    "heart1",
                    { z: 1 } // Asegura que el jugador esté en una capa superior
                ]);
    
                const live2 = juegoKaplay.add([
                    juegoKaplay.pos(350,20),
                    juegoKaplay.sprite("heart"),
                    juegoKaplay.scale(4),
                    juegoKaplay.area({shape: new juegoKaplay.Rect(juegoKaplay.vec2( 10,5), 15, 20), // Rectángulo más pequeño
                    }),
                    juegoKaplay.body(),
                    "heart2",
                    { z: 1 } // Asegura que el jugador esté en una capa superior
                ]);
    
                const live3 = juegoKaplay.add([
                    juegoKaplay.pos(480,20),
                    juegoKaplay.sprite("heart"),
                    juegoKaplay.scale(4),
                    juegoKaplay.area({shape: new juegoKaplay.Rect(juegoKaplay.vec2( 10,5), 15, 20), // Rectángulo más pequeño
                    }),
                    juegoKaplay.body(),
                    "heart3",
                    { z: 1 } // Asegura que el jugador esté en una capa superior
                ]);
    
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
    
                juegoKaplay.onCollide("player", "square-colision",(self:any, other:any) => {
                    console.log("Colisión detectada con:");
    
                    console.log(other)
                    if (player.pos.x + player.width * (1920 / ORIGINAL_GAME_SCREEN_X ) >= other.pos.x && 
                    player.pos.x <  other.pos.x && 
                    player.pos.y + player.height *(1080 / ORIGINAL_GAME_SCREEN_Y)>  other.pos.y && 
                    player.pos.y <  other.pos.y + other.height) {
                    console.log("Colisión con el borde izquierdo del objeto");
                    player.move(-100,0)
                    }
                    if (player.pos.x <= other.pos.x + other.width * (1920 / ORIGINAL_GAME_SCREEN_X ) && 
                    player.pos.y + player.width* (1920 / ORIGINAL_GAME_SCREEN_X ) > other.pos.x + other.width* (1920 / ORIGINAL_GAME_SCREEN_Y ) && 
                    player.pos.y + player.height*(1080 / ORIGINAL_GAME_SCREEN_Y) > other.pos.y && 
                    player.pos.y < other.pos.y + other.height*(1080 / ORIGINAL_GAME_SCREEN_Y)) {
                    console.log("Colisión con el borde derecho del objeto");
                    player.move(100,0)
                    }
                    if (player.pos.y + player.height*(1080 / ORIGINAL_GAME_SCREEN_Y) >= other.pos.y && 
                    player.pos.y < other.pos.y && 
                    player.pos.x + player.width* (1920 / ORIGINAL_GAME_SCREEN_X ) > other.pos.x && 
                    player.pos.x < other.pos.x + other.width* (1920 / ORIGINAL_GAME_SCREEN_X )) {
                    console.log("Colisión con el borde superior del objeto");
                    player.move(0,100)
                    }
                    if (player.pos.y <= other.pos.y + other.height*(1080 / ORIGINAL_GAME_SCREEN_Y) && 
                    player.pos.y + player.height *(1080 / ORIGINAL_GAME_SCREEN_Y)> other.pos.y + other.height*(1080 / ORIGINAL_GAME_SCREEN_Y) && 
                    player.pos.x + player.width* (1920 / ORIGINAL_GAME_SCREEN_X ) > other.pos.x && 
                    player.pos.x < other.pos.x + other.width * (1920 / ORIGINAL_GAME_SCREEN_X )) {
                    console.log("Colisión con el borde inferior del objeto");
                    player.move(0,-100)
                }
                
                
                
                });
    
                //enemy.play("quiet")

                // Intentando eliminar las vidas
                juegoKaplay.onUpdate(()=>{
                    if (lives==2){
                    juegoKaplay.destroy(live1);
                    }else if(lives==1){
                    juegoKaplay.destroy(live2);
                    }else if(lives==0){
                    juegoKaplay.destroy(live3);
                    };
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
  
    return <canvas id="game" style={{ width: "100vw", height: "100vh" }} />;;
  }
/*

  */