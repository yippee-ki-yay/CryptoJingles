import React, { Component } from 'react';
import { DragSource } from 'react-dnd'
import Pizzicato from 'pizzicato';
import PlayIcon from '../Decorative/PlayIcon';
import StopIcon from '../Decorative/StopIcon';

import './JingleBox.css';

const boxSource = { beginDrag(props) { return { name: props.name, id: props.id }} };

const style = {
  marginRight: '1.5rem',
  width: '150px',
  marginBottom: '1.5rem',
  cursor: 'move',
  float: 'left',
};

@DragSource(props => props.type, boxSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}))
class JingleBox extends Component {
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
    const { name, isDropped, isDragging, connectDragSource } = this.props;
    const opacity = isDragging ? 0.4 : 1;

    if (isDropped) style.pointerEvents = 'none';
    if (!isDropped) style.pointerEvents = 'initial';

    return connectDragSource(
        <div style={{ opacity, ...style }}>
          <div className="">
              <div className="well bs-component">
                  <div className="jingle-header">
                      <span className="text-success name-tag">{isDropped ? <s>{name}</s> : name}</span>
                      <span className="id-tag pull-right"> #{ this.props.id } </span>
                  </div>

                  { !this.state.start && <span onClick={ this.playSound }><PlayIcon /></span>}
                  { this.state.start && <span onClick={ this.stopSound }><StopIcon /></span>}
                  </div>
              </div>
        </div>
    )
  }
}

export default JingleBox;