import React from "react";

const Logo: React.FC = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0 0.5C0 0.223858 0.223858 0 0.5 0H11.5C11.7761 0 12 0.223858 12 0.5V31.5C12 31.7761 11.7761 32 11.5 32H0.5C0.223858 32 0 31.7761 0 31.5V0.5Z"
      fill="var(--primary-color)"
    />
    <path
      d="M31.2 20.6C31.5296 20.3528 32 20.588 32 21V31.5C32 31.7761 31.7761 32 31.5 32H17.5C17.0195 32 16.8156 31.3883 17.2 31.1L31.2 20.6Z"
      fill="var(--primary-color)"
    />
  </svg>
);

export default Logo;
