import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setActiveTab } from '../../../actions/profileActions';

const ProfileTabs = ({ tabs, setActiveTab }) => (
  <div className="tabs-wrapper">
    {
      tabs.map(({ label, value, active }) => (
        <div
          key={value}
          className={`tab ${active ? 'active' : ''}`}
          onClick={() => { setActiveTab(value); }}
        >
          { label }
        </div>
      ))
    }
  </div>
);

ProfileTabs.propTypes = {
  tabs: PropTypes.array.isRequired,
  setActiveTab: PropTypes.func.isRequired,
};

const mapStateToProps = ({ profile }) => ({
  tabs: profile.tabs,
});

const mapDispatchToProps = { setActiveTab };

export default connect(mapStateToProps, mapDispatchToProps)(ProfileTabs);

