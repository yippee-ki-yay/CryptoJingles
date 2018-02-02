import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DragSource } from 'react-dnd';
import Pizzicato from 'pizzicato';
import PlayIcon from '../Decorative/PlayIcon';
import StopIcon from '../Decorative/StopIcon';
import LoadingIcon from '../Decorative/LoadingIcon';
import { playAudio } from '../../actions/audioActions';

import './SampleBox.css';

const boxSource = { beginDrag(props) { return { name: props.name, id: props.id }} };

const style = {
  marginRight: '1.5rem',
  width: '350px',
  marginBottom: '1.5rem',
  cursor: 'move',
};

@DragSource(props => props.type, boxSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}))
class SampleBox extends Component {
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
    const { name, isDropped, isDragging, connectDragSource } = this.props;
    const opacity = isDragging ? 0.4 : 1;

    if (isDropped) style.pointerEvents = 'none';
    if (!isDropped) style.pointerEvents = 'initial';

    return connectDragSource(
        <div style={{ opacity, ...style }}>
            <div className="well bs-component sample-component">
              <div className="jingle-header">
                <span className="text-success name-tag">{isDropped ? <s>{name}</s> : name}</span>
                <span className="id-tag pull-right"> #{ this.props.id } </span>
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

export default connect(null, { playAudio })(SampleBox);