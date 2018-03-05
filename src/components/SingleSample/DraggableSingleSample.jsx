import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PlayIcon from '../Decorative/PlayIcon';
import StopIcon from '../Decorative/StopIcon';
import LoadingIcon from '../Decorative/LoadingIcon';
import { getColorForRarity } from '../../actions/profileActions';
import { playSample, stopAudio } from '../../actions/audioActions';

import './SingleSample.scss';

const boxSource = { beginDrag(props) { return { name: props.name, id: props.id, type: props.jingleType }; } };

const style = {
  margin: '14px 27px 7px 26px',
  width: '175px',
  height: '230px',
  float: 'left',
  cursor: 'move',
  position: 'relative',
  background: '#fff',
};

@DragSource(props => props.type, boxSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}))
class DraggableSingleSample extends Component {
  componentWillUnmount() { this.props.stopAudio(`sample-${this.props.id}`); }

  render() {
    const {
      name, isDropped, isDragging, connectDragSource, rarity, jingleType, audios, id, source, playSample, stopAudio,
    } = this.props;

    style.opacity = isDragging || isDropped ? 0.4 : 1;

    if (isDropped) style.pointerEvents = 'none';
    if (!isDropped) style.pointerEvents = 'initial';

    const sampleId = `sample-${id}`;
    const background = getColorForRarity(rarity);

    const audio = audios.find(_audio => _audio.id === sampleId);
    let playing = false;
    let loading = false;

    if (audio) {
      playing = audio.playing;
      loading = audio.loading;
    }

    return connectDragSource((() => (
      <div style={{ ...style }}>
        <div className="sample-wrapper" style={{ width: '175px' }}>
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
    ))());
  }
}

DraggableSingleSample.defaultProps = {
  connectDragSource: () => {},
  isDragging: false,
};

DraggableSingleSample.propTypes = {
  connectDragSource: PropTypes.func,
  source: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  isDropped: PropTypes.bool.isRequired,
  isDragging: PropTypes.bool,
  rarity: PropTypes.number.isRequired,
  jingleType: PropTypes.number.isRequired,
  audios: PropTypes.array.isRequired,
  id: PropTypes.number.isRequired,
  playSample: PropTypes.func.isRequired,
  stopAudio: PropTypes.func.isRequired,
};

const mapStateToProps = ({ audio }) => ({
  audios: audio.audios,
});

const mapDispatchToProps = {
  playSample, stopAudio,
};

export default connect(mapStateToProps, mapDispatchToProps)(DraggableSingleSample);
