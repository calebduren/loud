import Logo from "./Logo";
import React from "react";

const Header: React.FC = () => {
  return (
<header className="mb-12 flex flex-col gap-4 items-center">
    <div className="logo-container">
        <Logo />
    </div>
    <div className="flex flex-col items-center m-0 max-w-full">
        <h1 className="text-4xl mb-6 font-bold m-0">Loud</h1>
        <p className=" text-gray-700 text-2xl mb-1 font-medium text-center">Find your next favorite record</p>
        <p className="text-lg text-gray-500 text-center">Spotify new releases with filters</p>
    </div>
    </header>
  );
};

export default Header;
