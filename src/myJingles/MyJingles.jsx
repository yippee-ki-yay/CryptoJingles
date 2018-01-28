import React, { Component } from 'react';
import axios from 'axios';
import { API_URL } from '../util/config';
import BoxLoader from '../components/Decorative/BoxLoader';
import SingleJingle from '../components/SingleJingle/SingleJingle';

import img0 from '../mockImages/render_0.png';
import './MyJingles.css';

class MyJingles extends Component {
  constructor(props) {
    super(props);

    this.state = { myJingles: [], loading: true };
  }

  async componentWillMount() {
    const res = await axios(`${API_URL}/jingles/${window.web3.eth.accounts[0]}`);

    const myJingles = res.data;

    const jingleInfo = await axios(`${API_URL}/jingle/1`);

    console.log(jingleInfo);

    console.log('myJingles', res.data);
    this.setState({ myJingles: res.data, loading: false });
 }

  render() {
      return (
          <div className="container my-jingles-wrapper">
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
                <div className="my-jingles-list">
                  {
                    this.state.myJingles.map((jingle) =>
                      (
                        <SingleJingle
                          id={jingle.jingleId}
                          key={jingle.jingleId}
                          owner={jingle.owner}
                          sale={true}
                          price={'0.0001'}
                          author={'Some author'}
                          name={'OFFICIAL'}
                          imageSrc={img0}
                        />
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

