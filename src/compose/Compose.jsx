import React, { Component } from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContextProvider } from 'react-dnd';
import withScrolling from 'react-dnd-scrollzone';
import update from 'immutability-helper';
import { Sound, Group} from 'pizzicato';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { getSampleSlots } from '../getMockData';
import { getSamples } from '../util/web3/ethereumService';
import BoxLoader from '../components/Decorative/BoxLoader';
import PlayIcon from '../components/Decorative/PlayIcon';
import StopIcon from '../components/Decorative/StopIcon';
import LoadingIcon from '../components/Decorative/LoadingIcon';
import SampleBox from '../components/SampleBox/SampleBox';
import SampleSlot from '../components/SampleSlot/SampleSlot';
import SortSamples from '../components/SortSamples/SortSamples';
import { addPendingTx, guid, removePendingTx } from '../actions/appActions';
import { playAudio } from '../actions/audioActions';
import { getVolumes } from '../actions/composeActions';
import { SAMPLE_SORTING_OPTIONS } from '../constants/actionTypes';
import { playWithDelay, createSettings } from '../util/soundHelper';

import '../util/config';
import './Compose.css';

const ScrollingComponent = withScrolling('div');

class Compose extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      loadingGroup: false,
      updatedSlots: false,
      sampleSlots: getSampleSlots(),
      droppedBoxIds: [],
      playing: false,
      group: null,
      mySamples: [],
      sortingOptions: SAMPLE_SORTING_OPTIONS,
      selectedSort: SAMPLE_SORTING_OPTIONS[0],
    };

    this.handleDrop = this.handleDrop.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.isDropped = this.isDropped.bind(this);
    this.playSound = this.playSound.bind(this);
    this.stopSound = this.stopSound.bind(this);
    this.loadGroup = this.loadGroup.bind(this);
    this.handleJingleNameChange = this.handleJingleNameChange.bind(this);
    this.onComposeSamplesSort = this.onComposeSamplesSort.bind(this);
  }

  async componentWillMount() {
    if (!this.props.hasMM || this.props.lockedMM) {
      this.setState({ loading: false });
      return;
    }

    const mySamples = await getSamples(this.props.address);

    this.setState({ mySamples, loading: false });
    this.onComposeSamplesSort(this.state.selectedSort);
  }

  componentWillUnmount() {
    if (this.state.group === null) return;

    this.state.group.stop();
    this.setState({ playing: false, group: null });
  }

  /**
   * Fires when a jingle is dropped into a JingleSlot component
   *
   * @param {Number} index
   * @param {Object} item
   */
  handleDrop(index, item) {
    this.setState(
      update(this.state, {
        sampleSlots: { [index]: { lastDroppedItem: { $set: item, }, }, },
        droppedBoxIds: item.id ? { $push: [item.id] } : {},
      })
    );

    this.setState({ updatedSlots: true });
  }

  /**
   * Fires when a jingle is removed from a JingleSlot component
   *
   * @param {Number} index
   * @param {Object} item
   */
  handleCancel(index, { id }) {
    let droppedBoxIds = [...this.state.droppedBoxIds];
    const boxIndex = droppedBoxIds.findIndex((_id) => _id === id);
    droppedBoxIds.splice(boxIndex, 1);

    this.setState(
      update(this.state, {
        sampleSlots: { [index]: { lastDroppedItem: { $set: null } } },
        droppedBoxIds: { $set: droppedBoxIds }
      }),
    );

    this.setState({ updatedSlots: true });
  }

  /**
   * Checks if a jingle is inside one of the JingleSlot components
   *
   * @param {String} jingleId
   * @returns {Boolean}
   */
  isDropped(jingleId) { return this.state.droppedBoxIds.indexOf(jingleId) > -1 }

  /**
   * Creates group sound
   *
   */
  loadGroup(cb) {
    let selectedSongSources = this.state.sampleSlots.filter((slot) => slot.lastDroppedItem !== null);

    selectedSongSources = selectedSongSources.map(({ lastDroppedItem }) =>
      this.state.mySamples.find((sample) => lastDroppedItem.id === sample.id)
    );

    const delays = this.props.delays;

    this.setState({ loadingGroup: true });

    selectedSongSources = selectedSongSources.map(({ source }, i) =>
      new Promise((resolve) => { const sound = new Sound(source, () => {
        sound.volume = this.props.volumes[i] / 100;
        resolve(sound);
      }); }));

    Promise.all(selectedSongSources).then((sources) => {
      const longestSound = sources.reduce((prev, current, i) => (
        (prev.getRawSourceNode().buffer.duration + delays[i]) > (current.getRawSourceNode().buffer.duration) + delays[i]) ? prev : current);

      longestSound.on('stop', () => { this.setState({ playing: false }); });

      this.setState({
        group: new Group(sources),
        loadingGroup: false,
        updatedSlots: false
      });

      cb();
    });
  }

  playSound() {
    this.loadGroup(() => {
      const settings = createSettings(this.props);

      playWithDelay(this.state.group, settings, this.state.sampleSlots);
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
      const selectedSongSources = this.state.mySamples.filter(({ id }) =>
        this.state.droppedBoxIds.find((selectedId) => id === selectedId)
      );

      const jingleIds = selectedSongSources.map(s => parseInt(s.id));

      if (jingleIds.length !== 5) {
        alert('Not enough samples!');
        return;
      }

      const settings = createSettings(this.props);

      const name = this.state.jingleName;
      this.props.addPendingTx(id, 'Compose jingle');      
      const res = await window.contract.composeJingle(name, jingleIds, settings, { from: this.props.address });

      this.setState({ loading: true });

      const mySamples = await getSamples(this.props.address);

      this.setState({ mySamples, loading: false, sampleSlots: getSampleSlots() });

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

  onComposeSamplesSort = (option) => {
    let { mySamples, selectedSort } = this.state;

    if (!this.state.mySamples) return;

    switch (option.value) {
      case '-rarity': {
        mySamples = mySamples.sort((a, b) => b.rarity - a.rarity);
        selectedSort = SAMPLE_SORTING_OPTIONS[0];
        break;
      }
      case 'rarity': {
        mySamples = mySamples.sort((a, b) => a.rarity - b.rarity);
        selectedSort = SAMPLE_SORTING_OPTIONS[1];
        break;
      }
      case '-length': {
        mySamples = mySamples.sort((a, b) => b.length - a.length);
        selectedSort = SAMPLE_SORTING_OPTIONS[2];
        break;
      }
      case 'length': {
        mySamples = mySamples.sort((a, b) => a.length - b.length);
        selectedSort = SAMPLE_SORTING_OPTIONS[3];
        break;
      }
      default:
        break;
    }

    this.setState({ mySamples, selectedSort });
  };

  render() {
    const { hasMM, lockedMM } = this.props;

      return (
        <DragDropContextProvider backend={HTML5Backend}>
          <ScrollingComponent className="scroll-wrapper">
            <div className="container">
              <div className="compose-top-wrapper">
                <div className="sort-samples-wrapper">
                  <div>
                    {
                      this.state.sampleSlots.map(({ accepts, lastDroppedItem }, index) =>
                        <SampleSlot
                          key={`item-${index}`}
                          index={index}
                          accepts={accepts}
                          lastDroppedItem={lastDroppedItem}
                          id={index}
                          onDrop={item => this.handleDrop(index, item)}
                          cancelDrop={item => this.handleCancel(index, item)}
                        />
                      )
                    }

                    <div>
                           <span className="compose-play">
                             { this.state.loadingGroup && <LoadingIcon /> }
                             {
                               !this.state.playing && !this.state.loadingGroup &&
                               <span
                                 className={this.state.droppedBoxIds.length === 0 ? 'disabled-play' : ''}
                                 onClick={this.playSound}
                               >
                                 <PlayIcon />
                               </span>
                             }
                             {
                               this.state.playing && !this.state.loadingGroup &&
                               <span onClick={this.stopSound}><StopIcon /></span>
                             }
                           </span>
                    </div>
                  </div>
                </div>

                {
                  (hasMM && !lockedMM) &&
                  <form onSubmit={(e) => {e.preventDefault(); }} className="form-horizontal create-jingle-form">
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
                        onClick={ this.createSong }
                        disabled={this.state.droppedBoxIds.length !== 5}
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                }
              </div>

              <div className="separator" />

              <SortSamples
                value={this.state.selectedSort}
                options={this.state.sortingOptions}
                onSortChange={this.onComposeSamplesSort}
              />

              {
                (this.state.mySamples.length > 0) &&
                !this.state.loading &&
                <div className="my-jingles-num">{ this.state.mySamples.length } samples</div>
              }

              {
                (!hasMM && !lockedMM) &&
                <h1 className="buy-samples-link mm-link">
                  Install
                  <a
                    target="_blank"
                    rel="noopener"
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
                    (this.state.mySamples.length === 0) &&
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
                    (this.state.mySamples.length > 0) &&
                    !this.state.loading &&
                    <div className="samples-slider">
                      <div className="compose-samples-wrapper">
                          {
                            this.state.mySamples.map((sample) => (
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
      )
  }
}

const mapStateToProps = (state) => ({
  volumes: state.compose.volumes,
  delays: state.compose.delays,
  cuts: state.compose.cuts,
  hasMM: state.app.hasMM,
  lockedMM: state.app.lockedMM,
  address: state.app.address,
});

export default connect(mapStateToProps, { addPendingTx, removePendingTx, playAudio })(Compose);
