import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import './ThreeDotsLoader.scss';

const ThreeDotsLoader = ({ big }) => (
  <div className={clsx('three-dots-loader-wrapper', { big })}>
    <div className="c-three-dots-loader" />
  </div>
);

ThreeDotsLoader.defaultProps = {
  big: false,
};

ThreeDotsLoader.propTypes = {
  big: PropTypes.bool,
};

export default ThreeDotsLoader;
