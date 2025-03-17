import { useEffect, useRef } from "react";
import kaplay, { Asset, GameObj, KAPLAYCtx, LevelOpt, Rect, SpriteData, Vec2 } from "kaplay";

interface informacionNivel {
  urlTextura: string,
  dimensionTexturasX: number,
  dimensionTexturasY: number
}

function devolverSiguienteNumeroValido (validarNumero: number, arregloNumerosProhibidos: number[]) : number {
  arregloNumerosProhibidos.sort((a, b) => a - b);
  return arregloNumerosProhibidos[arregloNumerosProhibidos.length - 1];
}
const generarEsquemaMapa = async (

  contextoKaplay: KAPLAYCtx<{},never>,
  configuracionMapa: { tileWidth: number,tileHeight: number,pos: Vec2,},
  urlMapa: string,
  informacionMapa: informacionNivel[]
) : Promise<any> => {

  const resultado = fetch(urlMapa).then(
    (res) => res.json()
  )
  .then(
    (worldJson:any) => {
      
      console.log(worldJson)
      
      const tilesetOrder: any= worldJson.tilesets
      console.log("tilesetOrder")
      console.log(tilesetOrder)

      const spritesCargados:  Asset<SpriteData>[] = []
      //cargamos todas las texturas que seran usadas para generar el mapa en orden
      informacionMapa.forEach( (informacionNivel: informacionNivel, index: number) => {
          spritesCargados.push(contextoKaplay.loadSprite(`tiles-${index+1}`, informacionNivel.urlTextura, {
            sliceX: informacionNivel.dimensionTexturasX,
            sliceY: informacionNivel.dimensionTexturasY,
          })
        )
      })

      //console.log(spritesCargados) //Validamos que los sprites han sido cargados

      const anchoCuadrado: number = 1920 / worldJson.width
      const altoCuadrado: number = 1080 / worldJson.height

      console.log("Dimensiones recibidas" , {
        "ancho": anchoCuadrado,
        "alto": altoCuadrado
      })
    
      const tileMap: { [key: string] : number}[] = [{}]

      const valoresProhibidos: number[] = [39,48,49,50,51,52,53,54,55,56,57]

      const mapaGenerado = worldJson?.layers
      console.log(mapaGenerado)

      

      mapaGenerado.forEach((layer:any, numeroLayer: number) => {

        let contador = 36;

        layer.data.forEach( (tileNumber: number, index: number) => {

          //Falta validar los codigos ASCII INVALIDOS del contador

          if (!(numeroLayer >= 0 && numeroLayer < tileMap.length)) {
            console.log("El índice no existe");
            tileMap.push({})
          }

          //Si el "Tilemap" en la capa actual no ha mapeado el número
          if(Object.values(tileMap[numeroLayer]).includes(tileNumber) === false){


            if(tileNumber.toString().length > 1 && contador >= 33 && contador <=165 ){
          
              //console.log("Evaluando:", tileNumber)
              (tileMap[numeroLayer])[String.fromCharCode(contador)] = tileNumber as number;

              //console.log((tileMap[numeroLayer])[String.fromCharCode(contador)]);

              worldJson.layers[numeroLayer].data[index] = String.fromCharCode(contador);
              contador++;
            }else if(contador > 165){
              throw new Error("La cantidad de cuadros a superado el limite establecido");
            }else {

              if(tileNumber === 0){
                (tileMap[numeroLayer])[tileNumber.toString() as string] = 0
              }
              (tileMap[numeroLayer])[tileNumber.toString() as string] = tileNumber as number
            }

          }else{
            //console.log("El valor ya ha sido mapeado", tileNumber, String.fromCharCode(contador))
            const keyEncontrada = Object.entries(tileMap[numeroLayer]).find(([_, value]) => value === tileNumber)?.[0];
            worldJson.layers[numeroLayer].data[index] = keyEncontrada
          }
    
        });
      });
    
      console.log(worldJson.layers)

      tileMap.forEach( (nivel:any) => {
        console.log(nivel)
      })
    
      type TileComponent = ReturnType<typeof contextoKaplay.sprite> | ReturnType<typeof contextoKaplay.scale>;
    
      const tileMapping: Record<string, () => TileComponent[]>[] = []


      tileMap.forEach( (layer: any, numeroLayer: number) => {

        console.log("Comenzando asociacion de la capa", numeroLayer)
        Object.keys(layer).forEach((key:any, index: number) => {

          
          const frame = (index === 0 ) ? layer[key] : layer[key] - tilesetOrder[numeroLayer].firstgid  ; // Obtener el frame correcto del tileMap
          //console.log(layer)
          console.log(`Al valor ${key} se le asignó ${frame as number}`);

          // Asegurar que tileMapping[index] existe como un objeto antes de asignar valores
          if (!tileMapping[numeroLayer]) {
            tileMapping[numeroLayer] = {};
          }

          if(key !== 0 && key !== "0" ){
            console.log()
            console.log()
             console.log("SE ENCONTRO ALGO");
             console.log(tileMapping[numeroLayer])
             console.log(frame)
             tileMapping[numeroLayer][key] = () => [
              contextoKaplay.sprite(`tiles-${numeroLayer+1}`, { frame: (frame as number) - 1, width: anchoCuadrado, height: altoCuadrado }),
              contextoKaplay.scale(1)
             ]
             console.log(tileMapping[numeroLayer])
             console.log("AISGNACION PRINCIPAL")
             console.log((tileMapping[numeroLayer])[key])
          }else{
            console.log("%c hola",(tileMapping[numeroLayer])[key], "color:green;");
            (tileMapping[numeroLayer])[key] = () => [
              contextoKaplay.sprite(`tiles-0`, { frame: 2 , width: anchoCuadrado, height: altoCuadrado }),
              contextoKaplay.scale(1)
             ]
          }
             
        });

        console.log("Terminó asociacion de la capa", numeroLayer)

      })

    

      console.log(tileMapping)

      console.log(worldJson.layers)


      console.log("Extrayendo LAYER")
      console.log(worldJson.layers[0])
      let resultadoMapa = [];

      const { data, width } = worldJson.layers[1];
      console.log(data)
      const mapa = [];
      for (let i = 0; i < width; i++) {
        mapa.push(data.slice(i * width, (i + 1) * width));
      }
      console.log(mapa)
      const resultadoMapeo = mapa.map((fila: any) =>
        fila.map((cell: any) => cell.toString()).join("")
      );
      console.log(resultadoMapeo.length)
      console.log(resultadoMapeo)
      resultadoMapa = [...resultadoMapeo]
      console.log("BIEN HASTA AQUI")
      console.log(tileMapping[0]);
      contextoKaplay.addLevel(resultadoMapa, {
        tileWidth: anchoCuadrado,
        tileHeight: altoCuadrado,
        pos: configuracionMapa.pos,
        tiles: { ...tileMapping[0] },
      })
        
    
      worldJson.layers.forEach((layer: any, numeroLayer: number) => {

        /*
        console.log("Extrayendo LAYER")
        console.log(layer)
        let resultadoMapa = [];
        if (layer.type === "tilelayer" ) {
          const { data, width } = layer;
          console.log(data)
          const mapa = [];
          for (let i = 0; i < width; i++) {
            mapa.push(data.slice(i * width, (i + 1) * width));
          }
          console.log(mapa)
          const resultadoMapeo = mapa.map((fila: any) =>
            fila.map((cell: any) => cell.toString()).join("")
          );
          console.log(resultadoMapeo.length)
          resultadoMapa = [...resultadoMapeo]
          console.log("BIEN HASTA AQUI")
          console.log(tileMapping[numeroLayer]);
          contextoKaplay.addLevel(resultadoMapa, {
            tileWidth: anchoCuadrado,
            tileHeight: altoCuadrado,
            pos: configuracionMapa.pos,
            tiles: { ...tileMapping[numeroLayer] },
          })
        }
        
        */
      })

      console.log("SALI DE LA FUNCION")
    
    
      return "Generación de mapa completada exitosamente"
    }

    
  )
  .catch( (error: any) => {
    console.error(error)
  });

  return "resultado"
  
}

