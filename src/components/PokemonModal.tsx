// This component displays a modal with detailed information about a selected Pokémon, including its stats and evolution chain.
import React, { useEffect, useState } from "react";
import type { Pokemon } from "../data/pokemon";
import { fetchEvolutionChain } from "../services/pokeapi";
import TypeBadge from "./TypeBadge";

// Capitalizes the first letter of a string
const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

// Define the props for the PokemonModal component
interface PokemonModalProps {
  pokemon: Pokemon;
  onClose: () => void;
  pokemonList: Pokemon[];
  onSelectPokemon: (id: number) => void;
}

// Displays a modal with detailed information about a selected Pokémon, including its stats and evolution chain
interface PokemonStat {
  base_stat: number;
  stat: {
    name: string;
  };
}

// Defines the structure of the API response for Pokémon details
interface PokemonApiResponse {
  stats: PokemonStat[];
}

// Defines the structure for evolution chain links
interface EvolutionLink {
  name: string;
  image: string;
}

// Displays a modal with detailed information about a selected Pokémon, including its stats and evolution chain
const PokemonModal: React.FC<PokemonModalProps> = ({
  pokemon,
  onClose,
  pokemonList,
  onSelectPokemon,
}) => {
  const [extraData, setExtraData] = useState<PokemonApiResponse | null>(null);
  const [evolutionChain, setEvolutionChain] = useState<EvolutionLink[]>([]);

  useEffect(() => {
    (async () => {
      try {
        // Fetch Pokémon details (stats, etc.)
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.id}`
        );
        if (response.ok) {
          const data: PokemonApiResponse = await response.json();
          setExtraData(data);
        }

        // Fetch evolution chain
        const evo = await fetchEvolutionChain(pokemon.id);
        setEvolutionChain(evo);
      } catch (err) {
        console.error("Error fetching Pokémon modal data:", err);
      }
    })();
  }, [pokemon.id]);

  const stats =
    extraData?.stats?.map((s) => ({
      name: s.stat.name,
      value: s.base_stat,
    })) || [];

  const dexNumber = `#${pokemon.id.toString().padStart(3, "0")}`;

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close" onClick={onClose}>
          ✖
        </button>

        <img src={pokemon.image} alt={pokemon.name} />
        <h2>
          {dexNumber} {capitalize(pokemon.name)}
        </h2>

        {/* Types */}
        <div className="types">
          {pokemon.types.map((t) => (
            <TypeBadge key={t} type={t} />
          ))}
        </div>

        {/* Stats */}
        <div className="stats-grid">
          {stats.map((stat) => (
            <div className="stat-row" key={stat.name}>
              <span className="stat-label">{capitalize(stat.name)}</span>
              <div className="stat-bar">
                <div
                  className="stat-fill"
                  style={{ width: `${Math.min(stat.value, 100)}%` }}
                >
                  {stat.value}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Evolution Chain */}
        {evolutionChain.length > 0 && (
          <>
            <h3>Evolution Chain</h3>
            <div className="evolution-chain">
              {evolutionChain.map((evo, index) => {
                const found = pokemonList.find(
                  (p) => p.name.toLowerCase() === evo.name.toLowerCase()
                );
                const isAvailable = Boolean(found);

                return (
                  <React.Fragment key={index}>
                    <div
                      className={`evo-entry ${
                        isAvailable ? "clickable" : "unavailable"
                      }`}
                      onClick={() => {
                        if (found) onSelectPokemon(found.id);
                      }}
                    >
                      <img src={evo.image} alt={evo.name} />
                      <p>{capitalize(evo.name)}</p>
                    </div>

                    {index < evolutionChain.length - 1 && (
                      <span className="evo-arrow">→</span>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PokemonModal;
