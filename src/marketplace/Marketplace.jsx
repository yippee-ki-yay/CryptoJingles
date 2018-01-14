import React, { Component } from 'react';
import { getSongs } from '../getMockData';

import './Marketplace.css';

class Marketplace extends Component {

  constructor(props) {
    super(props);
  }


  render() {
      return (
          <div className="marketplace-page-wrapper">
            <div className="marketplace-play-wrapper">
              Crypo Jingles
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
                    getSongs().map(({ id, author, name, imageSrc }) => (
                      <div key={id} className="single-song">
                        <img src={ imageSrc } alt={name} />

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

export default Marketplace;

