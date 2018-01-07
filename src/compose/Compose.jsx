import React, { Component } from 'react';

import './Compose.css';

import JingleBox from '../components/JingleBox';
import Placeholder from '../components/Placeholder';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';
import { Sound, Group } from 'pizzicato';

const jingleIdsMock = [1, 2, 3, 4, 5, 6];

const TYPE = 'compose';

// Put some path resolver for audio source
const getJingleFromJingleId = (jingleId) => {
 switch (jingleId) {
   case 1:
     return { id: jingleId, type: TYPE, name: 'Jingle', source: '../audio/s1.wav' };
   case 2:
     return { id: jingleId, type: TYPE, name: 'Some crazy', source: '../audio/s2.wav' };
   case 3:
     return { id: jingleId, type: TYPE, name: 'Yup', source: '../audio/s3.wav' };
   case 4:
     return { id: jingleId, type: TYPE, name: 'Give it a go', source: '../audio/s4.wav' };
   case 5:
     return { id: jingleId, type: TYPE, name: 'wup wup', source: '../audio/s5.wav' };
   case 6:
     return { id: jingleId, type: TYPE, name: 'Kek', source: '../audio/s6.wav' };
   default:
     return { id: 0, type: '', name: '', source: '' };
 }
};

const getJingleSlots = () => [
  { accepts: [TYPE], lastDroppedItem: null },
  { accepts: [TYPE], lastDroppedItem: null },
  { accepts: [TYPE], lastDroppedItem: null },
  { accepts: [TYPE], lastDroppedItem: null },
  { accepts: [TYPE], lastDroppedItem: null },
];

const SortableItem = SortableElement((props) => <Placeholder {...props} />);

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
      jingles: [],
      droppedBoxNames: [],
      playing: false,
      group: null
    };

    this.handleDrop = this.handleDrop.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.isDropped = this.isDropped.bind(this);
    this.onSortEnd = this.onSortEnd.bind(this);
    this.startStopSong = this.startStopSong.bind(this);
  }

  async componentWillMount() {
    this.setState({
      jingles: jingleIdsMock.map((jingleId) => getJingleFromJingleId(jingleId))
    })
    // we'll load all your jingles as a array of jingleIds
    // from the jingleId we can get the jingle type

    // [{id:232, type: 3}, {id:4343, type: 5}]
    // type maps to the type of jingle and it' name
    //we can extract that in the jinglebox component
  }

  handleDrop(index, item) {
    const { name } = item;
    const droppedBoxNames = name ? { $push: [name] } : {};

    this.setState(
      update(this.state, {
        jingleSlots: {
          [index]: {
            lastDroppedItem: {
              $set: item,
            },
          },
        },
        droppedBoxNames,
      }),
    )
  }

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

  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState({
      jingleSlots: arrayMove(this.state.jingleSlots, oldIndex, newIndex),
    });
  };

  isDropped(boxName) {
    return this.state.droppedBoxNames.indexOf(boxName) > -1
  }

  startStopSong() {
    if (this.state.group !== null) {
      this.state.group.stop();
      this.setState({ playing: false, group: null });
      return;
    }

    const selectedSongSources = this.state.jingles.filter(({ name }) =>
      this.state.droppedBoxNames.find((selectedName) => name === selectedName)
    ).map(({ source }) => new Promise((resolve) => {
      const sound = new Sound(source, () => {
        sound.loop = true;
        resolve(sound);
      });
    }));

    if (selectedSongSources.length !== this.state.jingleSlots.length) {
      alert('Not enough jingls!');
      return;
    }

    Promise.all(selectedSongSources).then((sources) => {
      const group = new Group(sources);
      group.play();
      this.setState({ playing: true, group })
    });
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
                                    <button type="button" className="btn btn-primary">Create song!</button>
                                </div>
                               </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {
              (this.state.jingles.length === 0) &&
              <div>
                <h1>You do not own any Jingls yet!</h1>
                <hr />

                <div className="row">
                  **Link to marketplace + catchy reason to buy jingles**
                </div>
              </div>
            }

            {
              (this.state.jingles.length > 0) &&
              <div>
                <h1>Available Jingls!</h1>
                <hr />

                <div className="row">
                  {
                    this.state.jingles.map((jingle) => (
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

