import React from 'react';

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
    <a href={`https://open.spotify.com/album/${release.id}`} target="_blank" rel="noopener noreferrer" className="release-card" title="Open in Spotify">
        <div className="release-card-top">
            <img className="release-image" src={release.image} alt="Release cover" width="100%" height="100%"/>
            <div className="gradient-overlay"></div>
            <div className="release-info flex flex-col justify-between h-full">
                <div className="tag-container">
                    <span className="tag tag-type font-semibold">{release.type === "ep" ? "EP" : release.type.charAt(0).toUpperCase() + release.type.slice(1)}</span>
                    <div className="open-in-spotify tag">Open in Spotify ↗</div>
                </div>
                <div className="release-info-container flex flex-col gap-2">
                    <h3 className="artist-name">{release.artist}</h3>
                    <p className="album-name">{release.name}</p>
                </div>
            </div>
        </div>
        <div className="release-card-bottom flex flex-col gap-3">
            <div className="release-date flex flex-row gap-4"><div className="text-gray-500 w-[64px]">Released</div> {new Date(release.releaseDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</div>
            <div className="total-tracks flex flex-row gap-4"><div className="text-gray-500 w-[64px]">Tracks</div> {release.totalTracks}</div>
        </div>
    </a>
  );

export default ReleaseCard;

