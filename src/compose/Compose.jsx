import React, { Component } from 'react';

import './Compose.css';

import JingleBox from '../components/JingleBox';
import Placeholder from '../components/Placeholder';

class Compose extends Component {

  constructor(props) {
    super(props);

    this.state = {
    };

  }

  async componentWillMount() {
    // we'll load all your jingles as a array of jingleIds
    // from the jingleId we can get the jingle type

    // [{id:232, type: 3}, {id:4343, type: 5}]
    // type maps to the type of jingle and it' name
    //we can extract that in the jinglebox component
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
                               <Placeholder id='1' />
                               <Placeholder id='2' />
                               <Placeholder id='3' />
                               <Placeholder id='4' />
                               <Placeholder id='5' />

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

            <h1>Available Jingls!</h1>
            <hr />
            
            <div className="row">
                <JingleBox name='Jingle' id='234' source='../audio/s1.wav' type="compose" />
                <JingleBox name='Some crazy' id='1234' source='../audio/s2.wav' type="compose" />
                <JingleBox name='Yup' id='134' source='../audio/s3.wav' type="compose" />
                <JingleBox name='Give it a go' id='34' source='../audio/s4.wav' type="compose" />
                <JingleBox name='wup wup' id='834' source='../audio/s5.wav' type="compose" />
                <JingleBox name='Last one' id='94' source='../audio/s6.wav' type="compose" />
            </div>
          </div>
      )
  }
}

export default Compose;

