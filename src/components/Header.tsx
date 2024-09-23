import Logo from "./Logo";
import React from "react";

const Header: React.FC = () => {
  return (
<header className="header mb-12 flex flex-col gap-4 items-center">
    <div className="logo-container">
        <Logo />
    </div>
    <div className="flex flex-col items-center m-0 max-w-full">
        <h1>Loud</h1>
        <h2 className="subheader text-gray-700 text-2xl mb-1 font-medium text-center">Find your next favorite record</h2>
        <h3 className="text-lg text-gray-500 text-center">Loud is a Spotify new releases app with filters</h3>
    </div>
    </header>
  );
};

export default Header;
