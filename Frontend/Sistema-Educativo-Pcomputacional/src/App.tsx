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
        console.log(numero)
        if(valoresProhibidos.includes(contador)){
          console.log("Valor prohibido encontrado!", contador)
          contador++
        }

        if(Object.values(tileMap).includes(tileNumber) === false){
          if(tileNumber.toString().length > 1 && contador >= 33 && contador <=165 ){

            //validar valores prohibidos aqui

            console.log("Evaluando:", tileNumber)
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
    
      contextoKaplay.addLevel(mapaGenerado, {
        tileWidth: anchoCuadrado,
        tileHeight: altoCuadrado,
        pos: configuracionMapa.pos,
        tiles: { ...tileMapping },
      })

      return "Todo salio excelente"
    }

    
  )
  .catch( (error: any) => {
    console.error(error)
  });

  return resultado
  
}

function App() {
  // Referencia persistente para almacenar la instancia de Kaplay
  const juegoKaplayRef = useRef<any>(null);

  const TILED_PIXEL_DIMENSION: number = 64
  const MAX_TILED_PIXEL_WIDTH: number = 20
  const MAX_TILED_PIXEL_HEIGTH: number = 13

  //const TILED_MAP__WIDTH_NUMBER: number = 20
  //const TILED_MAP_HEIGTH_NUMBER: number = 15

  const TILED_MAP__WIDTH_NUMBER: number = 20
  const TILED_MAP_HEIGTH_NUMBER: number = 15

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

          

          generarEsquemaMapa(
            juegoKaplay,
            {
              tileWidth: TILED_WIDTH,
              tileHeight: TILED_HEIGTH,
              pos: juegoKaplay.vec2(0, 0),
            },
            `./world-20x15-con-numeros.json`,
            "Dungeon_Tileset.png",
            10,
            10
          ).then(
            (resultado: any) => {
              console.log(resultado)
              // Jugador
          console.log(juegoKaplay.center())
          const player = juegoKaplay.add([
            juegoKaplay.pos((juegoKaplay.center().x)/4,(juegoKaplay.center().y)/4 ),
            juegoKaplay.sprite("robot"),
            juegoKaplay.scale(4),
            juegoKaplay.body(),
            juegoKaplay.area(),
            juegoKaplay.health(5),
            "player",
          ]);

          // Enemigo
          const enemy = juegoKaplay.add([
            juegoKaplay.pos(juegoKaplay.center()),
            juegoKaplay.sprite("enemy"),
            juegoKaplay.scale(4),
            juegoKaplay.area(),
            juegoKaplay.body(),
            "enemy",
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