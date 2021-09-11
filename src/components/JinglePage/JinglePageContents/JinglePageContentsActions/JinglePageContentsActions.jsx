import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { formatSalePrice } from '../../../../actions/utils';

import './JinglePageContentsActions.scss';

// {
//   !isOwner && (hasMM && !lockedMM) && (
//     <button type="submit" className="btn buy-button" onClick={this.purchase}>
//       Purchase
//     </button>
//   )
// }

const JinglePageContentsActions = ({ singleJingle }) => (
  <div className="jingle-page-contents-actions-wrapper">
    {
      singleJingle.onSale && (
        <div className="sell-price-wrapper">
          <span className="price-title">Sell price:</span>
          <span className="price-value">{ formatSalePrice(singleJingle.price) }Ξ</span>
        </div>
      )
    }
  </div>
);

JinglePageContentsActions.propTypes = {
  singleJingle: PropTypes.object.isRequired,
};

const mapStateToProps = ({ singleJingle }) => ({
  singleJingle: singleJingle.singleJingle,
});

export default connect(mapStateToProps)(JinglePageContentsActions);
