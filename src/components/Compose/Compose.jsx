import React, { Component } from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContextProvider } from 'react-dnd';
import withScrolling from 'react-dnd-scrollzone';
import { Sound, Group } from 'pizzicato';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  getComposeSamples, onComposeSamplesSort, handleSampleDrop, handleSampleDropCancel
} from '../../actions/composeActions';
import { addPendingTx, guid, removePendingTx } from '../../actions/appActions';
import { playWithDelay, createSettings } from '../../util/soundHelper';

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
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      loadingGroup: false,
      playing: false,
      group: null,
    };

    this.isDropped = this.isDropped.bind(this);
    this.playSound = this.playSound.bind(this);
    this.stopSound = this.stopSound.bind(this);
    this.loadGroup = this.loadGroup.bind(this);
    this.handleJingleNameChange = this.handleJingleNameChange.bind(this);
  }

  async componentWillMount() {
    if (!this.props.hasMM || this.props.lockedMM) {
      this.setState({ loading: false });
      return;
    }

    this.props.getComposeSamples(this.props.address);

    this.setState({ loading: false });
    this.props.onComposeSamplesSort(this.props.selectedSort);
  }

  componentWillUnmount() {
    if (this.state.group === null) return;

    this.state.group.stop();
    this.setState({ playing: false, group: null });
  }

  /**
   * Creates group sound
   *
   */
  loadGroup(cb) {
    let selectedSongSources = this.props.sampleSlots.filter(slot => slot.lastDroppedItem !== null);

    selectedSongSources = selectedSongSources.map(({ lastDroppedItem }) =>
      this.props.composeSamples.find(sample => lastDroppedItem.id === sample.id));

    const { delays } = this.props;

    this.setState({ loadingGroup: true });

    selectedSongSources = selectedSongSources.map(({ source }, i) =>
      new Promise((resolve) => {
        const sound = new Sound(source, () => {
          sound.volume = this.props.volumes[i] / 100;
          resolve(sound);
        });
      }));

    Promise.all(selectedSongSources).then((sources) => {
      const longestSound = sources.reduce((prev, current, i) => ((
        (prev.getRawSourceNode().buffer.duration + delays[i]) >
        (current.getRawSourceNode().buffer.duration) + delays[i]) ?
        prev : current
      ));

      longestSound.on('stop', () => { this.setState({ playing: false }); });

      this.setState({
        group: new Group(sources),
        loadingGroup: false,
      });

      cb();
    });
  }

  playSound() {
    this.loadGroup(() => {
      const settings = createSettings(this.props);

      playWithDelay(this.state.group, settings, this.props.sampleSlots);
      this.setState({ playing: true });
    });
  }

  stopSound() {
    if (!this.state.group) return;

    this.state.group.stop();
    this.setState({ playing: false });
  }

  createSong = async () => {
    const id = guid();

    try {
      const selectedSongSources = this.props.composeSamples.filter(({ id }) =>
        this.props.droppedSampleIds.find(selectedId => id === selectedId));

      const jingleIds = selectedSongSources.map(s => parseInt(s.id, 10));

      if (jingleIds.length !== 5) return; // TODO - show message in the  UI instead of return

      const settings = createSettings(this.props);

      let sampleIds = [];

      this.props.sampleSlots.forEach(s => {
        sampleIds.push(s.lastDroppedItem.id);
      });

      const name = this.state.jingleName;
      this.props.addPendingTx(id, 'Compose jingle');
      await window.contract.composeJingle(name, sampleIds, settings, { from: this.props.address });

      this.setState({ loading: true });

      this.props.getComposeSamples(this.props.address);

      // this.setState({ loading: false, sampleSlots: getSampleSlots() });
      this.setState({ loading: false });

      this.props.removePendingTx(id);
    } catch (err) {
      this.props.removePendingTx(id);
    }
  };

  handleJingleNameChange(e) {
    const val = e.target.value;
    if (val > 30) return;
    this.setState({ jingleName: val });
  }

  /**
   * Checks if a jingle is inside one of the JingleSlot components
   *
   * @param {String} jingleId
   * @returns {Boolean}
   */
  isDropped = jingleId => this.props.droppedSampleIds.indexOf(jingleId) > -1;

  render() {
    const {
      hasMM, lockedMM, composeSamples, sortingOptions, selectedSort, sampleSlots, droppedSampleIds,
    } = this.props;
    const { onComposeSamplesSort, handleSampleDrop, handleSampleDropCancel } = this.props;

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
                        onChange={this.handleJingleNameChange}
                      />

                      <button
                        type="submit"
                        className="btn buy-button"
                        onClick={this.createSong}
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
                    { this.state.loadingGroup && <LoadingIcon /> }
                    {
                        !this.state.playing && !this.state.loadingGroup &&
                        <span
                          className={droppedSampleIds.length === 0 ? 'disabled-play' : ''}
                          onClick={this.playSound}
                        >
                          <PlayIcon />
                        </span>
                      }
                    {
                        this.state.playing && !this.state.loadingGroup &&
                        <span onClick={this.stopSound}><StopIcon /></span>
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
                                isDropped={this.isDropped(sample.id)}
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
  address: PropTypes.string.isRequired,
  addPendingTx: PropTypes.func.isRequired,
  removePendingTx: PropTypes.func.isRequired,
  getComposeSamples: PropTypes.func.isRequired,
  onComposeSamplesSort: PropTypes.func.isRequired,
  handleSampleDrop: PropTypes.func.isRequired,
  composeSamples: PropTypes.array.isRequired,
  sortingOptions: PropTypes.array.isRequired,
  sampleSlots: PropTypes.array.isRequired,
  droppedSampleIds: PropTypes.array.isRequired,
  selectedSort: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  volumes: state.compose.volumes,
  delays: state.compose.delays,
  cuts: state.compose.cuts,
  composeSamples: state.compose.composeSamples,
  sortingOptions: state.compose.sortingOptions,
  selectedSort: state.compose.selectedSort,
  sampleSlots: state.compose.sampleSlots,
  droppedSampleIds: state.compose.sampleSlots,
  hasMM: state.app.hasMM,
  lockedMM: state.app.lockedMM,
  address: state.app.address,
});

const mapDispatchToProps = {
  addPendingTx, removePendingTx, getComposeSamples, onComposeSamplesSort, handleSampleDrop, handleSampleDropCancel,
};

export default connect(mapStateToProps, mapDispatchToProps)(Compose);
