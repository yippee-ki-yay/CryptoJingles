import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';
import { Sound, Group } from 'pizzicato';
import { getJingleIdsMock, getJingleFromJingleId, getJingleSlots } from '../getMockData';
import getWeb3 from '../util/web3/getWeb3';
import { getJingles } from '../util/web3/ethereumService';
import BoxLoader from '../components/Decorative/BoxLoader';
import JingleBox from '../components/JingleBox/JingleBox';
import JingleSlot from '../components/JingleSlot/JingleSlot';

import '../util/config';

import './Compose.css';

/**
 * Wrapper component for JingleSlot components
 *
 * @param {Object} props
 * @returns {Function}
 */
const SortableItem = SortableElement((props) => <JingleSlot {...props} />);

/**
 * Wrapper component for JingleSlot components
 *
 * @param {Object} params
 * @returns {Function}
 */
const SortableList = SortableContainer(({ items, onDrop, cancelDrop }) =>
  <ul>
    {
      items.map(({ accepts, lastDroppedItem }, index) =>
        <SortableItem
          key={`item-${index}`}
          index={index}
          accepts={accepts}
          lastDroppedItem={lastDroppedItem}
          id={index}
          onDrop={item => onDrop(index, item)}
          cancelDrop={item => cancelDrop(index, item)}
        />
      )
    }
  </ul>
);

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
      cryptoJinglesInstance: null,
      accounts: [],
      web3: null
    };

    this.handleDrop = this.handleDrop.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.isDropped = this.isDropped.bind(this);
    this.onSortEnd = this.onSortEnd.bind(this);
    this.startStopSong = this.startStopSong.bind(this);
  }

  async componentWillMount() {
    const results = await getWeb3();
    const jinglesData = await getJingles(results.payload.web3Instance);
    this.setState({ ...jinglesData, loading: false });
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
   * Reorders JingleSlot components when the user sorts them via drag and drop
   *
   * @param {Object}
   */
  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState({ jingleSlots: arrayMove(this.state.jingleSlots, oldIndex, newIndex) });
  };

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

    const selectedSongSources = this.state.myJingles.filter(({ id }) =>
      this.state.droppedBoxIds.find((selectedId) => id === selectedId)
    ).map(({ source }) => new Promise((resolve) => {
      const sound = new Sound(source, () => {
        sound.loop = true;
        resolve(sound);
      });
    }));

    if (selectedSongSources.length < this.state.jingleSlots.length) {
      alert('Not enough jingles!');
      return;
    }

    Promise.all(selectedSongSources).then((sources) => {
      const group = new Group(sources);
      group.play();
      this.setState({ playing: true, group })
    });
  }

  createSong = async () => {
    try {

      //TODO: grab selected ids, this is just for testing
      const wut = this.state.myJingles.slice(0, 5).map(j => parseInt(j.id));

      console.log(wut);

      const res = await this.state.cryptoJinglesInstance.composeSong(wut, { from: this.state.accounts[0] });

      console.log(res);

    } catch (err) {
      console.log(err);
    }
  };

  render() {
      return (
          <div className="container">

            <div className="row first-row">
                <div className="col-md-12">
                    <div className="well bs-component">
                        <form className="form-horizontal">
                            <legend>Go on Mozart!</legend>
                            <div className="row">
                              <SortableList
                                axis="x"
                                onSortEnd={this.onSortEnd}
                                distance={ 2 }
                                items={this.state.jingleSlots}
                                onDrop={this.handleDrop}
                                cancelDrop={this.handleCancel}
                              />

                               <div className="col-md-2">
                                <div className="play-btn">
                                    <button
                                      onClick={this.startStopSong}
                                      type="button"
                                      className="btn btn-primary">
                                      { this.state.playing ? 'Stop' : 'Play' }
                                    </button>
                                </div>
                                <div className="create-song-btn">
                                    <button type="button" className="btn btn-primary" onClick={ this.createSong } >Create jingle!</button>
                                </div>
                               </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

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
                <h1>You do not own any Jingls yet!</h1>
                <hr />

                <div className="row">
                  **Link to marketplace + catchy reason to buy jingles**
                </div>
              </div>
            }

            {
              (this.state.myJingles.length > 0) &&
              !this.state.loading &&
              <div>
                <h1>Available samples!</h1>
                <hr />

                <div className="row">
                  {
                    this.state.myJingles.map((jingle) => (
                      <JingleBox
                        draggable
                        key={jingle.id}
                        isDropped={this.isDropped(jingle.id)}
                        {...jingle}
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

export default Compose;

