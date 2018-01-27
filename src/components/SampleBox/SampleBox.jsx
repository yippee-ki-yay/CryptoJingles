import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DragSource } from 'react-dnd'
import Pizzicato from 'pizzicato';
import PlayIcon from '../Decorative/PlayIcon';
import StopIcon from '../Decorative/StopIcon';
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

    this.state = { start: false };

    const sound = new Pizzicato.Sound(props.source, () => {
        sound.loop = true;
        this.state = { sound, start: false };
    });
  }

  playSound = () => {
      const { name, source } = this.props;
      this.props.playAudio({ name, author: 'Sample', src: source });
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

                { !this.state.start && <span onClick={ this.playSound }><PlayIcon /></span>}
                { this.state.start && <span onClick={ this.stopSound }><StopIcon /></span>}
            </div>
        </div>
    )
  }
}

export default connect(null, { playAudio })(SampleBox);