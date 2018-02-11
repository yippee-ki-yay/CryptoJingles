import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import { connect } from 'react-redux';
import Slider from 'react-rangeslider';
import { getJingleMetadata } from '../../getMockData';
import { getColorForRarity } from '../../actions/profileActions';

import { updateVolume, updateDelay } from '../../actions/composeActions';

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
      volumeValue: 50,
      delayValue: 0
    };
  }

  handleChange = (value) => {
    this.setState({ volumeValue: value });
  }

  handleDelayChange = (value) => {
    this.setState({ delayValue: parseFloat(value.toFixed(1)) });
  }

  render() {
    const { isOver, canDrop, connectDropTarget, lastDroppedItem, cancelDrop, updateVolume, updateDelay, index } = this.props;
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

    const formatVolume = value => value + '%';
    const formatDelay = value => value.toFixed(1) + 's';

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
                  format={formatVolume}
                  onChange={this.handleChange}
                  onChangeComplete={() => updateVolume({volume: this.state.volumeValue, index})}
                />

                <div className="slider-horizontal">
                <Slider
                  min={0}
                  max={4}
                  step={0.1}
                  format={formatDelay}
                  value={this.state.delayValue}
                  onChange={this.handleDelayChange}
                  onChangeComplete={() => updateDelay({delay: this.state.delayValue, index})}
                />
                </div>
              </div>

              {/* <div className="id-tag">
                <span>#{ lastDroppedItem.type } - </span>
                <span style={{ color: rarityColor }}>
                  { jingle.rarity === 0 && 'Common' }
                  { jingle.rarity === 1 && 'Rare' }
                  { jingle.rarity === 2 && 'Legendary' }
                  { jingle.rarity === 3 && 'Mythical' }
                </span>
              </div> */}
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
  delays: state.compose.delays,
});

const mapDispatchToProps = {
  updateVolume,
  updateDelay,
};

export default connect(mapStateToProps, mapDispatchToProps)(SampleSlot);
