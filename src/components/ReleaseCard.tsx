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
            <div className="release-info flex flex-col justify-between h-full">
                <div className="tag-container">
                    {/* {release.genres.slice(0, 2).map((genre, index) => (
                        <span key={index} className="tag font-semibold">{genre.charAt(0).toUpperCase() + genre.slice(1)}</span>
                    ))} */}
                    <span className="tag tag-type font-semibold">{release.type.charAt(0).toUpperCase() + release.type.slice(1)}</span>
                </div>
                <h3 className="artist-name text-white">{release.artist}</h3>
                <p className="album-name text-white">{release.name}</p>
            </div>
        </div>
        <p className="release-date">Released: {release.releaseDate}</p>
        <a href={`https://open.spotify.com/album/${release.id}`} target="_blank" rel="noopener noreferrer" className="spotify-link">Open in Spotify ↗</a>
    </div>
  );

export default ReleaseCard;

