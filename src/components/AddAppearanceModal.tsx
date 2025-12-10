// Displays a modal to add a Pokémon appearance in a specific episode
import React, { useState } from "react";
import { episodes } from "../data/episodes";

// Define the props for the AddAppearanceModal component
interface AddAppearanceModalProps {
  onClose: () => void;
  onConfirm: (episodeTitle: string) => void;
}

// Displays a modal to add a Pokémon appearance in a specific episode
const AddAppearanceModal: React.FC<AddAppearanceModalProps> = ({
  onClose,
  onConfirm,
}) => {
  const [selected, setSelected] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selected) return;

    // Find the full episode details
    const episode = episodes.find((ep) => ep.title === selected);
    if (episode) {
      // ✅ Save full format "Season X Episode Y: Title"
      onConfirm(
        `Season ${episode.season} Episode ${episode.id}: ${episode.title}`
      );
    }

    onClose();
  };

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close" onClick={onClose}>
          ✖
        </button>
        <h3>Select Episode</h3>
        <form onSubmit={handleSubmit}>
          <select
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
          >
            <option value="">-- Choose an episode --</option>
            {episodes.map((ep) => (
              <option key={ep.id} value={ep.title}>
                Season {ep.season} Ep {ep.id}: {ep.title}
              </option>
            ))}
          </select>
          <div className="form-buttons">
            <button type="submit" className="add-pokemon-btn">
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAppearanceModal;
