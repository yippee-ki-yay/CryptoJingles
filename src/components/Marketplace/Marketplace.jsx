import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getMarketplaceJingles } from '../../actions/marketplaceActions';
import MarketplaceSidebar from './MarketplaceSidebar/MarketplaceSidebar';
import MarketplaceJingles from './MarketplaceJingles/MarketplaceJingles';

import './Marketplace.scss';

class Marketplace extends Component {
  async componentDidMount() {
    this.props.getMarketplaceJingles();
  }

  render() {
    return (
      <div className="marketplace-page-wrapper container">
        <div className="marketplace-wrapper">
          <MarketplaceSidebar />

          <MarketplaceJingles />
        </div>
      </div>
    );
  }
}

Marketplace.propTypes = {
  getMarketplaceJingles: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  getMarketplaceJingles,
};

export default connect(null, mapDispatchToProps)(Marketplace);

