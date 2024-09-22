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

  const data = await response.json();
  if (data.access_token) {
    accessToken = data.access_token;
    console.log('New access token obtained');
  } else {
    console.error('Failed to obtain access token:', data);
    throw new Error("Failed to obtain access token");
  }
  return accessToken ?? ''; // Provide a default empty string if accessToken is null
};

interface SpotifyNewReleasesResponse {
  albums: {
    items: Array<{
      id: string;
      name: string;
      artists: Array<{ name: string }>;
      album_type: string;
      images: Array<{ url: string }>;
      release_date: string;
    }>;
  };
}

export const fetchNewReleases = async (): Promise<SpotifyNewReleasesResponse> => {
  console.log('fetchNewReleases called');
  const token = await getAccessToken();
  
  // Use the maximum limit allowed by Spotify API to get more releases
  const url = 'https://api.spotify.com/v1/browse/new-releases?limit=50&country=US';
  console.log('Sending request to Spotify API:', url);
  
  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    console.error('Spotify API request failed:', response.status, response.statusText);
    const errorBody = await response.text();
    console.error('Error body:', errorBody);
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data: SpotifyNewReleasesResponse = await response.json();
  console.log(`Fetched ${data.albums.items.length} new releases`);
  console.log('First release date:', data.albums.items[0]?.release_date);
  console.log('Last release date:', data.albums.items[data.albums.items.length - 1]?.release_date);
  
  return data;
};