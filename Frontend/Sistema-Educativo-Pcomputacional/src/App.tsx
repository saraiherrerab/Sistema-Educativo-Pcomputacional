import { useEffect, useRef } from "react";
import kaplay, { GameObj, KAPLAYCtx, LevelOpt, Vec2 } from "kaplay";


const generarEsquemaMapa = async (

  contextoKaplay: KAPLAYCtx<{},never>,
  configuracionMapa: { tileWidth: number,tileHeight: number,pos: Vec2,},
  urlMapa: string,
  urlTexturas: string, 
  dimensionTexturasX: number,
  dimensionTexturasY: number

) : Promise<any> => {

  let mapaGenerado: string[] = []

  const resultado = fetch(urlMapa).then(
    (res) => res.json()
  )
  .then(
    (worldJson:any) => {
      
      console.log(worldJson)
      console.log("urlTexturas", urlTexturas)
      contextoKaplay.loadSprite("tiles", urlTexturas, {
        sliceX: dimensionTexturasX,
        sliceY: dimensionTexturasY,
      });

      const anchoCuadrado: number = 1920 / worldJson.width
      const altoCuadrado: number = 1080 / worldJson.height

      console.log("Dimensiones recibidas" , {
        "ancho": anchoCuadrado,
        "alto": altoCuadrado
      })
    
      const nivelGenerado = worldJson?.layers[0]

      console.log(nivelGenerado)
    
      const tileMap: { [key: string] : number} = {}
    
      let contador = 36;

      const valoresProhibidos: number[] = [39,48,49,50,51,52,53,54,55,56,57]
    
      nivelGenerado.data.forEach( (tileNumber: number, index: number) => {
        const numero: number = tileNumber
        //console.log(numero)
        if(valoresProhibidos.includes(contador)){
          console.log("Valor prohibido encontrado!", contador)
          contador++
        }

        if(Object.values(tileMap).includes(tileNumber) === false){
          if(tileNumber.toString().length > 1 && contador >= 33 && contador <=165 ){

            //validar valores prohibidos aqui

            //console.log("Evaluando:", tileNumber)
            tileMap[String.fromCharCode(contador)] = tileNumber as number;
            worldJson.layers[0].data[index] = String.fromCharCode(contador);
            contador++;
          }else if(contador > 165){
            throw new Error("La cantidad de cuadros a superado el limite establecido");
          }else {
            tileMap[tileNumber.toString() as string] = tileNumber as number
          }
        }else{
          console.log("El valor ya ha sido mapeado", tileNumber, String.fromCharCode(contador))
          const keyEncontrada = Object.entries(tileMap).find(([_, value]) => value === tileNumber)?.[0];
          worldJson.layers[0].data[index] = keyEncontrada
        }
  
      });
    
      console.log(worldJson.layers[0].data)
      console.table(tileMap) 
    
      type TileComponent = ReturnType<typeof contextoKaplay.sprite> | ReturnType<typeof contextoKaplay.scale>;
    
      const tileMapping: Record<string, () => TileComponent[]> = {}
    
      Object.keys(tileMap).forEach((key) => {

        const frame = tileMap[key]; // Obtener el frame correcto del tileMap

        console.log(`Al valor ${key} se le asignó ${frame as number}`)
        tileMapping[key] = () => [
          contextoKaplay.sprite("tiles", { frame: (frame as number) - 1, width: anchoCuadrado, height: altoCuadrado }),
          contextoKaplay.scale(1)
        ]
      });

      console.log(tileMapping)
    
      worldJson.layers.forEach((layer: any) => {
        if (layer.type === "tilelayer") {
          const { data, width } = layer;
    
          const mapa = [];
          for (let i = 0; i < width; i++) {
            mapa.push(data.slice(i * width, (i + 1) * width));
          }
    
          const resultadoMapeo = mapa.map((fila: any) =>
            fila.map((cell: any) => cell.toString()).join("")
          );
    
          mapaGenerado = [...resultadoMapeo]
        }
      })
    
      console.log(mapaGenerado)
    
      return contextoKaplay.addLevel(mapaGenerado, {
        tileWidth: anchoCuadrado,
        tileHeight: altoCuadrado,
        pos: configuracionMapa.pos,
        tiles: { ...tileMapping },
      })
    }

    
  )
  .catch( (error: any) => {
    console.error(error)
  });

  return resultado
  
}



