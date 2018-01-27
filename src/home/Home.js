import React, { Component } from 'react';

import '../util/config';
import "./Home.css";
import soundwawe from './soundwawe.svg';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return(
      <div className="container">
        <div className="homepage-main">
          <h1 className="homepage-main">Crypto Jingles</h1>
          <h4>Compose the best jingles on the blockchain, you can share them, sell them and love them.</h4>
        </div>
        <img src={soundwawe} alt="soundwawe"/>
      </div>
    )
  }
}

export default Home;
