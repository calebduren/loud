import config from './config';

let accessToken: string | null = null;

const getAccessToken = async (): Promise<string> => {
  if (accessToken) return accessToken;

  console.log('Fetching new access token...');
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(config.spotify.clientId + ':' + config.spotify.clientSecret)
    },
    body: 'grant_type=client_credentials'
  });

  if (!response.ok) {
    console.error('Failed to obtain access token:', response.status, response.statusText);
    const errorBody = await response.text();
    console.error('Error body:', errorBody);
    throw new Error(`Failed to obtain access token. Status: ${response.status}`);
  }

  const data = await response.json();
  if (data.access_token) {
    accessToken = data.access_token;
    console.log('New access token obtained');
  } else {
    console.error('Access token not found in response:', data);
    throw new Error("Access token not found in response");
  }
  return accessToken ?? ''; // Provide a default empty string if accessToken is null
};

interface SpotifyImage {
  url: string;
  height: number;
  width: number;
}

interface SpotifyArtist {
  name: string;
}

interface SpotifyAlbum {
  id: string;
  name: string;
  artists: SpotifyArtist[];
  album_type: string;
  images: SpotifyImage[];
  release_date: string;
}

interface SpotifySearchResponse {
  albums: {
    items: SpotifyAlbum[];
  };
}

export const fetchRecentReleases = async (): Promise<SpotifySearchResponse> => {
  console.log('fetchRecentReleases called');
  try {
    const token = await getAccessToken();
    console.log('Access token obtained:', token.substring(0, 5) + '...');

    const currentDate = new Date();
    const oneMonthAgo = new Date(currentDate.setMonth(currentDate.getMonth() - 1));
    const fromDate = oneMonthAgo.toISOString().split('T')[0];

    let allReleases: SpotifyAlbum[] = [];

    // Fetch albums
    const albumUrl = `https://api.spotify.com/v1/search?q=year:${fromDate}-${currentDate.getFullYear()}&type=album&limit=50`;
    console.log('Sending request to Spotify API for albums:', albumUrl);
    const albumResponse = await fetch(albumUrl, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (!albumResponse.ok) {
      throw new Error(`HTTP error! status: ${albumResponse.status}`);
    }

    const albumData: SpotifySearchResponse = await albumResponse.json();
    allReleases = [...allReleases, ...albumData.albums.items];

    // Fetch singles (using tag:new instead of type=single)
    const singleUrl = `https://api.spotify.com/v1/search?q=year:${fromDate}-${currentDate.getFullYear()}%20tag:new&type=album&limit=50`;
    console.log('Sending request to Spotify API for singles:', singleUrl);
    const singleResponse = await fetch(singleUrl, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (!singleResponse.ok) {
      throw new Error(`HTTP error! status: ${singleResponse.status}`);
    }

    const singleData: SpotifySearchResponse = await singleResponse.json();
    allReleases = [...allReleases, ...singleData.albums.items.filter(item => item.album_type === 'single')];

    // Sort releases by date, most recent first
    allReleases.sort((a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime());

    console.log(`Fetched ${allReleases.length} recent releases`);
    
    return { albums: { items: allReleases } };
  } catch (error) {
    console.error('Error in fetchRecentReleases:', error);
    throw error;
  }
};