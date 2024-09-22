import React from 'react';

interface Release {
  id: string;
  name: string;
  artist: string;
  type: string;
  image: string;
  releaseDate: string;
}

const ReleaseCard: React.FC<{ release: Release }> = ({ release }) => (
    <div className="release-card">
        <div className="release-card-top">
            <img className="release-image" src={release.image} alt="Release cover" />
            <div className="gradient-overlay"></div>
            <div className="release-info">
                <div className="tag-container">
                <span className="tag tag-type">{release.type}</span>
                </div>
                <h3 className="artist-name">{release.artist}</h3>
                <p className="album-name">{release.name}</p>
            </div>
        </div>
        <p className="release-date">Released: {release.releaseDate}</p>
        <a href={`https://open.spotify.com/album/${release.id}`} target="_blank" rel="noopener noreferrer" className="spotify-link">Open in Spotify ↗</a>
    </div>
  );

export default ReleaseCard;

