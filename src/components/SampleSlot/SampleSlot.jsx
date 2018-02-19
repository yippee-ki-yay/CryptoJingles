import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import { connect } from 'react-redux';
import InputRange from 'react-input-range';
import { getJingleMetadata } from '../../constants/getMockData';
import { getColorForRarity } from '../../actions/profileActions';

import { updateVolume, updateDelay, updateCuts } from '../../actions/composeActions';

import './SampleSlot.scss';

const style = {
  textAlign: 'center',
  lineHeight: 'normal',
  float: 'left',
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

    const { index } = props;

    this.state = {
      volumeValue: props.volumes[index],
      delayValue: props.delays[index],
      range: {
        min: props.cuts[index],
        max: props.cuts[index + 5],
      },
    };
  }

  handleChange = (value) => {
    this.setState({ volumeValue: value });
  };

  handleDelayChange = (value) => {
    this.setState({ delayValue: parseFloat(value.toFixed(1)) });
  };

  handleCutsChange = (value) => {
    this.setState({
      range: {
        min: parseFloat(value.min.toFixed(1)),
        max: parseFloat(value.max.toFixed(1)),
      },
    });
  };

  render() {
    const {
      isOver, canDrop, connectDropTarget, lastDroppedItem, cancelDrop,
      updateVolume, updateDelay, updateCuts, index,
    } = this.props;
    let jingle = null;

    const isActive = isOver && canDrop;
    let rarityColor = null;

    const additionalStyle = {
      backgroundColor: '#fff',
      color: '#626972',
    };

    if (isActive || lastDroppedItem) {
      additionalStyle.backgroundColor = '#DEDEDE';
      additionalStyle.color = '#fff';
    } else if (canDrop) {
      additionalStyle.backgroundColor = '#B3B3B3';
      additionalStyle.color = '#fff';
    }

    if (lastDroppedItem) {
      jingle = getJingleMetadata(lastDroppedItem.type);
      additionalStyle.backgroundColor = '#fff';
      additionalStyle.border = 'none';
      rarityColor = getColorForRarity(jingle.rarity);
    }

   let maxLength = 10;

    // if (lastDroppedItem) {
    //   maxLength = getJingleMetadata(lastDroppedItem.type).length;
    // }

    const formatVolume = value => `${value}%`;
    const formatDelay = value => `${value.toFixed(1)}s`;
    const formatCut = value => `${value.toFixed(1)}s`;

    return connectDropTarget((() => (
      <div className="jingle-slot-wrapper" style={{ ...style }}>
        <div className="jingle-slot" style={{ ...additionalStyle }}>
          {
            lastDroppedItem &&
            <div>
              <div className="top" style={{ backgroundColor: rarityColor }}>
                <div className="cancel-btn" onClick={() => { cancelDrop(lastDroppedItem); }}>
                  <i className="material-icons">close</i>
                </div>
              </div>
              <div className="bottom">
                {/* <div className="name-tag">{ lastDroppedItem.name }</div> */}

                <div className="name-tag">
                  { lastDroppedItem.name }
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

          { !lastDroppedItem && <div className="empty-slot">Drag & drop sound sample here</div> }
        </div>

        <div className="slider-group">
          <div className="slider">
            <InputRange
              minValue={0}
              maxValue={100}
              disabled={!lastDroppedItem}
              value={this.state.volumeValue}
              formatLabel={formatVolume}
              onChange={this.handleChange}
              onChangeComplete={() => updateVolume({ volume: this.state.volumeValue, index })}
            />
          </div>

          <div className="slider">
            <InputRange
              minValue={0}
              maxValue={10}
              disabled={!lastDroppedItem}
              step={0.1}
              formatLabel={formatDelay}
              value={this.state.delayValue}
              onChange={this.handleDelayChange}
              onChangeComplete={() => updateDelay({ delay: this.state.delayValue, index })}
            />
          </div>

          <div className="slider">
            <InputRange
              minValue={0}
              maxValue={maxLength}
              disabled={!lastDroppedItem}
              value={this.state.range}
              formatLabel={formatCut}
              step={0.1}
              onChange={this.handleCutsChange}
              onChangeComplete={() => updateCuts({ cuts: this.state.range, index })}
            />
          </div>
        </div>
      </div>
    ))());
  }
}

SampleSlot.defaultProps = {
  connectDropTarget: () => {},
  isOver: false,
  canDrop: false,
  lastDroppedItem: null,
};

SampleSlot.propTypes = {
  index: PropTypes.number.isRequired,
  connectDropTarget: PropTypes.func,
  cancelDrop: PropTypes.func.isRequired,
  isOver: PropTypes.bool,
  canDrop: PropTypes.bool,
  lastDroppedItem: PropTypes.object,
  updateVolume: PropTypes.func.isRequired,
  updateDelay: PropTypes.func.isRequired,
  updateCuts: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  updateVolume,
  updateDelay,
  updateCuts,
};

const mapStateToProps = state => ({
  volumes: state.compose.volumes,
  delays: state.compose.delays,
  cuts: state.compose.cuts,
});

export default connect(mapStateToProps, mapDispatchToProps)(SampleSlot);
