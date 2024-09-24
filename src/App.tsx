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
  totalTracks: number;
}

interface GroupedReleases {
  [key: string]: {
    startDate: Date;
    endDate: Date;
    releases: Release[];
  };
}

const Home: React.FC = () => {
  const [releases, setReleases] = useState<Release[]>([]);
  const [filteredReleases, setFilteredReleases] = useState<Release[]>([]);
  const [releaseTypeFilter, setReleaseTypeFilter] = useState<string>('All');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getWeekRange = (date: Date): { startDate: Date; endDate: Date } => {
    const startDate = new Date(date);
    startDate.setDate(date.getDate() - date.getDay());
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);
    return { startDate, endDate };
  };

  useEffect(() => {
    const loadReleases = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchNewReleases();
        const formattedReleases: Release[] = data.albums.items.map((item: any) => ({
          id: item.id,
          name: item.name,
          artist: item.artists[0].name,
          type: item.album_type,
          image: item.images[0].url,
          releaseDate: item.release_date,
          totalTracks: item.total_tracks,
        }));

        const sortedReleases = formattedReleases.sort((a, b) => 
          new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
        );

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
    const sortedFilteredReleases = filtered.sort((a, b) => 
      new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
    );
    setFilteredReleases(sortedFilteredReleases);
  }, [releases, releaseTypeFilter]);

  if (isLoading) return <div className='loading'><Spinner /></div>;
  if (error) return <div className='error'>Error: {error}</div>;

  const groupedReleases: GroupedReleases = filteredReleases.reduce((acc: GroupedReleases, release) => {
    const releaseDate = new Date(release.releaseDate);
    const { startDate, endDate } = getWeekRange(releaseDate);
    const weekKey = startDate.toISOString();
    
    if (!acc[weekKey]) {
      acc[weekKey] = { startDate, endDate, releases: [] };
    }
    acc[weekKey].releases.push(release);
    return acc;
  }, {});

  return (
    <>
      <Banner />
      <div className="container">
        <Header />
        <Filters setReleaseTypeFilter={setReleaseTypeFilter} releaseTypeFilter={releaseTypeFilter} />
        {Object.entries(groupedReleases)
          .sort(([, a], [, b]) => b.startDate.getTime() - a.startDate.getTime())
          .map(([weekKey, { startDate, endDate, releases }]) => {
            const startDateString = startDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
            const endDateString = endDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
            return (
              <React.Fragment key={weekKey}>
                <h4 className="release-date-header">{startDateString} to {endDateString}</h4>
                <div className="release-grid">
                  {releases.map((release: Release) => (
                    <ReleaseCard key={release.id} release={release}/>
                  ))}
                </div>
              </React.Fragment>
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