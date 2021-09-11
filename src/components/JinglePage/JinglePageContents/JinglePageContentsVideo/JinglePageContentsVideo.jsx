import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SingleJingleVideo from '../../../SingleJingle/SingleJingleVideo';
import Heart from '../../../Decorative/Heart';

import './JinglePageContentsVideo.scss';

const JinglePageContentsVideo = ({ singleJingle }) => (
  <div className="jingle-page-contents-video-wrapper">
    <div className="single-song">
      <div className="jingle-image-container">
        <SingleJingleVideo
          version={singleJingle.version}
          jingleId={singleJingle.jingleId}
          hideExternal
        />
      </div>
    </div>

    <div className="liked-section">
      <span>
        <Heart active={false} size="40" canLike={false} />
      </span>

      { singleJingle.likeCount }
    </div>
  </div>
);

JinglePageContentsVideo.propTypes = {
  singleJingle: PropTypes.object.isRequired,
};

const mapStateToProps = ({ singleJingle }) => ({
  singleJingle: singleJingle.singleJingle,
});

export default connect(mapStateToProps)(JinglePageContentsVideo);
