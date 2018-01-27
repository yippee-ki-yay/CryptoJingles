import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSamples } from '../util/web3/ethereumService';
import SampleBox2 from '../components/SampleBox/SampleBox2';
import BoxLoader from '../components/Decorative/BoxLoader';
import contract from 'truffle-contract';
import { CryptoJinglesAddress, SAMPLE_PRICE } from '../util/config';
import getWeb3 from '../util/web3/getWeb3';
import CryptoJingles from '../../build/contracts/CryptoJingles.json';
import { addPendingTx, removePendingTx } from '../actions/appActions';

import './MySamples.css';

class MySamples extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      jinglesInstance: null,
      myJingles: [],
      numJingles: 1,
      accounts: [],
      web3: null,
      cryptoJinglesIntance: null,
      purchaseNum: 0,
      canBeOpened: false
    };

    this.handleChange = this.handleChange.bind(this);
  }

  async componentWillMount() {
    const results = await getWeb3();
    const web3 = results.payload.web3Instance;

    web3.eth.getAccounts(async (error, accounts) => {
      //setup contracts
      const cryptoJinglesContract = contract(CryptoJingles);
      cryptoJinglesContract.setProvider(web3.currentProvider);

      console.log(CryptoJinglesAddress, SAMPLE_PRICE);

      const cryptoJinglesIntance = await cryptoJinglesContract.at(CryptoJinglesAddress);

      const jinglesData = await getSamples(results.payload.web3Instance);

      this.setState({
        accounts,
        web3,
        ...jinglesData,
        loading: false,
        cryptoJinglesIntance,
      });
    });
  }


  handleChange = (event) => {
    if (event.target.value < 1) return;

    this.setState({
      [event.target.name] : event.target.value
    });
  };

  buyJingles = async () => {
    const id = Math.floor(Math.random() * 6) + 1;

    try {
      const numJingles = this.state.numJingles;
      const account = this.state.accounts[0];

      this.props.addPendingTx(id, 'Buy sample');

      const res = await this.state.cryptoJinglesIntance.buyJingle(parseInt(numJingles), {from: account, value: numJingles * SAMPLE_PRICE});

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

  render() {
      return (
          <div className="my-jingles-wrapper container">
            <div className="buy-samples-section">
                <div>
                  <form className="form-horizontal" onSubmit={(e) => { e.preventDefault(); }}>
                    <div className="buy-samples-wrapper">
                      <h2>Buy some samples:</h2>

                      <div className="form-items-wrapper">
                          <input
                            name="numJingles"
                            value={ this.state.numJingles }
                            onChange={ this.handleChange }
                            type="number"
                            className="form-control"
                            placeholder="Num. of Jingles" />

                        {  !this.state.canBeOpened &&
                           <button type="submit" className="btn buy-button" onClick={ this.buyJingles }>Buy!</button>
                        }

                        {  this.state.canBeOpened &&
                          <button type="submit" className="btn buy-button" onClick={ this.openJingles }>Open!</button>
                        }
                      </div>
                    </div>
                  </form>
              </div>
            </div>

            <div className="separator" />

            <div className="samples-wrapper">
              {
                this.state.loading &&
                <div className="loader-wrapper">
                  <BoxLoader />
                </div>
              }

              {
                (this.state.myJingles.length === 0) &&
                !this.state.loading &&
                <div>
                  <h2>You do not own any samples yet!</h2>
                </div>
              }

              {
                (this.state.myJingles.length > 0) &&
                !this.state.loading &&
                <div>
                  {
                    this.state.myJingles.map(jingle =>
                      <SampleBox2
                        key={jingle.id}
                        {...jingle}
                      />
                    )
                  }
                </div>
              }
            </div>
          </div>
      )
  }
}

export default connect(null, { addPendingTx, removePendingTx })(MySamples);

