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
            <img className="release-image" src={release.image} alt="Release cover" width="100%" height="100%"/>
            <div className="gradient-overlay"></div>
            <div className="release-info flex flex-col justify-between h-full">
                <div className="tag-container">
                    <span className="tag tag-type font-semibold">{release.type === "ep" ? "EP" : release.type.charAt(0).toUpperCase() + release.type.slice(1)}</span>
                </div>
                <div className="release-info-container flex flex-col gap-1">
                    <h3 className="artist-name text-white text-lg leading-6 text-shadow-md font-medium m-0">{release.artist}</h3>
                    <p className="album-name text-white text-lg leading-6 text-shadow-md font-medium m-0">{release.name}</p>
                </div>
            </div>
        </div>
        <div className="release-card-bottom flex flex-col gap-1">
            <p className="release-date text-sm font-medium">{new Date(release.releaseDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</p>
            <a href={`https://open.spotify.com/album/${release.id}`} target="_blank" rel="noopener noreferrer" className="spotify-link font-semibold text-sm">Open in Spotify ↗</a>
        </div>
    </div>
  );

export default ReleaseCard;

