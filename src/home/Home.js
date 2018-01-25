import React, { Component } from 'react';
import { connect } from 'react-redux';
import contract from 'truffle-contract';

import getWeb3 from '../util/web3/getWeb3';
import CryptoJingles from '../../build/contracts/CryptoJingles.json';
import { CryptoJinglesAddress, JINGLE_PRICE } from '../util/config';
import { addPendingTx, removePendingTx } from '../actions/appActions';

import '../util/config';
import "./Home.css";

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
    const results = await getWeb3();
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
  }

  buyJingles = async () => {
    const id = Math.floor(Math.random() * 6) + 1;

    try {
      const numJingles = this.state.numJingles;
      const account = this.state.accounts[0];

      this.props.addPendingTx(id, 'Buy sample');

      const res = await this.state.cryptoJinglesIntance.buyJingle(parseInt(numJingles), {from: account, value: numJingles * JINGLE_PRICE});

      this.props.removePendingTx(id);

      // this.state.cryptoJinglesIntance.Purchased((err, res) => {
      //   console.log(err, res);
      // });

      console.log(res);
      console.log(res.logs[0].args);

      const purchaseNum = res.logs[0].args.numOfPurchases.valueOf();

      console.log(purchaseNum);

      this.setState({
        purchaseNum,
        canBeOpened: true
      });

    } catch(err) {
      this.props.removePendingTx(id);
      console.log(err);
    }
  };

  openJingles = async () => {
    const id = Math.floor(Math.random() * 6) + 1;

    try {

      const purchaseNum = this.state.purchaseNum;
      const account = this.state.accounts[0];

      this.props.addPendingTx(id, 'Open sample pack');

      const res = await this.state.cryptoJinglesIntance.openJingles(purchaseNum, {from: account});

      this.props.removePendingTx(id);

      console.log(res);

    } catch(err) {
      this.props.removePendingTx(id);
      console.log(err);
    }
  };

  handleChange = (event) => {
    this.setState({
        [event.target.name] : event.target.value
    });
  };

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
              <form className="form-horizontal" onSubmit={(e) => { e.preventDefault(); }}>
                <legend>Buy some jingles!</legend>
                  <div className="row">
                    <div className="col-lg-8">
                        <input name="numJingles" value={ this.state.numJingles } onChange={ this.handleChange } type="number" className="form-control" placeholder="Num. of Jingles" />
                    </div>

                    {  !this.state.canBeOpened &&
                      <div className="col-lg-4">
                        <button type="submit" className="btn btn-info" onClick={ this.buyJingles }>Buy!</button>
                      </div>
                    }

                    {  this.state.canBeOpened &&
                      <div className="col-lg-4">
                        <button type="submit" className="btn btn-info" onClick={ this.openJingles }>Open!</button>
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
                You can buy between 1 - 10 samples <br />
                Each jingle costs X amount of ether <br />
                In the compose menu you can create jingles with your samples <br />
                In the marketplace you can trade jingles
              </div>

            </div>
          </div>

        </div>
      </div>
    )
  }
}

export default connect(null, { addPendingTx, removePendingTx })(Home);
