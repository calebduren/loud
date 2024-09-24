import React from "react";

const FilterButton = ({ onClick, label, isActive }) => {
  return (
    <button
      onClick={onClick}
      className={`filter-button ${isActive ? "active" : ""}`}
    >
      {label}
    </button>
  );
};

export default FilterButton;
