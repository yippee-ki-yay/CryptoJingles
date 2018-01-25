
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSongs } from '../getMockData';
import { marketplaceSetSingleSong } from '../actions/audioActions';

import './MarketplaceJingle.css';

class MarketplaceJingle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      song: null
    }
  }

  componentDidMount() {
    this.setState({
      song: getSongs().find((_song) => _song.id === parseInt(this.props.routeParams.id))
    })
  }

  render() {
    const { song } = this.state;

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
                  <div className="buy-options">
                    <img src={song.imageSrc} alt="song background" />
                    {
                      song.sale && <button className="btn buy-button">Purchase</button>
                    }
                  </div>

                  <div className="song-details">
                    {
                      song.sale &&
                      <div className="song-label">
                        <h4>Sale price</h4>
                        <div>{ song.price }Ξ</div>
                      </div>
                    }
                    <div className="song-label">
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

export default connect(null, { marketplaceSetSingleSong })(MarketplaceJingle);

