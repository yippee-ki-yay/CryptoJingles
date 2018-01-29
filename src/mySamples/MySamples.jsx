import React, { Component } from 'react';
import { connect } from 'react-redux';
import SampleBox2 from '../components/SampleBox/SampleBox2';
import BoxLoader from '../components/Decorative/BoxLoader';
import { getSamplesForUser, buySamples, handleNumSamplesToBuyChange } from '../actions/profileActions';

import './MySamples.css';

class MySamples extends Component {
  async componentWillMount() {
    this.props.getSamplesForUser();
  }

  render() {
      const { isOwner, mySamples, loading, numSamplesToBuy } = this.props;
      const { buySamples } = this.props;

      return (
          <div className="my-jingles-wrapper">
            {
              isOwner &&
              <div>
                <div className="buy-samples-section">
                  <div>
                    <form className="form-horizontal" onSubmit={(e) => { e.preventDefault(); }}>
                      <div className="buy-samples-wrapper">
                        <h2>Buy some samples:</h2>

                        <div className="form-items-wrapper">
                          <input
                            name="numJinglesToBuy"
                            value={ numSamplesToBuy }
                            onChange={(event) => {this.handleNumSamplesToBuyChange(event.target); }}
                            type="number"
                            className="form-control"
                            placeholder="Num. of Jingles" />

                          <button type="submit" className="btn buy-button" onClick={buySamples}>Buy!</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="separator" />
              </div>
            }

            <div className="samples-wrapper">
              { loading && <div className="loader-wrapper"><BoxLoader /></div> }

              {
                (mySamples.length === 0) &&
                !loading &&
                <div><h2>You do not own any samples yet!</h2></div>
              }

              {
                (mySamples.length > 0) &&
                !loading &&
                <div>
                  {
                    mySamples.map((sample) =>
                      <SampleBox2
                        key={sample.id}
                        {...sample}
                      />
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
  mySamples: state.profile.mySamples,
  numSamplesToBuy: state.profile.numSamplesToBuy,
  loading: state.profile.loading,
  isOwner: state.profile.isOwner
});

const mapDispatchToProps = { getSamplesForUser, buySamples, handleNumSamplesToBuyChange };

export default connect(mapStateToProps, mapDispatchToProps)(MySamples);
