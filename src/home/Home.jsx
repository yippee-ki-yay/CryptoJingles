import React, { Component } from 'react';
import { getJingleMetadata } from '../getMockData';
import SampleBox2 from '../components/SampleBox/SampleBox2';
import SingleJingle from '../components/SingleJingle/SingleJingle';

import '../util/config';
import "./Home.css";
import bigLogo from './bigLogo.png';
import { Link } from 'react-router';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sample1: getJingleMetadata(24),
      sample2: getJingleMetadata(67),
      sample3: getJingleMetadata(90),
      sample4: getJingleMetadata(0),
      jingle: {
        author: 'Soundtoshi Nakajingles',
        jingleId: 7,
        name: 'catch name',
        onSale: false,
        owner: "0x93cdb0a93fc36f6a53ed21ecf6305ab80d06beca",
        price: 0,
        sampleTypes: ["56", "1", "16", "19", "84"]
      },
    };
  }

  render() {
    return(
      <div className="container home">
        <div className="homepage-main">
          <img className="big-logo" src={bigLogo} alt="Logo with typeface"/>
          <div className="home-title">
            Compose the best jingles on the blockchain, you can share them, sell them and love them.
          </div>

          <div className="btn-wrapper">
            <Link to={`/profile/${window.web3.eth.accounts[0]}`}>
              <button className="btn buy-button">
                Start jamming!
              </button>
            </Link>
          </div>
        </div>

        <div className="separator" />
        
        <div className="explanation-section">
          <div className="left">
            <h2>What is it?</h2>
          </div>
          <div className="right">
            Crypto Jingles is the first sound based, completely decentralized Ethereum game.
            The goal of it is simple, mix your sound samples to create the best sounding jingle.
            Every composed jingle is completely unique and nobody can create a jingle that sounds the same and has
            the same combination of samples. All sound samples and composed jingles are completely owned by you!
          </div>
        </div>

        <div className="separator" />

        <div className="explanation-section-2">
          <div className="description">
            <h3>Samples</h3>
            <div className="sample-text">
              Currently there are 100 sound samples available in the game with the possibility to add more in the
              future. A sample can be one of 4 types of rarity: common, rare, legendary and mythical. Rarer the sample,
              better the sound. Ovde napises nesto o odnosu retkosti Nenade.
              Every sound sample is hosted on IPFS and referenced on the main smart contract. Sammples have a fixed
              price of * dodati tacnu cenu * and can't be traded. In order to compose a jingle you need at least 5
              samples. When a sample is used to compose a jingle it becomes a part of it and you can't use it in
              other jingles.
            </div>
          </div>

          <div className="home-samples-wrapper">
            <div className="home-samples">
              <SampleBox2 {...this.state.sample1} />
              <SampleBox2 {...this.state.sample2} />
              <SampleBox2 {...this.state.sample3} />
              <SampleBox2 {...this.state.sample4} />
            </div>
          </div>
        </div>

        <div className="separator" />

        <div className="explanation-section-2">
          <div className="home-samples-wrapper">
            <div className="home-samples">
              <SingleJingle {...this.state.jingle} />
            </div>
          </div>

          <div className="description">
            <h3>Jingles</h3>
            <div className="sample-text">
              Napisi tekst o jinglovima
            </div>
          </div>
        </div>

        <div className="separator" />

        <div>
          Zakljucak i linkovi
        </div>

        <div>
          <Link to={`/profile/${window.web3.eth.accounts[0]}`}>Reddit</Link>
          <Link to={`/profile/${window.web3.eth.accounts[0]}`}>Discord</Link>
          <Link to={`/profile/${window.web3.eth.accounts[0]}`}>Medium</Link>
        </div>
      </div>
    )
  }
}

export default Home;
