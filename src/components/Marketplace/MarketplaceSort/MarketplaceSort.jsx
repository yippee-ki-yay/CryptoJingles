import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Select from 'react-select';
import { changeMarketplaceSorting } from '../../../actions/marketplaceActions';

// disabled when getting new jingles
const MarketplaceSort = ({ sorting, sortingOptions, changeMarketplaceSorting }) => (
  <div className="sort-section-wrapper">
    <div className="sort-item-wrapper">
      <div className="sort-wrapper-label">Sort by:</div>

      <Select
        className="select box"
        classNamePrefix="select"
        value={sorting}
        onChange={changeMarketplaceSorting}
        options={sortingOptions}
        onBlur={(event) => event.preventDefault()}
        isSearchable={false}
      />
    </div>
  </div>
);

MarketplaceSort.propTypes = {
  sorting: PropTypes.object.isRequired,
  sortingOptions: PropTypes.array.isRequired,
  changeMarketplaceSorting: PropTypes.func.isRequired,
};

const mapStateToProps = ({ marketplace }) => ({
  sorting: marketplace.sorting,
  sortingOptions: marketplace.sortingOptions,
});

const matchDispatchToProps = { changeMarketplaceSorting };

export default connect(mapStateToProps, matchDispatchToProps)(MarketplaceSort);
