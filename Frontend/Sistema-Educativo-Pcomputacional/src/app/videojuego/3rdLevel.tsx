import { GameObj, KAPLAYCtx } from "kaplay";
import generarEsquemaMapa from "../../MapsGenerator";

export function Nivel3(juegoKaplay:KAPLAYCtx<{},never>, setState3:any, cambiarGanar3:any, setStateA:any, cambiarGanarA:any, Router:any){

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
        let cantidadhongos = 0
        let barraPressed = 0

  
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
  

  
        juegoKaplay.loadSprite("heart1", "sprites/heart.png", {
          sliceX: 1,
          sliceY: 1,
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

        juegoKaplay.loadSprite("hongo", "sprites/deco/hongo.png", {
          sliceX: 1,
          sliceY: 1,
        });

        juegoKaplay.loadSprite("torre", "sprites/buildings/Tower_Blue.png", {
          sliceX: 1,
          sliceY: 1,
        });
      

        juegoKaplay.loadSprite("heart2", "sprites/heart.png", {
          sliceX: 1,
          sliceY: 1,
        });

        juegoKaplay.loadSprite("heart3", "sprites/heart.png", {
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

                  
                    cambiarGanar3(true);
                    setState3(true);

                    
                   
                  
                  setTimeout(() => {
                    setState3(false);
                  }, 10000); 

                  
                  console.log("Resultado de generar nivel 2")
                  console.log(juegoKaplay.get("*"))
                  console.log(juegoKaplay.get("player"))

                  const player = juegoKaplay.get("player")[0]
                  const torre = juegoKaplay.get("torre")[0]
                  const colisionarbol = juegoKaplay.get("colisionarbol")
                  const rock = juegoKaplay.get("rocks")[0]
                  const oveja = juegoKaplay.get("oveja")[0]
                  const hongo = juegoKaplay.get("hongo")[0]
                  const enemigo = juegoKaplay.get("enemy")[0]
                  const arbol = juegoKaplay.get("arbol")[0]
                  const cartel = juegoKaplay.get("cartel")[0]
                  const heart1 = juegoKaplay.get("heart1")[0]
                  const heart2 = juegoKaplay.get("heart2")[0]
                  const heart3 = juegoKaplay.get("heart3")[0]
                  const up = juegoKaplay.get("up")[0]
                  const down = juegoKaplay.get("down")[0]
                  const left = juegoKaplay.get("left")[0]
                  const right = juegoKaplay.get("right")[0]

                  console.log(oveja)
                  console.log(colisionarbol)
                  console.log(hongo)
                  console.log(rock)
                  console.log(up)
                  console.log(down)
                  console.log(left)
                  console.log(right)
                  console.log(heart1)
                  console.log(heart2)
                  console.log(heart3)
                  console.log(player)
                  console.log(enemigo)
                  console.log(juegoKaplay.get("enemy"))
                  console.log(arbol)
                  console.log(torre)
                  console.log(cartel)
                  console.log(enemigo.pos.x)
                  console.log(enemigo.pos.y)
                  oveja.play("quiet");
                  const enemigos = juegoKaplay.get("enemy")
                  const rocks = juegoKaplay.get("rock")
                  const arboles= juegoKaplay.get("arbol")
                  const colisiones = juegoKaplay.get("square-colision")
                  console.log(colisiones)


                  torre.onCollide("player", (jugador: GameObj) => {
                    cambiarGanarA(true); 
                    setStateA(true);
                
                    setTimeout(() => {
                      setStateA(false);
                      window.location.href = window.location.href;
                    }, 5000);
                    
                  })
                  
                  setTimeout(() => {
                    hongo.onCollide("player", (jugador: any) => {
                        cantidadhongos++
                        console.log(cantidadhongos)
                        juegoKaplay.debug.log(cantidadhongos);
                        hongo.destroy();
                    
                    });
                  }, 2000); // Espera 2000 milisegundos (2 segundos)

                  // Movimiento con teclado
                  
                  
                  
                  
                  arboles.forEach( (arbol: GameObj<any>) => {
                    arbol.play("quiet");

                  })
                  
                 

                  juegoKaplay.onKeyDown("space", () => {
                    if (cantidadhongos === 1) {
                      // Itera sobre la lista de árboles y destruye cada uno
                      arboles.forEach((arbol: GameObj<any>) => {
                        arbol.destroy();
                        
                      });

                      colisionarbol.forEach( (colision: GameObj<any>) => {
                        colision.destroy();
                      })
                      // Opcionalmente, puedes vaciar la lista de árboles si ya no los necesitas
                    }
                  });

                  rocks.forEach( (rock: GameObj<any>) => {
                    rock.play("quiet");
                  })

                  enemigos.forEach( (enemigo: GameObj<any>) => {

                    let squareDer = juegoKaplay.add([
                      juegoKaplay.pos(enemigo.pos.x + (TILED_WIDTH / 2),enemigo.pos.y - (TILED_HEIGHT / 2)+10),
                      juegoKaplay.scale(1),
                      juegoKaplay.area({shape: new juegoKaplay.Rect(juegoKaplay.vec2(0,0), TILED_WIDTH, TILED_HEIGHT-20), // Rectángulo más pequeño
                      }),
                      "square",
                      { z: 2 } // Asegura que el jugador esté en una capa superior
                    ]);
  
                    let squareIzq = juegoKaplay.add([
                      juegoKaplay.pos(enemigo.pos.x - 3*(TILED_WIDTH / 2),enemigo.pos.y - (TILED_HEIGHT / 2)+10),
                      juegoKaplay.scale(1),
                      juegoKaplay.area({shape: new juegoKaplay.Rect(juegoKaplay.vec2(0,0), TILED_WIDTH, TILED_HEIGHT-20), // Rectángulo más pequeño
                      }),
                      "square",
                      { z: 2 } // Asegura que el jugador esté en una capa superior
                    ]);

                    
                    setTimeout(() => {
                    squareDer.onCollide("player", (jugador: any) => {
                      jugador.move(2875, 0);
                      
                     
                        lives=lives-1;
                        console.log(lives)
                        juegoKaplay.debug.log("¡ouch!");
                        enemigo.play("right_a");
                        juegoKaplay.debug.log("Han pasado dos segundos");
                       // Espera 2000 milisegundos (2 segundos)
                    });
                  }, 100);
  
                  setTimeout(() => {
                    squareIzq.onCollide("player", (jugador: any) => {
                      jugador.move(-2875, 0);
                        lives=lives-1;
                        console.log(lives)
                        juegoKaplay.debug.log("¡ouch!");
                        enemigo.play("right_a");
                        juegoKaplay.debug.log("Han pasado dos segundos");
                    });
                  })
                }, 100); // Espera 2000 milisegundos (2 segundos)

               
                 
                  
              

                setTimeout(() => {
                  enemigo.onCollide("player", (jugador: any) => {
                    jugador.move(0, -3100);
                      
                      console.log(lives)
                      juegoKaplay.debug.log("¡ouch!");
                      enemigo.play("right_a");
                      juegoKaplay.debug.log("Han pasado dos segundos");
                  });
                }, 2000); // Espera 2000 milisegundos (2 segundos)
                  
                  const redRoom = juegoKaplay.add([
                    juegoKaplay.rect(200, 500),
                    juegoKaplay.area(),
                    juegoKaplay.color(255, 0, 0),
                    juegoKaplay.pos(1920 - 200,juegoKaplay.center().y - 250),
                    "redRoom",
                    { z: 10 } // Asegura que el jugador esté en una capa superior
                  ])

                  
                 
                  const velocidad = 64;
    
                  
    
                  // Movimiento con clic
                  up.onClick(() => {
                    console.log(player.pos.x)
                    console.log(player.pos.y)

                    const posicionAnteriorX = player.pos.x
                    const posicionAnteriorY = player.pos.y
                    
                    colisiones.forEach( (colision: GameObj<any>) => {
                    
                      colision.onCollide("player", (jugador: any) => {
                        player.pos.x = posicionAnteriorX
                        player.pos.y = posicionAnteriorY
                      })
                    })

                    colisionarbol.forEach( (colision: GameObj<any>) => {
                      colision.onCollide("player", (jugador: any) => {
                        player.pos.x = posicionAnteriorX
                        player.pos.y = posicionAnteriorY
                      })
                    })
  
                    

                    player.play("up");
                    player.moveTo(posicionAnteriorX,Math.ceil(posicionAnteriorY - TILED_HEIGHT));
                  });

                  down.onClick(() => {
                    console.log(player.pos.x)
                    console.log(player.pos.y)

                    const posicionAnteriorX = player.pos.x
                    const posicionAnteriorY = player.pos.y

                    colisiones.forEach( (colision: GameObj<any>) => {
                    
                      colision.onCollide("player", (jugador: any) => {
                        player.pos.x = posicionAnteriorX
                        player.pos.y = posicionAnteriorY
                      })

                      })

                      
                      colisionarbol.forEach( (colision: GameObj<any>) => {
                        colision.onCollide("player", (jugador: any) => {
                          player.pos.x = posicionAnteriorX
                          player.pos.y = posicionAnteriorY
                        })
                      })
    
                      

                    player.play("down");
                    player.moveTo(posicionAnteriorX,Math.ceil(posicionAnteriorY + TILED_HEIGHT));
                  });


                  left.onClick(() => {
                    console.log(player.pos.x)
                    console.log(player.pos.y)

                    const posicionAnteriorX = player.pos.x
                    const posicionAnteriorY = player.pos.y

                    
                    colisiones.forEach( (colision: GameObj<any>) => {
                    
                      colision.onCollide("player", (jugador: any) => {
                        player.pos.x = posicionAnteriorX
                        player.pos.y = posicionAnteriorY
                      })

                      })
                      
                      colisionarbol.forEach( (colision: GameObj<any>) => {
                        colision.onCollide("player", (jugador: any) => {
                          player.pos.x = posicionAnteriorX
                          player.pos.y = posicionAnteriorY
                        })
                      })
                      

                    player.play("left");
                    player.moveTo(Math.ceil(posicionAnteriorX - TILED_WIDTH),posicionAnteriorY);
                  });


                  right.onClick(() => {
                    console.log(player.pos.x)
                    console.log(player.pos.y)

                    const posicionAnteriorX = player.pos.x
                    const posicionAnteriorY = player.pos.y

                    
                    colisiones.forEach( (colision: GameObj<any>) => {
                    
                      colision.onCollide("player", (jugador: any) => {
                        player.pos.x = posicionAnteriorX
                        player.pos.y = posicionAnteriorY
                      })

                      })
                      
                      colisionarbol.forEach( (colision: GameObj<any>) => {
                        colision.onCollide("player", (jugador: any) => {
                          player.pos.x = posicionAnteriorX
                          player.pos.y = posicionAnteriorY
                        })
                      })
                      

                    player.play("right");
                    player.moveTo(Math.ceil(posicionAnteriorX + TILED_WIDTH),posicionAnteriorY);
                  });
    
                  enemigo.play("quiet")
    
                  // Colisión con el enemigo
                  enemigo.onCollide("player", (jugador: any) => {
                    setTimeout(() => {
                      
                      juegoKaplay.debug.log("¡ouch!");
                      lives--;
                      console.log(lives)
                      juegoKaplay.debug.log("Han pasado dos segundos");
                    }, 100); // Espera 2000 milisegundos (2 segundos)
                  });
                 
                  // Intentando eliminar las vidas
                  juegoKaplay.onUpdate(()=>{
                    if (lives==2){
                      juegoKaplay.destroy(heart1);
                    }else if(lives==1){
                      juegoKaplay.destroy(heart2);
                    }else if(lives==0){
                      juegoKaplay.destroy(heart3);
                      juegoKaplay.destroy(player);
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