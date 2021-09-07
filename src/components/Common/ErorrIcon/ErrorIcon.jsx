import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import './ErrorIcon.scss';

const ErrorIcon = ({ type }) => (
  <div className={clsx('error-icon-wrapper', { box: type === 'box' })}>
    <div className="error-icon-wrapper-error">
      <div className="error-icon-wrapper-error-x">
        <div className="error-icon-wrapper-error-left" />
        <div className="error-icon-wrapper-error-right" />
      </div>
      <div className="error-icon-wrapper-error-placeholder" />
      <div className="error-icon-wrapper-error-fix" />
    </div>
  </div>
);

ErrorIcon.defaultProps = {
  type: '',
};

ErrorIcon.propTypes = {
  type: PropTypes.string,
};

export default ErrorIcon;
