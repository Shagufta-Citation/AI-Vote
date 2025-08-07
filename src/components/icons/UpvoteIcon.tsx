
import React from 'react';

interface IconProps {
  className?: string;
}

const UpvoteIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 4L4 12h5v8h6v-8h5L12 4z" />
  </svg>
);

export default UpvoteIcon;
