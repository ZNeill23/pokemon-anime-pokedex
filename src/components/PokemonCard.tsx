import React, { useState } from "react";
import type { Pokemon } from "../data/pokemon";
import { episodes } from "../data/episodes";
import TypeBadge from "./TypeBadge";
import AddAppearanceModal from "./AddAppearanceModal";

interface PokemonCardProps {
  pokemon: Pokemon;
  onDelete: (id: number) => void;
  onUpdate: (pokemon: Pokemon) => void;
  onClick: () => void; // open modal
}

const PokemonCard: React.FC<PokemonCardProps> = ({
  pokemon,
  onDelete,
  onUpdate,
  onClick,
}) => {
  const [showAddAppearance, setShowAddAppearance] = useState(false);

  // ✅ Get first appearance from appearances array (first recorded episode)
  const firstEpisode =
    pokemon.appearances && pokemon.appearances.length > 0
      ? episodes.find((e) => e.title === pokemon.appearances![0])
      : null;

  const dexNumber = `#${pokemon.id.toString().padStart(3, "0")}`;

  return (
    <div className="card" onClick={onClick}>
      <img src={pokemon.image} alt={pokemon.name} />
      <h3>
        {dexNumber} {pokemon.name}
      </h3>

      {/* Types */}
      <div className="types">
        {pokemon.types.map((t) => (
          <TypeBadge key={t} type={t} />
        ))}
      </div>

      {firstEpisode && (
        <p>
          <strong>First Appearance:</strong> Season {firstEpisode.season} Ep{" "}
          {firstEpisode.id}: {firstEpisode.title}
        </p>
      )}

      <p>
        <strong>Total Episodes:</strong> {pokemon.totalEpisodes}
      </p>

      <p>
        <strong>Last Episode Seen:</strong>{" "}
        {pokemon.lastEpisodeSeen || "Not recorded"}
      </p>

      <div
        className="card-buttons"
        onClick={(e) => e.stopPropagation()} // prevent opening modal
      >
        <button onClick={() => setShowAddAppearance(true)}>+ Appearance</button>
        <button onClick={() => onDelete(pokemon.id)}>Delete</button>
      </div>

      {showAddAppearance && (
        <AddAppearanceModal
          onClose={() => setShowAddAppearance(false)}
          onConfirm={(episodeTitle) => {
            const updated: Pokemon = {
              ...pokemon,
              totalEpisodes: pokemon.totalEpisodes + 1,
              lastEpisodeSeen: episodeTitle,
              appearances: pokemon.appearances
                ? [...pokemon.appearances, episodeTitle]
                : [episodeTitle], // ✅ ensures first appearance is preserved
            };
            onUpdate(updated);
          }}
        />
      )}
    </div>
  );
};

export default PokemonCard;
