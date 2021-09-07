import React from 'react';
import PropTypes from 'prop-types';
import SingleJingleContentItem from './SingleJingleContentItem/SingleJingleContentItem';

import './WrapJinglesContent.scss';

const WrapJinglesContent = ({ jingles }) => {
  console.log(jingles, 'jingles');
  return (
    <div className="wrap-jingles-content-wrapper content-wrapper">
      <div className="page-title">Wrap Jingles</div>
      <div className="page-description">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus animi beatae cupiditate deserunt id impedit incidunt natus necessitatibus obcaecati odio odit porro quibusdam recusandae rem repellat repellendus reprehenderit, suscipit voluptate!</div>

      <div className="jingles-grid-wrapper">
        { jingles.map((jingle) => <SingleJingleContentItem key={jingle.jingleId} jingle={jingle} />) }
      </div>
    </div>
  );
};

WrapJinglesContent.defaultProps = { jingles: null };

WrapJinglesContent.propTypes = { jingles: PropTypes.array };

export default WrapJinglesContent;