function detectaBorde(player: any, redRoom: any): boolean {
  const margen = 2; // Aumentamos el margen para mayor precisión

  // Obtenemos el área del jugador y de la habitación en caso de que width/height no existan
  const playerWidth = player.width || (player.area ? player.area.width : 0);
  const playerHeight = player.height || (player.area ? player.area.height : 0);
  const roomWidth = redRoom.width || (redRoom.area ? redRoom.area.width : 0);
  const roomHeight = redRoom.height || (redRoom.area ? redRoom.area.height : 0);

  // Coordenadas del jugador
  const playerBottom = player.pos.y + playerHeight;
  const playerTop = player.pos.y;
  const playerLeft = player.pos.x;
  const playerRight = player.pos.x + playerWidth;

  // Coordenadas de la habitación
  const roomBottom = redRoom.pos.y + roomHeight;
  const roomTop = redRoom.pos.y;
  const roomLeft = redRoom.pos.x;
  const roomRight = redRoom.pos.x + roomWidth;

  return (
    (Math.abs(playerBottom - roomTop) <= margen && playerRight > roomLeft && playerLeft < roomRight) || // Toca el borde superior
    (Math.abs(playerTop - roomBottom) <= margen && playerRight > roomLeft && playerLeft < roomRight) || // Toca el borde inferior
    (Math.abs(playerRight - roomLeft) <= margen && playerBottom > roomTop && playerTop < roomBottom) || // Toca el borde izquierdo
    (Math.abs(playerLeft - roomRight) <= margen && playerBottom > roomTop && playerTop < roomBottom)    // Toca el borde derecho
  );
}

