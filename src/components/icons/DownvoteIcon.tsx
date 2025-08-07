
import React from 'react';

interface IconProps {
  className?: string;
}

const DownvoteIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 20l8-8h-5V4H9v8H4l8 8z" />
  </svg>
);

export default DownvoteIcon;
