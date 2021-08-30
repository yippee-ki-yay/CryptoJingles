import React from 'react';
import PropTypes from 'prop-types';

const CloseIcon = ({ size, color }) => (
  <div className="close-icon">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M23 1L1 23M1 1l22 22"
      />
    </svg>
  </div>
);

CloseIcon.defaultProps = {
  size: 22,
  color: '#fff',
};

CloseIcon.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
};

export default CloseIcon;
