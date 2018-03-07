import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { changeMarketplaceCategory, changeMarketplaceSorting, } from '../../../actions/marketplaceActions';

const MarketplaceSidebar = ({
  category, categories, sorting, sortingOptions, changeMarketplaceCategory, changeMarketplaceSorting,
}) => (
  <div className="sidebar">
    <div className="sort-wrapper">
      <div className="sort-wrapper-label">Category:</div>
      <Dropdown
        onChange={(val) => { changeMarketplaceCategory(val); }}
        value={category}
        options={categories}
      />
    </div>

    <div className="sort-wrapper">
      <div className="sort-wrapper-label">Sort by:</div>
      <Dropdown
        onChange={(val) => { changeMarketplaceSorting(val); }}
        value={sorting}
        options={sortingOptions}
      />
    </div>
  </div>
);

MarketplaceSidebar.propTypes = {
  category: PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired,
  sorting: PropTypes.object.isRequired,
  sortingOptions: PropTypes.array.isRequired,
  changeMarketplaceCategory: PropTypes.func.isRequired,
  changeMarketplaceSorting: PropTypes.func.isRequired,
};

const mapStateToProps = ({ marketplace }) => ({
  sorting: marketplace.sorting,
  sortingOptions: marketplace.sortingOptions,
  category: marketplace.category,
  categories: marketplace.categories,
});

const mapDispatchToProps = {
  changeMarketplaceCategory,
  changeMarketplaceSorting,
};

export default connect(mapStateToProps, mapDispatchToProps)(MarketplaceSidebar);
