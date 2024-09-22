declare global {
  interface ImportMeta {
    env: {
      VITE_SPOTIFY_CLIENT_ID: string;
      VITE_SPOTIFY_CLIENT_SECRET: string;
      VITE_SPOTIFY_REDIRECT_URI?: string;
      // Add other environment variables as needed
    };
  }
}

const config = {
  spotify: {
    clientId: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
    clientSecret: import.meta.env.VITE_SPOTIFY_CLIENT_SECRET,
    redirectUri:
      import.meta.env.VITE_SPOTIFY_REDIRECT_URI ||
      "http://localhost:5173/callback",
  },
};

export default config;
