import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import { Sound, Group} from 'pizzicato';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { getJingleSlots } from '../getMockData';
import { getSamples } from '../util/web3/ethereumService';
import BoxLoader from '../components/Decorative/BoxLoader';
import PlayIcon from '../components/Decorative/PlayIcon';
import StopIcon from '../components/Decorative/StopIcon';
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
      jingleSlots: getJingleSlots(),
      droppedBoxIds: [],
      playing: false,
      group: null,
      myJingles: [],
      jinglesInstance: null,
      accounts: [],
    };

    this.handleDrop = this.handleDrop.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.isDropped = this.isDropped.bind(this);
    this.startStopSong = this.startStopSong.bind(this);
    this.handleJingleNameChange = this.handleJingleNameChange.bind(this);
  }

  async componentWillMount() {
    const myJingles = await getSamples();

    this.setState({ myJingles, loading: false });
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
        jingleSlots: { [index]: { lastDroppedItem: { $set: item, }, }, },
        droppedBoxIds: item.id ? { $push: [item.id] } : {},
      })
    )
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
        jingleSlots: { [index]: { lastDroppedItem: { $set: null } } },
        droppedBoxIds: { $set: droppedBoxIds }
      }),
    )
  }

  /**
   * Checks if a jingle is inside one of the JingleSlot components
   *
   * @param {String} jingleId
   * @returns {Boolean}
   */
  isDropped(jingleId) { return this.state.droppedBoxIds.indexOf(jingleId) > -1 }

  /**
   * Fires when the user starts or stops the composed song
   *
   */
  startStopSong() {
    if (this.state.group !== null) {
      this.state.group.stop();
      this.setState({ playing: false, group: null });
      return;
    }

    let selectedSongSources = this.state.jingleSlots.filter((slot) => slot.lastDroppedItem !== null);

    selectedSongSources = selectedSongSources.map(({ lastDroppedItem }) =>
      this.state.myJingles.find((sample) => lastDroppedItem.id === sample.id)
    );

    selectedSongSources = selectedSongSources.map(({ source }) =>
      new Promise((resolve) => { const sound = new Sound(source, () => {
        resolve(sound);
      }); }));

    Promise.all(selectedSongSources).then((sources) => {
      const longestSound = sources.reduce((prev, current) => (
        prev.getRawSourceNode().buffer.duration > current.getRawSourceNode().buffer.duration) ? prev : current);

      longestSound.on('stop', () => { this.setState({ playing: false }); });

      const group = new Group(sources);
      group.play();

      group.on('stop', () => {
        this.setState({ playing: false });
      });
      this.setState({ playing: true, group })
    });
  }

  createSong = async () => {
    const id = Math.floor(Math.random() * 6) + 1;

    try {
      const selectedSongSources = this.state.myJingles.filter(({ id }) =>
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

      const myJingles = await getSamples();

      this.setState({ myJingles, loading: false, jingleSlots: getJingleSlots() });

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
                    this.state.jingleSlots.map(({ accepts, lastDroppedItem }, index) =>
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
                         <span
                           className="compose-play"
                           onClick={this.startStopSong}
                         >
                           { !this.state.playing && <PlayIcon />}
                           { this.state.playing && <StopIcon />}
                         </span>
                  </div>
                </div>
              </div>

              <form onSubmit={(e) => {e.preventDefault(); }} className="form-horizontal create-jingle-form">
                <h4>Compose jingle:</h4>
                <div>
                  <input
                    className="form-control"
                    placeholder="Jingle name"
                    type="text"
                    onChange={this.handleJingleNameChange}
                  />

                  <button type="submit" className="btn buy-button" onClick={ this.createSong }>
                    Submit
                  </button>
                </div>
              </form>
            </div>

            <div className="separator" />

            {
              this.state.loading &&
              <div className="loader-wrapper">
                <BoxLoader />
              </div>
            }

            {
              (this.state.myJingles.length === 0) &&
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
              (this.state.myJingles.length > 0) &&
              !this.state.loading &&
              <div className="samples-slider">
                <h2>Your samples:</h2>

                <div className="compose-samples-wrapper">
                  {
                    this.state.myJingles.map((sample) => (
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
      )
  }
}

export default connect(null, { addPendingTx, removePendingTx, playAudio })(Compose);
