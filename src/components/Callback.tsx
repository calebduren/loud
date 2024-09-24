import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Callback: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Get the authorization code from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      // Here you would typically send this code to your backend
      // to exchange it for an access token
      console.log("Authorization code:", code);

      // For now, let's just redirect to the home page
      navigate("/");
    }
  }, [navigate]);

  return <div>Processing authentication...</div>;
};

export default Callback;
