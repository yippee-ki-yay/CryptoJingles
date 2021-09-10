import React, { Component } from 'react';
import Pizzicato from 'pizzicato';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PlayIcon from '../Decorative/PlayIcon';
import StopIcon from '../Decorative/StopIcon';
import LoadingIcon from '../Decorative/LoadingIcon';
import { playAudio } from '../../actions/audioActions';
import { getColorForRarity } from '../../actions/profileActions';

import './SampleBox.scss';

const style = {};

class SampleBox2 extends Component {
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
    const { name, jingleType, rarity } = this.props;
    const background = getColorForRarity(rarity);

    return (
      <div style={{ ...style }}>
        <div className="sample-wrapper">
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
    );
  }
}

SampleBox2.propTypes = {
  source: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  rarity: PropTypes.number.isRequired,
  jingleType: PropTypes.number.isRequired,
};

export default connect(null, { playAudio })(SampleBox2);
