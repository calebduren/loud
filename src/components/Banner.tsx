import React from 'react';

const Banner: React.FC = () => {
  return (
    <div className="banner">
      <p>Due to a known issue with the Spotify API, we are currently unable to fetch releases newer than April 2024.</p>
    </div>
  );
};

export default Banner;