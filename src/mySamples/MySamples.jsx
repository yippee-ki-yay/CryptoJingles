import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSamples } from '../util/web3/ethereumService';
import SampleBox2 from '../components/SampleBox/SampleBox2';
import BoxLoader from '../components/Decorative/BoxLoader';
import { SAMPLE_PRICE } from '../util/config';
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
      purchaseNum: 0
    };

    this.handleChange = this.handleChange.bind(this);
  }

  async componentWillMount() {
    const jinglesData = await getSamples();
    this.setState({ ...jinglesData, loading: false });
  }

  handleChange = (event) => {
    if (event.target.value < 1) return;

    this.setState({ [event.target.name] : event.target.value });
  };

  buyJingles = async () => {
    const id = Math.floor(Math.random() * 6) + 1;

    try {
      window.web3.eth.getAccounts(async (error, accounts) => {
        const numJingles = this.state.numJingles;
        const account = accounts[0];

        this.props.addPendingTx(id, 'Buy sample');

        const res = await window.contract.buyJingle(parseInt(numJingles, 10), {from: account, value: numJingles * SAMPLE_PRICE});

        this.props.removePendingTx(id);

        console.log(res);
        console.log(res.logs[0].args);

        const purchaseNum = res.logs[0].args.numOfPurchases.valueOf();

        console.log('purchaseNum', purchaseNum);

        this.setState({ purchaseNum });
      });
    } catch(err) {
      this.props.removePendingTx(id);
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

                        <button type="submit" className="btn buy-button" onClick={ this.buyJingles }>Buy!</button>
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

