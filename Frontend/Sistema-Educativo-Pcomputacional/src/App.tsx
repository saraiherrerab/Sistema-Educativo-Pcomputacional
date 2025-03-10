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
        quiet:{from: 0, to: 0, loop: false},
    },
});
  juegoKaplay.loadSprite("up", "sprites/up-arrow.png");
  juegoKaplay.loadSprite("down", "sprites/down-arrow.png");
  juegoKaplay.loadSprite("left", "sprites/left-arrow.png");
  juegoKaplay.loadSprite("right", "sprites/right-arrow.png");
  const player= juegoKaplay.add([juegoKaplay.pos(0,0),juegoKaplay.sprite("robot"), juegoKaplay.scale(5), juegoKaplay.area()]);
  const upArrow= juegoKaplay.add([juegoKaplay.pos(500,500),juegoKaplay.sprite("up"), juegoKaplay.scale(0.8), juegoKaplay.area()]);
  const downArrow= juegoKaplay.add([juegoKaplay.pos(700,700),juegoKaplay.sprite("down"),juegoKaplay.scale(0.8), juegoKaplay.area()]);
  const leftArrow= juegoKaplay.add([juegoKaplay.pos(0,100),juegoKaplay.sprite("left"), juegoKaplay.scale(0.8), juegoKaplay.area()]);
  const rightArrow= juegoKaplay.add([juegoKaplay.pos(700,100),juegoKaplay.sprite("right"), juegoKaplay.scale(0.8), juegoKaplay.area()]);
  const velocidad = 200

  
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
  });

  rightArrow.onClick( () => {
    player.move(velocidad, 0);
    player.play("right");
  });


  return (
    <>

    </>
  )
}

export default App
