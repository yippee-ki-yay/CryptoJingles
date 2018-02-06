import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import axios from 'axios';
import { Sound, Group} from 'pizzicato';
import JingleImage from '../components/JingleImage/JingleImage';

import { addPendingTx, guid, removePendingTx } from '../actions/appActions';
import { getColorForRarity } from '../actions/profileActions';

import './JinglePage.css';
import { API_URL } from '../util/config';
import { getJingleMetadata } from '../getMockData';
import LoadingIcon from '../components/Decorative/LoadingIcon';

class JinglePage extends Component {
  constructor(props ) {
    super(props);

    this.state = {
      jingle: null,
      loading: false,
      isOwner: false,
      account: '',
      start: false,
      sound: null,
      salePrice: undefined,
    };

    this.loadPage = this.loadPage.bind(this);
    this.stopSound = this.stopSound.bind(this);
    this.playSound = this.playSound.bind(this);
    this.loadJingle = this.loadJingle.bind(this);
  }

  componentWillMount() {
    this.loadPage(this.props.params.id);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.params.id === this.props.params.id) return;

    this.loadPage(newProps.params.id);
  }

  componentWillUnmount() { this.stopSound(); }

  loadPage = async (id) => {
    if (!window.web3.eth) {
      this.setState({ loading: false });
      return;
    }

    const jingleData = await axios(`${API_URL}/jingle/${id}`);
    const account = window.web3.eth.accounts[0];
    const isOwner = jingleData.data.owner === account;

    this.setState({
      jingle: jingleData.data,
      account,
      isOwner
    });
  };

  purchase = async () => {
    const jingle = this.state.jingle;

    const id = guid();
    this.props.addPendingTx(id, 'Buy Jingle');
    await window.marketplaceContract.buy(jingle.jingleId, {from: this.state.account, value: jingle.price});
    this.props.removePendingTx(id);

    const jingleData = await axios(`${API_URL}/jingle/${this.props.params.id}`);
    const account = window.web3.eth.accounts[0];
    const isOwner = jingleData.data.owner === account;

    this.setState({ jingle: jingleData.data, isOwner });
  };

  sell = async () => {
    let amount = this.state.salePrice;
    if (amount && (amount <= 0)) return;

    const jingle = this.state.jingle;

    const id = guid();
    this.props.addPendingTx(id, 'Sell Jingle');
    await window.jingleContract.approveAndSell(jingle.jingleId, amount, {from: this.state.account});
    this.props.removePendingTx(id);

    const jingleData = await axios(`${API_URL}/jingle/${this.props.params.id}`);
    this.setState({ jingle: jingleData.data, });
  };

  cancelSale = async () => {
    const jingle = this.state.jingle;

    const id = guid();
    this.props.addPendingTx(id, 'Cancel Sale');
    await window.marketplaceContract.cancel(jingle.jingleId, {from: this.state.account});
    this.props.removePendingTx(id);

    const jingleData = await axios(`${API_URL}/jingle/${this.props.params.id}`);
    this.setState({ jingle: jingleData.data, });
  };

  handleSalePriceChange = (e) => {
    this.setState({ salePrice: window.web3.toWei(e.target.value) });
  };

  loadJingle = () => {
    const jingleSrcs = this.state.jingle.sampleTypes.map((sampleType) =>
      new Promise((resolve) => {
        const sound = new Sound(getJingleMetadata(sampleType).source, () => {
          resolve(sound);
        });
      }));

    this.setState({ loading: true });

    Promise.all(jingleSrcs).then((sources) => {
      const longestSound = sources.reduce((prev, current) => (
        prev.getRawSourceNode().buffer.duration > current.getRawSourceNode().buffer.duration) ? prev : current);

      longestSound.on('stop', () => { this.setState({ start: false }); });

      this.setState({
        sound: new Group(sources),
        loading: false,
      });

      this.playSound();
    });
  };

  playSound = () => {
    if (this.state.sound === null) {
      this.loadJingle();
      return
    }

    this.state.sound.play();
    this.setState({ start: true });
  };

  stopSound = () => {
    if (!this.state.sound) return;
    this.state.sound.stop();
    this.setState({ start: false });
  };

  render() {
    const { jingle, isOwner } = this.state;

    return (
      <div className="container single-jingle-wrapper">
        {
          !window.web3.eth &&
          <div className="jingle-page-no-mm">
            <h1 className="buy-samples-link mm-link">
              Install
              <a
                target="_blank"
                rel="noopener"
                href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en"
              >
                MetaMask
              </a>
              in order to see jingle page
            </h1>
          </div>
        }

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
                        { this.state.loading && <LoadingIcon /> }
                        {
                          !this.state.start && !this.state.loading &&
                          <span onClick={ this.playSound }>
                            <i className="material-icons play">play_circle_outline</i>
                          </span>
                        }
                        {
                          this.state.start && !this.state.loading &&
                          <span onClick={ this.stopSound }><i className="material-icons stop">cancel</i></span>
                        }
                      </div>

                      <JingleImage id={jingle.jingleId} width={250} height={250} />
                    </div>

                    {
                      jingle.onSale &&
                      <div className="sell-price-wrapper">
                        <h3>
                          <span>Sell price:</span>
                          <span className="price">{ window.web3.fromWei(jingle.price, 'ether').slice(0, 8) }Ξ</span>
                        </h3>
                        {
                          !isOwner &&
                          <button type="submit" className="btn buy-button" onClick={ this.purchase }>
                            Purchase
                          </button>
                        }
                      </div>
                    }

                    {
                      !jingle.onSale &&
                      isOwner &&
                      <form className="sell-form" onSubmit={(e) => e.preventDefault()}>
                        <input
                          className="form-control"
                          placeholder="Sell price in ETH"
                          type="number"
                          step="any"
                          onChange={this.handleSalePriceChange}
                        />
                        <button type="submit" className="btn buy-button" onClick={ this.sell }>
                          Put on sale
                        </button>
                      </form>
                    }
                    {
                      jingle.onSale && isOwner && <button className="btn buy-button" onClick={ this.cancelSale }>Cancel Sale</button>
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
                          jingle.sampleTypes.map((type, i) => {
                            const sample = getJingleMetadata(type);
                            const background = getColorForRarity(sample.rarity);

                            return(
                              <span
                                key={ i }
                                className="sample"
                              >
                                { sample.name }
                              </span>
                            )
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
    )
  }
}

export default connect(null, { addPendingTx, removePendingTx })(JinglePage);

