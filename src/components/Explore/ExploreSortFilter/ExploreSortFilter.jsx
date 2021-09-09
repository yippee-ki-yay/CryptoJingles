import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Select from 'react-select';
import { changeExploreSorting, changeExploreFiltering } from 'redux/actions/exploreActions';

import './ExploreSortFilter.scss';

const ExploreSortFilter = ({
  sorting, sortingOptions, changeExploreSorting, disabled,
  versionFilter, versionFilterOptions, changeExploreFiltering,
}) => (
  <div className="sort-section-wrapper explore-sort-filter-wrapper">
    <div className="sort-item-wrapper">
      <div className="sort-wrapper-label">Filter:</div>

      <Select
        className="select box"
        classNamePrefix="select"
        value={versionFilter}
        onChange={changeExploreFiltering}
        options={versionFilterOptions}
        onBlur={(event) => event.preventDefault()}
        isSearchable={false}
        isDisabled={disabled}
      />
    </div>

    <div className="sort-item-wrapper">
      <div className="sort-wrapper-label">Sort by:</div>

      <Select
        className="select box"
        classNamePrefix="select"
        value={sorting}
        onChange={changeExploreSorting}
        options={sortingOptions}
        onBlur={(event) => event.preventDefault()}
        isSearchable={false}
        isDisabled={disabled}
      />
    </div>
  </div>
);

ExploreSortFilter.defaultProps = {
  disabled: false,
};

ExploreSortFilter.propTypes = {
  sorting: PropTypes.object.isRequired,
  sortingOptions: PropTypes.array.isRequired,
  changeExploreSorting: PropTypes.func.isRequired,

  versionFilter: PropTypes.object.isRequired,
  versionFilterOptions: PropTypes.array.isRequired,
  changeExploreFiltering: PropTypes.func.isRequired,

  disabled: PropTypes.bool,
};

const mapStateToProps = ({ explore }) => ({
  sorting: explore.sorting,
  sortingOptions: explore.sortingOptions,

  versionFilter: explore.versionFilter,
  versionFilterOptions: explore.versionFilterOptions,
});

const matchDispatchToProps = { changeExploreSorting, changeExploreFiltering };

export default connect(mapStateToProps, matchDispatchToProps)(ExploreSortFilter);
