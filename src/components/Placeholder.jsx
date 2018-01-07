import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';

import './Placeholder.css';

const style = {
  height: '16rem',
  cursor: 'move',
  width: '16rem',
  marginRight: '1.5rem',
  marginBottom: '1.5rem',
  color: 'white',
  padding: '1rem',
  textAlign: 'center',
  fontSize: '1rem',
  lineHeight: 'normal',
  float: 'left',
};

const dustbinTarget = {
  drop(props, monitor) {
    props.onDrop(monitor.getItem());
  },
};

@DropTarget(props => props.accepts, dustbinTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
}))
class Placeholder extends Component {
  constructor(props) {
    super(props);

    this.state = {
        stage: 'unselected'
    };

  }

  placeholderSeleced = () => {

    let stage = 'selected';

    if (this.state.stage === 'selected') {
        stage = 'unselected';
    }

    this.setState({
        stage: stage
    });
  };

  render() {
    const {
      accepts,
      isOver,
      canDrop,
      connectDropTarget,
      lastDroppedItem,
      cancelDrop
    } = this.props;

    const isActive = isOver && canDrop;

    let backgroundColor = '#222'
    if (isActive) {
      backgroundColor = 'darkgreen'
    } else if (canDrop) {
      backgroundColor = 'darkkhaki'
    }

    return connectDropTarget(
      <div style={{ ...style, backgroundColor }} className="">
        {
          lastDroppedItem && <div onClick={cancelDrop}>Reset X</div>
        }

        {isActive
          ? 'Release to drop'
          : `This dustbin accepts: ${accepts.join(', ')}`}

        {lastDroppedItem && (
          <p>Last dropped: {JSON.stringify(lastDroppedItem)}</p>
        )}
      </div>
    );
  }
}

export default Placeholder;