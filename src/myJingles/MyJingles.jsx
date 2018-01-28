import React, { Component } from 'react';
import axios from 'axios';
import { API_URL } from '../util/config';
import BoxLoader from '../components/Decorative/BoxLoader';

class MyJingles extends Component {
  constructor(props) {
    super(props);

    this.state = {
      myJingles: [],
      loading: true,
    };
  }

  async componentWillMount() {
    const res = await axios(`${API_URL}/jingles/${window.web3.eth.accounts[0]}`);

    const myJingles = res.data;

    console.log('myJingles', myJingles);

    this.setState({ myJingles, loading: false });

    const jingleInfo = await axios(`${API_URL}/jingle/1`);

    console.log(jingleInfo);
 }

  render() {
      return (
          <div className="container">
            <div className="samples-wrapper">
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
                  <h2>You do not own any jingles yet!</h2>
                </div>
              }

              {
                (this.state.myJingles.length > 0) &&
                !this.state.loading &&
                <div>
                  {
                    this.state.myJingles.map((jingle) =>
                      (
                        <div key={jingle.jingleId}>
                          Jingle {jingle.jingleId}
                        </div>
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

export default MyJingles;

