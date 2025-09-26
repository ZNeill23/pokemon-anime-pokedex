import React from "react";
import type { Pokemon } from "../data/pokemon";
import { episodes } from "../data/episodes";
import TypeBadge from "./TypeBadge";

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
  const firstEpisode = pokemon.firstAppearance
    ? episodes.find((e) => e.title === pokemon.firstAppearance)
    : null;

  const handleIncreaseEpisodes = () => {
    const updated: Pokemon = {
      ...pokemon,
      totalEpisodes: pokemon.totalEpisodes + 1,
    };
    onUpdate(updated);
  };

  return (
    <div className="card" onClick={onClick}>
      <img src={pokemon.image} alt={pokemon.name} />
      <h3>{pokemon.name}</h3>

      {/* Types */}
      <div className="types">
        {pokemon.types.map((t) => (
          <TypeBadge key={t} type={t} />
        ))}
      </div>

      {pokemon.firstAppearance && (
        <p>
          <strong>First Appearance:</strong> {pokemon.firstAppearance}
        </p>
      )}

      {firstEpisode && (
        <p>
          <strong>First Appearance:</strong> Season {firstEpisode.season}{" "}
          Episode {firstEpisode.id}: {firstEpisode.title}
        </p>
      )}

      <p>
        <strong>Total Episodes:</strong> {pokemon.totalEpisodes}
      </p>

      <div
        className="card-buttons"
        onClick={(e) => e.stopPropagation()} // stop modal open
      >
        <button onClick={handleIncreaseEpisodes}>+ Appearance</button>
        <button onClick={() => onDelete(pokemon.id)}>Delete</button>
      </div>
    </div>
  );
};

export default PokemonCard;
