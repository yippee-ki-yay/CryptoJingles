
import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { getSongs } from '../getMockData';
import { marketplaceSetSingleSong } from '../actions/audioActions';

import './MarketplaceJingle.css';
import { API_URL } from '../util/config';

import img0 from '../mockImages/render_0.png';

class MarketplaceJingle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      jingle: null,
      isOwner: false,
      account: ''
    }
  }

  async componentDidMount() {

    const jingleData = await axios(`${API_URL}/jingle/${this.props.params.id}`);

    // append default img
    jingleData.data.imageSrc = img0;

    window.web3.eth.getAccounts((err, res) => {
      const isOwner = (jingleData.data.owner === res[0]) ? true : false;
  
      this.setState({
        jingle: jingleData.data,
        isOwner,
        account: res[0]
      });
    });
  }

  purchase = () => {
    const jingle = this.state;

    
  }

  sell = async () => {
    const jingle = this.state.jingle;

    //TODO: get price input from user
    const amount = parseInt(Math.floor((Math.random() % 100000000) * 10000000));

    console.log(jingle.jingleId, amount);

    await window.jingleContract.approveAndSell(jingle.jingleId, amount, {from: this.state.account});

    console.log('Jingle has been set for sale');
  }

  render() {
    const { jingle, isOwner } = this.state;

    return (
      <div className="container single-jingle-wrapper">
        <div className="row">
          <div className="col-md-2" />
          <div className="col-md-8 row-wrapper-jingle">
            {
              jingle &&
              <div>
                <div className="jingle-id">#{ jingle.jingleId }</div>
                <div className="jingle-details-wrapper">
                  <div className="buy-options">
                    <img src={jingle.imageSrc} alt="jingle background" />
                    {
                      jingle.onSale && !isOwner && <button className="btn buy-button" onClick={ this.purchase }>Purchase</button>
                    }
                    {
                      !jingle.onSale && isOwner && <button className="btn buy-button" onClick={ this.sell }>Sell</button>
                    }
                  </div>

                  <div className="jingle-details">
                    {
                      jingle.sale &&
                      <div className="jingle-label">
                        <h4>Sale price</h4>
                        <div>{ jingle.price }Ξ</div>
                      </div>
                    }
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
                        <span className="sample">Guitar</span>
                        <span className="sample">Groovy</span>
                        <span className="sample">Drums</span>
                        <span className="sample">Vocal</span>
                        <span className="sample">Bell</span>
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

export default connect(null, { marketplaceSetSingleSong })(MarketplaceJingle);

