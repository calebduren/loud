import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Logo from './components/Logo';
import Callback from './components/Callback';
import { fetchNewReleases } from './SpotifyApiUtils';
import './App.css';
import ReleaseCard from './components/ReleaseCard';
import Header from './components/Header';

interface Release {
  id: string;
  name: string;
  artist: string;
  type: string;
  image: string;
  releaseDate: string;
}

const Home: React.FC = () => {
  const [releases, setReleases] = useState<Release[]>([]);
  const [filteredReleases, setFilteredReleases] = useState<Release[]>([]);
  const [releaseTypeFilter, setReleaseTypeFilter] = useState<string>('All');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadReleases = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchNewReleases();
        const formattedReleases: Release[] = data.albums.items.map(item => ({
          id: item.id,
          name: item.name,
          artist: item.artists[0].name,
          type: item.album_type,
          image: item.images[0].url,
          releaseDate: item.release_date
        }));

        console.log('Formatted releases:', formattedReleases);
        setReleases(formattedReleases);
        setFilteredReleases(formattedReleases);
      } catch (error) {
        console.error('Error fetching recent releases:', error);
        setError('Failed to fetch recent releases. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    loadReleases();
  }, []);

  useEffect(() => {
    const filtered = releases.filter(release => 
      releaseTypeFilter === 'All' || release.type.toLowerCase() === releaseTypeFilter.toLowerCase()
    );
    setFilteredReleases(filtered);
  }, [releases, releaseTypeFilter]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container">
      <Header />
      <div className="filter-section">
        <div className="filter-group">
          <label className="filter-label">Filter by release type</label>
          <div className="filter-button-group">
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

      <div className="release-grid">
        {filteredReleases.length > 0 ? (
          filteredReleases.map(release => (
            <ReleaseCard key={release.id} release={release} />
          ))
        ) : (
          <div>No releases found for the selected filter.</div>
        )}
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/callback" element={<Callback />} />
      </Routes>
    </Router>
  );
};

export default App;