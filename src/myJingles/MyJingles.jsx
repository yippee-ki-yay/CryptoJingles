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
      jinglesIntance: null,
      myJingles: []
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

        const jingles = await jinglesIntance.getAllJinglesForOwner(accounts[0]);

        const myJingles = this.parseJingles(jingles);

        this.setState({
          accounts,
          web3,
          jinglesIntance,
          myJingles
        });

      });
    });

  }

  parseJingles = (jingles) => {

    let myJingles = [];

    for (let i = 0; i < jingles.length; i += 2) {
      myJingles.push({
        id: jingles[i].valueOf(),
        type: jingles[i + 1].valueOf()
      });
    }

    return myJingles;

  }

  render() {
      return (
          <div>
            My jingles : { 
              this.state.myJingles.map(jingle =>
                <div key={ jingle.id }>
                  <span> Jingle id: { jingle.id } </span>
                  <span> Jingle type: { jingle.type } </span>
                </div>
              )

             }
          </div>
      )
  }
}

export default MyJingles;

