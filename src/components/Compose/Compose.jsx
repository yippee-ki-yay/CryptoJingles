import React, { Component } from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import update from 'immutability-helper';
import clsx from 'clsx';
import { Sound, Group } from 'pizzicato';
import t from 'translate';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUserSamplesAction, createJingleAction } from 'redux/actions/jingleActions';
import { getSampleSlots } from 'constants/getMockData';
import BoxLoader from '../Decorative/BoxLoader';
import PlayIcon from '../Decorative/PlayIcon';
import StopIcon from '../Decorative/StopIcon';
import LoadingIcon from '../Decorative/LoadingIcon';
import SampleBox from '../SampleBox/SampleBox';
import SampleSlot from '../SampleSlot/SampleSlot';
import { playWithDelay, createSettings } from '../../util/soundHelper';
import BuySamples from '../Common/BuySamples/BuySamples';
import Blocker from '../AccountRouteChecker/Blocker/Blocker';
import MessageBox from '../Common/MessageBox/MessageBox';
import { MESSAGE_BOX_TYPES } from '../../constants/general';
import EmptyState from '../Common/EmptyState/EmptyState';

import './Compose.scss';

class Compose extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loadingGroup: false,
      updatedSlots: false,
      sampleSlots: getSampleSlots(),
      droppedBoxIds: [],
      playing: false,
      group: null,
    };

    this.handleDrop = this.handleDrop.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.isDropped = this.isDropped.bind(this);
    this.playSound = this.playSound.bind(this);
    this.stopSound = this.stopSound.bind(this);
    this.loadGroup = this.loadGroup.bind(this);
    this.handleJingleNameChange = this.handleJingleNameChange.bind(this);
  }

  async UNSAFE_componentWillMount() { // eslint-disable-line
    if (this.props.address) this.props.getUserSamplesAction(this.props.address);
  }

  async UNSAFE_componentWillReceiveProps(newProps, nextContext) { // eslint-disable-line
    if (newProps.address === this.props.address || !newProps.address) return;

    this.props.getUserSamplesAction(newProps.address);
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

  createSong = async () => {
    const settings = createSettings(this.props);
    const sampleIds = this.state.sampleSlots.map(({ lastDroppedItem }) => lastDroppedItem.id);

    await this.props.createJingleAction(settings, sampleIds, this.state.jingleName);

    this.setState({ sampleSlots: getSampleSlots() });
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

    selectedSongSources = selectedSongSources.map(({ lastDroppedItem }) => this.props.userSamples.find((sample) => lastDroppedItem.id === sample.id));

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
    const {
      address, gettingUserSamples, gettingUserSamplesError, userSamples,
    } = this.props;

    const hasSamples = userSamples && userSamples.length > 0;
    const center = gettingUserSamples || gettingUserSamplesError || !hasSamples;

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

                  <div className="sample-slots-wrapper" ref={(ref) => { this.sampleSlots = ref; }}>
                    {
                      this.state.sampleSlots.map(({ accepts, lastDroppedItem, id }, index) => (
                        <SampleSlot
                          key={`item-${id}`}
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
                address && (
                  <form onSubmit={(e) => { e.preventDefault(); }} className="create-jingle-form">
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
                        // disabled={this.state.droppedBoxIds.length < 5}
                      >
                        Mint
                      </button>
                    </div>
                  </form>
                )
              }

              <div className="samples-section-container">
                <div className="section-title">{ t('common.your_samples') }</div>

                <div className={clsx('samples-section-wrapper', { center })}>
                  { !address && (<Blocker text="compose.unlock_wallet" />) }

                  {
                    gettingUserSamples ?
                      (
                        <div className="loader-wrapper">
                          <BoxLoader />
                          <div className="loader-message">{ t('common.getting_all_your_samples') }</div>
                        </div>
                      )
                      :
                      gettingUserSamplesError ?
                        <MessageBox type={MESSAGE_BOX_TYPES.ERROR}>{gettingUserSamplesError}</MessageBox>
                        :
                        hasSamples ?
                          (
                            <div className="compose-samples-wrapper">
                              {
                                userSamples.map((sample) => (
                                  <SampleBox
                                    draggable
                                    slots={this.sampleSlots}
                                    key={sample.id}
                                    isDropped={this.isDropped(sample.id)}
                                    {...sample}
                                  />
                                ))
                              }
                            </div>
                          )
                          :
                          (<EmptyState text={t('common.no_samples')} />)
                  }
                </div>
              </div>
            </DndProvider>
          </div>
        </div>
      </div>
    );
  }
}

Compose.defaultProps = {
  userSamples: null,
};

Compose.propTypes = {
  volumes: PropTypes.array.isRequired,
  delays: PropTypes.array.isRequired,
  cuts: PropTypes.array.isRequired,
  address: PropTypes.string.isRequired,
  removePendingTx: PropTypes.func.isRequired,
  getUserSamplesAction: PropTypes.func.isRequired,

  gettingUserSamples: PropTypes.bool.isRequired,
  gettingUserSamplesError: PropTypes.string.isRequired,
  userSamples: PropTypes.array,

  createJingleAction: PropTypes.func.isRequired,
};

const mapStateToProps = ({ compose, app, jingle }) => ({
  volumes: compose.volumes,
  delays: compose.delays,
  cuts: compose.cuts,
  address: app.address,

  gettingUserSamples: jingle.gettingUserSamples,
  gettingUserSamplesError: jingle.gettingUserSamplesError,
  userSamples: jingle.userSamples,

  creatingJingle: app.creatingJingle,
  creatingJingleError: app.creatingJingleError,
});

const mapDispatchToProps = { getUserSamplesAction, createJingleAction };

export default connect(mapStateToProps, mapDispatchToProps)(Compose);
