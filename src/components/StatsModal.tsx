// This component displays a modal with statistics about the Pokémon in the list.
import React from "react";
import type { Pokemon } from "../data/pokemon";

// Define the props for the StatsModal component
interface StatsModalProps {
  pokemonList: Pokemon[];
  onClose: () => void;
}

// Displays a modal with statistics about the Pokémon in the list
const StatsModal: React.FC<StatsModalProps> = ({ pokemonList, onClose }) => {
  const totalPokemon = pokemonList.length;
  const totalAppearances = pokemonList.reduce(
    (sum, p) => sum + p.totalEpisodes,
    0
  );

  // Count by type
  const typeCounts: Record<string, number> = {};
  pokemonList.forEach((p) => {
    p.types.forEach((t) => {
      typeCounts[t] = (typeCounts[t] || 0) + 1;
    });
  });

  // Count by season (from fappearances text)
  const seasonCounts: Record<number, number> = {};
  pokemonList.forEach((p) => {
    const match = p.appearances?.[0]?.match(/Season\s+(\d+)/i);
    if (match) {
      const season = parseInt(match[1], 10);
      seasonCounts[season] = (seasonCounts[season] || 0) + 1;
    }
  });

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close" onClick={onClose}>
          ✖
        </button>
        <h2>Pokémon Stats</h2>
        <p>
          <strong>Total Pokémon:</strong> {totalPokemon}
        </p>
        <p>
          <strong>Total Episode Appearances:</strong> {totalAppearances}
        </p>

        <h3>By Type</h3>
        <ul>
          {Object.entries(typeCounts).map(([type, count]) => (
            <li key={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}: {count}
            </li>
          ))}
        </ul>

        <h3>By Season</h3>
        <ul>
          {Object.entries(seasonCounts).map(([season, count]) => (
            <li key={season}>
              Season {season}: {count}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StatsModal;
