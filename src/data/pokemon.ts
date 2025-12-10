// This file defines the structure of a Pokémon object used in the application.
export interface Pokemon {
  id: number;
  name: string;
  image: string;
  types: string[];
  totalEpisodes: number;
  lastEpisodeSeen?: string;
  appearances: string[]; // ✅ first appearance + all others
}
