import React, { Component } from 'react';

import getWeb3 from '../util/web3/getWeb3';
import { getJingles } from "../util/web3/ethereumService";

class MyJingles extends Component {

  constructor(props) {
    super(props);

    this.state = {
      jinglesData: []
    };

  }

  async componentWillMount() {
    const results = await getWeb3();
    const jinglesData = await getJingles(results.payload.web3Instance);

    console.log(jinglesData);

    this.setState({ ...jinglesData });
 }

  render() {
      return (
          <div>
            Id of jingles:

            {
              this.state.jinglesData.map(j => 
                <div>{ j } </div>
              )
            }
          </div>
      )
  }
}

export default MyJingles;

