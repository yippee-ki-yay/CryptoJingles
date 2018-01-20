import React, { Component } from 'react';

import getWeb3 from '../util/web3/getWeb3';

import contract from 'truffle-contract';

import Jingle from '../../build/contracts/Jingle.json';
import JingleBox from '../components/JingleBox/JingleBox';

import '../util/config';
import { JingleAddress } from '../util/config';

import { getJingleMetadata } from '../getMockData';

class MyJingles extends Component {

  constructor(props) {
    super(props);

    this.state = {
      accounts: [],
      web3: null,
      jinglesInstance: null,
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

        const jinglesInstance = await jinglesContract.at(JingleAddress);

        const jingles = await jinglesInstance.getAllJinglesForOwner(accounts[0]);

        const myJingles = this.parseJingles(jingles);

        this.setState({
          accounts,
          web3,
          jinglesInstance,
          myJingles
        });

      });
    });

  }

  parseJingles = (jingles) => {

    let myJingles = [];

    for (let i = 0; i < jingles.length; i += 2) {
      const id = jingles[i].valueOf()
      const type = jingles[i + 1].valueOf();

      myJingles.push({
        id,
        type,
        ...getJingleMetadata(type)
      });
    }

    return myJingles;

  }

  render() {
      return (
          <div className="container">
            My jingles : { 
              this.state.myJingles.map(jingle =>
                <div key={ jingle.id }>
                  <span> Jingle id: { jingle.id } </span>
                  <span>  type: { jingle.type } </span>
                  <span>  name: { jingle.name } </span>
                  <span>  source: { jingle.source } </span>
                </div>
                //<JingleBox key={ jingle.id } {...jingle} />
              )

             }
          </div>
      )
  }
}

export default MyJingles;

