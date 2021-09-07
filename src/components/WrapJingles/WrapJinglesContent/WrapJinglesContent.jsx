import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import SingleJingleContentItem from './SingleJingleContentItem/SingleJingleContentItem';

import './WrapJinglesContent.scss';

const WrapJinglesContent = ({ jingles }) => {
  console.log('TEST');
  return (
    <div className="wrap-jingles-content-wrapper">
      { jingles.map((jingle) => <SingleJingleContentItem key={`${jingles.version}-${jingle.jingleId}`} jingle={jingle} />) }
    </div>
  );
};

WrapJinglesContent.defaultProps = { jingles: null };

WrapJinglesContent.propTypes = { jingles: PropTypes.array };

export default WrapJinglesContent;
