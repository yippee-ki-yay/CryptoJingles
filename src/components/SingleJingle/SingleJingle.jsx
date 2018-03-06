import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import JingleImage from '../JingleImage/JingleImage';
import LoadingIcon from '../../components/Decorative/LoadingIcon';
import Heart from '../../components/Decorative/Heart';
import { playJingle, stopAudio } from '../../actions/audioActions';
import { formatSalePrice } from '../../services/generalService';

class SingleJingle extends Component {
  componentWillUnmount() { this.props.stopAudio(`jingle-${this.props.jingleId}`); }

  likeJingle = (jingleId, action) => {
    if (!this.props.canLike) return;
    this.props.onJingleLike(jingleId, action);
  };

  render() {
    const {
      jingleId, author, name, onSale, price, likeCount, liked, hasMM, lockedMM, type, canLike, audios, playJingle,
      settings, sampleTypes, stopAudio,
    } = this.props;

    const id = `jingle-${jingleId}`;
    const audio = audios.find(_audio => _audio.id === id);
    const playing = audio && audio.playing;
    const loading = audio && audio.loading;

    return (
      <div key={jingleId} className="single-song">
        <div className="jingle-image-actions">
          {
            onSale &&
            <div className="header-label">
              <span>On sale for:</span>
              {formatSalePrice(price)}Ξ
            </div>
          }

          <div className="jingle-image-container">
            <JingleImage width={200} height={200} id={jingleId} />
          </div>

          <div className="overlay">
            { loading && <LoadingIcon /> }
            {
              !playing && !loading &&
              <span onClick={() => { playJingle(id, settings, sampleTypes); }}>
                <i className="material-icons play">play_circle_outline</i>
              </span>
            }
            {
              playing && !loading &&
              <span onClick={() => { stopAudio(id); }}><i className="material-icons stop">cancel</i></span>
            }
            <Link to={`/jingle/${jingleId}`}>
              <i className="material-icons open">open_in_new</i>
            </Link>
          </div>
        </div>

        <div className="jingle-footer">
          <div className="id-likes-wrapper">
            <span>#{ jingleId }</span>
            {
              type !== 'home' &&
              <span>
                <span onClick={() => { this.likeJingle(jingleId, !liked); }}>
                  <Heart active={liked} size="30" canLike={hasMM && !lockedMM && canLike} />
                </span>
                <span>{ likeCount }</span>
              </span>
            }
          </div>
          <div className="jingle-footer-author">{ author }</div>
          <div className="jingle-footer-name">{ name }</div>
        </div>
      </div>
    );
  }
}

SingleJingle.propTypes = {
  hasMM: PropTypes.bool.isRequired,
  lockedMM: PropTypes.bool.isRequired,
  canLike: PropTypes.bool.isRequired,
  settings: PropTypes.array.isRequired,
  sampleTypes: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
  jingleId: PropTypes.number.isRequired,
  author: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onSale: PropTypes.bool.isRequired,
  price: PropTypes.number.isRequired,
  likeCount: PropTypes.number.isRequired,
  liked: PropTypes.bool.isRequired,
  audios: PropTypes.array.isRequired,
  playJingle: PropTypes.func.isRequired,
  stopAudio: PropTypes.func.isRequired,
  onJingleLike: PropTypes.func.isRequired,
};

const mapStateToProps = ({ compose, app, audio }) => ({
  volumes: compose.volumes,
  delays: compose.delays,
  hasMM: app.hasMM,
  lockedMM: app.lockedMM,
  canLike: app.canLike,
  audios: audio.audios,
});

const mapDispatchToProps = { playJingle, stopAudio };

export default connect(mapStateToProps, mapDispatchToProps)(SingleJingle);
