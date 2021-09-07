import React from 'react';
import PropTypes from 'prop-types';
import EmptyIcon from '../Icons/EmptyIcon';

import './EmptyState.scss';

const EmptyState = ({ text, buttonText, handleButtonClick }) => (
  <div className="empty-state-wrapper">
    <EmptyIcon />
    { text }

    {
      buttonText && (
        <button type="button" className="button green" onClick={handleButtonClick}>{ buttonText }</button>
      )
    }
  </div>
);

EmptyState.defaultProps = {
  buttonText: '',
  handleButtonClick: () => {},
};

EmptyState.propTypes = {
  text: PropTypes.string.isRequired,
  buttonText: PropTypes.string,
  handleButtonClick: PropTypes.func,
};

export default EmptyState;
