import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';

import './SampleSlot.css';

const style = {
  height: '17rem',
  width: '17rem',
  marginRight: '1.5rem',
  marginBottom: '1.5rem',
  color: 'white',
  padding: '1rem',
  textAlign: 'center',
  lineHeight: 'normal',
  float: 'left'
};

const dropTarget = { drop(props, monitor) { props.onDrop(monitor.getItem()); } };

@DropTarget(props => props.accepts, dropTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
}))
class SampleSlot extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { isOver, canDrop, connectDropTarget, lastDroppedItem, cancelDrop } = this.props;

    const isActive = isOver && canDrop;

    let backgroundColor = '#222';

    if (isActive || lastDroppedItem) {
      backgroundColor = '#48BA95';
    } else if (canDrop) {
      backgroundColor = '#8a8a8a';
    }

    return connectDropTarget(
      <div className="jingle-slot" style={{ ...style, backgroundColor }}>
        {
          lastDroppedItem &&
          <div className="cancel-btn" onClick={cancelDrop}>
            <i className="material-icons">close</i>
          </div>
        }

        { !lastDroppedItem && 'Drop sound sample here'  }

        { lastDroppedItem && (<p>{lastDroppedItem.name} (#{lastDroppedItem.id})</p>) }
      </div>
    );
  }
}

export default SampleSlot;
