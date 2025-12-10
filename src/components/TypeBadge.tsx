// This component displays a badge with a color corresponding to the Pokémon type.
import React from "react";
import { typeColors } from "../data/typeColors";

// Define the props for the TypeBadge component
interface TypeBadgeProps {
  type: string;
}

// Displays a badge with the color corresponding to the Pokémon type
const TypeBadge: React.FC<TypeBadgeProps> = ({ type }) => {
  const color = typeColors[type.toLowerCase()] || "#777";

  return (
    <span className="type-badge" style={{ backgroundColor: color }}>
      {type}
    </span>
  );
};

export default TypeBadge;
