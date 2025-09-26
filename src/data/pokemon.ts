// src/data/pokemon.ts

// Core Pokemon type used across the app
export interface Pokemon {
  id: number; // National Dex #
  name: string; // Pokémon name
  types: string[]; // Pokémon types (Fire, Water, Grass, etc.)
  image: string; // Image URL
  firstAppearance?: string; // Title of first episode appeared in
  totalEpisodes: number; // Count of total episodes appeared in
}
