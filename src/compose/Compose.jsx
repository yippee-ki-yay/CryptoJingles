import React, { Component } from 'react';
import JingleBox from '../components/JingleBox/JingleBox';
import JingleSlot from '../components/JingleSlot/JingleSlot';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';
import { Sound, Group } from 'pizzicato';
import { getJingleIdsMock, getJingleFromJingleId, getJingleSlots } from '../getMockData';
import getWeb3 from '../util/web3/getWeb3';
import contract from 'truffle-contract';

import Jingle from '../../build/contracts/Jingle.json';
import CryptoJingles from '../../build/contracts/CryptoJingles.json';

import '../util/config';
import { JingleAddress, CryptoJinglesAddress } from '../util/config';

import { getJingleMetadata } from '../getMockData';

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
      jingleSlots: getJingleSlots(),
      droppedBoxNames: [],
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

  componentWillMount() {

    getWeb3
    .then(async (results) => {
      const web3 = results.payload.web3Instance;

      web3.eth.getAccounts(async (error, accounts) => {

         //setup contracts
        const jinglesContract = contract(Jingle);
        jinglesContract.setProvider(web3.currentProvider);

        const cryptoJinglesContract = contract(CryptoJingles);
        cryptoJinglesContract.setProvider(web3.currentProvider);

        const jinglesInstance = await jinglesContract.at(JingleAddress);
        const cryptoJinglesInstance = await cryptoJinglesContract.at(CryptoJinglesAddress);

        const jingles = await jinglesInstance.getAllJinglesForOwner(accounts[0]);

        const myJingles = this.parseJingles(jingles);

        this.setState({
          accounts,
          web3,
          jinglesInstance,
          myJingles,
          cryptoJinglesInstance
        });

      });
    });

  }

  parseJingles = (jingles) => {

    let myJingles = [];

    for (let i = 0; i < jingles.length; i += 2) {
      const id = jingles[i].valueOf()
      const jingleType = jingles[i + 1].valueOf();

      myJingles.push({
        id,
        jingleType,
        ...getJingleMetadata(jingleType)
      });
    }

    return myJingles;

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
        droppedBoxNames: item.name ? { $push: [item.name] } : {},
      })
    )
  }

  /**
   * Fires when a jingle is removed from a JingleSlot component
   *
   * @param {Number} index
   * @param {Object} item
   */
  handleCancel(index, { name }) {
    let droppedBoxNames = [...this.state.droppedBoxNames];
    const boxIndex = droppedBoxNames.findIndex((_name) => _name === name);
    droppedBoxNames.splice(boxIndex, 1);

    this.setState(
      update(this.state, {
        jingleSlots: { [index]: { lastDroppedItem: { $set: null } } },
        droppedBoxNames: { $set: droppedBoxNames }
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
   * @param {String} jingleName
   * @returns {Boolean}
   */
  isDropped(jingleName) { return this.state.droppedBoxNames.indexOf(jingleName) > -1 }

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

    const selectedSongSources = this.state.myJingles.filter(({ name }) =>
      this.state.droppedBoxNames.find((selectedName) => name === selectedName)
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

    } catch(err) {
      console.log(err);
    }
  }

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
                                    <button type="button" className="btn btn-primary" onClick={ this.createSong } >Create song!</button>
                                </div>
                               </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {
              (this.state.myJingles.length === 0) &&
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
              <div>
                <h1>Available Jingls!</h1>
                <hr />

                <div className="row">
                  {
                    this.state.myJingles.map((jingle) => (
                      <JingleBox
                        key={jingle.id}
                        isDropped={this.isDropped(jingle.name)}
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

