// This component provides a form to add or edit Pokémon entries, with auto-fill features from the PokéAPI.
import React, { useEffect, useState } from "react";
import type { Pokemon } from "../data/pokemon";
import { episodes } from "../data/episodes";

// Define the props for the PokemonForm component
interface PokemonFormProps {
  onAdd: (pokemon: Pokemon) => void;
  onUpdate: (pokemon: Pokemon) => void;
  editing: Pokemon | null;
}

// Provides a form to add or edit Pokémon entries, with auto-fill features from the PokéAPI
interface PokeApiType {
  type: { name: string };
}

// Defines the structure of the API response for Pokémon details
interface PokeApiResponse {
  id: number;
  name: string;
  types: PokeApiType[];
  sprites: {
    front_default: string | null;
    other?: {
      ["official-artwork"]?: {
        front_default: string | null;
      };
    };
  };
}

// Capitalizes the first letter of a string
const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

// Provides a form to add or edit Pokémon entries, with auto-fill features from the PokéAPI
const PokemonForm: React.FC<PokemonFormProps> = ({
  onAdd,
  onUpdate,
  editing,
}) => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [types, setTypes] = useState("");
  const [image, setImage] = useState("");
  const [firstAppearance, setFirstAppearance] = useState("");

  const [allNames, setAllNames] = useState<string[]>([]);

  // Prefill when editing
  useEffect(() => {
    if (editing) {
      setId(editing.id.toString());
      setName(editing.name);
      setTypes(editing.types.join(", "));
      setImage(editing.image);
      setFirstAppearance(editing.appearances?.[0] || "");
    } else {
      handleClear();
    }
  }, [editing]);

  // Load all Pokémon names for autocomplete
  useEffect(() => {
    const fetchNames = async () => {
      try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=2000");
        const data = await res.json();
        setAllNames(
          data.results.map((p: { name: string }) => capitalize(p.name))
        );
      } catch (err) {
        console.error("Error fetching Pokémon list:", err);
      }
    };
    fetchNames();
  }, []);

  // Auto-fill from Pokédex number
  useEffect(() => {
    if (!id) return;

    const fetchById = async () => {
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!res.ok) return;
        const data: PokeApiResponse = await res.json();

        setName(capitalize(data.name));
        setTypes(data.types.map((t) => t.type.name).join(", "));
        setImage(
          data.sprites.other?.["official-artwork"]?.front_default ||
            data.sprites.front_default ||
            ""
        );
      } catch (err) {
        console.error("Error fetching Pokémon by ID:", err);
      }
    };

    fetchById();
  }, [id]);

  // Auto-fill from Pokémon name
  useEffect(() => {
    if (!name || id) return; // skip if empty name or Dex # already set

    const fetchByName = async () => {
      try {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`
        );
        if (!res.ok) return;
        const data: PokeApiResponse = await res.json();

        setId(data.id.toString());
        setName(capitalize(data.name));
        setTypes(data.types.map((t) => t.type.name).join(", "));
        setImage(
          data.sprites.other?.["official-artwork"]?.front_default ||
            data.sprites.front_default ||
            ""
        );
      } catch (err) {
        console.error("Error fetching Pokémon by name:", err);
      }
    };

    fetchByName();
  }, [name, id]);

  // Manual clear function
  const handleClear = () => {
    setId("");
    setName("");
    setTypes("");
    setImage("");
    setFirstAppearance("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newPokemon: Pokemon = {
      id: parseInt(id, 10),
      name: capitalize(name),
      types: types.split(",").map((t) => t.trim()),
      image,
      totalEpisodes: 1, // first appearance counts as one
      appearances: firstAppearance ? [firstAppearance] : [],
      lastEpisodeSeen: firstAppearance || undefined,
    };

    if (editing) {
      onUpdate(newPokemon);
    } else {
      onAdd(newPokemon);
    }

    handleClear();
  };

  return (
    <form onSubmit={handleSubmit} className="pokemon-form">
      <input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        placeholder="Dex #"
        value={id}
        onChange={(e) => setId(e.target.value.replace(/\D/g, ""))}
      />

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        list="pokemon-names"
      />
      <datalist id="pokemon-names">
        {allNames.map((n) => (
          <option key={n} value={n} />
        ))}
      </datalist>

      <input
        type="text"
        placeholder="Types (comma-separated)"
        value={types}
        onChange={(e) => setTypes(e.target.value)}
      />
      <input
        type="text"
        placeholder="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <select
        value={firstAppearance}
        onChange={(e) => setFirstAppearance(e.target.value)}
        required
      >
        <option value="">Select First Appearance</option>
        {episodes.map((ep) => (
          <option
            key={ep.id}
            value={`Season ${ep.season} Episode ${ep.id}: ${ep.title}`}
          >
            Season {ep.season} Episode {ep.id}: {ep.title}
          </option>
        ))}
      </select>

      <div className="form-buttons">
        <button type="submit" className="add-pokemon-btn">
          + Add Pokémon
        </button>
        <button type="button" className="clear-btn" onClick={handleClear}>
          Clear
        </button>
      </div>
    </form>
  );
};

export default PokemonForm;
