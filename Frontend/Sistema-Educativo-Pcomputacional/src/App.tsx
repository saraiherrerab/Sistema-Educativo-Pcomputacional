import { useState } from 'react'
import './App.css'
import kaplay from "kaplay";


function App() {
  const juegoKaplay= 
  kaplay(
    {
      width: 1920,
      height: 1080,
      letterbox: true,
      global: false,
      debug: true, // put back to false in prod
      debugKey: "f1",
      pixelDensity: devicePixelRatio,
    }
  );
  juegoKaplay.loadRoot("./"); // A good idea for Itch.io publishing later
  juegoKaplay.loadSprite("robot", "sprites/robotin.png", {
    sliceX: 4, // how many sprites are in the X axis
    sliceY: 12, // how many sprites are in the Y axis
    anims: {
        right: { from: 16, to: 19, loop: false },
        up:{from: 20, to: 23, loop: false},
        down:{from: 12, to: 15, loop: false},
        left:{from:24, to:27, loop: false},
        quiet:{from: 0, to: 0, loop: false},
    },
    
  });

  juegoKaplay.loadSprite("enemy", "sprites/enemy-blue.png", {
    sliceX: 4, // how many sprites are in the X axis
    sliceY: 12, // how many sprites are in the Y axis
    anims: {
        right: { from: 16, to: 19, loop: false },
        up:{from: 20, to: 23, loop: false},
        down:{from: 12, to: 15, loop: false},
        left:{from:24, to:27, loop: false},
        quiet:{from: 0, to: 0, loop: false},
    },

  });

  juegoKaplay.loadSprite("up", "sprites/up-arrow.png");
  juegoKaplay.loadSprite("down", "sprites/down-arrow.png");
  juegoKaplay.loadSprite("left", "sprites/left-arrow.png");
  juegoKaplay.loadSprite("right", "sprites/right-arrow.png");
  juegoKaplay.loadSprite("tiles", "tileset.jpg", {
    sliceX: 10, // Cantidad de tiles en X (columnas)
    sliceY: 10, // Cantidad de tiles en Y (filas)
});
  const player= juegoKaplay.add([juegoKaplay.pos(750,500),juegoKaplay.sprite("robot"), juegoKaplay.scale(10),juegoKaplay.body(), juegoKaplay.area({scale:1, shape: new juegoKaplay.Rect(juegoKaplay.vec2(10, 10), 10, 10)}), juegoKaplay.health(5), "player",]);
  const enemy= juegoKaplay.add([juegoKaplay.pos(500,600),juegoKaplay.sprite("enemy"), juegoKaplay.scale(10), juegoKaplay.area({scale:1, shape: new juegoKaplay.Rect(juegoKaplay.vec2(10, 10), 10, 10)}), juegoKaplay.body(), "enemy",]);
  const upArrow= juegoKaplay.add([juegoKaplay.pos(30,710),juegoKaplay.sprite("up"), juegoKaplay.scale(10), juegoKaplay.area()]);
  const downArrow= juegoKaplay.add([juegoKaplay.pos(0,500),juegoKaplay.sprite("down"),juegoKaplay.scale(10), juegoKaplay.area()]);
  const leftArrow= juegoKaplay.add([juegoKaplay.pos(0,130),juegoKaplay.sprite("left"), juegoKaplay.scale(10), juegoKaplay.area()]);
  const rightArrow= juegoKaplay.add([juegoKaplay.pos(0,300),juegoKaplay.sprite("right"), juegoKaplay.scale(10), juegoKaplay.area()]);
  const velocidad = 1000

  
  juegoKaplay.onKeyDown("w", () => {
      player.move(0, -velocidad);
  });
  // Evento para mover a la izquierda mientras se mantiene presionada la tecla
  juegoKaplay.onKeyDown("s", () => {
      player.move(0, velocidad);
  });
  juegoKaplay.onKeyDown("a", () => {
      player.move(-velocidad, 0);
  });
  juegoKaplay.onKeyDown("d", () => {
      player.move(velocidad, 0);
  });


  
  upArrow.onClick(() => {
    player.move(0, -velocidad);
    player.play("up");
  });

  downArrow.onClick( () => {
    player.move(0, velocidad);
    player.play("down");
  });

  leftArrow.onClick( () => {
    player.move(-velocidad, 0);
    player.play("left");
  });

  rightArrow.onClick( () => {
    player.move(velocidad, 0);
    player.play("right");
  });

  enemy.onCollide("player", (jugador) => {
    jugador.destroy();
    juegoKaplay.debug.log("Don't believe in men!");
  });


  juegoKaplay.onLoad(async () => {
  
    // Mapa del nivel (10x10 cuadrado con paredes)
    const worldJson = await fetch("./world.json").then(response => response.json());

    // Crear el mapeo de índices de tiles a caracteres
    /*
    0: Representa tiles vacíos o ausentes.
    1: Representa un tipo de tile.
    3: Representa otro tipo de tile.
    4: Representa otro tipo de tile.
    5: Representa otro tipo de tile.
    6: Representa otro tipo de tile.
    13: Representa otro tipo de tile.
    26: Representa otro tipo de tile.
    41: Representa otro tipo de tile.
    42: Representa otro tipo de tile.
    46: Representa otro tipo de tile.
    94: Representa otro tipo de tile.
    */
    const tileMapping = {
        "0": () => [juegoKaplay.sprite("tiles", { frame: 26, width: 16, height:16 })],   
        "*": () => [juegoKaplay.sprite("tiles", { frame: 36, width: 16, height:16 }),juegoKaplay.area()],
       
      };

    //debug.log(tileMapping)

    worldJson.layers.forEach((layer:any) => {
        if (layer.type === "tilelayer") {
          const data = layer.data;
          const width = layer.width;
          const height = layer.height;
  
          const mapArray = [];
          const mapa = [];
          for (let i = 0; i < 10; i++) {
           mapa.push(data.slice(i * 10, (i + 1) * 10));
         }

          console.table(mapa)
          const filas = mapa.length;
          const columnas = mapa[0].length;

          let matrizTransformada = [];

          for (let fila = 0; fila < filas; fila++) {
            let filaTransformada = [];
            for (let columna = 0; columna < columnas; columna++) {
                filaTransformada.push((mapa[fila][columna]).toString());
            }
            matrizTransformada.push(filaTransformada) 
        }
          console.table(matrizTransformada)
          console.log(matrizTransformada)
          const matrizString = convertirFilasAStrings(matrizTransformada)
          console.table(matrizString)
          

          // Asegúrate de que las tiles sean cuadradas (opcional)
          const tileSize = Math.min(16, 16);

          // Agregar el nivel usando addLevel
        const level =  juegoKaplay.addLevel(matrizString, {
            tileWidth: tileSize,
            tileHeight: tileSize,
            pos: juegoKaplay.vec2(0, 0),
            tiles: {...tileMapping}
            // Agrega más mapeos para otros tiles según sea necesario
        });

          // Agregar un personaje
        const personaje = juegoKaplay.add([juegoKaplay.pos(120, 80), juegoKaplay.sprite("bean"),juegoKaplay.area()]);
    
        // Movimiento del personaje
        const speed = 200;
        juegoKaplay.onKeyDown("d", () => personaje.move(speed, 0));
        juegoKaplay.onKeyDown("a", () => personaje.move(-speed, 0));
        juegoKaplay.onKeyDown("w", () => personaje.move(0, -speed));
        juegoKaplay.onKeyDown("s", () => personaje.move(0, speed));
          
        }
    });
    /*
    const map = [
      "1111111111",
      "1000000001",
      "1000000001",
      "1000000001",
      "1000000001",
      "1000000001",
      "1000000001",
      "1000000001",
      "1000000001",
      "1111111111",
    ];
    */
  
    /*
    // Mapeo de tiles (ajusta los frames según tu tileset)
    */
    // Cargar el nivel
    /*
    const level = k.addLevel(map, {
      tileWidth: tileSize,
      tileHeight: tileSize,
      pos: k.vec2(0, 0), // Posición inicial
      tiles: {...tileMapping},
    });
    */
  });

  function convertirFilasAStrings(matriz: any) {
    let strings = [];
    for (let fila of matriz) {
      strings.push(fila.join(""));
    }
    return strings;
  }

  return (
    <>

    </>
  )
}

export default App
