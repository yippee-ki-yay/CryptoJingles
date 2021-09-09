import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import t from 'translate';
import 'react-dropdown/style.css';
import PropTypes from 'prop-types';
import { getMarketplaceJinglesAction, onMarketplacePaginationChange } from '../../actions/marketplaceActions';
import { MARKETPLACE_JINGLES_PER_PAGE } from '../../constants/actionTypes';
import SingleJingle from '../SingleJingle/SingleJingle';
import Pagination from '../Pagination/Pagination';
import MarketplaceSort from './MarketplaceSort/MarketplaceSort';

import './Marketplace.scss';

const Marketplace = ({
  jingles, jinglesPerPage, totalJingles, onMarketplacePaginationChange, getMarketplaceJinglesAction,
}) => {
  useEffect(() => { getMarketplaceJinglesAction(); }, [getMarketplaceJinglesAction]);

  return (
    <div className="marketplace-page-wrapper page-wrapper">
      <div className="width-container">
        <div className="page-header-wrapper">
          <div className="page-title">
            { t('common.marketplace') }
            { totalJingles && ` (${totalJingles} Jingles)` }
          </div>
          <div className="page-description">
            The marketplace currently supports only v1 Jingles. We are working on adding support for the minted v0 jingles as well!
            If you want to list your jingles someplace else, head over to the Wrap Jingles page.
          </div>
        </div>

        <MarketplaceSort />

        <div className="page-content-wrapper">
          <div className="songs-wrapper">
            { jingles && jingles.map((jingle) => (
              <SingleJingle
                type="marketplace"
                key={jingle.jingleId}
                {...jingle}
              />
            )) }
          </div>

          {
            totalJingles > MARKETPLACE_JINGLES_PER_PAGE && (
              <Pagination
                pageCount={Math.ceil(totalJingles / jinglesPerPage)}
                onPageChange={onMarketplacePaginationChange}
              />
            )
          }
        </div>
      </div>
    </div>
  );
};

Marketplace.defaultProps = {
  jingles: null,
};

Marketplace.propTypes = {
  jingles: PropTypes.array,
  jinglesPerPage: PropTypes.number.isRequired,
  totalJingles: PropTypes.number.isRequired,
  getMarketplaceJinglesAction: PropTypes.func.isRequired,
  onMarketplacePaginationChange: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  totalJingles: state.marketplace.totalJingles,
  jinglesPerPage: state.marketplace.jinglesPerPage,
  jingles: state.marketplace.jingles,
});

const mapDispatchToProps = {
  getMarketplaceJinglesAction, onMarketplacePaginationChange,
};

export default connect(mapStateToProps, mapDispatchToProps)(Marketplace);
