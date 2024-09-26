import React from "react";

interface ArrowUpAndRightProps {
  fill: string;
}

const ArrowUpAndRight: React.FC<ArrowUpAndRightProps> = ({ fill }) => (
  <svg
    width="9"
    height="10"
    viewBox="0 0 9 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M9 1.5H2.5V2.5H7.29297L1.14648 8.64648L1.85359 9.35359L8 3.20718V8H9V1.5Z"
      fill={fill}
    />
  </svg>
);

export default ArrowUpAndRight;
