import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import { Howl } from 'howler';
import { connect } from 'react-redux';
import { getJingleSlots } from '../getMockData';
import { getSamples } from '../util/web3/ethereumService';
import BoxLoader from '../components/Decorative/BoxLoader';
import PlayIcon from '../components/Decorative/PlayIcon';
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
      allJingles: [],
    };

    this.handleDrop = this.handleDrop.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.isDropped = this.isDropped.bind(this);
    this.startStopSong = this.startStopSong.bind(this);
  }

  async componentWillMount() {
    const myJingles = await getSamples();

    this.setState({ myJingles, loading: false });
  }

  componentWillReceiveProps(nextProps) {
    console.log('nextProps', nextProps);
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

    const sampleUrls = selectedSongSources.map(sample => sample.source);

    const group = new Howl({
      src: sampleUrls
    });

    this.setState({
      playing: true,
      group
    });

    this.props.playAudio({ name, author: 'Sample', src: group });


    //console.log(selectedSongSources);
    //selectedSongSources.map( )

    // Promise.all(selectedSongSources).then((sources) => {
    //   const group = new Group(sources);
    //   group.play();
    //   this.setState({ playing: true, group })
    // });
  }

  createSong = async () => {
    try {
      const selectedSongSources = this.state.myJingles.filter(({ id }) =>
        this.state.droppedBoxIds.find((selectedId) => id === selectedId)
      );

      const jingleIds = selectedSongSources.map(s => parseInt(s.id));

      if (jingleIds.length !== 5) {
        alert('Must b 5 jingles m8!');
        return;
      }

      const id = Math.floor(Math.random() * 6) + 1;
      this.props.addPendingTx(id, 'Create jingle');
      
      const res = await window.contract.composeJingle("Jaguar Bog", jingleIds, { from: window.web3.eth.accounts[0] });

      this.props.removePendingTx(id);

      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  render() {
      return (
          <div className="container">

              <div className="sort-samples-wrapper">
                <form className="form-horizontal">
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
                           <PlayIcon />
                         </span>

                         <button type="button" className="btn buy-button" onClick={ this.createSong }>
                           Create jingle!
                         </button>
                       </div>
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
                <h1>You do not own any Sound Samples yet!</h1>
                <hr />

                <div className="row">
                  <div className="col-md-12">
                  **Link to marketplace + catchy reason to buy jingles**
                  </div>
                </div>
              </div>
            }

            {
              (this.state.myJingles.length > 0) &&
              !this.state.loading &&
              <div className="samples-slider">
                <h2>Your samples:</h2>

                <div className="compose-samples-wrapper">
                  {
                    this.state.allJingles.map((sample) => (
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
