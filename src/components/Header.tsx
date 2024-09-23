import Logo from "./Logo";
import React from "react";

const Header: React.FC = () => {
  return (
<header className="mb-12 flex flex-col gap-4 items-center">
    <div className="logo-container m-6">
        <Logo />
    </div>
    <div className="flex flex-col gap-1 items-center m-0">
        <h1 className="text-3xl font-extrabold m-0">Loud</h1>
        <p className=" text-gray-700 text-lg">New music, new releases, new artists.</p>
        <p className="text-sm text-gray-500">Filterable Spotify releases.</p>
    </div>
    </header>
  );
};

export default Header;
