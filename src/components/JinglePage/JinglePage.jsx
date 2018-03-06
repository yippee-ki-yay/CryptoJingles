import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import JingleImage from '../JingleImage/JingleImage';
import Heart from '../Decorative/Heart';
import { getJingleMetadata } from '../../constants/getMockData';
import LoadingIcon from '../Decorative/LoadingIcon';
import { formatSalePrice } from '../../services/generalService';
import { playJingle, stopAudio } from '../../actions/audioActions';
import {
  loadPage, purchaseJingle, cancelJingleSale, putJingleOnSale, handleSalePriceChange, likeUnlikeJinglePageJingle,
} from '../../actions/jinglePageActions';
// import { getColorForRarity } from '../../actions/profileActions';

import './JinglePage.scss';

class JinglePage extends Component {
  componentWillMount() { this.props.loadPage(this.props.params.id); }
  componentWillReceiveProps(newProps) {
    if (newProps.params.id === this.props.params.id) return;
    this.props.loadPage(newProps.params.id);
  }
  componentWillUnmount() { this.props.stopAudio(`jingle-${this.props.jingle.jingleId}`); }

  render() {
    const {
      hasMM, lockedMM, canLike, jingle, isOwner, validJingle, playJingle, stopAudio, audios, purchaseJingle,
      cancelJingleSale, putJingleOnSale, handleSalePriceChange, likeUnlikeJinglePageJingle,
    } = this.props;
    let audio = false;

    if (jingle) audio = audios.find(_audio => _audio.id === `jingle-${jingle.jingleId}`);

    const playing = audio && audio.playing;
    const loading = audio && audio.loading;

    return (
      <div className="container single-jingle-wrapper">
        {
          validJingle &&
          <div>
            <div className="row">
              <div className="col-md-2" />
              <div className="col-md-8 row-wrapper-jingle">
                {
                  jingle &&
                  <div>
                    <div className="jingle-id">#{ jingle.jingleId }</div>
                    <div className="jingle-details-wrapper">
                      <div className="buy-options">
                        <div className="jingle-page-img">
                          <div className="overlay">
                            { loading && <LoadingIcon /> }
                            {
                              !playing && !loading &&
                              <span
                                onClick={() => {
                                  playJingle(`jingle-${jingle.jingleId}`, jingle.settings, jingle.sampleTypes);
                                }}
                              >
                                <i className="material-icons play">play_circle_outline</i>
                              </span>
                            }
                            {
                              playing && !loading &&
                              <span onClick={() => { stopAudio(`jingle-${jingle.jingleId}`); }}>
                                <i className="material-icons stop">cancel</i>
                              </span>
                            }
                          </div>

                          <JingleImage id={jingle.jingleId} width={250} height={250} />
                        </div>

                        <div className="liked-section">
                          <span onClick={() => { likeUnlikeJinglePageJingle(jingle.jingleId, !jingle.liked); }}>
                            <Heart active={jingle.liked} size="40" canLike={hasMM && !lockedMM && canLike} />
                          </span>

                          { jingle.likeCount }
                        </div>

                        {
                          jingle.onSale &&
                          <div className="sell-price-wrapper">
                            <h3>
                              <span>Sell price:</span>
                              <span className="price">{ formatSalePrice(jingle.price) }Ξ</span>
                            </h3>
                            {
                              !isOwner &&
                              (hasMM && !lockedMM) &&
                              <button type="submit" className="btn buy-button" onClick={purchaseJingle}>
                                Purchase
                              </button>
                            }
                          </div>
                        }

                        {
                          !jingle.onSale &&
                          isOwner &&
                          (hasMM && !lockedMM) &&
                          <form className="sell-form" onSubmit={e => e.preventDefault()}>
                            <input
                              className="form-control"
                              placeholder="Sell price in ETH"
                              type="number"
                              step="any"
                              onChange={handleSalePriceChange}
                            />
                            <button type="submit" className="btn buy-button" onClick={putJingleOnSale}>
                              Put on sale
                            </button>
                          </form>
                        }
                        {
                          jingle.onSale &&
                          (hasMM && !lockedMM) &&
                          isOwner &&
                          <button className="btn buy-button" onClick={cancelJingleSale}>Cancel Sale</button>
                        }
                      </div>

                      <div className="jingle-details">
                        <div className="jingle-label owner">
                          <h4>Owner</h4>
                          <div>
                            <Link to={`/profile/${jingle.owner}`}>{jingle.owner}</Link>
                          </div>
                        </div>
                        <div className="jingle-label">
                          <h4>Author</h4>
                          <div>{ jingle.author }</div>
                        </div>
                        <div className="jingle-label">
                          <h4>Name</h4>
                          <div>{ jingle.name }</div>
                        </div>

                        <div className="jingle-samples-wrapper">
                          <h4>Samples</h4>
                          <div className="samples">
                            {
                              jingle.sampleTypes.map((type) => {
                                const sample = getJingleMetadata(type);
                                // const background = getColorForRarity(sample.rarity);

                                return (
                                  <span key={type} className="sample">
                                    { sample.name }
                                  </span>
                                );
                              })
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                }
              </div>
              <div className="col-md-2" />
            </div>
          </div>
        }

        {
          !validJingle &&
          <div className="not-valid-message">
            The jingle you are searching for does not yet exist.
          </div>
        }
      </div>
    );
  }
}

JinglePage.defaultProps = {
  jingle: null,
};

JinglePage.propTypes = {
  params: PropTypes.object.isRequired,
  hasMM: PropTypes.bool.isRequired,
  lockedMM: PropTypes.bool.isRequired,
  canLike: PropTypes.bool.isRequired,
  loadPage: PropTypes.func.isRequired,
  jingle: PropTypes.object,
  isOwner: PropTypes.bool.isRequired,
  validJingle: PropTypes.bool.isRequired,
  playJingle: PropTypes.func.isRequired,
  stopAudio: PropTypes.func.isRequired,
  purchaseJingle: PropTypes.func.isRequired,
  cancelJingleSale: PropTypes.func.isRequired,
  putJingleOnSale: PropTypes.func.isRequired,
  handleSalePriceChange: PropTypes.func.isRequired,
  likeUnlikeJinglePageJingle: PropTypes.func.isRequired,
  audios: PropTypes.array.isRequired,
};

const mapStateToProps = ({ app, jinglePage, audio }) => ({
  hasMM: app.hasMM,
  lockedMM: app.lockedMM,
  canLike: app.canLike,
  address: app.address,
  jingle: jinglePage.jingle,
  isOwner: jinglePage.isOwner,
  validJingle: jinglePage.validJingle,
  audios: audio.audios,
});

const mapDispatchToProps = {
  loadPage,
  playJingle,
  stopAudio,
  purchaseJingle,
  cancelJingleSale,
  putJingleOnSale,
  handleSalePriceChange,
  likeUnlikeJinglePageJingle,
};

export default connect(mapStateToProps, mapDispatchToProps)(JinglePage);

