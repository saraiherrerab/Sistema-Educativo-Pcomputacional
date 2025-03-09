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
  juegoKaplay.loadSprite("robot", "sprites/robot-preview.png");
  const player= juegoKaplay.add([juegoKaplay.pos(0,0),juegoKaplay.sprite("robot")]);
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

  return (
    <>

    </>
  )
}

export default App
