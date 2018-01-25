import React, { Component } from 'react';
import Pizzicato from 'pizzicato';
import PlayIcon from '../Decorative/PlayIcon';
import StopIcon from '../Decorative/StopIcon';

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

    this.state = { start: false };

    const sound = new Pizzicato.Sound(props.source, () => {
      sound.loop = true;
      this.state = { sound, start: false };
    });
  }

  playSound = () => {
    this.state.sound.play();
    this.setState({ start: true });
  };

  stopSound = () => {
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

          { !this.state.start && <span onClick={ this.playSound }><PlayIcon /></span>}
          { this.state.start && <span onClick={ this.stopSound }><StopIcon /></span>}
        </div>
      </div>
    )
  }
}

export default SampleBox2;