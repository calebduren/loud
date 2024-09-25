import React, { useState, useEffect } from "react";
import FilterButton from "./FilterButton";

interface FiltersProps {
  initialFilters?: string[];
  onFiltersChange?: (filters: string[]) => void;
}

const filterOptions = [
  { value: "All", label: "All" },
  { value: "album", label: "Album" },
  { value: "ep", label: "EP" },
  { value: "single", label: "Single" },
  { value: "compilation", label: "Compilation" },
] as const;

type FilterOption = (typeof filterOptions)[number]["value"];

const Filters: React.FC<FiltersProps> = ({
  initialFilters = ["All"],
  onFiltersChange,
}) => {
  const [selectedFilters, setSelectedFilters] = useState<FilterOption[]>(
    initialFilters as FilterOption[]
  );

  useEffect(() => {
    if (onFiltersChange) {
      onFiltersChange(selectedFilters);
    }
  }, [selectedFilters, onFiltersChange]);

  const handleFilterClick = (filter: FilterOption) => {
    setSelectedFilters((currentFilters) => {
      if (filter === "All") {
        return currentFilters.includes("All") ? [] : ["All"];
      } else {
        const newFilters = currentFilters.filter((f) => f !== "All");
        if (newFilters.includes(filter)) {
          newFilters.splice(newFilters.indexOf(filter), 1);
        } else {
          newFilters.push(filter);
        }
        return newFilters.length ? newFilters : ["All"];
      }
    });
  };

  return (
    <div className="filter-group">
      <label className="filter-label">Filter by release length</label>
      <div className="filter-button-group">
        <FilterButton
          key={filterOptions[0].value}
          label={filterOptions[0].label}
          isActive={selectedFilters.includes(filterOptions[0].value)}
          onClick={() => handleFilterClick(filterOptions[0].value)}
        />
        <div className="filter-separator"></div>
        {filterOptions.slice(1).map((filter) => (
          <FilterButton
            key={filter.value}
            label={filter.label}
            isActive={selectedFilters.includes(filter.value)}
            onClick={() => handleFilterClick(filter.value)}
          />
        ))}
      </div>
    </div>
  );
};

export default Filters;
