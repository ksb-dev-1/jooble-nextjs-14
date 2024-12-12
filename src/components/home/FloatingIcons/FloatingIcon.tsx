"use client";

import { useEffect, useState } from "react";
import { IconType } from "react-icons";
import { Position, getRandomDirection } from "./utils";

interface FloatingIconProps {
  Icon: IconType;
  size?: number;
  className?: string;
  initialPosition: Position;
  speed?: number;
  containerWidth: number;
  containerHeight: number;
}

export function FloatingIcon({
  Icon,
  size = 24,
  className = "",
  initialPosition,
  speed = 1,
  containerWidth,
  containerHeight,
}: FloatingIconProps) {
  const [position, setPosition] = useState(initialPosition);
  const [direction, setDirection] = useState(getRandomDirection());

  useEffect(() => {
    if (containerWidth === 0 || containerHeight === 0) return;

    const interval = setInterval(() => {
      setPosition((prev) => {
        const newX = prev.x + direction.x * speed;
        const newY = prev.y + direction.y * speed;

        // Bounce off the edges
        if (newX <= 0 || newX >= containerWidth - size) {
          setDirection((prev) => ({ ...prev, x: -prev.x }));
        }
        if (newY <= 0 || newY >= containerHeight - size) {
          setDirection((prev) => ({ ...prev, y: -prev.y }));
        }

        return {
          x: Math.max(0, Math.min(newX, containerWidth - size)),
          y: Math.max(0, Math.min(newY, containerHeight - size)),
        };
      });
    }, 50);

    return () => clearInterval(interval);
  }, [direction, size, speed, containerWidth, containerHeight]);

  return (
    <div
      className={`absolute transition-transform duration-[50ms] ease-linear ${className}`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
    >
      <Icon size={size} className="text-black" />
    </div>
  );
}
