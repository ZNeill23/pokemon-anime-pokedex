// This component provides a search bar for filtering Pokémon by name.
import React from "react";

// Define the props for the SearchBar component
interface SearchBarProps {
  onSearch: (value: string) => void;
}

// Provides a search bar for filtering Pokémon by name
const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search Pokémon..."
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
