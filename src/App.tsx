import { useState, useEffect } from "react";
import "./index.css";
import type { Pokemon } from "./data/pokemon";
import { episodes } from "./data/episodes";
import PokemonForm from "./components/PokemonForm";
import PokemonCard from "./components/PokemonCard";
import PokemonModal from "./components/PokemonModal";
import SearchBar from "./components/SearchBar";
import { typeColors } from "./data/typeColors";
import StatsModal from "./components/StatsModal";

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

function App() {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>(() => {
    try {
      const raw = localStorage.getItem("pokemonList");
      return raw ? (JSON.parse(raw) as Pokemon[]) : [];
    } catch {
      return [];
    }
  });

  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedSeasons, setSelectedSeasons] = useState<number[]>([]);

  useEffect(() => {
    localStorage.setItem("pokemonList", JSON.stringify(pokemonList));
  }, [pokemonList]);

  const handleAdd = (pokemon: Pokemon) => {
    setPokemonList((prev) => [...prev, pokemon].sort((a, b) => a.id - b.id));
  };

  const handleDelete = (id: number) => {
    setPokemonList((prev) => prev.filter((p) => p.id !== id));
  };

  const handleUpdate = (updated: Pokemon) => {
    setPokemonList((prev) =>
      prev
        .map((p) => (p.id === updated.id ? updated : p))
        .sort((a, b) => a.id - b.id)
    );
  };

  const toggleType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const clearFilters = () => {
    setSelectedTypes([]);
  };

  const toggleSeason = (season: number) => {
    setSelectedSeasons((prev) =>
      prev.includes(season)
        ? prev.filter((s) => s !== season)
        : [...prev, season]
    );
  };

  const clearSeasons = () => {
    setSelectedSeasons([]);
  };

  const getSeasonFromEpisode = (episodeTitle?: string): number | null => {
    if (!episodeTitle) return null;

    // Case 1: Handle "Season X Episode Y: Title"
    if (episodeTitle.startsWith("Season")) {
      const match = episodeTitle.match(/Season\s+(\d+)/i);
      if (match) {
        return parseInt(match[1], 10);
      }
    }

    // Case 2: Match by raw title (fallback)
    const ep = episodes.find((e) => e.title === episodeTitle);
    return ep ? ep.season : null;
  };

  const filtered = pokemonList
    .filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((p) =>
      selectedTypes.length > 0
        ? p.types.some((t) => selectedTypes.includes(t))
        : true
    )
    .filter((p) => {
      if (selectedSeasons.length === 0) return true;
      const season = getSeasonFromEpisode(p.appearances?.[0]);
      return season !== null && selectedSeasons.includes(season);
    })
    .sort((a, b) => a.id - b.id);

  const seasonNumbers = [...new Set(episodes.map((e) => e.season))];

  const [showStats, setShowStats] = useState(false);

  return (
    <>
      <header>
        <h1>Pokémon Anime Pokédex</h1>
        <button className="add-btn" onClick={() => setShowStats(true)}>
          Show Stats
        </button>
      </header>

      <SearchBar onSearch={setSearchTerm} />

      {/* === Type Filters === */}
      <div className="filters">
        {Object.keys(typeColors).map((type) => (
          <button
            key={type}
            className={`filter-btn ${
              selectedTypes.includes(type) ? "active" : ""
            }`}
            style={{
              background: selectedTypes.includes(type)
                ? typeColors[type]
                : "#eee",
              color: selectedTypes.includes(type) ? "white" : "#333",
            }}
            onClick={() => toggleType(type)}
          >
            {capitalize(type)}
          </button>
        ))}
        {selectedTypes.length > 0 && (
          <button className="clear-filter-btn" onClick={clearFilters}>
            Clear Type Filters
          </button>
        )}
      </div>

      {/* === Season Filters === */}
      <div className="filters">
        {seasonNumbers.map((season) => (
          <button
            key={season}
            className={`filter-btn ${
              selectedSeasons.includes(season) ? "active" : ""
            }`}
            onClick={() => toggleSeason(season)}
          >
            Season {season}
          </button>
        ))}
        {selectedSeasons.length > 0 && (
          <button className="clear-filter-btn" onClick={clearSeasons}>
            Clear Season Filters
          </button>
        )}
      </div>

      <PokemonForm onAdd={handleAdd} onUpdate={handleUpdate} editing={null} />

      <div className="grid">
        {filtered.map((p) => (
          <PokemonCard
            key={p.id}
            pokemon={p}
            onClick={() => setSelectedPokemon(p)}
            onDelete={handleDelete}
            onUpdate={handleUpdate} // ✅ important for appearance modal
          />
        ))}
      </div>

      {selectedPokemon && (
        <PokemonModal
          pokemon={selectedPokemon}
          onClose={() => setSelectedPokemon(null)}
          pokemonList={pokemonList}
          onSelectPokemon={(id: number) =>
            setSelectedPokemon(pokemonList.find((p) => p.id === id) || null)
          }
        />
      )}

      {showStats && (
        <StatsModal
          pokemonList={pokemonList}
          onClose={() => setShowStats(false)}
        />
      )}
    </>
  );
}

export default App;
