import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSongs } from '../getMockData';
import { marketplacePlaySong } from '../actions/marketplaceActions';
import Audio from 'react-audioplayer';

import './Marketplace.css';

class Marketplace extends Component {

  constructor(props) {
    super(props);
  }

  render() {
      const { marketplacePlaySong, currentSong } = this.props;

      return (
          <div className="marketplace-page-wrapper">
            <div className="marketplace-play-wrapper">
              {
                !currentSong && 'Crypto Jingles'
              }

              {
                currentSong &&
                <Audio
                  width={600}
                  height={300}
                  autoPlay={false}
                  playlist={currentSong}
                  fullPlayer={true}
                />
              }
            </div>

            <div className="marketplace-wrapper">
              <div className="sidebar">
                All filtering options go here Lorem ipsum dolor amet Lorem ipsum dolor amet Lorem ipsum dolor amet
                Lorem ipsum dolor amet Lorem ipsum dolor

                <div>Sorting dropdown</div>
                <div>Most popular</div>
                <div>Genres</div>
              </div>

              <div className="songs-section">
                <div className="songs-count">
                  { getSongs().length } songs created
                </div>

                <div className="songs-wrapper">
                  {
                    getSongs().map(({ id, author, name, imageSrc, source }) => (
                      <div key={id} className="single-song">
                        <img src={ imageSrc } alt={name} />

                        <div className="overlay">
                          <i
                            className="material-icons play"
                            onClick={() => { marketplacePlaySong({ name, img: imageSrc, src: source }); }}
                          >
                            play_circle_outline
                          </i>
                          <i className="material-icons open">open_in_new</i>
                        </div>

                        #{ id }
                        <div>{ author }</div>
                        <div>{ name }</div>
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>
          </div>
      )
  }
}

const mapStateToProps = (state) => ({
  currentSong: state.marketplace.currentSong
});

export default connect(mapStateToProps, { marketplacePlaySong })(Marketplace);

