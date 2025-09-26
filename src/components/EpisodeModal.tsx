import React from "react";
import type { Episode } from "../data/episodes";

interface EpisodeModalProps {
  episode: Episode;
  onClose: () => void;
}

const EpisodeModal: React.FC<EpisodeModalProps> = ({ episode, onClose }) => {
  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close" onClick={onClose}>
          ✖
        </button>
        <h2>
          {episode.id}: {episode.title}
        </h2>
        <p>
          <strong>Season:</strong> {episode.season}
        </p>
      </div>
    </div>
  );
};

export default EpisodeModal;
