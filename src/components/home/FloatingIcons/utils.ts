import { useEffect, useState } from "react";

export interface Position {
  x: number;
  y: number;
}

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState<{
    width: number;
    height: number;
  }>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Initial size
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}

export function getRandomPosition(width: number, height: number): Position {
  return {
    x: Math.random() * (width - 40),
    y: Math.random() * (height - 40),
  };
}

export function getRandomDirection() {
  return {
    x: Math.random() > 0.5 ? 1 : -1,
    y: Math.random() > 0.5 ? 1 : -1,
  };
}
