import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import { getJingleMetadata } from '../../getMockData';
import { getColorForRarity } from '../../actions/profileActions';

import './SampleSlot.css';

const style = {
  height: '230px',
  width: '175px',
  marginRight: '1.5rem',
  marginBottom: '1.5rem',
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
    let jingle = null;

    const isActive = isOver && canDrop;
    let rarityColor = null;

    const additionalStyle = {
      backgroundColor: '#fff',
      color: '#626972'
    };

    if (isActive || lastDroppedItem) {
      additionalStyle.backgroundColor = '#9c9c9c';
      additionalStyle.color = '#fff';
    } else if (canDrop) {
      additionalStyle.backgroundColor = '#DEDEDE';
      additionalStyle.color = '#fff';
    }

    if (lastDroppedItem) {
      jingle = getJingleMetadata(lastDroppedItem.type);
      additionalStyle.backgroundColor = '#fff';
      additionalStyle.border = 'none';
      rarityColor = getColorForRarity(jingle.rarity);
    }

    return connectDropTarget(
      <div className="jingle-slot" style={{ ...style, ...additionalStyle }}>
        {
          lastDroppedItem &&
          <div>
            <div className="top" style={{ backgroundColor: rarityColor }}>
              <div className="cancel-btn" onClick={cancelDrop}>
                <i className="material-icons">close</i>
              </div>
            </div>
            <div className="bottom">
              <div className="name-tag">{ lastDroppedItem.name }</div>

              <div className="id-tag">
                <span>#{ lastDroppedItem.type } - </span>
                <span style={{ color: rarityColor }}>
                  { jingle.rarity === 0 && 'Common' }
                  { jingle.rarity === 1 && 'Rare' }
                  { jingle.rarity === 2 && 'Legendary' }
                  { jingle.rarity === 2 && 'Mythical' }
                </span>
              </div>
            </div>
          </div>
        }

        { !lastDroppedItem && <div className="empty-slot">Drag & drop sound sample here</div>  }
      </div>
    );
  }
}

export default SampleSlot;
