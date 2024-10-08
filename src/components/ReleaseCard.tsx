import React from "react";
import ArrowUpAndRight from "../assets/icons/ArrowUpAndRight";
interface Release {
  id: string;
  name: string;
  artist: string;
  type: string;
  image: string;
  releaseDate: string;
  totalTracks: number;
}

const ReleaseCard: React.FC<{ release: Release }> = ({ release }) => (
  <a
    href={`https://open.spotify.com/album/${release.id}`}
    target="_blank"
    rel="noopener noreferrer"
    className="release-card"
    title="Open in Spotify"
  >
    <div className="release-card-top">
      <img className="release-image" src={release.image} alt="Release cover" />
      <div className="gradient-overlay"></div>
      <div className="release-info">
        <div className="tag-container">
          <span className="tag tag-type font-semibold">
            {release.type === "ep"
              ? "EP"
              : release.type.charAt(0).toUpperCase() + release.type.slice(1)}
          </span>
          <div className="open-in-spotify tag">
            Open in Spotify <ArrowUpAndRight fill="#fff" />
          </div>
        </div>
        <div className="release-info-container">
          <h3 className="artist-name">{release.artist}</h3>
          <p className="album-name">{release.name}</p>
        </div>
      </div>
    </div>
    <div className="release-card-bottom">
      <div className="release-card-bottom-content">
        <div className="release-date release-meta-item">
          <div className="label">Released</div>{" "}
          {new Date(release.releaseDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </div>
        <div className="total-tracks release-meta-item">
          <div className="label">Tracks</div> {release.totalTracks}
        </div>
        <div className="touch-only faux-link">
          Open in Spotify <ArrowUpAndRight fill="var(--primary-color)" />
        </div>
      </div>
    </div>
  </a>
);

export default ReleaseCard;
