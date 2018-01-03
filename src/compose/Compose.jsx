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



  render() {
      return (
          <div className="container">

            <div className="row first-row">
                <div className="col-md-12">
                    <div className="well bs-component">
                        <form className="form-horizontal">
                            <legend>Go on Moncart!</legend>
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
                <JingleBox name='Some crazy sound (#435)' source='../audio/s1.wav' />
                <JingleBox name='Some crazy ' source='../audio/s2.wav' />
                <JingleBox name='Yup' source='../audio/s3.wav' />
                <JingleBox name='Give it a go' source='../audio/s4.wav' />
                <JingleBox name='wup wup' source='../audio/s5.wav' />
                <JingleBox name='Last one' source='../audio/s6.wav' />
            </div>
          </div>
      )
  }
}

export default Compose;

