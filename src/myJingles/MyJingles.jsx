import React, { Component } from 'react';

import getWeb3 from '../util/web3/getWeb3';

import contract from 'truffle-contract';

import Jingle from '../../build/contracts/Jingle.json';

import '../util/config';
import { JingleAddress } from '../util/config';

class MyJingles extends Component {

  constructor(props) {
    super(props);

    this.state = {
      accounts: [],
      web3: null,
      jinglesIntance: null
    };

  }

   componentWillMount() {

    getWeb3
    .then(async (results) => {
      const web3 = results.payload.web3Instance;

      web3.eth.getAccounts(async (error, accounts) => {

         //setup contracts
        const jinglesContract = contract(Jingle);
        jinglesContract.setProvider(web3.currentProvider);

        console.log(JingleAddress);

        const jinglesIntance = await jinglesContract.at(JingleAddress);

        const jingles = await jinglesIntance.getJinglesForOwner(accounts[0], accounts[0]);

        console.log(jingles);

        this.setState({
          accounts,
          web3,
          jinglesIntance,
        });

      });
    });

  }

  render() {
      return (
          <div>
            My jingles
          </div>
      )
  }
}

export default MyJingles;

