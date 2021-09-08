import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import LoadingIcon from '../Decorative/LoadingIcon';
import Heart from '../Decorative/Heart';
import { likeUnLikeMarketplaceJingle } from '../../actions/marketplaceActions';
import { likeUnLikeProfileJingle } from '../../actions/profileActions';
import { formatSalePrice } from '../../actions/utils';

import loadingGif from './loadingGif.gif';
import './SingleJingle.scss';

class SingleJingle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      start: false,
      loading: false,
      sound: null,
    };

    this.stopSound = this.stopSound.bind(this);
    this.playSound = this.playSound.bind(this);
  }

  componentWillUnmount() { this.stopSound(); }

  playSound = () => {
    // TODO - play jingle
    this.setState({ start: true });
  };

  stopSound = () => {
    if (!this.state.sound) return;
    this.state.sound.stop();
    this.setState({ start: false });
  };

  likeJingle = (jingleId, action) => {
    if (!this.props.canLike) return;
    if (this.props.type === 'marketplace') this.props.likeUnLikeMarketplaceJingle(jingleId, action);
    if (this.props.type === 'profile') this.props.likeUnLikeProfileJingle(jingleId, action);
  };

  render() {
    const {
      jingleId, author, name, onSale, price, likeCount, liked, hasMM, lockedMM, type, canLike,
      version,
    } = this.props;

    const videoSrc = `https://cryptojingles.app/public/videosWithSound/v${version}_${jingleId}.webm`;

    return (
      <div key={jingleId} className="single-song single-jingle-wrapper">
        <div className="jingle-image-actions">
          {
            onSale && (
              <div className="header-label">
                <span>On sale for:</span>
                {formatSalePrice(price)}Ξ
              </div>
            )
          }

          <div className="jingle-image-container">
            <video // eslint-disable-line
              muted
              autoPlay
              loop
              playsInline
              poster={loadingGif}
            >
              <source src={videoSrc} type="video/webm" />
            </video>
          </div>

          <div className="overlay">
            { this.state.loading && <LoadingIcon /> }
            {
              !this.state.start && !this.state.loading && (
                <span onClick={this.playSound}>
                  <i className="material-icons play">play_circle_outline</i>
                </span>
              )
            }
            {
              this.state.start && !this.state.loading &&
              <span onClick={this.stopSound}><i className="material-icons stop">cancel</i></span>
            }
            <Link to={`/jingle/${jingleId}`}>
              <i className="material-icons open">open_in_new</i>
            </Link>
          </div>
        </div>

        <div className="jingle-footer">
          <div className="id-likes-wrapper">
            <span>v{version} #{ jingleId }</span>
            {
              type !== 'home' && (
                <span>
                  <span onClick={() => { this.likeJingle(jingleId, !liked); }}>
                    <Heart active={liked} size="30" canLike={hasMM && !lockedMM && canLike} />
                  </span>
                  <span>{ likeCount }</span>
                </span>
              )
            }
          </div>
          <div className="jingle-footer-author">{ author }</div>
          <div className="jingle-footer-name">{ name }</div>
        </div>
      </div>
    );
  }
}

SingleJingle.defaultProps = {
  version: 1,
};

SingleJingle.propTypes = {
  likeUnLikeMarketplaceJingle: PropTypes.func.isRequired,
  likeUnLikeProfileJingle: PropTypes.func.isRequired,
  hasMM: PropTypes.bool.isRequired,
  lockedMM: PropTypes.bool.isRequired,
  canLike: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  jingleId: PropTypes.number.isRequired,
  author: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onSale: PropTypes.bool.isRequired,
  price: PropTypes.number.isRequired,
  likeCount: PropTypes.number.isRequired,
  liked: PropTypes.bool.isRequired,
  version: PropTypes.number,
};

const mapStateToProps = (state) => ({
  volumes: state.compose.volumes,
  delays: state.compose.delays,
  hasMM: state.app.hasMM,
  lockedMM: state.app.lockedMM,
  canLike: state.app.canLike,
});

const mapDispatchToProps = { likeUnLikeMarketplaceJingle, likeUnLikeProfileJingle };

export default connect(mapStateToProps, mapDispatchToProps)(SingleJingle);
