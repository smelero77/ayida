import React, { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
  isScrolled?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className,
  width = 180,
  height = 50,
  isScrolled = false,
}) => {
  const textRef = useRef<SVGTextElement>(null);
  const [textWidth, setTextWidth] = useState(0);

  useEffect(() => {
    const ref = textRef.current;
    if (!ref) return;
    
    // Obtener el ancho del texto
    const bbox = ref.getBBox();
    setTextWidth(bbox.width);
  }, []);

  // Calcular posiciones aproximadas basadas en el ancho del texto
  const textStartX = 90 - textWidth / 2; // El texto está centrado en x=90
  const charWidth = textWidth / 10; // Aproximadamente 10 caracteres en "zetika.app"
  
  // Posiciones aproximadas para 'e' e 'i'
  const ePos = { x: textStartX + charWidth * 1.5, y: 20 }; // 'e' está en posición ~1.5
  const iPos = { x: textStartX + charWidth * 3.5, y: 20 }; // 'i' está en posición ~3.5

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 180 50"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("transition-opacity duration-200 md:w-[180px] md:h-[50px] w-[160px] h-[45px]", className)}
      style={{ opacity: isScrolled ? 0.9 : 1 }}
    >
      {/* Curva verde */}
      <path
        d="M 10 33 Q 90 25 170 36"
        stroke="#5cffd7"
        fill="transparent"
        strokeWidth="10"
        strokeLinecap="round"
      />

      {/* Texto base */}
      <text
        ref={textRef}
        x="90"
        y="35"
        fill="#071c37"
        textAnchor="middle"
        style={{
          fontFamily: "Georgia, serif",
          fontSize: "32px",
          fontWeight: 900,
          letterSpacing: "1px",
          userSelect: "none",
        }}
      >
        zetika
        <tspan fontWeight={400}>.app</tspan>
      </text>

      {/* Tilde sobre la "e" */}
      <text
        x={ePos.x}
        y={ePos.y + 5}
        textAnchor="middle"
        style={{ fontSize: "18px", fontWeight: 900 }}
        fill="#ff415a"
      >
        ́
      </text>

      {/* Punto sobre la "i" */}
      <circle
        cx={iPos.x}
        cy={iPos.y + 5}
        r="2.5"
        fill="#ff415a"
      />
    </svg>
  );
};
