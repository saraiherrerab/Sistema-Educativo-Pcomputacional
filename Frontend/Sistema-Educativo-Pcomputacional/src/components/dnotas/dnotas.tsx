import React from "react";
import "./dnotas.css";

interface NotasProps {
    titulo: string;
    descripcionN: string;
  }

export default function Notas({ titulo, descripcionN }: NotasProps) {
    return (
            <div className="notas-section">
                <span className="tituloNotas">{titulo}</span>
                <span className="descripcionN">{descripcionN}</span>
            </div>

    );
}