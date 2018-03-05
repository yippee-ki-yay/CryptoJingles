import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SingleSample from '../../SingleSample/SingleSample';
import BoxLoader from '../../Decorative/BoxLoader';
import SortSamples from '../../SortSamples/SortSamples';
import {
  getSamplesForUser, buySamples, handleNumSamplesToBuyChange, onMySamplesSort,
} from '../../../actions/profileActions';

import './MySamples.scss';

class MySamples extends Component {
  async componentWillMount() {
    this.props.getSamplesForUser(this.props.address);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.address === this.props.address) return;

    this.props.getSamplesForUser(newProps.address);
  }

  render() {
    const {
      isOwner, mySamples, loading, numSamplesToBuy, selectedMySampleSort, mySamplesSortingOptions,
    } = this.props;
    const { buySamples, handleNumSamplesToBuyChange, onMySamplesSort } = this.props;

    return (
      <div className="my-jingles-wrapper">
        {
          isOwner &&
          <div className="buy-samples-section-wrapper">
            <div className="buy-samples-section">
              <div>
                <form className="form-horizontal" onSubmit={(e) => { e.preventDefault(); }}>
                  <div className="buy-samples-wrapper">
                    <h2>Buy some samples:</h2>

                    <div className="form-items-wrapper">
                      <input
                        name="numJinglesToBuy"
                        value={numSamplesToBuy}
                        onChange={(event) => { handleNumSamplesToBuyChange(event.target); }}
                        type="number"
                        className="form-control"
                        placeholder="Num. of Jingles"
                      />

                      <button type="submit" className="btn buy-button" onClick={buySamples}>Buy!</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="separator" />
          </div>
        }

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
            (mySamples.length > 0) &&
            !loading &&
            <div>
              {
                mySamples.map(sample =>
                  (<SingleSample
                    key={sample.id}
                    {...sample}
                  />))
              }
            </div>
          }
        </div>
      </div>
    );
  }
}

MySamples.propTypes = {
  address: PropTypes.string.isRequired,
  mySamples: PropTypes.array.isRequired,
  numSamplesToBuy: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
  isOwner: PropTypes.bool.isRequired,
  selectedMySampleSort: PropTypes.object.isRequired,
  mySamplesSortingOptions: PropTypes.array.isRequired,
  getSamplesForUser: PropTypes.func.isRequired,
  buySamples: PropTypes.func.isRequired,
  handleNumSamplesToBuyChange: PropTypes.func.isRequired,
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
  getSamplesForUser, buySamples, handleNumSamplesToBuyChange, onMySamplesSort,
};

export default connect(mapStateToProps, mapDispatchToProps)(MySamples);
