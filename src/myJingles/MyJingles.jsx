import React, { Component } from 'react';
import Dropdown from 'react-dropdown';
import { connect } from 'react-redux';
import BoxLoader from '../components/Decorative/BoxLoader';
import SingleJingle from '../components/SingleJingle/SingleJingle';
import {
  getJinglesForUser, changeProfileJinglesCategory, changeProfileJinglesSorting
} from '../actions/profileActions';

import './MyJingles.css';

class MyJingles extends Component {
  async componentWillMount() {
    this.props.getJinglesForUser(this.props.address);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.address === this.props.address) return;

    this.props.getJinglesForUser(newProps.address);
  }

  render() {
      const {
        myJingles, loading, jingleSorting, jingleSortingOptions, jingleCategory, jingleCategories
      } = this.props;
      const { changeProfileJinglesSorting, changeProfileJinglesCategory } = this.props;

      return (
          <div className="my-jingles-wrapper">
            <div className="samples-wrapper">
              <div>
                <div className="my-jingles-sorting-wrapper">
                  <div className="sort-wrapper">
                    <div className="sort-wrapper-label">Category:</div>
                    <Dropdown
                      onChange={(val) => { changeProfileJinglesCategory(val) }}
                      value={jingleCategory}
                      options={jingleCategories}
                    />
                  </div>

                  <div className="sort-wrapper">
                    <div className="sort-wrapper-label">Sort by:</div>
                    <Dropdown
                      onChange={(val) => { changeProfileJinglesSorting(val) }}
                      value={jingleSorting}
                      options={jingleSortingOptions}
                    />
                  </div>
                </div>
                <div className="separator" />
              </div>

              {
                loading &&
                <div className="loader-wrapper">
                  <BoxLoader />
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
                <div className="my-jingles-list">
                  {
                    myJingles.map((jingle) =>
                      (
                        <SingleJingle key={jingle.jingleId} {...jingle} />
                      )
                    )
                  }
                </div>
              }
            </div>
          </div>
      )
  }
}

const mapStateToProps = (state) => ({
  myJingles: state.profile.myJingles,
  loading: state.profile.loading,
  jingleSorting: state.profile.jingleSorting,
  jingleSortingOptions: state.profile.jingleSortingOptions,
  jingleCategory: state.profile.jingleCategory,
  jingleCategories: state.profile.jingleCategories
});

const mapDispatchToProps = { getJinglesForUser, changeProfileJinglesCategory, changeProfileJinglesSorting };

export default connect(mapStateToProps, mapDispatchToProps)(MyJingles);

