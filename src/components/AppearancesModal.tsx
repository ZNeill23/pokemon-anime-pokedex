import React from "react";
import type { Pokemon } from "../data/pokemon";

interface AppearancesModalProps {
  pokemon: Pokemon;
  onClose: () => void;
}

const AppearancesModal: React.FC<AppearancesModalProps> = ({ pokemon, onClose }) => {
  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close" onClick={onClose}>
          ✖
        </button>
        <h2>{pokemon.name} – All Appearances</h2>
        {pokemon.appearances && pokemon.appearances.length > 0 ? (
          <ul className="appearances-list">
            {pokemon.appearances.map((ep, i) => (
              <li key={i}>{ep}</li>
            ))}
          </ul>
        ) : (
          <p>No recorded appearances.</p>
        )}
      </div>
    </div>
  );
};

export default AppearancesModal;
