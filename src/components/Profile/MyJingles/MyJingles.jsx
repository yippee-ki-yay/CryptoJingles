import React, { Component } from 'react';
import Dropdown from 'react-dropdown';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import BoxLoader from '../../Decorative/BoxLoader';
import Pagination from '../../Pagination/Pagination';
import SingleJingle from '../../SingleJingle/SingleJingle';
import {
  getJinglesForUser, changeProfileJinglesCategory, changeProfileJinglesSorting, onMyJinglesPaginationChange,
  likeUnLikeProfileJingle
} from '../../../actions/profileActions';
import { MARKETPLACE_JINGLES_PER_PAGE } from '../../../constants/actionTypes';

import './MyJingles.scss';

class MyJingles extends Component {
  async componentWillMount() {
    this.props.getJinglesForUser();
  }

  componentWillReceiveProps(newProps) {
    if (newProps.address === this.props.address) return;

    this.props.getJinglesForUser();
  }

  render() {
    const {
      myJingles, loading, jingleSorting, jingleSortingOptions, jingleCategory, jingleCategories, totalJingles,
      jinglesPerPage,
    } = this.props;
    const {
      changeProfileJinglesSorting, changeProfileJinglesCategory, onMyJinglesPaginationChange, likeUnLikeProfileJingle,
    } = this.props;

    return (
      <div className="my-jingles-wrapper">
        <div className="samples-wrapper">
          <div>
            <div className="my-jingles-sorting-wrapper">
              <div className="sort-wrapper">
                <div className="sort-wrapper-label">Category:</div>
                <Dropdown
                  onChange={(val) => { changeProfileJinglesCategory(val); }}
                  value={jingleCategory}
                  options={jingleCategories}
                />
              </div>

              <div className="sort-wrapper">
                <div className="sort-wrapper-label">Sort by:</div>
                <Dropdown
                  onChange={(val) => { changeProfileJinglesSorting(val); }}
                  value={jingleSorting}
                  options={jingleSortingOptions}
                />
              </div>
            </div>
            <div className="separator"/>
          </div>

          {
            loading &&
            <div className="loader-wrapper">
              <BoxLoader/>
            </div>
          }

          {
            (myJingles.length === 0) &&
            !loading &&
            <div className="empty-state">
              <h2>There are no jingles with this filtering.</h2>
            </div>
          }

          {
            (myJingles.length > 0) &&
            !loading &&
            <div>
              <div className="my-jingles-num">
                {totalJingles} Jingles
              </div>

              <div className="my-jingles-list">

                {
                  myJingles.map(jingle =>
                    (
                      <SingleJingle
                        key={jingle.jingleId}
                        onJingleLike={likeUnLikeProfileJingle}
                        type="profile"
                        {...jingle}
                      />
                    ))
                }
              </div>
            </div>
          }

          {
            totalJingles > MARKETPLACE_JINGLES_PER_PAGE &&
            <Pagination
              pageCount={Math.ceil(totalJingles / jinglesPerPage)}
              onPageChange={onMyJinglesPaginationChange}
            />
          }
        </div>
      </div>
    );
  }
}

MyJingles.propTypes = {
  address: PropTypes.string.isRequired,
  myJingles: PropTypes.array.isRequired,
  totalJingles: PropTypes.number.isRequired,
  jinglesPerPage: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
  jingleSorting: PropTypes.object.isRequired,
  jingleSortingOptions: PropTypes.array.isRequired,
  jingleCategory: PropTypes.object.isRequired,
  jingleCategories: PropTypes.array.isRequired,
  getJinglesForUser: PropTypes.func.isRequired,
  changeProfileJinglesCategory: PropTypes.func.isRequired,
  changeProfileJinglesSorting: PropTypes.func.isRequired,
  onMyJinglesPaginationChange: PropTypes.func.isRequired,
  likeUnLikeProfileJingle: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  myJingles: state.profile.myJingles,
  totalJingles: state.profile.totalJingles,
  jinglesPerPage: state.profile.jinglesPerPage,
  loading: state.profile.loading,
  jingleSorting: state.profile.jingleSorting,
  jingleSortingOptions: state.profile.jingleSortingOptions,
  jingleCategory: state.profile.jingleCategory,
  jingleCategories: state.profile.jingleCategories,
});

const mapDispatchToProps = {
  getJinglesForUser,
  changeProfileJinglesCategory,
  changeProfileJinglesSorting,
  onMyJinglesPaginationChange,
  likeUnLikeProfileJingle,
};

export default connect(mapStateToProps, mapDispatchToProps)(MyJingles);

