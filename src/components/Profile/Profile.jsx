import React, { Component } from 'react';
import { connect } from 'react-redux';
// import axios from 'axios';
// import { API_URL } from '../util/config';
// import BoxLoader from '../components/Decorative/BoxLoader';
// import SingleJingle from '../components/SingleJingle/SingleJingle';
import MySamples from '../../mySamples/MySamples';
import MyJingles from '../../myJingles/MyJingles';
import { setActiveTab } from '../../actions/profileActions';

import './Profile.css';

// TODO - add proptypes
class Profile extends Component {
  componentWillMount() {
    // callGetJinglesForUser
  }

  render() {
    const { tabs } = this.props;
    const { setActiveTab } = this.props;

    const activeTab = tabs.find((_tab) => _tab.active).value;

    return (
      <div className="container profile-wrapper">

        { /* TODO - create component out of this, fix html layout */  }
        <div className="profile-info-wrapper">
          <div className="profile-image-wrapper">
            <img src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png" alt="profile image"/>
            <div>
              <h2>Author name</h2>
              <h4>0x69cc780bf4f63380c4bc745ee338cb678752301a</h4>
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
  tabs: state.profile.tabs,
});

const mapDispatchToProps = { setActiveTab };

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

