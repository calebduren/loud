import React from "react";
import FilterButton from "./FilterButton";
interface FiltersProps {
  releaseTypeFilter: string;
  setReleaseTypeFilter: (filter: string) => void;
}

const Filters: React.FC<FiltersProps> = ({
  releaseTypeFilter,
  setReleaseTypeFilter,
}) => (
  <div className="filter-section">
    <div className="filter-group ">
      <label className="filter-label">Filter by release length</label>
      <div className="filter-button-group">
        <FilterButton
          label="All"
          isActive={releaseTypeFilter === "All"}
          onClick={() => setReleaseTypeFilter("All")}
        />
        <FilterButton
          label="Album"
          isActive={releaseTypeFilter === "album"}
          onClick={() => setReleaseTypeFilter("album")}
        />
        <FilterButton
          label="EP"
          isActive={releaseTypeFilter === "ep"}
          onClick={() => setReleaseTypeFilter("ep")}
        />
        <FilterButton
          label="Single"
          isActive={releaseTypeFilter === "single"}
          onClick={() => setReleaseTypeFilter("single")}
        />
        <FilterButton
          label="Compilation"
          isActive={releaseTypeFilter === "compilation"}
          onClick={() => setReleaseTypeFilter("compilation")}
        />
      </div>
    </div>
  </div>
);

export default Filters;
