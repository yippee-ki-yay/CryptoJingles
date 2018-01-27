import React, { Component } from 'react';

import axios from 'axios';

import getWeb3 from '../util/web3/getWeb3';
import { getJingles } from '../util/web3/ethereumService';
import { API_URL } from '../util/config';

class MyJingles extends Component {

  constructor(props) {
    super(props);

    this.state = {
      jinglesData: []
    };

  }

  async componentWillMount() {
    const results = await getWeb3();

    const web3 = results.payload.web3Instance;

    const res = await axios(`${API_URL}/jingles/${web3.eth.accounts[0]}`);

    const jinglesData = res.data;

    console.log(jinglesData);

    this.setState({ ...jinglesData });
 }

  render() {
      return (
          <div>
            My jingles:
          </div>
      )
  }
}

export default MyJingles;

