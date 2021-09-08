import React, { Component } from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import update from 'immutability-helper';
import { Sound, Group } from 'pizzicato';
import t from 'translate';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getSampleSlots } from '../../constants/getMockData';
import { getSamples } from '../../util/web3/ethereumService';
import BoxLoader from '../Decorative/BoxLoader';
import PlayIcon from '../Decorative/PlayIcon';
import StopIcon from '../Decorative/StopIcon';
import LoadingIcon from '../Decorative/LoadingIcon';
import SampleBox from '../SampleBox/SampleBox';
import SampleSlot from '../SampleSlot/SampleSlot';
import SortSamples from '../SortSamples/SortSamples';
import { addPendingTx, guid, removePendingTx } from '../../actions/appActions';
import { SAMPLE_SORTING_OPTIONS } from '../../constants/actionTypes';
import { playWithDelay, createSettings } from '../../util/soundHelper';
import BuySamples from '../Common/BuySamples/BuySamples';

import '../../util/config';
import './Compose.scss';

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

  async UNSAFE_componentWillMount() { // eslint-disable-line
    console.log('mySamples', this.props.address);
    const mySamples = await getSamples(this.props.address);

    this.setState({ mySamples, loading: false });
    this.onComposeSamplesSort(this.state.selectedSort);
  }

  componentWillUnmount() {
    if (this.state.group === null) return;

    this.state.group.stop();
    this.setState({ playing: false, group: null });
  }

  handleJingleNameChange(e) {
    const val = e.target.value;
    if (val > 30) return;
    this.setState({ jingleName: val });
  }

  /**
   * Fires when a jingle is dropped into a JingleSlot component
   *
   * @param {Number} index
   * @param {Object} item
   */
  handleDrop(index, item) {
    this.setState((preState) => update(preState, { // eslint-disable-line
      sampleSlots: { [index]: { lastDroppedItem: { $set: item } } },
      droppedBoxIds: { $push: [item.id] },
    }));

    this.setState({ updatedSlots: true });
  }

  /**
   * Fires when a jingle is removed from a JingleSlot component
   *
   * @param {Number} index
   * @param {Object} item
   */
  handleCancel(index, { id }) {
    const droppedBoxIds = [...this.state.droppedBoxIds]; // eslint-disable-line
    const boxIndex = droppedBoxIds.findIndex((_id) => _id === id);
    droppedBoxIds.splice(boxIndex, 1);

    this.setState(update(this.state, { // eslint-disable-line
      sampleSlots: { [index]: { lastDroppedItem: { $set: null } } },
      droppedBoxIds: { $set: droppedBoxIds },
    }));

    this.setState({ updatedSlots: true });
  }

  onComposeSamplesSort = (option) => {
    let { mySamples, selectedSort } = this.state;

    if (!this.state.mySamples) return;

    switch (option.value) {
    case '-rarity': {
      mySamples = mySamples.sort((a, b) => b.rarity - a.rarity);
      selectedSort = SAMPLE_SORTING_OPTIONS[0]; // eslint-disable-line
      break;
    }
    case 'rarity': {
      mySamples = mySamples.sort((a, b) => a.rarity - b.rarity);
      selectedSort = SAMPLE_SORTING_OPTIONS[1]; // eslint-disable-line
      break;
    }
    case '-length': {
      mySamples = mySamples.sort((a, b) => b.length - a.length);
      selectedSort = SAMPLE_SORTING_OPTIONS[2]; // eslint-disable-line
      break;
    }
    case 'length': {
      mySamples = mySamples.sort((a, b) => a.length - b.length);
      selectedSort = SAMPLE_SORTING_OPTIONS[3]; // eslint-disable-line
      break;
    }
    default:
      break;
    }

    this.setState({ mySamples, selectedSort });
  };

  createSong = async () => {
    const id = guid();

    try {
      const selectedSongSources = this.state.mySamples.filter(({ id }) => {
        const res = this.state.droppedBoxIds.find((selectedId) => id === selectedId);
        return res !== undefined;
      });

      const jingleIds = selectedSongSources.map((s) => parseInt(s.id, 10));

      if (jingleIds.length !== 5) return; // TODO - show message in the  UI instead of return

      const settings = createSettings(this.props);

      const sampleIds = [];

      this.state.sampleSlots.forEach((s) => {
        sampleIds.push(s.lastDroppedItem.id);
      });

      const name = this.state.jingleName;
      this.props.addPendingTx(id, 'Compose jingle');
      await window.contract.composeJingle(name, sampleIds, settings, { from: this.props.address });

      this.setState({ loading: true });

      const mySamples = await getSamples(this.props.address);

      this.setState({ mySamples, loading: false, sampleSlots: getSampleSlots() });

      this.props.removePendingTx(id);
    } catch (err) {
      this.props.removePendingTx(id);
    }
  };

  stopSound() {
    if (!this.state.group) return;

    this.state.group.stop();
    this.setState({ playing: false });
  }

  playSound() {
    this.loadGroup(() => {
      const settings = createSettings(this.props);

      playWithDelay(this.state.group, settings, this.state.sampleSlots);
      this.setState({ playing: true });
    });
  }

  /**
   * Creates group sound
   *
   */
  loadGroup(cb) {
    let selectedSongSources = this.state.sampleSlots.filter((slot) => slot.lastDroppedItem !== null);

    selectedSongSources = selectedSongSources.map(({ lastDroppedItem }) => this.state.mySamples.find((sample) => lastDroppedItem.id === sample.id));

    const { delays } = this.props;

    this.setState({ loadingGroup: true });

    selectedSongSources = selectedSongSources.map(({ source }, i) => new Promise((resolve) => {
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
        updatedSlots: false,
      });

      cb();
    });
  }

  /**
   * Checks if a jingle is inside one of the JingleSlot components
   *
   * @param {String} jingleId
   * @returns {Boolean}
   */
  isDropped(jingleId) { return this.state.droppedBoxIds.indexOf(jingleId) > -1; }

  render() {
    const { hasMM, lockedMM, address } = this.props;

    return (
      <div className="page-wrapper compose-wrapper">
        <div className="width-container">
          <div className="page-header-wrapper">
            <div className="page-title">{ t('common.compose') }</div>
            <div className="page-description">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus animi beatae cupiditate deserunt id impedit incidunt natus necessitatibus obcaecati odio odit porro quibusdam recusandae rem repellat repellendus reprehenderit, suscipit voluptate!</div>
          </div>

          <div className="page-content-wrapper">
            <DndProvider backend={HTML5Backend}>
              <div className="compose-top-wrapper">
                { address && (<BuySamples />) }

                <div className="sort-samples-wrapper">
                  <div className="compose-left-column">

                    <div className="compose-play">
                      { this.state.loadingGroup && <LoadingIcon /> }
                      {
                        !this.state.playing && !this.state.loadingGroup && (
                          <span
                            className={this.state.droppedBoxIds.length === 0 ? 'disabled-play' : ''}
                            onClick={this.playSound}
                          >
                            <PlayIcon />
                          </span>
                        )
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
                      this.state.sampleSlots.map(({ accepts, lastDroppedItem }, index) => (
                        <SampleSlot
                          key={`item-${guid()}`}
                          index={index}
                          accepts={accepts}
                          lastDroppedItem={lastDroppedItem}
                          id={index}
                          onDrop={(item) => this.handleDrop(index, item)}
                          cancelDrop={(item) => this.handleCancel(index, item)}
                        />
                      ))
                    }
                  </div>
                </div>
              </div>

              {
                (hasMM && !lockedMM) && (
                  <form onSubmit={(e) => { e.preventDefault(); }} className="form-horizontal create-jingle-form">
                    <div className="form-title">{ t('compose.mint_a_jingle') }</div>

                    <div className="input-submit-wrapper">
                      <input
                        className="form-input"
                        placeholder="Jingle name"
                        type="text"
                        onChange={this.handleJingleNameChange}
                      />

                      <button
                        type="submit"
                        className="button green"
                        onClick={this.createSong}
                        disabled={this.state.droppedBoxIds.length < 5}
                      >
                        Mint
                      </button>
                    </div>
                  </form>
                )
              }

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
                (!hasMM && !lockedMM) && (
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
                )
              }

              {
                (hasMM && lockedMM) && (
                  <h1 className="buy-samples-link mm-link">
                    Please unlock your MetaMask account.
                  </h1>
                )
              }

              {
                (hasMM && !lockedMM) && (
                  <div>

                    {
                      this.state.loading && (
                        <div className="loader-wrapper">
                          <BoxLoader />
                        </div>
                      )
                    }

                    {
                      (this.state.mySamples.length === 0) &&
                      !this.state.loading && (
                        <div>
                          { /* TODO - insert buy sample form here */ }
                          <h1 className="no-samples-heading">
                            <span>You do not own any Sound Samples yet!</span>

                            <span className="buy-samples-link">
                              <Link to={`/profile/${this.props.address}`}>Buy samples here.</Link>
                            </span>
                          </h1>
                        </div>
                      )
                    }

                    {
                      (this.state.mySamples.length > 0) &&
                      !this.state.loading && (
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
                      )
                    }
                  </div>
                )
              }
            </DndProvider>
          </div>
        </div>
      </div>
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
};

const mapStateToProps = (state) => ({
  volumes: state.compose.volumes,
  delays: state.compose.delays,
  cuts: state.compose.cuts,
  hasMM: state.app.hasMM,
  lockedMM: state.app.lockedMM,
  address: state.app.address,
});

const mapDispatchToProps = { addPendingTx, removePendingTx };

export default connect(mapStateToProps, mapDispatchToProps)(Compose);
