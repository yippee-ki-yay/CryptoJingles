import React from 'react';
import PropTypes from 'prop-types';

const InfoIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="none"
    viewBox="0 0 16 16"
  >
    <g clipPath="url(#clip-info-icon)">
      <path
        fill="#16C79A"
        d="M7 11.98h1.5v-4.5H7v4.5zM7.75.73a7.5 7.5 0 100 15 7.5 7.5 0 000-15zm0 13.5a6 6 0 116-6 6.008 6.008 0 01-6 6zM7 5.98h1.5v-1.5H7v1.5z"
      />
    </g>
    <defs>
      <clipPath id="clip-info-icon">
        <path
          fill="#fff"
          d="M0 0H15V15H0z"
          transform="translate(.25 .73)"
        />
      </clipPath>
    </defs>
  </svg>
);

InfoIcon.propTypes = {};

export default InfoIcon;
