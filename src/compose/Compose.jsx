import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import { Sound, Group} from 'pizzicato';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { getSapleSlots } from '../getMockData';
import { getSamples } from '../util/web3/ethereumService';
import BoxLoader from '../components/Decorative/BoxLoader';
import PlayIcon from '../components/Decorative/PlayIcon';
import StopIcon from '../components/Decorative/StopIcon';
import LoadingIcon from '../components/Decorative/LoadingIcon';
import SampleBox from '../components/SampleBox/SampleBox';
import SampleSlot from '../components/SampleSlot/SampleSlot';
import { addPendingTx, removePendingTx } from '../actions/appActions';
import { playAudio } from '../actions/audioActions';

import '../util/config';
import './Compose.css';

@DragDropContext(HTML5Backend)
class Compose extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      loadingGroup: false,
      updatedSlots: false,
      sampleSlots: getSapleSlots(),
      droppedBoxIds: [],
      playing: false,
      group: null,
      mySamples: [],
    };

    this.handleDrop = this.handleDrop.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.isDropped = this.isDropped.bind(this);
    this.playSound = this.playSound.bind(this);
    this.stopSound = this.stopSound.bind(this);
    this.loadGroup = this.loadGroup.bind(this);
    this.handleJingleNameChange = this.handleJingleNameChange.bind(this);
  }

  async componentWillMount() {
    if (!window.web3.eth) {
      this.setState({ loading: false });
      return;
    }

    const mySamples = await getSamples();

    this.setState({ mySamples, loading: false });
  }

  componentWillReceiveProps(nextProps) {
    console.log('nextProps', nextProps);
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
  loadGroup() {
    let selectedSongSources = this.state.sampleSlots.filter((slot) => slot.lastDroppedItem !== null);

    selectedSongSources = selectedSongSources.map(({ lastDroppedItem }) =>
      this.state.mySamples.find((sample) => lastDroppedItem.id === sample.id)
    );

    this.setState({ loadingGroup: true });

    selectedSongSources = selectedSongSources.map(({ source }) =>
      new Promise((resolve) => { const sound = new Sound(source, () => {
        resolve(sound);
      }); }));

    Promise.all(selectedSongSources).then((sources) => {
      const longestSound = sources.reduce((prev, current) => (
        prev.getRawSourceNode().buffer.duration > current.getRawSourceNode().buffer.duration) ? prev : current);

      longestSound.on('stop', () => { this.setState({ playing: false }); });

      this.setState({
        group: new Group(sources),
        loadingGroup: false,
        updatedSlots: false
      });
      this.playSound();
    });
  }

  playSound() {
    if (this.state.updatedSlots || (!this.state.group && (this.state.droppedBoxIds.length > 0))) {
      this.loadGroup();
      return
    }

    this.state.group.play();
    this.setState({ playing: true });
  }

  stopSound() {
    if (!this.state.group) return;

    this.state.group.stop();
    this.setState({ playing: false });
  }

  createSong = async () => {
    const id = Math.floor(Math.random() * 6) + 1;

    try {
      const selectedSongSources = this.state.mySamples.filter(({ id }) =>
        this.state.droppedBoxIds.find((selectedId) => id === selectedId)
      );

      const jingleIds = selectedSongSources.map(s => parseInt(s.id));

      if (jingleIds.length !== 5) {
        alert('Not enough samples!');
        return;
      }

      const name = this.state.jingleName;
      this.props.addPendingTx(id, 'Create jingle');
      
      const res = await window.contract.composeJingle(name, jingleIds, { from: window.web3.eth.accounts[0] });

      this.setState({ loading: true });

      const mySamples = await getSamples();

      this.setState({ mySamples, loading: false, sampleSlots: getSapleSlots() });

      this.props.removePendingTx(id);
      console.log(res);
    } catch (err) {
      this.props.removePendingTx(id);
    }
  };

  handleJingleNameChange(e) {
    const val = e.target.value;
    if (val > 30) return;
    this.setState({ jingleName: val });
  }

  render() {
      return (
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
                window.web3.eth &&
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

            {
              !window.web3.eth &&
              <h1 className="buy-samples-link mm-link">
                Install
                <a
                  target="_blank"
                  rel="noopener"
                  href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en"
                >
                  MetaMask
                </a>
                in order to see your samples
              </h1>
            }

            {
              window.web3.eth &&
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
                        <Link to={`/profile/${window.web3.eth.accounts[0]}`}>Buy samples here.</Link>
                      </span>
                    </h1>
                  </div>
                }

                {
                  (this.state.mySamples.length > 0) &&
                  !this.state.loading &&
                  <div className="samples-slider">
                    <h2>Your samples:</h2>

                    <div className="compose-samples-wrapper">
                      {
                        this.state.mySamples.map((sample) => (
                          <SampleBox
                            draggable
                            key={sample.id}
                            isDropped={this.isDropped(sample.id)}
                            {...sample}
                          />)
                        )
                      }
                    </div>
                  </div>
                }
              </div>
            }
          </div>
      )
  }
}

export default connect(null, { addPendingTx, removePendingTx, playAudio })(Compose);
