import React, { Component } from 'react';
import { connect } from 'react-redux';
// import axios from 'axios';
// import { API_URL } from '../util/config';
// import BoxLoader from '../components/Decorative/BoxLoader';
// import SingleJingle from '../components/SingleJingle/SingleJingle';
import MySamples from '../../mySamples/MySamples';
import MyJingles from '../../myJingles/MyJingles';
import { setActiveTab, checkIfOwnerProfile } from '../../actions/profileActions';

import './Profile.css';
import profilePlaceholder from './profile-placeholder.png';

// TODO - add proptypes
class Profile extends Component {
  componentWillMount() {
    this.props.checkIfOwnerProfile(this.props.params.address);
  }

  render() {
    const { tabs, params } = this.props;
    const { setActiveTab } = this.props;

    const activeTab = tabs.find((_tab) => _tab.active).value;

    return (
      <div className="container profile-wrapper">

        { /* TODO - create component out of this, fix html layout */  }
        <div className="profile-info-wrapper">
          <div className="profile-image-wrapper">
            <img src={profilePlaceholder} alt="profile image"/>
            <div>
              <h2>Satoshi Nakajingles</h2>
              <h4>{ params.address }</h4>
            </div>
          </div>

          <div className="separator" />

          { /* TODO - create component out of this */  }
          <div className="tabs-wrapper">
            {
              tabs.map(({ label, value, active }) => (
                <div
                  key={ value }
                  className={`tab ${active ? 'active' : ''}`}
                  onClick={() => { setActiveTab(value); }}
                >
                  { label }
                </div>
              ))
            }
          </div>

          <div className="separator" />
        </div>

        { activeTab === tabs[0].value && <MySamples />  }
        { activeTab === tabs[1].value && <MyJingles />  }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  tabs: state.profile.tabs
});

const mapDispatchToProps = { setActiveTab, checkIfOwnerProfile };

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

