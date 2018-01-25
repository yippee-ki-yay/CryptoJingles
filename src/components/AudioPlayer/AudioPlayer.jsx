import React, { Component } from 'react';
import { connect } from 'react-redux';
import { playAudio } from '../../actions/audioActions';

import './AudioPlayer.css';

class AudioPlayer extends Component {
  componentDidMount() {
    plyr.setup($('#audio1'), {}); // eslint-disable-line
  }

  componentWillReceiveProps(newProps) {
    if (!newProps.currentAudio) return;

    jQuery(($) => { // eslint-disable-line
      const supportsAudio = !!document.createElement('audio').canPlayType;
      if (supportsAudio) {
        let index = 0,
          playing = false,
          tracks = [newProps.currentAudio],
          npTitle = $('#npTitle'),
          audio = $('#audio1').bind('play', () => {
            playing = true;
          }).bind('pause', () => {
            playing = false;
          }).bind('ended', () => {
            // if ((index + 1) < trackCount) {
            //   index++;
            //   loadTrack(index);
            //   audio.play();
            // } else {
            //   audio.pause();
            //   index = 0;
            //   loadTrack(index);
            // }
            playing = false;
          }).get(0),
          loadTrack = (index) => {
            const { name, src, author } = tracks[index];
            npTitle.text(`${author} - ${name}`);
            audio.src = src;
          },
          playTrack = (id) => {
            loadTrack(id);
            audio.play();
          };
        playTrack(index);
      }
    });
  }

  render() {
    return(
      <div className={`audio-player-wrapper ${this.props.currentAudio ? '' : 'not-visible'}`}>
          <div className="column add-bottom">
            <div id="mainwrap">
              <div className="close-audio" onClick={() => { this.props.playAudio(null); }}>X</div>
              <div id="nowPlay">
                <span className="right" id="npTitle" />
              </div>
              <div id="audiowrap">
                <div id="audio0">
                  <audio preload id="audio1" controls="controls">Your browser does not support HTML5 Audio!</audio>
                </div>
              </div>
            </div>
          </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  currentAudio: state.audio.currentAudio
});

export default connect(mapStateToProps, { playAudio })(AudioPlayer);