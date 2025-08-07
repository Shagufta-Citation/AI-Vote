
import React from 'react';

interface IconProps {
  className?: string;
}

const TrophyIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M11.9999 21.0011C11.9999 21.0011 2.99994 17.0011 2.99994 10.0011V5.00105L11.9999 1.00105L20.9999 5.00105V10.0011C20.9999 17.0011 11.9999 21.0011 11.9999 21.0011Z"
    />
     <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.0039 12.001L12.0039 9.00098L9.00391 12.001"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12.0039 9.00098V15.001"
    />
  </svg>
);

export default TrophyIcon;
