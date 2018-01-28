import React, { Component } from 'react';
import axios from 'axios';
import { API_URL } from '../util/config';
import { getSongs } from '../getMockData';
import SingleJingle from '../components/SingleJingle/SingleJingle';

import './Marketplace.css';

class Marketplace extends Component {
  constructor(params) {
    super(params);

    this.state = {
      orders: []
    };
  }

  async componentDidMount() {
    const pageNum = 1;

    // it can be price || time, add a prefix '-' for ascending sort example -price
    const field = 'price';

    const orders = await axios(`${API_URL}/orders/pagination/${pageNum}/filter/${field}`);

    console.log(orders);
  }

  render() {
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
                  { getSongs().map((jingle) => (<SingleJingle key={jingle.id} {...jingle} />)) }
                </div>
              </div>
            </div>
          </div>
      )
  }
}

export default Marketplace;

