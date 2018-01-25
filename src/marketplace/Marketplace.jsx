import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSongs } from '../getMockData';
import { playAudio } from '../actions/audioActions';
import { Link } from 'react-router';

import './Marketplace.css';

class Marketplace extends Component {
  render() {
      const { playAudio } = this.props;

      return (
          <div className="marketplace-page-wrapper">
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
                    getSongs().map(({ id, author, name, imageSrc, source, sale, price }) => (
                        <div key={id} className="single-song">
                          {
                            sale &&
                            <div className="header-label"><span>On sale for:</span> {price}Ξ</div>
                          }

                        <img src={ imageSrc } alt={name} />

                        <div className="overlay">
                          <i
                            className="material-icons play"
                            onClick={() => { playAudio({ name, img: imageSrc, src: source, author }); }}
                          >
                            play_circle_outline
                          </i>
                          <Link to={`/song/${id}`}>
                            <i className="material-icons open">open_in_new</i>
                          </Link>
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

export default connect(null, { playAudio })(Marketplace);

