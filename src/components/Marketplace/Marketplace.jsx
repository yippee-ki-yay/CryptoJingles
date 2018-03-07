import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SingleJingle from '../SingleJingle/SingleJingle';
import Pagination from '../Pagination/Pagination';
import {
  getMarketplaceJingles, onMarketplacePaginationChange, likeUnLikeMarketplaceJingle,
} from '../../actions/marketplaceActions';
import { MARKETPLACE_JINGLES_PER_PAGE } from '../../constants/actionTypes';
import MarketplaceSidebar from './MarketplaceSidebar/MarketplaceSidebar';

import './Marketplace.scss';

class Marketplace extends Component {
  async componentDidMount() {
    this.props.getMarketplaceJingles();
  }

  render() {
    const {
      jingles, jinglesPerPage, totalJingles, likeUnLikeMarketplaceJingle
    } = this.props;
    const { onMarketplacePaginationChange } = this.props;

    return (
      <div className="marketplace-page-wrapper container">
        <div className="marketplace-wrapper">

          <MarketplaceSidebar />

          { /* JINGLES RENDER (TODO - Create component) */ }
          <div className="songs-section">
            <div className="songs-count">
              { totalJingles } Jingles
            </div>

            <div className="songs-wrapper">
              { jingles.map(jingle => (
                <SingleJingle
                  type="marketplace"
                  key={jingle.jingleId}
                  onJingleLike={likeUnLikeMarketplaceJingle}
                  {...jingle}
                />)) }
            </div>

            {
              totalJingles > MARKETPLACE_JINGLES_PER_PAGE &&
              <Pagination
                pageCount={Math.ceil(totalJingles / jinglesPerPage)}
                onPageChange={onMarketplacePaginationChange}
              />
            }
          </div>
        </div>
      </div>
    );
  }
}

Marketplace.propTypes = {
  jingles: PropTypes.array.isRequired,
  jinglesPerPage: PropTypes.number.isRequired,
  totalJingles: PropTypes.number.isRequired,
  getMarketplaceJingles: PropTypes.func.isRequired,
  onMarketplacePaginationChange: PropTypes.func.isRequired,
  likeUnLikeMarketplaceJingle: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  totalJingles: state.marketplace.totalJingles,
  jinglesPerPage: state.marketplace.jinglesPerPage,
  jingles: state.marketplace.jingles,
});

const mapDispatchToProps = {
  getMarketplaceJingles,
  onMarketplacePaginationChange,
  likeUnLikeMarketplaceJingle,
};

export default connect(mapStateToProps, mapDispatchToProps)(Marketplace);

