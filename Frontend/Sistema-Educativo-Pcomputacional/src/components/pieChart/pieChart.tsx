import React from "react";
import "./styles.css";

interface PieChartProps {
  value1: number;
  value2: number;
  color1?: string;
  color2?: string;
  size?: number;
}

const PieChart: React.FC<PieChartProps> = ({
  value1,
  value2,
  color1 = "#00AEB5",
  color2 = "#45DFE6",
  size = 160,
}) => {
  const total = value1 + value2;
  const angle1 = (value1 / total) * 360;

  // Calcular el ángulo medio del primer sector
  const angleMid = (angle1 / 2) * (Math.PI / 180); // pasar a radianes

  // Calcular la posición del label (en un radio al 70% del tamaño)
  const radius = size / 2;
  const labelRadius = radius * 0.7;

  const labelX = radius + labelRadius * Math.cos(angleMid) - 15; // 15 es para centrar el texto
  const labelY = radius + labelRadius * Math.sin(angleMid) - 10;

  return (
    <div
      className="pie-chart"
      style={{
        width: size,
        height: size,
        background: `conic-gradient(${color1} 0deg ${angle1}deg, ${color2} ${angle1}deg 360deg)`,
        position: "relative",
      }}
    >
      <span
        className="pie-label"
        style={{
          position: "absolute",
          top: labelY -35,
          left: labelX+65,
          fontWeight: "bold",
        }}
      >
        {Math.round((value1 / total) * 100)}%
      </span>
    </div>
  );
};

export default PieChart;
