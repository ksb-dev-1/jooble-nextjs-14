"use client";

import {
  SiAccenture,
  SiInfosys,
  SiWipro,
  SiSwiggy,
  SiNetflix,
  SiPaytm,
  SiAdidas,
  SiFlipkart,
  SiZomato,
} from "react-icons/si";
import {
  FaAtlassian,
  FaSpotify,
  FaMicrosoft,
  FaUber,
  FaGoogle,
} from "react-icons/fa";
import { FloatingIcon } from "./FloatingIcon";
import { useWindowSize, getRandomPosition } from "./utils";
import type { IconType } from "react-icons";
import { FaAmazon } from "react-icons/fa6";

const icons: IconType[] = [
  SiAccenture,
  SiInfosys,
  SiWipro,
  SiSwiggy,
  FaAtlassian,
  FaGoogle,
  SiNetflix,
  FaSpotify,
  FaMicrosoft,
  FaUber,
  SiPaytm,
  SiAdidas,
  FaAmazon,
  SiFlipkart,
  SiZomato,
];

const FloatingIcons = () => {
  const { width, height } = useWindowSize();

  if (width === 0 || height === 0) {
    return null; // Don't render until we have window dimensions
  }

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {icons.map((Icon, index) => (
        <FloatingIcon
          key={index}
          Icon={Icon}
          initialPosition={getRandomPosition(width, height)}
          speed={0.5 + Math.random() * 0.5}
          size={24 + Math.floor(Math.random() * 40)}
          className="opacity-20 hover:opacity-40 transition-opacity duration-300"
          containerWidth={width}
          containerHeight={height}
        />
      ))}
    </div>
  );
};

export default FloatingIcons;
