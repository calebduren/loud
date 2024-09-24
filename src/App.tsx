import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Callback from './components/Callback';
import { fetchNewReleases } from './SpotifyApiUtils';
import './App.css';
import ReleaseCard from './components/ReleaseCard';
import Header from './components/Header';
import Filters from './components/Filters';
import Banner from './components/Banner';
import Spinner from './components/Spinner';

interface Release {
  id: string;
  name: string;
  artist: string;
  type: string;
  image: string;
  releaseDate: string;
  totalTracks: any;
}

const Home: React.FC = () => {
  const [releases, setReleases] = useState<Release[]>([]);
  const [filteredReleases, setFilteredReleases] = useState<Release[]>([]);
  const [releaseTypeFilter, setReleaseTypeFilter] = useState<string>('All');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getWeek = (date: Date) => {
    const onejan = new Date(date.getFullYear(), 0, 1);
    return Math.ceil((((date.getTime() - onejan.getTime()) / 86400000) + onejan.getDay() + 1) / 7);
  };

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
          releaseDate: item.release_date,
          totalTracks: item.total_tracks,
        }));

        // Sort releases by most recent to least recent
        const sortedReleases = formattedReleases.sort((a, b) => new Date(b.releaseDate) > new Date(a.releaseDate) ? 1 : -1);

        console.log('Formatted releases:', sortedReleases);
        setReleases(sortedReleases);
        setFilteredReleases(sortedReleases);
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
    // Sort filtered releases by most recent to least recent
    const sortedFilteredReleases = filtered.sort((a, b) => new Date(b.releaseDate) > new Date(a.releaseDate) ? 1 : -1);
    setFilteredReleases(sortedFilteredReleases);
  }, [releases, releaseTypeFilter]);

  if (isLoading) return <div className='loading'><Spinner /></div>;
  if (error) return <div className='error'>Error: {error}</div>;

  const groupedReleases = filteredReleases.reduce((acc, release) => {
    const date = new Date(release.releaseDate);
    const week = getWeek(date);
    if (!acc[week]) {
      acc[week] = { date: date, releases: [] };
    }
    acc[week].releases.push(release);
    return acc;
  }, {});

  return (
    <>
    <Banner />
    <div className="container">
      <Header />
      <Filters setReleaseTypeFilter={setReleaseTypeFilter} releaseTypeFilter={releaseTypeFilter} />
      {Object.entries(groupedReleases).sort((a, b) => new Date(b[1].date) > new Date(a[1].date) ? 1 : -1).map(([week, { date, releases }]) => {
        const startDate = new Date(date);
        startDate.setDate(date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1));
        const endDate = new Date(date);
        endDate.setDate(date.getDate() - date.getDay() + 7);
        const startDateString = startDate.toLocaleDateString('en-US', { month: 'long' }) + ' ' + startDate.getDate();
        const endDateString = endDate.toLocaleDateString('en-US', { month: 'long' }) + ' ' + endDate.getDate() + ', ' + endDate.getFullYear();
        return (
          <>
            <h4 className="release-date-header">{startDateString} to {endDateString}</h4>
            <div key={week} className="release-grid">
              {releases.map((release: Release) => (
                <ReleaseCard key={release.id} release={release}/>
              ))}
            </div>
          </>
        );
      })}
    </div>
    </>
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