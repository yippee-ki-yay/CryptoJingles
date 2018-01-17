
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSongs } from '../getMockData';
import { marketplaceSetSingleSong } from '../actions/marketplaceActions';

import './Marketplace.css';

class MarketplaceSong extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.marketplaceSetSingleSong(getSongs().find((_song) => _song.id === parseInt(this.props.routeParams.id)));
  }

  render() {
    const { song } = this.props;

    return (
      <div>
        Song
        {
          song &&
          <div>
            <div>#{ song.id }</div>
            <img src={song.imageSrc} alt="song image"/>
            <div>{ song.author }</div>
            <div>{ song.name }</div>

            <div className="jingle-box">
              5 Sample tags of which the songs are composed
            </div>

            <button>Buy</button>
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  song: state.marketplace.currentSingleSong
});

export default connect(mapStateToProps, { marketplaceSetSingleSong })(MarketplaceSong);

