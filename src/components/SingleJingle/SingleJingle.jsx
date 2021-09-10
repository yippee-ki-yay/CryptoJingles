import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Heart from '../Decorative/Heart';
import { likeUnLikeMarketplaceJingle } from '../../actions/marketplaceActions';
import { likeUnLikeProfileJingle } from '../../actions/profileActions';
import { formatSalePrice } from '../../actions/utils';
import SingleJingleVideo from './SingleJingleVideo';

import './SingleJingle.scss';

class SingleJingle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sound: null,
    };

    this.stopSound = this.stopSound.bind(this);
  }

  componentWillUnmount() { this.stopSound(); }

  stopSound = () => {
    if (!this.state.sound) return;
    this.state.sound.stop();
  };

  likeJingle = (jingleId, action) => {
    if (!this.props.canLike) return;
    if (this.props.type === 'marketplace') this.props.likeUnLikeMarketplaceJingle(jingleId, action);
    if (this.props.type === 'profile') this.props.likeUnLikeProfileJingle(jingleId, action);
  };

  render() {
    const {
      jingleId, author, name, onSale, price, likeCount, liked, hasMM, lockedMM, type, canLike,
      version, isOg,
    } = this.props;

    return (
      <div className="single-song single-jingle-wrapper">
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
            <SingleJingleVideo version={version} jingleId={jingleId} />
          </div>
        </div>

        <div className="jingle-footer">
          <div className="id-likes-wrapper">
            <span className="short-name"> {isOg && <b>OG </b>} v{version} #{ jingleId }</span>
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
  isOg: PropTypes.bool.isRequired,
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
