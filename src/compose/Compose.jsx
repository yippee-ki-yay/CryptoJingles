import React, { Component } from 'react';

import './Compose.css';

import JingleBox from '../components/JingleBox';
import Placeholder from '../components/Placeholder';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import update from 'immutability-helper';

const jinglIdssMock = [1, 2, 3, 4, 5, 6];

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

@DragDropContext(HTML5Backend)
class Compose extends Component {
  constructor(props) {
    super(props);

    this.state = {
      jingleSlots: getJingleSlots(),
      jingles: [],
      droppedBoxNames: []
    };

    this.handleDrop = this.handleDrop.bind(this);
    this.isDropped = this.isDropped.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  async componentWillMount() {
    this.setState({
      jingles: jinglIdssMock.map((jingleId) => getJingleFromJingleId(jingleId))
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
    this.setState(
      update(this.state, {
        jingleSlots: { [index]: { lastDroppedItem: { $set: null } } },
        droppedBoxNames: name ? { $pop: [name] } : {}
      }),
    )
  }

  isDropped(boxName) {
    return this.state.droppedBoxNames.indexOf(boxName) > -1
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
                              {
                                this.state.jingleSlots.map(({ accepts, lastDroppedItem }, index) =>
                                  <Placeholder
                                    accepts={accepts}
                                    lastDroppedItem={lastDroppedItem}
                                    key={index}
                                    id={index}
                                    onDrop={item => this.handleDrop(index, item)}
                                    cancelDrop={item => this.handleCancel(index, item)}
                                  />
                                )
                              }

                               <div className="col-md-2">
                                <div className="play-btn">
                                    <button type="button" className="btn btn-primary">Play</button>
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

