import React, { Component } from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContextProvider } from 'react-dnd';
import withScrolling from 'react-dnd-scrollzone';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  getComposeSamples, onComposeSamplesSort, handleSampleDrop, handleSampleDropCancel, playNewJingle,
  stopNewJinglePlaying, createNewJingle, handleNewJingleNameChange, isSampleDropped,
} from '../../actions/composeActions';
import { guid } from '../../actions/appActions';

import BoxLoader from '../Decorative/BoxLoader';
import PlayIcon from '../Decorative/PlayIcon';
import StopIcon from '../Decorative/StopIcon';
import LoadingIcon from '../Decorative/LoadingIcon';
import SampleBox from '../SampleBox/SampleBox';
import SampleSlot from '../SampleSlot/SampleSlot';
import SortSamples from '../SortSamples/SortSamples';

import '../../util/config';
import './Compose.scss';

const ScrollingComponent = withScrolling('div');

class Compose extends Component {
  async componentWillMount() {
    if (this.props.hasMM && !this.props.lockedMM) {
      this.props.getComposeSamples(this.props.address);
      this.props.onComposeSamplesSort(this.props.selectedSort);
    }

    this.setState({ loading: false });
  }

  componentWillUnmount() { this.props.stopNewJinglePlaying(); }

  render() {
    const {
      hasMM, lockedMM, composeSamples, sortingOptions, selectedSort, sampleSlots, droppedSampleIds, loadingNewJingle,
      playingNewJingle, onComposeSamplesSort, handleSampleDrop, handleSampleDropCancel, playNewJingle,
      stopNewJinglePlaying, createNewJingle, handleNewJingleNameChange, isSampleDropped,
    } = this.props;

    return (
      <DragDropContextProvider backend={HTML5Backend}>
        <ScrollingComponent className="scroll-wrapper">
          <div className="container">
            <div className="compose-top-wrapper">

              {
                  (hasMM && !lockedMM) &&
                  <form onSubmit={(e) => { e.preventDefault(); }} className="form-horizontal create-jingle-form">
                    <h4>Compose jingle:</h4>
                    <div>
                      <input
                        className="form-control"
                        placeholder="Jingle name"
                        type="text"
                        onChange={handleNewJingleNameChange}
                      />

                      <button
                        type="submit"
                        className="btn buy-button"
                        onClick={createNewJingle}
                        disabled={droppedSampleIds.length < 5}
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                }

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

                <div className="sample-slots-wrapper">
                  {
                      sampleSlots.map(({ accepts, lastDroppedItem }, index) =>
                        (<SampleSlot
                          key={`item-${guid()}`}
                          index={index}
                          accepts={accepts}
                          lastDroppedItem={lastDroppedItem}
                          id={index}
                          onDrop={item => handleSampleDrop(index, item)}
                          cancelDrop={item => handleSampleDropCancel(index, item)}
                        />))
                    }
                </div>
              </div>
            </div>

            <div className="separator" />

            <SortSamples
              value={selectedSort}
              options={sortingOptions}
              onSortChange={onComposeSamplesSort}
            />

            {
                (composeSamples.length > 0) &&
                !this.state.loading &&
                <div className="my-jingles-num">{ composeSamples.length } samples</div>
              }

            {
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

            {
                (hasMM && lockedMM) &&
                <h1 className="buy-samples-link mm-link">
                  Please unlock your MetaMask account.
                </h1>
              }

            {
                (hasMM && !lockedMM) &&
                <div>

                  {
                    this.state.loading &&
                    <div className="loader-wrapper">
                      <BoxLoader />
                    </div>
                  }

                  {
                    (composeSamples.length === 0) &&
                    !this.state.loading &&
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

                  {
                    (composeSamples.length > 0) &&
                    !this.state.loading &&
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
  loadingNewJingle: PropTypes.bool.isRequired,
  address: PropTypes.string.isRequired,
  getComposeSamples: PropTypes.func.isRequired,
  onComposeSamplesSort: PropTypes.func.isRequired,
  handleSampleDrop: PropTypes.func.isRequired,
  handleSampleDropCancel: PropTypes.func.isRequired,
  playNewJingle: PropTypes.func.isRequired,
  stopNewJinglePlaying: PropTypes.func.isRequired,
  composeSamples: PropTypes.array.isRequired,
  sortingOptions: PropTypes.array.isRequired,
  sampleSlots: PropTypes.array.isRequired,
  droppedSampleIds: PropTypes.array.isRequired,
  selectedSort: PropTypes.object.isRequired,
  playingNewJingle: PropTypes.bool.isRequired,
  createNewJingle: PropTypes.func.isRequired,
  handleNewJingleNameChange: PropTypes.func.isRequired,
  isSampleDropped: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  volumes: state.compose.volumes,
  delays: state.compose.delays,
  cuts: state.compose.cuts,
  composeSamples: state.compose.composeSamples,
  sortingOptions: state.compose.sortingOptions,
  selectedSort: state.compose.selectedSort,
  sampleSlots: state.compose.sampleSlots,
  droppedSampleIds: state.compose.droppedSampleIds,
  loadingNewJingle: state.compose.loadingNewJingle,
  playingNewJingle: state.compose.playingNewJingle,
  hasMM: state.app.hasMM,
  lockedMM: state.app.lockedMM,
  address: state.app.address,
});

const mapDispatchToProps = {
  getComposeSamples,
  onComposeSamplesSort,
  handleSampleDrop,
  handleSampleDropCancel,
  playNewJingle,
  stopNewJinglePlaying,
  createNewJingle,
  handleNewJingleNameChange,
  isSampleDropped,
};

export default connect(mapStateToProps, mapDispatchToProps)(Compose);