function App() {
  // Referencia persistente para almacenar la instancia de Kaplay
  const juegoKaplayRef = useRef<any>(null);

  let lives =3;
  const TILED_PIXEL_DIMENSION: number = 64
  const MAX_TILED_PIXEL_WIDTH: number = 20
  const MAX_TILED_PIXEL_HEIGTH: number = 13

  //const TILED_MAP__WIDTH_NUMBER: number = 20
  //const TILED_MAP_HEIGTH_NUMBER: number = 15

  const TILED_MAP__WIDTH_NUMBER: number = 5
  const TILED_MAP_HEIGTH_NUMBER: number = 5

  const TILED_WIDTH: number = 1920 / TILED_MAP__WIDTH_NUMBER
  const TILED_HEIGTH: number = 1080 / TILED_MAP_HEIGTH_NUMBER

  console.log(TILED_WIDTH)
  console.log(TILED_HEIGTH)

  useEffect(() => {

    
    const resizeCanvas = () => {
      console.log("APLICANDO RESIZE")
      console.log(juegoKaplayRef.current.center().y)
      const canvas = document.getElementById("game") as HTMLCanvasElement;
      if (canvas) {
        canvas.width = window.innerWidth //TILED_PIXEL_DIMENSION * MAX_TILED_PIXEL_WIDTH;
        canvas.height = window.innerHeight //TILED_PIXEL_DIMENSION * MAX_TILED_PIXEL_HEIGTH;
      }
    };
    
    
    // Inicializar Kaplay solo si no está creado
    if (!juegoKaplayRef.current) {
      console.log(window.innerWidth)
      console.log(window.innerHeight)
      juegoKaplayRef.current = kaplay({
        width:  1920,//TILED_PIXEL_DIMENSION * MAX_TILED_PIXEL_WIDTH,*/ // Ancho dinámico
        height: 1080,/*TILED_PIXEL_DIMENSION * 15, */// Alto dinámico
        letterbox: true,
        global: false,
        debug: true, // Cambiar a false en producción
        debugKey: "f1",
        canvas: document.getElementById("game") as HTMLCanvasElement,
        pixelDensity: 1,
      });

      const juegoKaplay = juegoKaplayRef.current;

      juegoKaplay.setBackground(255,255,255)

      juegoKaplay.loadRoot("./");
      juegoKaplay.loadSprite("robot", "sprites/robotin.png", {
        sliceX: 4,
        sliceY: 12,
        anims: {
          right: { from: 16, to: 19, loop: true },
          up: { from: 20, to: 23, loop: true },
          down: { from: 12, to: 15, loop: true },
          left: { from: 24, to: 27, loop: true },
          quiet: { from: 0, to: 0, loop: false },
        },
      });

      let xcoord= (juegoKaplay.center().x)/4;

      let ycoord= (juegoKaplay.center().y)/4;
   

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



      juegoKaplay.loadSprite("enemy", "sprites/enemy-blue.png", {
        sliceX: 4,
        sliceY: 12,
        anims: {
          right: { from: 16, to: 19, loop: false },
          up: { from: 20, to: 23, loop: false },
          down: { from: 12, to: 15, loop: false },
          left: { from: 24, to: 27, loop: false },
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

      // Cargar sprites adicionales
      ["up", "down", "left", "right"].forEach((dir) => {
        juegoKaplay.loadSprite(dir, `sprites/${dir}-arrow.png`);
      });

      /*
      juegoKaplay.loadSprite("tiles", "Dungeon_Tileset.png", {
        sliceX: 10,
        sliceY: 10,
      });
      */

      juegoKaplay.loadSprite("redbox", "red-border-box.png");

      juegoKaplay.onLoad(async () => {

        /*
        console.log(`./world-${TILED_MAP__WIDTH_NUMBER}x${TILED_MAP__WIDTH_NUMBER}.json`)
        const worldJson = await fetch(`./world-${TILED_MAP__WIDTH_NUMBER}x${TILED_MAP_HEIGTH_NUMBER}.json`).then((res) =>
          res.json()
        );

        const dungeonBoxReference = {
          //Esquinas
          "0": 0,
          "5": 5,
          "40": 40,
          "45": 45,
          //Pared Norte
          "1": 1,
          //Pared Este
          "15": 15,
          //Pared Oeste
          "30": 30,
          //Pared Sur
          "44": 44
        }

        const tileMapping = {
          "1": () => [
            juegoKaplay.sprite("tiles", { frame: 0, width: Math.trunc(TILED_WIDTH), height: Math.trunc(TILED_HEIGTH) }),
            juegoKaplay.scale(1)
          ],
          "6": () => [
            juegoKaplay.sprite("tiles", { frame: 5, width: TILED_WIDTH, height: TILED_HEIGTH }),
            juegoKaplay.scale(1)
          ],
          "$": () => [ // -> $
            juegoKaplay.sprite("tiles", { frame: 40, width: TILED_WIDTH, height: TILED_HEIGTH }),
            juegoKaplay.scale(1)
          ],
          "%": () => [ // -> %
            juegoKaplay.sprite("tiles", { frame: 45, width: TILED_WIDTH, height: TILED_HEIGTH }),
            juegoKaplay.scale(1)
          ],
          "2": () => [
            juegoKaplay.sprite("tiles", { frame: 1, width: TILED_WIDTH, height: TILED_HEIGTH }),
            juegoKaplay.scale(1)
          ],
          "&": () => [ //-> &
            juegoKaplay.sprite("tiles", { frame: 15, width: TILED_WIDTH, height: TILED_HEIGTH }),
            juegoKaplay.scale(1)
          ],
          //Pared Oeste
          "/": () => [ //->/
            juegoKaplay.sprite("tiles", { frame: 30, width: TILED_WIDTH, height: TILED_HEIGTH }),
            juegoKaplay.scale(1)
          ],
          //Pared Sur
          "(": () => [ //->(
            juegoKaplay.sprite("tiles", { frame: 44, width: TILED_WIDTH, height: TILED_HEIGTH }),
            juegoKaplay.scale(1)
          ],
          "=": () => [
            juegoKaplay.sprite("tiles", { frame: 11,width: Math.trunc(TILED_WIDTH), height: Math.trunc(TILED_HEIGTH)}),
            juegoKaplay.scale(1)
          ],
          "*": () => [
            juegoKaplay.sprite("tiles", { frame: 36, width: Math.trunc(TILED_WIDTH), height: Math.trunc(TILED_HEIGTH) }),
            juegoKaplay.area(),
          ],
        };

        worldJson.layers.forEach((layer: any) => {
          if (layer.type === "tilelayer") {
            const { data, width } = layer;

            const mapa = [];
            for (let i = 0; i < width; i++) {
              mapa.push(data.slice(i * width, (i + 1) * width));
            }

            const matrizString = mapa.map((fila: any) =>
              fila.map((cell: any) => cell.toString()).join("")
            );

            juegoKaplay.addLevel(matrizString, {
              tileWidth: TILED_WIDTH,
              tileHeight: TILED_HEIGTH,
              pos: juegoKaplay.vec2(0, 0),
              tiles: { ...tileMapping },
            });
          }
            */

          

          const nivelPrincipal = generarEsquemaMapa(
            juegoKaplay,
            {
              tileWidth: TILED_WIDTH,
              tileHeight: TILED_HEIGTH,
              pos: juegoKaplay.vec2(0, 0),
            },
            `./theofficialbackground.json`,
            "Tilemap_Flat.png",
            10,
            4
          ).then(
            (resultado: any) => {
              console.log(resultado)
              // Jugador
              
              /*
              juegoKaplay.add([
                juegoKaplay.rect(1920, 1080),
                juegoKaplay.area(),
                juegoKaplay.color(0, 0, 255),
                juegoKaplay.pos(1920,0),
                "blueRoom"
              ])
              */
              const nivelSiguiente = generarEsquemaMapa(
                juegoKaplay,
                {
                  tileWidth: TILED_WIDTH,
                  tileHeight: TILED_HEIGTH,
                  pos: juegoKaplay.vec2(1920, 0),
                },
                `./world-20x15-con-numeros.json`,
                "Dungeon_Tileset.png",
                10,
                10
              )


              console.log(juegoKaplay.center())

              const player = juegoKaplay.add([
                juegoKaplay.pos((juegoKaplay.center().x)/4,(juegoKaplay.center().y)/4 ),
                juegoKaplay.sprite("knight"),
                juegoKaplay.scale(2),
                juegoKaplay.body(),
                juegoKaplay.area({shape: new juegoKaplay.Rect(juegoKaplay.vec2( (juegoKaplay.center().x)/24,(juegoKaplay.center().y)/16  ), 60, 60), // Rectángulo más pequeño
                }),
                juegoKaplay.health(3),
                "player",
              ]);

              


              const redRoom = juegoKaplay.add([
                juegoKaplay.rect(200, 500),
                juegoKaplay.area(),
                juegoKaplay.color(255, 0, 0),
                juegoKaplay.pos(1920 - 200,juegoKaplay.center().y - 250),
                "redRoom"
              ])

              // Enemigo
              const enemy = juegoKaplay.add([
                juegoKaplay.pos(520,460),
                juegoKaplay.sprite("enemy"),
                juegoKaplay.scale(4),
                juegoKaplay.area({shape: new juegoKaplay.Rect(juegoKaplay.vec2( 10,5), 15, 20), // Rectángulo más pequeño
                }),
                juegoKaplay.body(),
                "enemy",
              ]);

              const live1 = juegoKaplay.add([
                juegoKaplay.pos(220,20),
                juegoKaplay.sprite("heart"),
                juegoKaplay.scale(4),
                juegoKaplay.area({shape: new juegoKaplay.Rect(juegoKaplay.vec2( 10,5), 15, 20), // Rectángulo más pequeño
                }),
                juegoKaplay.body(),
                "heart",
              ]);

              const live2 = juegoKaplay.add([
                juegoKaplay.pos(350,20),
                juegoKaplay.sprite("heart"),
                juegoKaplay.scale(4),
                juegoKaplay.area({shape: new juegoKaplay.Rect(juegoKaplay.vec2( 10,5), 15, 20), // Rectángulo más pequeño
                }),
                juegoKaplay.body(),
                "heart2",
              ]);

              
              const live3 = juegoKaplay.add([
                juegoKaplay.pos(480,20),
                juegoKaplay.sprite("heart"),
                juegoKaplay.scale(4),
                juegoKaplay.area({shape: new juegoKaplay.Rect(juegoKaplay.vec2( 10,5), 15, 20), // Rectángulo más pequeño
                }),
                juegoKaplay.body(),
                "heart3",
              ]);

              //Scarecrow
              const scarecrow = juegoKaplay.add([
                juegoKaplay.pos(juegoKaplay.center()),
                juegoKaplay.sprite("scarecrow"),
                juegoKaplay.scale(2),
                juegoKaplay.area(),
                juegoKaplay.body(),
                "scarecrow",
              ]);

              // Flechas
              const arrows = {
                up: juegoKaplay.add([
                  juegoKaplay.pos(0, (juegoKaplay.center().y)/8),
                  juegoKaplay.sprite("up"),
                  juegoKaplay.scale(2),
                  juegoKaplay.area(),
                ]),
                down: juegoKaplay.add([
                  juegoKaplay.pos(0 ,(juegoKaplay.center().y)/4),
                  juegoKaplay.sprite("down"),
                  juegoKaplay.scale(2),
                  juegoKaplay.area(),
                ]),
                left: juegoKaplay.add([
                  juegoKaplay.pos(0,(juegoKaplay.center().y)/2),
                  juegoKaplay.sprite("left"),
                  juegoKaplay.scale(2),
                  juegoKaplay.area(),
                ]),
                right: juegoKaplay.add([
                  juegoKaplay.pos(0,(juegoKaplay.center().y)),
                  juegoKaplay.sprite("right"),
                  juegoKaplay.scale(2),
                  juegoKaplay.area(),
                ]),
              };

              const velocidad = 3000;

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

              // Colisión con el enemigo
              enemy.onCollide("player", (jugador: any) => {
                jugador.hurt(1);
                juegoKaplay.debug.log("¡ouch!");
                lives--;
                console.log(lives);
              });

              // Intentando eliminar las vidas
              juegoKaplay.onUpdate(()=>{
                if (lives==2){
                  juegoKaplay.destroy(live3);
                }else if(lives==1){
                  juegoKaplay.destroy(live2);
                }else if(lives==0){
                  juegoKaplay.destroy(live1);
                }
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
          )

          

        }) //Fin - Onload()

      
        
      }
  
    resizeCanvas(); // Ajustar en la carga inicial

   
    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
    
    
  }, []);

  return <canvas id="game" style={{ width: "100vw", height: "100vh" }} />;;
}

export default App;