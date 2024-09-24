import Logo from "./Logo";
import React from "react";
import Asterisk from "../assets/icons/Asterisk.tsx";

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="logo-container">
        <Logo />
      </div>
      <div className="header-text">
        <h1>Loud</h1>
        <h2>Find your next obsession</h2>
        <div className="loud-description">
          <Asterisk />
          <h3>Loud is an app to filter Spotify new releases</h3>
        </div>
      </div>
    </header>
  );
};

export default Header;
