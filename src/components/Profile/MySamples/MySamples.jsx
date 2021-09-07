import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SampleBox2 from '../../SampleBox/SampleBox2';
import BoxLoader from '../../Decorative/BoxLoader';
import SortSamples from '../../SortSamples/SortSamples';
import { getSamplesForUser, onMySamplesSort } from '../../../actions/profileActions';
import BuySamples from '../../Common/BuySamples/BuySamples';

import './MySamples.scss';

class MySamples extends Component {
  // eslint-disable-next-line camelcase
  async UNSAFE_componentWillMount() {
    this.props.getSamplesForUser(this.props.address);
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps(newProps) {
    if (newProps.address === this.props.address) return;

    this.props.getSamplesForUser(newProps.address);
  }

  render() {
    const {
      isOwner, mySamples, loading, selectedMySampleSort, mySamplesSortingOptions,
    } = this.props;
    const { onMySamplesSort } = this.props;

    return (
      <div className="my-jingles-wrapper">
        { isOwner && (<BuySamples />) }

        <SortSamples
          value={selectedMySampleSort}
          options={mySamplesSortingOptions}
          onSortChange={onMySamplesSort}
        />

        {
          (mySamples.length > 0) &&
              !loading &&
              <div className="my-jingles-num">{ mySamples.length } samples</div>
        }

        <div className="samples-wrapper">
          { loading && <div className="loader-wrapper"><BoxLoader /></div> }

          {
            (mySamples.length === 0) &&
                !loading &&
                <div className="empty-state"><h2>You do not own any samples yet!</h2></div>
          }

          {
            (mySamples.length > 0) && !loading && (
              <div>
                {
                  mySamples.map((sample) => (
                    <SampleBox2
                      key={sample.id}
                      {...sample}
                    />
                  ))
                }
              </div>
            )
          }
        </div>
      </div>
    );
  }
}

MySamples.propTypes = {
  address: PropTypes.string.isRequired,
  mySamples: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  isOwner: PropTypes.bool.isRequired,
  selectedMySampleSort: PropTypes.object.isRequired,
  mySamplesSortingOptions: PropTypes.array.isRequired,
  getSamplesForUser: PropTypes.func.isRequired,
  onMySamplesSort: PropTypes.func.isRequired,
};

const mapStateToProps = ({ profile }) => ({
  mySamples: profile.mySamples,
  numSamplesToBuy: profile.numSamplesToBuy,
  loading: profile.loading,
  isOwner: profile.isOwner,
  selectedMySampleSort: profile.selectedMySampleSort,
  mySamplesSortingOptions: profile.mySamplesSortingOptions,
});

const mapDispatchToProps = {
  getSamplesForUser, onMySamplesSort,
};

export default connect(mapStateToProps, mapDispatchToProps)(MySamples);
