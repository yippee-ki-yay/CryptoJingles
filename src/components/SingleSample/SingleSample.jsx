import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PlayIcon from '../Decorative/PlayIcon';
import StopIcon from '../Decorative/StopIcon';
import LoadingIcon from '../Decorative/LoadingIcon';
import { getColorForRarity } from '../../actions/profileActions';
import { playSample, stopAudio } from '../../actions/audioActions';

// import './SampleBox.css';

const style = {
  margin: '14px 27px 7px 26px',
  width: '175px',
  float: 'left',
};

class SingleSample extends Component {
  componentWillUnmount() { this.props.stopAudio(`sample-${this.props.id}`); }

  render() {
    const { id, source, name, jingleType, rarity, playSample, stopAudio, audios } = this.props;
    const sampleId = `sample-${id}`;
    const background = getColorForRarity(rarity);

    const audio = audios.find(_audio => _audio.id === sampleId);
    let playing = false;
    let loading = false;

    if (audio) {
      playing = audio.playing;
      loading = audio.loading;
    }

    return (
      <div style={{ ...style }}>
        <div className="sample-wrapper">
          <div className="top" style={{ background }}>
            { loading && <div><LoadingIcon /></div> }
            {
              !loading && !playing &&
              <div onClick={() => { playSample(sampleId, source); }}><PlayIcon /></div>
            }
            {
              !loading && playing &&
              <div onClick={() => { stopAudio(sampleId); }}><StopIcon /></div>
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

SingleSample.propTypes = {
  source: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  rarity: PropTypes.number.isRequired,
  jingleType: PropTypes.number.isRequired,
  playSample: PropTypes.func.isRequired,
  stopAudio: PropTypes.func.isRequired,
  audios: PropTypes.array.isRequired,
};

const mapStateToProps = ({ audio }) => ({
  audios: audio.audios,
});

const mapDispatchToProps = {
  playSample, stopAudio,
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleSample);
