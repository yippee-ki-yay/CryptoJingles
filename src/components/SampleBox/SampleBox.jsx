import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import Pizzicato from 'pizzicato';
import PropTypes from 'prop-types';
import PlayIcon from '../Decorative/PlayIcon';
import StopIcon from '../Decorative/StopIcon';
import LoadingIcon from '../Decorative/LoadingIcon';
import { getColorForRarity } from '../../actions/profileActions';

import './SampleBox.scss';

const boxSource = { beginDrag(props) { return { name: props.name, id: props.id, type: props.jingleType }; } };

const style = {};

@DragSource((props) => props.type, boxSource, (connect, monitor) => ({
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
    this.scroll = this.scroll.bind(this);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.draggable && !prevProps.isDragging && this.props.isDragging) this.scroll();
  }

  componentWillUnmount() { this.stopSound(); }

  scroll = () => {
    const scrollTo = window.pageYOffset + this.props.slots.getBoundingClientRect().top - 150;
    window.scrollTo({ top: scrollTo, behavior: 'smooth' });
  }

  playSound = () => {
    if (this.state.sound === null) {
      this.loadSample();
      return;
    }

    this.state.sound.play();
    this.setState({ start: true });
  };

  stopSound = () => {
    if (!this.state.sound) return;
    this.state.sound.stop();
    this.setState({ start: false });
  };

  loadSample() {
    this.setState({ loading: true });

    const sound = new Pizzicato.Sound(this.props.source, () => {
      sound.on('stop', () => { this.setState({ start: false }); });

      this.setState({ sound, start: false, loading: false });
      this.playSound();
    });
  }

  render() {
    const {
      name, isDropped, isDragging, connectDragSource, rarity, jingleType,
    } = this.props;

    style.opacity = isDragging || isDropped ? 0.4 : 1;

    if (isDropped) style.pointerEvents = 'none';
    if (!isDropped) style.pointerEvents = 'initial';

    const background = getColorForRarity(rarity);

    return connectDragSource((() => (
      <div style={{ ...style }}>
        <div className="sample-wrapper" style={{ width: '175px' }}>
          <div className="top" style={{ background }}>
            { this.state.loading && <div><LoadingIcon /></div> }
            {
              !this.state.loading && !this.state.start &&
              <div onClick={this.playSound}><PlayIcon /></div>
            }
            {
              !this.state.loading && this.state.start &&
              <div onClick={this.stopSound}><StopIcon /></div>
            }
          </div>

          <div className="bottom">
            <div className="name-tag">{ name }</div>

            <div className="id-tag">
              <span>#{ jingleType } - </span>
              <span style={{ color: background }}>
                { rarity === 0 && 'Common' }
                { rarity === 1 && 'Rare' }
                { rarity === 2 && 'Legendary' }
                { rarity === 3 && 'Mythical' }
              </span>
            </div>
          </div>
        </div>
      </div>
    ))());
  }
}

SampleBox.defaultProps = {
  connectDragSource: () => {},
  isDragging: false,
  draggable: false,
  slots: null,
};

SampleBox.propTypes = {
  connectDragSource: PropTypes.func,
  source: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  isDropped: PropTypes.bool.isRequired,
  isDragging: PropTypes.bool,
  draggable: PropTypes.bool,
  rarity: PropTypes.number.isRequired,
  jingleType: PropTypes.number.isRequired,
  slots: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func,
    PropTypes.object,
  ]),
};

export default SampleBox;
