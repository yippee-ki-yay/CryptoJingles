import React, { Component } from 'react';
import Pizzicato from 'pizzicato';
import { connect } from 'react-redux';
import PlayIcon from '../Decorative/PlayIcon';
import StopIcon from '../Decorative/StopIcon';
import LoadingIcon from '../Decorative/LoadingIcon';
import { playAudio } from '../../actions/audioActions';

import './SampleBox.css';

const style = {
  marginRight: '1.5rem',
  width: '150px',
  marginBottom: '1.5rem',
  cursor: 'move',
  float: 'left',
};

class SampleBox2 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      start: false,
      loading: false,
      sound: null,
    };

    this.stopSound = this.stopSound.bind(this);
    this.playSound = this.playSound.bind(this);
    this.loadSample = this.loadSample.bind(this);
  }

  componentWillUnmount() { this.stopSound(); }

  loadSample() {
    this.setState({ loading: true });

    const sound = new Pizzicato.Sound(this.props.source, () => {
      sound.on('stop', () => { this.setState({ start: false }); });

      this.setState({ sound, start: false, loading: false });
      this.playSound();
    });
  }

  playSound = () => {
    if (this.state.sound === null) {
      this.loadSample();
      return
    }

    this.state.sound.play();
    this.setState({ start: true });
  };

  stopSound = () => {
    if (!this.state.sound) return;
    this.state.sound.stop();
    this.setState({ start: false });
  };

  render() {
    const { name, id } = this.props;

    return (
      <div style={{ ...style }}>
        <div className="well bs-component">
          <div className="jingle-header">
            <span className="text-success name-tag">{ name }</span>
            <span className="id-tag pull-right"> #{ id } </span>
          </div>

          { this.state.loading && <LoadingIcon /> }
          {
            !this.state.loading && !this.state.start &&
            <span onClick={ this.playSound }><PlayIcon /></span>
          }
          {
            !this.state.loading && this.state.start &&
            <span onClick={ this.stopSound }><StopIcon /></span>
          }
        </div>
      </div>
    )
  }
}

export default connect(null, { playAudio })(SampleBox2);