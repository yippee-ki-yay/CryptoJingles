import React, { Component } from 'react';

import "./Home.css";

import getWeb3 from '../util/web3/getWeb3';

import contract from 'truffle-contract';

import CryptoJingles from '../../build/contracts/CryptoJingles.json';

import '../util/config';
import { CryptoJinglesAddress, JINGLE_PRICE } from '../util/config';

class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      numJingles: 0,
      accounts: [],
      web3: null,
      cryptoJinglesIntance: null,
      purchaseNum: 0,
      canBeOpened: false
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

        console.log(CryptoJinglesAddress, JINGLE_PRICE);

        const cryptoJinglesIntance = await cryptoJinglesContract.at(CryptoJinglesAddress);

         this.setState({
            accounts,
            web3,
            cryptoJinglesIntance,
          });

      });
    });

  }

  buyJingles = async () => {
    try {

      const numJingles = this.state.numJingles;
      const account = this.state.accounts[0];

      const res = await this.state.cryptoJinglesIntance.buyJingle(numJingles, {from: account, value: numJingles * JINGLE_PRICE});

      // this.state.cryptoJinglesIntance.Purchased((err, res) => {
      //   console.log(err, res);
      // });

      console.log(res.logs[0].args);

      const purchaseNum = res.logs[0].args.numOfPurchases.valueOf();

      console.log(purchaseNum);

      this.setState({
        purchaseNum,
        canBeOpened: true
      });

    } catch(err) {
      console.log(err);
    }
  }

  openJingles = async () => {
    try {

      const purchaseNum = this.state.purchaseNum;
      const account = this.state.accounts[0];

      const res = await this.state.cryptoJinglesIntance.openJingles(purchaseNum - 1, {from: account});

      console.log(res);

    } catch(err) {
      console.log(err);
    }
  }

  handleChange = (event) => {
    this.setState({
        [event.target.name] : event.target.value
    });
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
                        <input name="numJingles" value={ this.state.numJingles } onChange={ this.handleChange } type="number" className="form-control" placeholder="Num. of Jingles" />
                    </div>

                    {  !this.state.canBeOpened &&
                      <div className="col-lg-4">
                        <button type="button" className="btn btn-info" onClick={ this.buyJingles }>Buy!</button>
                      </div>
                    }

                    {  this.state.canBeOpened &&
                      <div className="col-lg-4">
                        <button type="button" className="btn btn-info" onClick={ this.openJingles }>Open!</button>
                      </div>
                    }
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
