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
  onViewAppearances: (pokemon: Pokemon) => void;
}

const PokemonCard: React.FC<PokemonCardProps> = ({
  pokemon,
  onDelete,
  onUpdate,
  onClick,
  onViewAppearances,
}) => {
  const [showAddAppearance, setShowAddAppearance] = useState(false);

  const firstEpisode =
    pokemon.appearances && pokemon.appearances.length > 0
      ? episodes.find((e) => e.title === pokemon.appearances![0])
      : null;

  const dexNumber = `#${pokemon.id.toString().padStart(3, "0")}`;

  return (
    <div className="card" onClick={onClick}>
      <div className="pokemon-card-content">
        <img src={pokemon.image} alt={pokemon.name} />
        <h3>
          {dexNumber} {pokemon.name}
        </h3>

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
      </div>

      <div className="card-buttons">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowAddAppearance(true);
          }}
        >
          + Appearance
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(pokemon.id);
          }}
        >
          Delete
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onViewAppearances(pokemon);
          }}
          className="view-appearances-btn"
        >
          View All Appearances
        </button>
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
                : [episodeTitle],
            };
            onUpdate(updated);
          }}
        />
      )}
    </div>
  );
};

export default PokemonCard;
