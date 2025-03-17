import { useEffect, useRef } from "react";
import kaplay, { Asset, GameObj, KAPLAYCtx, LevelOpt, Rect, SpriteData, Vec2 } from "kaplay";

interface informacionNivel {
  urlTextura: string,
  dimensionTexturasX: number,
  dimensionTexturasY: number,
  firstgid: number
}

function devolverSiguienteNumeroValido (validarNumero: number, arregloNumerosProhibidos: number[]) : number {
  arregloNumerosProhibidos.sort((a, b) => a - b);
  return (arregloNumerosProhibidos.includes(validarNumero) ) ? arregloNumerosProhibidos[arregloNumerosProhibidos.length - 1] : validarNumero;
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

      //Extraemos los arreglos que contienen el firtsgid (Posición donde comienzan cada una de las imagenes de cada capa)
      const tilesetOrder: any= informacionMapa
      console.log("tilesetOrder")
      console.log(tilesetOrder)

      //cargamos todas las texturas que seran usadas para generar el mapa en orden
      const spritesCargados:  Asset<SpriteData>[] = []
      informacionMapa.forEach( (informacionNivel: informacionNivel, index: number) => {
          spritesCargados.push(contextoKaplay.loadSprite(`tiles-${index+1}`, informacionNivel.urlTextura, {
            sliceX: informacionNivel.dimensionTexturasX,
            sliceY: informacionNivel.dimensionTexturasY,
          })
        )
      })

      const anchoCuadrado: number = 1920 / worldJson.width
      const altoCuadrado: number = 1080 / worldJson.height
      /*
      console.log("Dimensiones recibidas" , {
        "ancho": anchoCuadrado,
        "alto": altoCuadrado
      }
      */
    
      const tileMap: { [key: string] : number}[] = [{}]

      const valoresProhibidos: number[] = [39,48,49,50,51,52,53,54,55,56,57]

      const mapaGenerado = worldJson?.layers
      console.log(mapaGenerado)

      

      //Luego para cada CAPA que contiene números que no pueden ser procesados por el generador de niveles
      //Es necesario que realizacemos una reasignación con un caracter ASCII, tomando en cuenta que hay caracteres que 
      //No pueden ser procesados como una cadena (Valores Prohibidos)
      mapaGenerado.forEach((layer:any, numeroLayer: number) => {
        //Para cada capa inicializamos un contador que contiene el código ASCII del "$" para reemplazarlo en el caso de que el número
        //extraido sea mayor a 9
        let contador = 36;

        //Luego por cada uno de los números que representan una capa realizamos lo siguiente:
        layer.data.forEach( (tileNumber: number, index: number) => {

          
          //Validamos que el TileMap el cual contiene una relación llave valor con el caracter 
          //y su equivalente en la capa, por ejemplo $: 36, esté inicializado.
          if (!(numeroLayer >= 0 && numeroLayer < tileMap.length)) {
            console.log("El índice no existe");
            tileMap.push({})
          }

          //Si el "Tilemap" en la capa actual no ha mapeado el número
          if(Object.values(tileMap[numeroLayer]).includes(tileNumber) === false){

            //Validmos si es un número de dos dígitos y en caso de que lo sea, debemos validar el
            //ultimo valor posible del contador.
            contador = devolverSiguienteNumeroValido(contador,valoresProhibidos)

            //Una vez validado, si el número a evaluar es de dos digitos y el contador está entre
            //los numeros validos
            if(tileNumber.toString().length > 1 && contador >= 33 && contador <=165 ){
          
              //Al mapeo de la capa evaluada le asignamos una correspondencia entre el valor ASCCI y el numero
              (tileMap[numeroLayer])[String.fromCharCode(contador)] = tileNumber as number;

              //Actualizamos el mapa de la misma posicion con el nuevo caracter
              worldJson.layers[numeroLayer].data[index] = String.fromCharCode(contador);

              //Avanzamos el contador para tomar el nuevo valor ASCII
              contador++;
            }else if(contador > 165){
              //En caso de que el contador haya superado el límite de asignaciones
              throw new Error("La cantidad de cuadros a superado el limite establecido");
            }else {

              //Si el mapeo realizado es de un número de un sólo digito entonces asignamos directamente ese numero 
              (tileMap[numeroLayer])[tileNumber.toString() as string] = tileNumber as number
            }

          }else{

            //En la caso de extraer un número que ya ha sido mapeado y ya tiene asignado un valor ASCII
            //Buscamos la llave a la que le corresponde ese valor
            //Y actualizamos el mapa con ese caracter encontrado.
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

      //Una vez realizada la asignación entre valores ASCII y valores númericos del mapa
      //Es necesario asignar a un SPRITE a cada uno de esos valores, por lo que para
      //lograrlo hacemos lo siguiente:
      tileMap.forEach( (layer: any, numeroLayer: number) => {

        console.log("Comenzando asociacion de la capa", numeroLayer)

        //Para cada valor ASCII de la capa que se está evaluado hacemos lo siguiente
        Object.keys(layer).forEach((key:any, index: number) => {



          //Si la capa que estamos extrayendo es la primera, extraemos el valor numerico asociado al codigo ASCII o "key"
          //De lo contrario, si es una capa superior, debemos restar el punto de origen de las imagenes SPRITE usadas para
          //hallar los frames originales.
          console.log("DIFERENCIA",  (numeroLayer === 0 ) ? layer[key] : layer[key] - tilesetOrder[numeroLayer].firstgid)
          if((numeroLayer !== 0 )) console.log("CAPA 1",  layer[key] - tilesetOrder[numeroLayer].firstgid)
          if((numeroLayer !== 0 )) console.log("CAPA 1",  layer[key])
          const frame = (numeroLayer === 0 ) ? layer[key] : (layer[key] !== 0 && layer[key] !== "0" )  ? layer[key] - tilesetOrder[numeroLayer].firstgid + 1 : 0; // Obtener el frame correcto del tileMap
          //console.log(layer)
          console.log(`Al valor ${key} se le asignó ${frame as number}`);

          // Asegurar que tileMapping[index] existe como un objeto antes de asignar valores
          if (!tileMapping[numeroLayer]) {
            tileMapping[numeroLayer] = {};
          }

          //Si la clave que se está evaluando no es cero, entonces quiere decir que tiene un sprite asociado y no es vacio
          //Por lo que hacemos lo siguiente
          if(key !== 0 && key !== "0" ){

            //Al TileMapping (Mapa entre codigo ASCII y el SPRITE le asignamos el frame encontrado (menos una posicion porque TILED empieza en 1))
             tileMapping[numeroLayer][key] = () => [
              contextoKaplay.sprite(`tiles-${numeroLayer+1}`, { frame: (frame as number) - 1, width: anchoCuadrado, height: altoCuadrado }),
              contextoKaplay.scale(1)
             ]

          }else{
            //De lo contrario si encuentra un cero, le asignamos una imagen especial transparente para cubrir el espacio vacio
            console.log("%c hola",(tileMapping[numeroLayer])[key], "color:green;");
            (tileMapping[numeroLayer])[key] = () => [
              contextoKaplay.sprite(`title-0`, { width: anchoCuadrado, height: altoCuadrado }),
              contextoKaplay.scale(1)
             ]
          }
             
        });

        console.log("Terminó asociacion de la capa", numeroLayer)

      })


      worldJson.layers.forEach((layer: any, numeroLayer: number) => {

        
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
          console.log(resultadoMapa)
          contextoKaplay.addLevel(resultadoMapa, {
            tileWidth: anchoCuadrado,
            tileHeight: altoCuadrado,
            pos: configuracionMapa.pos,
            tiles: { ...tileMapping[numeroLayer] },
          })
        }
        
        
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

  const SCREEN_RESOLUTION_X: number = 1920
  const SCREEN_RESOLUTION_Y: number = 1080

  const TILED_MAP__WIDTH_NUMBER: number = 10
  const TILED_MAP_HEIGTH_NUMBER: number = 10

  const TILED_WIDTH: number = SCREEN_RESOLUTION_X / TILED_MAP__WIDTH_NUMBER
  const TILED_HEIGTH: number = SCREEN_RESOLUTION_Y / TILED_MAP_HEIGTH_NUMBER

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
        width:  SCREEN_RESOLUTION_X,//TILED_PIXEL_DIMENSION * MAX_TILED_PIXEL_WIDTH,*/ // Ancho dinámico
        height: SCREEN_RESOLUTION_Y,/*TILED_PIXEL_DIMENSION * 15, */// Alto dinámico
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

      juegoKaplay.loadSprite("title-0", "prueba/title-0.png", {
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
            `./prueba/mapa1.json`,
            [
              {
                urlTextura: "./prueba/Tilemap_Flat.png",
                dimensionTexturasX: 20,
                dimensionTexturasY: 8,
                firstgid: 1
              },
              {
                urlTextura: "./prueba/Tilemap_Elevation.png",
                dimensionTexturasX: 8,
                dimensionTexturasY: 16,
                firstgid: 161
              },
              {
                urlTextura: "./prueba/Tilemap_Flat.png",
                dimensionTexturasX: 20,
                dimensionTexturasY: 8,
                firstgid: 1
              },
              {
                urlTextura: "./prueba/Bridge_All.png",
                dimensionTexturasX: 6,
                dimensionTexturasY: 8,
                firstgid: 289
              }
            ]
          ).then(
            (resultado: any) => {
              console.log(resultado)
              // Jugador

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