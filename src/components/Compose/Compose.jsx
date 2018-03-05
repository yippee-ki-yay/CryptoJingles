import React, { Component } from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContextProvider } from 'react-dnd';
import withScrolling from 'react-dnd-scrollzone';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  getComposeSamples, onComposeSamplesSort, stopNewJinglePlaying, isSampleDropped,
} from '../../actions/composeActions';

import SampleBox from '../SingleSample/SingleSample';
import SortSamples from '../SortSamples/SortSamples';
import NewJingleNameForm from './NewJingleNameForm/NewJingleNameForm';
import ComposeMixer from './ComposeMixer/ComposeMixer';

import '../../constants/config';
import './Compose.scss';

const ScrollingComponent = withScrolling('div');

class Compose extends Component {
  async componentWillMount() {
    if (!this.props.hasMM || this.props.lockedMM) return;

    this.props.getComposeSamples(this.props.address);
    this.props.onComposeSamplesSort(this.props.selectedSort);
  }

  componentWillUnmount() { this.props.stopNewJinglePlaying(); }

  render() {
    const {
      hasMM, lockedMM, composeSamples, sortingOptions, selectedSort,
      onComposeSamplesSort, isSampleDropped,
    } = this.props;

    return (
      <DragDropContextProvider backend={HTML5Backend}>
        <ScrollingComponent className="scroll-wrapper">
          <div className="container">

            <div className="compose-top-wrapper">
              { (hasMM && !lockedMM) && <NewJingleNameForm /> }
              <ComposeMixer />
            </div>


            <div className="separator" />

            <SortSamples
              value={selectedSort}
              options={sortingOptions}
              onSortChange={onComposeSamplesSort}
            />

            { // Number of samples
              (composeSamples.length > 0) &&
              <div className="my-jingles-num">{ composeSamples.length } samples</div>
            }

            { // No MetaMaks message
              (!hasMM && !lockedMM) &&
              <h1 className="buy-samples-link mm-link">
                Install
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en"
                >
                  MetaMask
                </a>
                in order to see your samples.
              </h1>
            }

            { // Locked MetaMaks message
              (hasMM && lockedMM) &&
              <h1 className="buy-samples-link mm-link">
                Please unlock your MetaMask account.
              </h1>
            }

            { // No samples message
              (hasMM && !lockedMM) &&
              (composeSamples.length === 0) &&
              <div>
                { /* TODO - insert buy sample form here */ }
                <h1 className="no-samples-heading">
                  <span>You do not own any Sound Samples yet!</span>

                  <span className="buy-samples-link">
                    <Link to={`/profile/${this.props.address}`}>Buy samples here.</Link>
                  </span>
                </h1>
              </div>
            }

            { // List of user samples
              (hasMM && !lockedMM) &&
              (composeSamples.length > 0) &&
              <div className="samples-slider">
                <div className="compose-samples-wrapper">
                  {
                    composeSamples.map(sample => (
                      <SampleBox
                        draggable
                        key={sample.id}
                        isDropped={isSampleDropped(sample.id)}
                        {...sample}
                      />
                    ))
                  }
                </div>
              </div>
            }
          </div>
        </ScrollingComponent>
      </DragDropContextProvider>
    );
  }
}

Compose.propTypes = {
  volumes: PropTypes.array.isRequired,
  delays: PropTypes.array.isRequired,
  cuts: PropTypes.array.isRequired,
  hasMM: PropTypes.bool.isRequired,
  lockedMM: PropTypes.bool.isRequired,
  address: PropTypes.string.isRequired,
  getComposeSamples: PropTypes.func.isRequired,
  onComposeSamplesSort: PropTypes.func.isRequired,
  stopNewJinglePlaying: PropTypes.func.isRequired,
  composeSamples: PropTypes.array.isRequired,
  sortingOptions: PropTypes.array.isRequired,
  droppedSampleIds: PropTypes.array.isRequired,
  selectedSort: PropTypes.object.isRequired,
  isSampleDropped: PropTypes.func.isRequired,
};

const mapStateToProps = ({ compose, app }) => ({
  volumes: compose.volumes,
  delays: compose.delays,
  cuts: compose.cuts,
  composeSamples: compose.composeSamples,
  sortingOptions: compose.sortingOptions,
  droppedSampleIds: compose.droppedSampleIds,
  selectedSort: compose.selectedSort,
  hasMM: app.hasMM,
  lockedMM: app.lockedMM,
  address: app.address,
});

const mapDispatchToProps = {
  getComposeSamples,
  onComposeSamplesSort,
  stopNewJinglePlaying,
  isSampleDropped,
};

export default connect(mapStateToProps, mapDispatchToProps)(Compose);
