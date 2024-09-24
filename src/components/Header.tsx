import Logo from "./Logo";
import React from "react";
import QuestionMark from "../assets/icons/QuestionMark.tsx";

const Header: React.FC = () => {
  return (
<header className="header">
    <div className="logo-container">
        <Logo />
    </div>
    <div className="header-text">
        <h1>Loud</h1>
        <h2>Find your next favorite record</h2>
        <div className="flex items-center gap-1">
            <QuestionMark />
            <h3>Loud is an app to filter Spotify new releases</h3>
        </div>
    </div>
    </header>
  );
}

export default Header;
