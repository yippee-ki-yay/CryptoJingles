import React, { Component } from 'react';
import { connect } from 'react-redux';
import { playAudio } from '../../actions/audioActions';

import './AudioPlayer.css';

class AudioPlayer extends Component {
  componentDidMount() {
    plyr.setup($('#audio1'), {}); // eslint-disable-line
  }

  componentWillReceiveProps(newProps) {
    if ((newProps.routing.locationBeforeTransitions.pathname !== this.props.routing.locationBeforeTransitions.pathname) && newProps.currentAudio) {
      this.props.playAudio(null);
      return;
    }

    if (!newProps.currentAudio) {
      jQuery(($) => { // eslint-disable-line
        // const audio = $('#audio1');
        // audio.pause();
      });
      return;
    }

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
      <div />
    )
  }
}

const mapStateToProps = (state) => ({
  currentAudio: state.audio.currentAudio,
  routing: state.routing
});

export default connect(mapStateToProps, { playAudio })(AudioPlayer);