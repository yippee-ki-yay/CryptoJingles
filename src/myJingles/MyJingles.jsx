import React, { Component } from 'react';
import getWeb3 from '../util/web3/getWeb3';
import { getJingles } from '../util/web3/ethereumService';
import JingleBox2 from '../components/JingleBox/jingleBox2';
import BoxLoader from '../components/Decorative/BoxLoader';

import './MyJingles.css';

class MyJingles extends Component {

  constructor(props) {
    super(props);

    this.state = {
      accounts: [],
      loading: true,
      web3: null,
      jinglesInstance: null,
      myJingles: []
    };
  }

   async componentWillMount() {
     const results = await getWeb3();
     const jinglesData = await getJingles(results.payload.web3Instance);
     this.setState({ ...jinglesData, loading: false });
  }

  render() {
      return (
          <div className="my-jingles-wrapper container">
            {
              this.state.loading &&
              <div className="loader-wrapper">
                <BoxLoader />
              </div>
            }

            {
              (this.state.myJingles.length === 0) &&
              !this.state.loading &&
              <div>
                <h1>You do not own any Jingles yet!</h1>
              </div>
            }

            {
              (this.state.myJingles.length > 0) &&
              !this.state.loading &&
              <div>
                {
                  this.state.myJingles.map(jingle =>
                    <JingleBox2
                      key={jingle.id}
                      {...jingle}
                    />
                  )
                }
              </div>
            }
          </div>
      )
  }
}

export default MyJingles;

