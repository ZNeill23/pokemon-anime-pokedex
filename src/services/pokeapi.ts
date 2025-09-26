// src/services/pokeapi.ts

interface EvolutionDetail {
  species: {
    name: string;
    url: string;
  };
  evolves_to: EvolutionDetail[];
}

export interface EvolutionLink {
  name: string;
  image: string;
}

// Helper to fetch Pokémon image from species name
const getPokemonImage = async (name: string): Promise<string> => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    if (!response.ok) return "";
    const data = await response.json();
    return (
      data.sprites.other?.["official-artwork"]?.front_default ||
      data.sprites.front_default ||
      ""
    );
  } catch {
    return "";
  }
};

// Recursively flatten evolution details into a chain
const extractChain = async (
  detail: EvolutionDetail
): Promise<EvolutionLink[]> => {
  const image = await getPokemonImage(detail.species.name);
  const current: EvolutionLink = {
    name: detail.species.name,
    image,
  };

  const nextEvos = await Promise.all(
    detail.evolves_to.map((e) => extractChain(e))
  );

  return [current, ...nextEvos.flat()];
};

// Public function to fetch evolution chain by Pokémon ID
export const fetchEvolutionChain = async (
  pokemonId: number
): Promise<EvolutionLink[]> => {
  try {
    const speciesRes = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`
    );
    if (!speciesRes.ok) return [];
    const speciesData = await speciesRes.json();

    const evoRes = await fetch(speciesData.evolution_chain.url);
    if (!evoRes.ok) return [];
    const evoData = await evoRes.json();

    return await extractChain(evoData.chain);
  } catch (err) {
    console.error("Error fetching evolution chain:", err);
    return [];
  }
};
