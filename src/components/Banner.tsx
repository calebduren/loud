import React from 'react';

const Banner: React.FC = () => {
  return (
    <div className="banner">
      <p>Due to a <a className="underline" href="https://community.spotify.com/t5/Spotify-for-Developers/Spotify-API-returns-403-for-new-releases/td-p/10886889" target="_blank" rel="noopener noreferrer">known issue</a> with Spotify&rsquo;s API, we are currently unable to fetch releases newer than April&nbsp;2024.</p>
    </div>
  );
};

export default Banner;