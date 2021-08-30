import React from 'react';
import PropTypes from 'prop-types';
import { numberWithCommas } from 'services/utilsService';
import ClipboardIcon from '../Icons/ClipboardIcon';

const TitleFormat = ({ copy, title }) => (
  <span>
    { copy && (<ClipboardIcon />) }

    {
      Number.isNaN(Number.parseFloat(title)) || typeof title === 'string' ?
        title :
        numberWithCommas(title, 18, true)
    }
  </span>
);

TitleFormat.defaultProps = {
  copy: true,
  title: '',
};

TitleFormat.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
  copy: PropTypes.bool,
};

export default TitleFormat;
