import * as React from "react";

// Logo micro simple, style noir/blanc adaptatif
const Logo = ({ className = "w-8 h-8" }) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Microphone body */}
    <rect x="18" y="10" width="12" height="18" rx="6" className="stroke-black dark:stroke-white" strokeWidth="2.5" fill="none" />
    {/* Microphone stem */}
    <line x1="24" y1="28" x2="24" y2="36" className="stroke-black dark:stroke-white" strokeWidth="2.5" />
    {/* Microphone base */}
    <ellipse cx="24" cy="39" rx="6" ry="2" className="stroke-black dark:stroke-white" strokeWidth="2.5" fill="none" />
  </svg>
);

export default Logo;
