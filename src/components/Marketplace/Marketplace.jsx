// TODO - move file to components folder
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import PropTypes from 'prop-types';
import SingleJingle from '../SingleJingle/SingleJingle';
import Pagination from '../Pagination/Pagination';
import {
  getMarketplaceJingles, changeMarketplaceCategory, changeMarketplaceSorting,
  onMarketplacePaginationChange,
} from '../../actions/marketplaceActions';
import { MARKETPLACE_JINGLES_PER_PAGE } from '../../constants/actionTypes';

import './Marketplace.scss';

// TODO - Add prototypes
class Marketplace extends Component {
  async componentDidMount() {
    this.props.getMarketplaceJingles();
  }

  render() {
    const {
      jingles, jinglesPerPage, sorting, sortingOptions, category, categories, totalJingles,
    } = this.props;
    const { changeMarketplaceCategory, changeMarketplaceSorting, onMarketplacePaginationChange } = this.props;

    return (
      <div className="marketplace-page-wrapper container">
        <div className="marketplace-wrapper">

          { /* SIDEBAR RENDER (TODO - Create component) */ }
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

          { /* JINGLES RENDER (TODO - Create component) */ }
          <div className="songs-section">
            <div className="songs-count">
              { totalJingles } Jingles
            </div>

            <div className="songs-wrapper">
              { jingles.map((jingle) => (
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
  }
}

Marketplace.propTypes = {
  jingles: PropTypes.array.isRequired,
  jinglesPerPage: PropTypes.number.isRequired,
  sorting: PropTypes.object.isRequired,
  category: PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired,
  totalJingles: PropTypes.number.isRequired,
  sortingOptions: PropTypes.array.isRequired,
  changeMarketplaceCategory: PropTypes.func.isRequired,
  changeMarketplaceSorting: PropTypes.func.isRequired,
  getMarketplaceJingles: PropTypes.func.isRequired,
  onMarketplacePaginationChange: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  totalJingles: state.marketplace.totalJingles,
  jinglesPerPage: state.marketplace.jinglesPerPage,
  jingles: state.marketplace.jingles,
  sorting: state.marketplace.sorting,
  sortingOptions: state.marketplace.sortingOptions,
  category: state.marketplace.category,
  categories: state.marketplace.categories,
});

const mapDispatchToProps = {
  getMarketplaceJingles, changeMarketplaceCategory, changeMarketplaceSorting, onMarketplacePaginationChange,
};

export default connect(mapStateToProps, mapDispatchToProps)(Marketplace);
