import React, { Component } from 'react';

import "./Home.css";

import getWeb3 from '../util/web3/getWeb3';

import contract from 'truffle-contract';

import CryptoJingles from '../../build/contracts/CryptoJingles.json';

import '../util/config';
import { CryptoJinglesAddress } from '../util/config';

class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      numJingles: 0,
      accounts: [],
      web3: null,
      cryptoJinglesIntance: null
    };
  }

  async componentWillMount() {

    getWeb3
    .then(async (results) => {
      const web3 = results.payload.web3Instance;

      web3.eth.getAccounts(async (error, accounts) => {

         //setup contracts
        const cryptoJinglesContract = contract(CryptoJingles);
        cryptoJinglesContract.setProvider(web3.currentProvider);

        const cryptoJinglesIntance = await cryptoJinglesContract.at(CryptoJinglesAddress);

         this.setState({
            accounts,
            web3,
            cryptoJinglesIntance,
          });

      });
    });

  }

  buyJingles = () => {
    
  }

  render() {
    return(
      <div className="container">
        <div className="jumbotron headline">
            <h1>Crypto jingles</h1>
            <p>Compose the best jingles on the blockchain, you can share them, sell them and love them.</p>
        </div>

        <div className="row">

          <div className="col-md-6">
            <div className="well bs-component">
              <form className="form-horizontal">
                <legend>Buy some jingles!</legend>
                  <div className="row">
                    <div className="col-lg-8">
                        <input name="wei" value={ this.state.numJingles } type="number" className="form-control" placeholder="Num. of Jingles" />
                    </div>

                    <div className="col-lg-4">
                      <button type="button" className="btn btn-info" onClick={ this.buyJingles }>Buy!</button>
                    </div>
                  </div>
              </form>
            </div>
          </div>

          <div className="col-md-6">
            <div className="well bs-component">
            <legend>How does it work?</legend>

              <div>
                You can buy between 1 - 20 jingles <br />
                Each jingle costs X amount of ether <br />
                In the compose menu you can create songs with your jingles <br />
                In the marketplace you can trade songs and individual jingles
              </div>

            </div>
          </div>

        </div>
      </div>
    )
  }
};

export default Home;
