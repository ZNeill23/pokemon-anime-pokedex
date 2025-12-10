// This file contains a dataset of Pokémon anime episodes with their respective season and episode numbers.
export interface Episode {
  id: number; // Episode number within the season
  season: number; // Season number
  title: string; // Episode title
}

export const episodes: Episode[] = [
  { id: 1, season: 1, title: "Pokémon - I Choose You!" },
  { id: 2, season: 1, title: "Pokémon Emergency!" },
  { id: 3, season: 1, title: "Ash Catches a Pokémon" },
  { id: 4, season: 1, title: "Challenge of the Samurai" },
  { id: 5, season: 1, title: "Showdown in Pewter City" },
  { id: 6, season: 1, title: "Clefairy and the Moon Stone" },
  { id: 7, season: 1, title: "The Water Flowers of Cerulean City" },
  { id: 8, season: 1, title: "The Path to the Pokémon League" },
  { id: 9, season: 1, title: "The School of Hard Knocks" },
  { id: 10, season: 1, title: "Bulbasaur and the Hidden Village" },
  { id: 11, season: 1, title: "Charmander – The Stray Pokémon" },
  { id: 12, season: 1, title: "Here Comes the Squirtle Squad" },
  { id: 13, season: 1, title: "Mystery at the Lighthouse" },
  { id: 14, season: 1, title: "Electric Shock Showdown" },
  { id: 15, season: 1, title: "Battle Aboard the St. Anne" },
  { id: 16, season: 1, title: "Pokémon Shipwreck" },
  { id: 17, season: 1, title: "Island of the Giant Pokémon" },
  { id: 18, season: 1, title: "Tentacool & Tentacruel" },
  { id: 19, season: 1, title: "The Ghost of Maiden's Peak" },
  { id: 20, season: 1, title: "Bye Bye Butterfree" },
  { id: 21, season: 1, title: "Abra and the Psychic Showdown" },
  { id: 22, season: 1, title: "The Tower of Terror" },
  { id: 23, season: 1, title: "Haunter vs. Kadabra" },
  { id: 24, season: 1, title: "Primeape Goes Bananas" },
  { id: 25, season: 1, title: "Pokémon Scent-sation!" },
  { id: 26, season: 1, title: "Hypno's Naptime" },
  { id: 27, season: 1, title: "Pokémon Fashion Flash" },
  { id: 28, season: 1, title: "The Punchy Pokémon" },
  { id: 29, season: 1, title: "Sparks Fly for Magnemite" },
  { id: 30, season: 1, title: "Dig Those Diglett!" },
  { id: 31, season: 1, title: "The Ninja Poké-Showdown" },
  { id: 32, season: 1, title: "The Flame Pokémon-athon!" },
  { id: 33, season: 1, title: "The Kangaskhan Kid" },
  { id: 34, season: 1, title: "The Bridge Bike Gang" },
  { id: 35, season: 1, title: "Ditto's Mysterious Mansion" },
  { id: 36, season: 1, title: "Pikachu's Goodbye" },
  { id: 37, season: 1, title: "The Battling Eevee Brothers" },
  { id: 38, season: 1, title: "Wake Up Snorlax!" },
  { id: 39, season: 1, title: "Showdown at Dark City" },
  { id: 40, season: 1, title: "The March of the Exeggutor Squad" },
  { id: 41, season: 1, title: "The Problem with Paras" },
  { id: 42, season: 1, title: "The Song of Jigglypuff" },
  // Add more episodes as needed
];
