import React, { Component } from 'react';
import PendingTxDropdown from './components/PendingTxDropdown/PendingTxDropdown';

// Styles
import './css/bootstrap.min.css';
import './css/custom.min.css';
import './css/theme.min.css';
import './App.css';

class App extends Component {
  render() {

    return (
      <div>
        <header className="navbar navbar-default navbar-fixed-top header-wrapper">
          <div className="container">
            <div className="navbar-header">
              <a href="/" className="navbar-brand">Crypto Jingles</a>
              <button className="navbar-toggle" type="button" data-toggle="collapse" data-target="#navbar-main">
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
            </div>
            <div className="navbar-collapse collapse" id="navbar-main">
              <ul className="nav navbar-nav navbar-left">
                
                <li>
                  <a href="/compose">Compose</a>
                </li>
                <li>
                  <a href="/marketplace">Marketplace</a>
                </li>
                <li>
                  <a href="/my-jingles">My Jingles</a>
                </li>
                <li>
                  <a href="/my-songs">My Songs</a>
                </li>
              </ul>

              <div className="nav navbar-nav navbar-right">
                <PendingTxDropdown />
              </div>
            </div>
          </div>
        </header>

        {this.props.children}
      </div>
    );
  }
}

export default App
