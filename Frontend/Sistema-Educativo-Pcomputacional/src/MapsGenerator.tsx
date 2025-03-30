
import { Asset, KAPLAYCtx, SpriteData, Vec2 } from "kaplay";
import devolverSiguienteNumeroValido from "./utils/generarSiguienteNumeroValido";


    /* Bitacora de Luis (Nota número 1 para mi amorcito): Empecé a comentar las secciones de código que he hecho para explicarte que 
    voy haciendo mi amor precioso, así vas entendiendo que es lo que busque lograr con cada implementación y tengas una base para explorar
    todas las funciones del código.
    
    La función "generarEsquemaMapa() se encarga de leer las representaciones del mundo generadas por Tiled (en formato JSON) para imprimir ese mapa
    en la pantalla. Estos mapas contienen propiedades importantes (a las que puedes acceder con punto al ser objetos, ejemplo: world.layer.data), entre ellas
    las más importante es la propiedad "layers" que contiene todas las capas de ese mundo, así mismo, cada capa tiene un atributo "data" que contiene el ID 
    de cada fracción de imagen que se genera cuando cargamos el conjunto de patrones en Tiled.

    
    */

    const generarEsquemaMapa = async (
      
    contextoKaplay: KAPLAYCtx<{},never>, // contextoKaplay es el objeto que representa todo el juego y se obtiene de la función "kaplay()"
    configuracionMapa: { nameFolder: string, nameFile: string,tileWidth: number,tileHeight: number,pos: Vec2,}, // la configuración del mapa representa las dimensiones que debe tener cada cuadro y la posición del primero para empezar a dibujar
    urlMapa: string, //Es la URL en la que se encuentra la carpeta con las imagenes del mapa en formato JSON
    informacionMapa: informacionNivel[] //Contiene en orden todas las imagenes que se utilizaron en cada capa para generar el mundo.
  ) : Promise<any> => {
  
    const resultado = fetch(urlMapa).then(
      (res) => res.json()
    )
    .then(
      (worldJson:any) => {

        console.log(`${configuracionMapa.nameFolder}/${configuracionMapa.nameFile}`)

        contextoKaplay.loadSprite("mundo", `${configuracionMapa.nameFolder}/${configuracionMapa.nameFile}`, {
          sliceX: 1,
          sliceY: 1,
        });

        contextoKaplay.onDraw(() => {
          contextoKaplay.drawSprite({
            sprite: "mundo",
            width: window.innerWidth,
            height: window.innerHeight
          });
        });
 


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
  
        const anchoCuadrado: number = window.innerWidth / worldJson.width
        const altoCuadrado: number = window.innerHeight / worldJson.height
      
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
      
        
  
        /*
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
        */
  
        console.log("SALI DE LA FUNCION")
      
      
        return "Generación de mapa completada exitosamente"
      }
  
      
    )
    .catch( (error: any) => {
      console.error(error)
    });
  
    return "resultado"
    
    }

    export default generarEsquemaMapa;

    interface informacionNivel {
        urlTextura: string,
        dimensionTexturasX: number,
        dimensionTexturasY: number,
        firstgid: number
      }
      const SCREEN_RESOLUTION_X: number = window.innerWidth 
      const SCREEN_RESOLUTION_Y: number = window.innerHeight 
      
      const TILED_MAP__WIDTH_NUMBER: number = 21
      const TILED_MAP_HEIGHT_NUMBER: number = 16
      
      const ORIGINAL_GAME_SCREEN_X: number = TILED_MAP__WIDTH_NUMBER * 32
      const ORIGINAL_GAME_SCREEN_Y: number = TILED_MAP_HEIGHT_NUMBER * 32
      
      const TILED_WIDTH: number = SCREEN_RESOLUTION_X / TILED_MAP__WIDTH_NUMBER
      const TILED_HEIGHT: number = SCREEN_RESOLUTION_Y / TILED_MAP_HEIGHT_NUMBER
 


    


