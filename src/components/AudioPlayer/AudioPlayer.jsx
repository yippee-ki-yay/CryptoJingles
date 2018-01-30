import React, { Component } from 'react';
import { connect } from 'react-redux';
import { playAudio } from '../../actions/audioActions';

import './AudioPlayer.css';

class AudioPlayer extends Component {

  constructor(props) {
    super(props);

  }

  playAudio() {
    this.props.currentAudio.src.play();
  }

  pauseAudio() {
    this.props.currentAudio.src.pause();
  }


  render() {

    console.log(this.props);
    return(
      <div>
        {/*<div id="title">*/}
          {/*<span id="track"></span>*/}
          {/*<div id="timer">0:00</div>*/}
          {/*<div id="duration">0:00</div>*/}
        {/*</div>*/}

        {/*<div className="controlsOuter">*/}
          {/*<div className="controlsInner">*/}
            {/*<div id="loading"></div>*/}
            {/*<div className="btn-player" id="playBtn" onClick={ this.playAudio.bind(this) }></div>*/}
            {/*<div className="btn-player" id="pauseBtn" onClick={ this.pauseAudio.bind(this) }></div>*/}
            {/*<div className="btn-player" id="prevBtn"></div>*/}
            {/*<div className="btn-player" id="nextBtn"></div>*/}
          {/*</div>*/}
          {/*<div className="btn-player" id="playlistBtn"></div>*/}
          {/*<div className="btn-player" id="volumeBtn"></div>*/}
        {/*</div>*/}

        {/*<div id="waveform"></div>*/}
        {/*<div id="bar"></div>*/}
        {/*<div id="progress"></div>*/}

        {/*<div id="playlist">*/}
          {/*<div id="list"></div>*/}
        {/*</div>*/}

        {/*<div id="volume" className="fadeout">*/}
          {/*<div id="barFull" className="bar"></div>*/}
          {/*<div id="barEmpty" className="bar"></div>*/}
          {/*<div id="sliderBtn"></div>*/}
        {/*</div>*/}
    </div>
    )
  }
}

const mapStateToProps = (state) => ({
  currentAudio: state.audio.currentAudio,
  routing: state.routing
});

export default connect(mapStateToProps, { playAudio })(AudioPlayer);