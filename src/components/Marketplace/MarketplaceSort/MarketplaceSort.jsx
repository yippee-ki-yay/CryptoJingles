import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Select from 'react-select';
import { changeMarketplaceSorting } from '../../../actions/marketplaceActions';

const MarketplaceSort = ({
  sorting, sortingOptions, changeMarketplaceSorting, disabled,
}) => (
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
        isDisabled={disabled}
      />
    </div>
  </div>
);

MarketplaceSort.defaultProps = {
  disabled: false,
};

MarketplaceSort.propTypes = {
  sorting: PropTypes.object.isRequired,
  sortingOptions: PropTypes.array.isRequired,
  changeMarketplaceSorting: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

const mapStateToProps = ({ marketplace }) => ({
  sorting: marketplace.sorting,
  sortingOptions: marketplace.sortingOptions,
});

const matchDispatchToProps = { changeMarketplaceSorting };

export default connect(mapStateToProps, matchDispatchToProps)(MarketplaceSort);