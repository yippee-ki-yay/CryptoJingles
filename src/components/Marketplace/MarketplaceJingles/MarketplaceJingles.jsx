import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { MARKETPLACE_JINGLES_PER_PAGE } from '../../../constants/actionTypes';
import { onMarketplacePaginationChange, likeUnLikeMarketplaceJingle } from '../../../actions/marketplaceActions';
import SingleJingle from '../../SingleJingle/SingleJingle';
import Pagination from '../../Pagination/Pagination';

const MarketplaceJingles = ({
  jingles, jinglesPerPage, totalJingles, likeUnLikeMarketplaceJingle, onMarketplacePaginationChange,
}) => (
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
);

MarketplaceJingles.propTypes = {
  jingles: PropTypes.array.isRequired,
  jinglesPerPage: PropTypes.number.isRequired,
  totalJingles: PropTypes.number.isRequired,
  onMarketplacePaginationChange: PropTypes.func.isRequired,
  likeUnLikeMarketplaceJingle: PropTypes.func.isRequired,
};

const mapStateToProps = ({ marketplace }) => ({
  totalJingles: marketplace.totalJingles,
  jinglesPerPage: marketplace.jinglesPerPage,
  jingles: marketplace.jingles,
});

const mapDispatchToProps = {
  onMarketplacePaginationChange,
  likeUnLikeMarketplaceJingle,
};

export default connect(mapStateToProps, mapDispatchToProps)(MarketplaceJingles);
