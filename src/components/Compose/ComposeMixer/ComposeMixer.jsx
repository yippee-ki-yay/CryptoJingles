import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { playNewJingle, stopNewJinglePlaying, } from '../../../actions/composeActions';
import PlayIcon from '../../Decorative/PlayIcon';
import StopIcon from '../../Decorative/StopIcon';
import LoadingIcon from '../../Decorative/LoadingIcon';
import ComposeMixerDropSlots from './ComposeMixerDropSlots';

const ComposeMixer = ({
  loadingNewJingle, playingNewJingle, droppedSampleIds, playNewJingle, stopNewJinglePlaying,
}) => (
  <div className="sort-samples-wrapper">
    <div className="compose-left-column">

      <div className="compose-play">
        { loadingNewJingle && <LoadingIcon /> }

        {
          !playingNewJingle && !loadingNewJingle &&
          <span
            className={droppedSampleIds.length === 0 ? 'disabled-play' : ''}
            onClick={playNewJingle}
          >
            <PlayIcon />
          </span>
        }

        {
          playingNewJingle && !loadingNewJingle &&
          <span onClick={stopNewJinglePlaying}><StopIcon /></span>
        }
      </div>

      <div className="slot-options">
        <div>Volume</div>
        <div>Delay</div>
        <div>Cut</div>
      </div>
    </div>

    <ComposeMixerDropSlots />
  </div>
);

ComposeMixer.propTypes = {
  loadingNewJingle: PropTypes.bool.isRequired,
  playingNewJingle: PropTypes.bool.isRequired,
  droppedSampleIds: PropTypes.array.isRequired,
  playNewJingle: PropTypes.func.isRequired,
  stopNewJinglePlaying: PropTypes.func.isRequired,
};

const mapStateToProps = ({ compose }) => ({
  loadingNewJingle: compose.loadingNewJingle,
  playingNewJingle: compose.playingNewJingle,
  droppedSampleIds: compose.droppedSampleIds,
});

const mapDispatchToProps = {
  playNewJingle, stopNewJinglePlaying,
};

export default connect(mapStateToProps, mapDispatchToProps)(ComposeMixer);
