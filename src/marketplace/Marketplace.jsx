// TODO - move file to components folder
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dropdown from 'react-dropdown';
import SingleJingle from '../components/SingleJingle/SingleJingle';
import Pagination from '../components/Pagination/Pagination';
import {
  getMarketplaceJingles, changeMarketplaceCategory, changeMarketplaceSorting,
  onMarketplacePaginationChange
} from '../actions/marketplaceActions';
import { MARKETPLACE_JINGLES_PER_PAGE, MARKETPLACE_JINNGLES_PER_PAGE } from '../constants/actionTypes';

import 'react-dropdown/style.css';
import './Marketplace.css';

// TODO - Add prototypes
class Marketplace extends Component {
  async componentDidMount() {
    this.props.getMarketplaceJingles();
  }

  render() {
    const { jingles, jinglesPerPage, sorting, sortingOptions, category, categories, totalJingles } = this.props;
    const { changeMarketplaceCategory, changeMarketplaceSorting, onMarketplacePaginationChange } = this.props;

      return (
          <div className="marketplace-page-wrapper container">
            <div className="marketplace-wrapper">

              { /* SIDEBAR RENDER (TODO - Create component) */ }
              <div className="sidebar">

                <div className="sort-wrapper">
                  <div className="sort-wrapper-label">Category:</div>
                  <Dropdown
                    onChange={(val) => { changeMarketplaceCategory(val) }}
                    value={category}
                    options={categories}
                  />
                </div>

                <div className="sort-wrapper">
                  <div className="sort-wrapper-label">Sort by:</div>
                  <Dropdown
                    onChange={(val) => { changeMarketplaceSorting(val) }}
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
                      key={jingle.jingleId} {...jingle}
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
      )
  }
}

const mapStateToProps = (state) => ({
  totalJingles: state.marketplace.totalJingles,
  jinglesPerPage: state.marketplace.jinglesPerPage,
  jingles: state.marketplace.jingles,
  sorting: state.marketplace.sorting,
  sortingOptions: state.marketplace.sortingOptions,
  category: state.marketplace.category,
  categories: state.marketplace.categories
});

const mapDispatchToProps = {
  getMarketplaceJingles, changeMarketplaceCategory, changeMarketplaceSorting, onMarketplacePaginationChange
};

export default connect(mapStateToProps, mapDispatchToProps)(Marketplace);

