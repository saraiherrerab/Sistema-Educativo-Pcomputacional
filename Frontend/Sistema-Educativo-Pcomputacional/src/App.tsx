import { useEffect, useRef } from "react";
import kaplay, { Asset, GameObj, KAPLAYCtx, LevelOpt, Rect, SpriteData, Vec2 } from "kaplay";

interface informacionNivel {
  urlTextura: string,
  dimensionTexturasX: number,
  dimensionTexturasY: number,
  firstgid: number
}

const arregloNotasMusicales = []



const SCREEN_RESOLUTION_X: number = window.innerWidth
const SCREEN_RESOLUTION_Y: number = window.innerHeight

const TILED_MAP__WIDTH_NUMBER: number = 20
const TILED_MAP_HEIGTH_NUMBER: number = 15

const ORIGINAL_GAME_SCREEN_X: number = TILED_MAP__WIDTH_NUMBER * 32
const ORIGINAL_GAME_SCREEN_Y: number = TILED_MAP_HEIGTH_NUMBER * 32

const TILED_WIDTH: number = SCREEN_RESOLUTION_X / TILED_MAP__WIDTH_NUMBER
const TILED_HEIGTH: number = SCREEN_RESOLUTION_Y / TILED_MAP_HEIGTH_NUMBER

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
      
      //Extraemos los arreglos que contienen el firtsgid (Posición donde comienzan cada una de las imagenes de cada capa)
      const tilesetOrder: any= informacionMapa
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
    
      const tileMap: { [key: string] : number}[] = [{}]

      const valoresProhibidos: number[] = [39,48,49,50,51,52,53,54,55,56,57]

      const mapaGenerado = worldJson?.layers

      //Luego para cada CAPA que contiene números que no pueden ser procesados por el generador de niveles
      //Es necesario que realizacemos una reasignación con un caracter ASCII, tomando en cuenta que hay caracteres que 
      //No pueden ser procesados como una cadena (Valores Prohibidos)
      mapaGenerado.forEach((layer:any, numeroLayer: number) => {
        //Para cada capa inicializamos un contador que contiene el código ASCII del "$" para reemplazarlo en el caso de que el número
        //extraido sea mayor a 9
        let contador = 36;

        if(layer.type === "tilelayer"){

          //Luego por cada uno de los números que representan una capa realizamos lo siguiente:
          layer.data.forEach( (tileNumber: number, index: number) => {

            
            //Validamos que el TileMap el cual contiene una relación llave valor con el caracter 
            //y su equivalente en la capa, por ejemplo $: 36, esté inicializado.
            if (!(numeroLayer >= 0 && numeroLayer < tileMap.length)) {
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


        }

        if(layer.type === "objectgroup" && layer.name === "colisiones"){

          layer.objects.forEach( (zonaColision: any, numeroColision: number) => {

            //if(numeroColision === 4){
              // Zona de caid
              let caida_ = contextoKaplay.add([
              contextoKaplay.pos(zonaColision.x * ( 1920 / ORIGINAL_GAME_SCREEN_X ), zonaColision.y * (1080 / ORIGINAL_GAME_SCREEN_Y)),
              contextoKaplay.scale(1),
              contextoKaplay.body({isStatic: true}),
              contextoKaplay.area({shape: new contextoKaplay.Rect(contextoKaplay.vec2(0.0), zonaColision.width * ( 1920 / ORIGINAL_GAME_SCREEN_X ) , zonaColision.height * (( 1080 / SCREEN_RESOLUTION_Y ))) // Rectángulo más pequeño
              }),
              { width: zonaColision.width * (1920 / ORIGINAL_GAME_SCREEN_X), height: zonaColision.height * (1080 / SCREEN_RESOLUTION_Y) }, // Agrega propiedades manualmente
              //`square-${numeroColision}`,
              "square-colision"
              ]);

            //}
            

          });


            
        }
      });
    
      type TileComponent = ReturnType<typeof contextoKaplay.sprite> | ReturnType<typeof contextoKaplay.scale>;
      const tileMapping: Record<string, () => TileComponent[]>[] = []

      //Una vez realizada la asignación entre valores ASCII y valores númericos del mapa
      //Es necesario asignar a un SPRITE a cada uno de esos valores, por lo que para
      //lograrlo hacemos lo siguiente:
      tileMap.forEach( (layer: any, numeroLayer: number) => {

        //Para cada valor ASCII de la capa que se está evaluado hacemos lo siguiente
        Object.keys(layer).forEach((key:any, index: number) => {



          //Si la capa que estamos extrayendo es la primera, extraemos el valor numerico asociado al codigo ASCII o "key"
          //De lo contrario, si es una capa superior, debemos restar el punto de origen de las imagenes SPRITE usadas para
          //hallar los frames originales.

          const frame = (numeroLayer === 0 ) ? layer[key] : (layer[key] !== 0 && layer[key] !== "0" )  ? layer[key] - tilesetOrder[numeroLayer].firstgid + 1 : 0; // Obtener el frame correcto del tileMap

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
            (tileMapping[numeroLayer])[key] = () => [
              contextoKaplay.sprite(`title-0`, { width: anchoCuadrado, height: altoCuadrado })
             ]
          }
             
        });

      })


      worldJson.layers.forEach((layer: any, numeroLayer: number) => {
      
        let resultadoMapa = [];
        if (layer.type === "tilelayer" ) {
          const { data, width } = layer;
          const mapa = [];
          for (let i = 0; i < width; i++) {
            mapa.push(data.slice(i * width, (i + 1) * width));
          }

          const resultadoMapeo = mapa.map((fila: any) =>
            fila.map((cell: any) => cell.toString()).join("")
          );

          resultadoMapa = [...resultadoMapeo]

        
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

  let lives = 3

  useEffect(() => {

    
    const resizeCanvas = () => {
      const canvas = document.getElementById("game") as HTMLCanvasElement;
      if (canvas) {
        canvas.width = window.innerWidth //TILED_PIXEL_DIMENSION * MAX_TILED_PIXEL_WIDTH;
        canvas.height = window.innerHeight //TILED_PIXEL_DIMENSION * MAX_TILED_PIXEL_HEIGTH;
      }
    };
    
    
    // Inicializar Kaplay solo si no está creado
    if (!juegoKaplayRef.current) {
      juegoKaplayRef.current = kaplay({
        width:  1920,//TILED_PIXEL_DIMENSION * MAX_TILED_PIXEL_WIDTH,*/ // Ancho dinámico
        height: SCREEN_RESOLUTION_Y,/*TILED_PIXEL_DIMENSION * 15, */// Alto dinámico
        letterbox: false,
        global: false,
        debug: true, // Cambiar a false en producción
        debugKey: "f1",
        canvas: document.getElementById("game") as HTMLCanvasElement,
        pixelDensity: 1,
      });

      const juegoKaplay = juegoKaplayRef.current;

      juegoKaplay.setBackground(71,171,169)

      juegoKaplay.loadRoot("./");
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

      juegoKaplay.loadSprite('fondo', 'sprites/pngtree-enchanting-medieval-fantasy-landscape-majestic-castle-in-a-realm-image_16419731.png');

      juegoKaplay.loadSprite("notas", "nivel2/notas_musicales.png", {
        sliceX: 3,
        sliceY: 1
      });

      juegoKaplay.loadSprite("notas_circulo", "nivel2/notas_musicales_con_circulo.png", {
        sliceX: 3,
        sliceY: 1
      });

      juegoKaplay.loadSound("sonidoPrueba", "button_09-190435.mp3");

      juegoKaplay.onDraw(() => {
        juegoKaplay.drawSprite({
          sprite: 'fondo',
          pos: juegoKaplay.vec2(0, 0),
          width: juegoKaplay.width,
          height: juegoKaplay.height
        });
      });
      // Cargar sprites adicionales
      ["up", "down", "left", "right"].forEach((dir) => {
        juegoKaplay.loadSprite(dir, `sprites/${dir}-arrow.png`);
      });

      juegoKaplay.loadSprite("redbox", "red-border-box.png");
      juegoKaplay.layers(["background", "game", "foreground"], "game")

      juegoKaplay.onLoad(async () => {

        const nivelPrincipal = generarEsquemaMapa(
          juegoKaplay,
          {
            tileWidth: TILED_WIDTH,
            tileHeight: TILED_HEIGTH,
            pos: juegoKaplay.vec2(0, 0),
          },
          `./nivel2/prueba3.json`,
          
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
                       juegoKaplay.pos(450,109),
                       juegoKaplay.sprite("knight"),
                       juegoKaplay.scale(2),
                       juegoKaplay.health(3),
                       juegoKaplay.area(),
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


                     const posicionNotasY: number = 500;
                     const posicionNotasx: number = 1000;

                     const circle1 = juegoKaplay.add([
                      juegoKaplay.pos(juegoKaplay.center().x, juegoKaplay.center().y + juegoKaplay.center().y / 2 + juegoKaplay.center().y / 6),
                      juegoKaplay.sprite("notas_circulo", {frame: 0}),
                      juegoKaplay.area(),
                      juegoKaplay.scale(0.20),
                      { z: 1},// Asegura que el jugador esté en una capa superior,
                     ])

                     

                     const circle2 = juegoKaplay.add([
                      juegoKaplay.pos(juegoKaplay.center().x - juegoKaplay.center().x / 4, juegoKaplay.center().y + juegoKaplay.center().y / 2 + juegoKaplay.center().y / 6),
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
                     
                    /*
                    const notes = {
                      nota1: juegoKaplay.add([
                        juegoKaplay.pos(posicionNotasx, posicionNotasY),
                        juegoKaplay.sprite("notas", {frame: 1}),
                        juegoKaplay.scale(1),
                        { z: 1 },// Asegura que el jugador esté en una capa superior,
                        "nota-1"
                      ]),
                      nota2: juegoKaplay.add([
                        juegoKaplay.pos(posicionNotasx ,posicionNotasY + 100),
                        juegoKaplay.sprite("notas", {frame: 2}),
                        juegoKaplay.scale(1),
                        juegoKaplay.area(),
                        { z: 1 }, // Asegura que el jugador esté en una capa superior
                        "nota-2"
                      ]),
                      nota3: juegoKaplay.add([
                        juegoKaplay.pos(posicionNotasx,posicionNotasY + 200),
                        juegoKaplay.sprite("notas", {frame: 3}),
                        juegoKaplay.scale(1),
                        juegoKaplay.area(),
                        { z: 1 },// Asegura que el jugador esté en una capa superior
                        "nota-3"
                      ]),
                      nota4: juegoKaplay.add([
                        juegoKaplay.pos(posicionNotasx + 200,posicionNotasY),
                        juegoKaplay.sprite("notas", {frame: 4}),
                        juegoKaplay.scale(1),
                        juegoKaplay.area(),
                        { z: 1 }, // Asegura que el jugador esté en una capa superior
                        "nota-4"
                      ]),
                    };
                  */
                    let puntoPartida: number = 200
                    const puntoPartidaY:number = 300

                    const patrones = [
                      [0, 1, 2, 0, 1, 2, 0, 1, 2, 0], 
                      [2, 2, 1, 1, 0, 0, 2, 2, 1, 1], 
                      [0, 0, 0, 1, 1, 1, 2, 2, 2, 0], 
                      [1, 2, 0, 1, 2, 0, 1, 2, 0, 1], 
                      [2, 1, 0, 2, 1, 0, 2, 1, 0, 2], 
                      [0, 1, 1, 2, 2, 0, 0, 1, 1, 2] 
                    ];
              

                    const numeros = generarNumerosAzar();
                    console.log(numeros)
                    console.log(patrones[numeros[0]])
                    const ultimo = patrones[numeros[0]][patrones[numeros[0]].length - 1];
                    patrones[numeros[0]] = patrones[numeros[0]].slice(0, -1);

                    patrones[numeros[0]].forEach((numeroAzar: number) => {
                      console.log("Estudiando el número:", numeroAzar  )
                      console.log(`Ubicando en x:${puntoPartida} y:${((juegoKaplay.center().y) / 2 ) + puntoPartidaY}` )
                      switch(numeroAzar){
                        case 0:
                          const semicorchea = juegoKaplay.add([
                            juegoKaplay.pos(puntoPartida,((juegoKaplay.center().y) / 2 ) + puntoPartidaY),
                            juegoKaplay.sprite("notas"),
                            juegoKaplay.scale(0.2),
                            { z: 2 }, // Asegura que el jugador esté en una capa superior,
                         ])
                         semicorchea.frame = 0
                         puntoPartida = puntoPartida + 150
                        break;
                        case 1:
                          const semicorchea2 = juegoKaplay.add([
                            juegoKaplay.pos( puntoPartida ,((juegoKaplay.center().y) / 2 ) + puntoPartidaY),
                            juegoKaplay.sprite("notas"),
                            juegoKaplay.scale(0.2),
                            { z: 2 } // Asegura que el jugador esté en una capa superior
                          ])
                          semicorchea2.frame = 1
                          puntoPartida = puntoPartida + 150
                        break;
                        case 2:
                          const semicorchea3 = juegoKaplay.add([
                            juegoKaplay.pos(puntoPartida ,((juegoKaplay.center().y) / 2 ) + puntoPartidaY),
                            juegoKaplay.sprite("notas"),
                            juegoKaplay.scale(0.2),
                            { z: 2 } // Asegura que el jugador esté en una capa superior
                          ])
      
                          semicorchea3.frame = 2
                          puntoPartida = puntoPartida + 150
                        break;
                      }
                    })

                    circle1.onClick( () => {
                      juegoKaplay.play("sonidoPrueba", {
                        volume: 0.5, // set the volume to 50%
                        speed: 1.5, // speed up the sound
                        loop: false, // loop the sound
                      });
                      if(ultimo === 1){
                        console.log("Ganaste")
                      }else{
                        console.log("Fallaste")
                      }
                     })
                     circle2.onClick( () => {
                      juegoKaplay.play("sonidoPrueba", {
                        volume: 0.5, // set the volume to 50%
                        speed: 1.5, // speed up the sound
                        loop: false, // loop the sound
                      });
                      if(ultimo === 0){
                        console.log("Ganaste")
                      }else{
                        console.log("Fallaste")
                      }
                     })

                     circle3.onClick( () => {
                      juegoKaplay.play("sonidoPrueba", {
                        volume: 0.5, // set the volume to 50%
                        speed: 1.5, // speed up the sound
                        loop: false, // loop the sound
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
        
      }
  
    resizeCanvas(); // Ajustar en la carga inicial

   
    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
    
    
  }, []);

  return <canvas id="game" style={{ width: "100vw", height: "100vh" }} />;;
}

function generarNumerosAzar(): number[] {
  const longitud = Math.floor(Math.random() * (10 - 5 + 1)) + 5; // Número aleatorio entre 5 y 10
  return Array.from({ length: longitud }, () => Math.floor(Math.random() * 3)); // Números entre 0 y 5
}



export default App;