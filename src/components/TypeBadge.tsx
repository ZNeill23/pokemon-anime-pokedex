import React from "react";
import { typeColors } from "../data/typeColors";

interface TypeBadgeProps {
  type: string;
}

const TypeBadge: React.FC<TypeBadgeProps> = ({ type }) => {
  const color = typeColors[type.toLowerCase()] || "#777";

  return (
    <span className="type-badge" style={{ backgroundColor: color }}>
      {type}
    </span>
  );
};

export default TypeBadge;
