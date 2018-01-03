import React, { Component } from 'react';

import "./Home.css";

class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      numJingles: 0
    };
  }

  buyJingles = () => {
    
  }

  render() {
    return(
      <div className="container">
        <div className="jumbotron headline">
            <h1>Crypto jingles</h1>
            <p>Compose the best jingles on the blockchain, you can share them, sell them and love them.</p>
        </div>

        <div className="row">

          <div className="col-md-6">
            <div className="well bs-component">
              <form className="form-horizontal">
                <legend>Buy some jingles!</legend>
                  <div className="row">
                    <div className="col-lg-8">
                        <input name="wei" value={ this.state.numJingles } type="number" className="form-control" placeholder="Num. of Jingles" />
                    </div>

                    <div className="col-lg-4">
                      <button type="button" className="btn btn-info" onClick={ this.buyJingles }>Buy!</button>
                    </div>
                  </div>
              </form>
            </div>
          </div>

          <div className="col-md-6">
            <div className="well bs-component">
            <legend>How does it work?</legend>

              <div>
                You can buy between 1 - 20 jingles <br />
                Each jingle costs X amount of ether <br />
                In the compose menu you can create songs with your jingles <br />
                In the marketplace you can trade songs and individual jingles
              </div>

            </div>
          </div>

        </div>
      </div>
    )
  }
};

export default Home;
