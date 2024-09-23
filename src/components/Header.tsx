import Logo from "./Logo";
import React from "react";

const Header: React.FC = () => {
  return (
<header className="header">
    <div className="logo-container">
        <Logo />
    </div>
    <div className="header-text">
        <h1>Loud</h1>
        <h2>Find your next favorite record</h2>
        <h3>Loud is an app to filter Spotify new releases</h3>
    </div>
    </header>
  );
};

export default Header;
