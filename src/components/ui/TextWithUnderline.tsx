'use client'

import React, { useRef, useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface TextWithUnderlineProps {
  text: string
  className?: string
  // Opcionales para personalizar color, grosor y altura de la curva
  strokeColor?: string
  strokeWidth?: number
  curveHeight?: number
}

export function TextWithUnderline({
  text,
  className,
  strokeColor = '#5cffd7',
  strokeWidth = 18,
  curveHeight = 50,
}: TextWithUnderlineProps) {
  const textRef = useRef<SVGTextElement>(null)
  const [textWidth, setTextWidth] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (textRef.current) {
      const bbox = textRef.current.getBBox()
      // Padding responsive: sin padding en móvil, más en PC
      const padding = isMobile ? 0 : 20
      setTextWidth(bbox.width + padding)
    }
  }, [text, isMobile])

  // Centramos la curva bajo el texto
  // El viewBox X se calcula para que la curva vaya de 0 a textWidth
  return (
    <div className="inline-block">
      <svg
        width={textWidth}
        height={curveHeight + strokeWidth}
        viewBox={`0 0 ${textWidth} ${curveHeight + strokeWidth}`}
        xmlns="http://www.w3.org/2000/svg"
        className={cn('relative', className)}
        style={{ overflow: 'visible' }}
      >
        {/* Texto */}
        <text
          ref={textRef}
          x={textWidth / 2}
          y={isMobile ? "25" : "10"}
          textAnchor="middle"
          style={{
            fontFamily: 'Rubik, sans-serif',
            fontWeight: 700,
            fontSize: 'clamp(28px, 6vw, 64px)',
            dominantBaseline: 'central',
            zIndex: 10,
            position: 'relative',
          }}
          fill="rgb(0,22,46)"
        >
          {text}
        </text>
        {/* Subrayado */}
        <path
          d={`
            M ${isMobile ? 4 : 10} ${isMobile ? 25 : curveHeight}
            Q ${textWidth / 2} ${isMobile ? 18 : curveHeight - curveHeight / 2}
              ${textWidth - (isMobile ? 4 : 10)} ${isMobile ? 25 : curveHeight}
          `}
          stroke={strokeColor}
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeLinecap="square"
          style={{
            strokeWidth: 'clamp(8px, 2vw, 18px)',
            zIndex: 1,
          }}
        />
      </svg>
    </div>
  )
} 