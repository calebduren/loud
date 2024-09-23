import React from 'react';

interface FiltersProps {
    releaseTypeFilter: string;
    setReleaseTypeFilter: (filter: string) => void;
}

const Filters: React.FC<FiltersProps> = ({ releaseTypeFilter, setReleaseTypeFilter }) => (
    <div className="filter-section">
        <div className="filter-group ">
            <label className="filter-label">Filter by release length</label>
            <div className="filter-button-grou flex flex-row gap-2 flex-wrap">
                <button 
                    className={`filter-button ${releaseTypeFilter === 'All' ? 'active' : ''}`} 
                    onClick={() => setReleaseTypeFilter('All')}
                >
                    All
                </button>
                <button 
                    className={`filter-button ${releaseTypeFilter === 'album' ? 'active' : ''}`} 
                    onClick={() => setReleaseTypeFilter('album')}
                >
                    Album
                </button>
                <button 
                    className={`filter-button ${releaseTypeFilter === 'single' ? 'active' : ''}`} 
                    onClick={() => setReleaseTypeFilter('single')}
                >
                    Single
                </button>
                <button 
                    className={`filter-button ${releaseTypeFilter === 'compilation' ? 'active' : ''}`} 
                    onClick={() => setReleaseTypeFilter('compilation')}
                >
                    Compilation
                </button>
            </div>
        </div>
    </div>
);

export default Filters;