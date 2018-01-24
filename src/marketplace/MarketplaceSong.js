
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSongs } from '../getMockData';
import { marketplaceSetSingleSong } from '../actions/marketplaceActions';

import './MarketplaceSong.css';

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
      <div className="container single-song-wrapper">
        <div className="row">
          <div className="col-md-2" />
          <div className="col-md-8 row-wrapper-song">
            {
              song &&
              <div>
                <div className="song-id">#{ song.id }</div>
                <div className="song-details-wrapper">
                  <img src={song.imageSrc} alt="song image" />

                  <div className="song-details">
                    <div className="song-label author">
                      <h4>Author</h4>
                      <div>{ song.author }</div>
                    </div>
                    <div className="song-label">
                      <h4>Name</h4>
                      <div>{ song.name }</div>
                    </div>

                    <div className="song-samples-wrapper">
                      <h4>Samples</h4>
                      <div className="samples">
                        <span className="sample">Guitar</span>
                        <span className="sample">Groovy</span>
                        <span className="sample">Drums</span>
                        <span className="sample">Vocal</span>
                        <span className="sample">Bell</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            }
          </div>
          <div className="col-md-2" />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  song: state.marketplace.currentSingleSong
});

export default connect(mapStateToProps, { marketplaceSetSingleSong })(MarketplaceSong);

