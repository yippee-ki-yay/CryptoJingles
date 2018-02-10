import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import { connect } from 'react-redux';
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';
import { getJingleMetadata } from '../../getMockData';
import { getColorForRarity } from '../../actions/profileActions';

import { updateVolume } from '../../actions/composeActions';

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

    this.state = {
      volumeValue: 50
    };
  }

  handleChange = (value) => {
    this.setState({
      volumeValue: value
    });
    
  }

  render() {
    const { isOver, canDrop, connectDropTarget, lastDroppedItem, cancelDrop, updateVolume, index } = this.props;
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
              {/* <div className="name-tag">{ lastDroppedItem.name }</div> */}

              <div className="name-tag">
              { lastDroppedItem.name }
                <Slider
                  min={0}
                  max={100}
                  value={this.state.volumeValue}
                  onChange={this.handleChange}
                  onChangeComplete={() => updateVolume({volume: this.state.volumeValue, index})}
                />
              </div>

              <div className="id-tag">
                <span>#{ lastDroppedItem.type } - </span>
                <span style={{ color: rarityColor }}>
                  { jingle.rarity === 0 && 'Common' }
                  { jingle.rarity === 1 && 'Rare' }
                  { jingle.rarity === 2 && 'Legendary' }
                  { jingle.rarity === 3 && 'Mythical' }
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

const mapStateToProps = (state) => ({
  volumes: state.compose.volumes,
});

const mapDispatchToProps = {
  updateVolume
};

export default connect(mapStateToProps, mapDispatchToProps)(SampleSlot);
