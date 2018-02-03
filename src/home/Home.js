import React, { Component } from 'react';

import '../util/config';
import "./Home.css";
import soundwawe from './soundwawe.svg';
import { Link } from 'react-router';

class Home extends Component {A
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
        <Link to={`/profile/${window.web3.eth.accounts[0]}`}>Get started</Link>

        <img src={soundwawe} alt="soundwawe"/>
        
        <div className="explanation-page">
          <h2>How does it work?</h2>
          <div>This is a game based on the Ethereum blockchain. 
            Every jingle you compose is unique and stored on the blockchain as a token.
            Playing the game is easy and can be explained in 3 steps:
            </div>
            <ul>
              <li>Buy samples (You'll need Meta Mask installed)</li>
              <li>Combine samples into a jingle</li>
              <li>Share with the world!</li>
            </ul>
        </div>

        <footer>
          <Link to={`/profile/${window.web3.eth.accounts[0]}`}>Reddit</Link>
          <Link to={`/profile/${window.web3.eth.accounts[0]}`}>Discord</Link>
          <Link to={`/profile/${window.web3.eth.accounts[0]}`}>Medium</Link>
        </footer>
      </div>
    )
  }
}

export default Home;