function App() {
  // Referencia persistente para almacenar la instancia de Kaplay
  const juegoKaplayRef = useRef<any>(null);

  const TILED_PIXEL_DIMENSION: number = 64
  const MAX_TILED_PIXEL_WIDTH: number = 20
  const MAX_TILED_PIXEL_HEIGTH: number = 13

  //const TILED_MAP__WIDTH_NUMBER: number = 20
  //const TILED_MAP_HEIGTH_NUMBER: number = 15

  const TILED_MAP__WIDTH_NUMBER: number = 10
  const TILED_MAP_HEIGTH_NUMBER: number = 10

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
          right: { from: 16, to: 19, loop: false },
          up: { from: 20, to: 23, loop: false },
          down: { from: 12, to: 15, loop: false },
          left: { from: 24, to: 27, loop: false },
          quiet: { from: 0, to: 0, loop: false },
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

          const nivelPrincipal = generarEsquemaMapa(
            juegoKaplay,
            {
              tileWidth: TILED_WIDTH,
              tileHeight: TILED_HEIGTH,
              pos: juegoKaplay.vec2(0, 0),
            },
            `./prueba/prueba2x2.json`,
            [
              {
                urlTextura: "./prueba/Tilemap_Flat.png",
                dimensionTexturasX: 20,
                dimensionTexturasY: 8
              },
              {
                urlTextura: "./prueba/Tilemap_Elevation.png",
                dimensionTexturasX: 8,
                dimensionTexturasY: 16
              }
            ]
          ).then(
            (resultado: any) => {
              console.log(resultado)
              // Jugador
              /*
              const player = juegoKaplay.add([
                juegoKaplay.pos((juegoKaplay.center().x)/4,(juegoKaplay.center().y)/4 ),
                juegoKaplay.sprite("robot"),
                juegoKaplay.scale(4),
                juegoKaplay.body(),
                juegoKaplay.area(),
                juegoKaplay.health(5),
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
                juegoKaplay.pos(juegoKaplay.center()),
                juegoKaplay.sprite("enemy"),
                juegoKaplay.scale(4),
                juegoKaplay.area(),
                juegoKaplay.body(),
                "enemy",
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

              const velocidad = 1000;

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
                jugador.destroy();
                juegoKaplay.debug.log("¡Has perdido!");
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

      
        
      }
  
    resizeCanvas(); // Ajustar en la carga inicial

   
    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
    
    
  }, []);

  return <canvas id="game" style={{ width: "100vw", height: "100vh" }} />;;
}

export default App;