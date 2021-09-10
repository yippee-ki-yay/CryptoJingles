import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ethereumAddress from 'ethereum-address';
import t from 'translate';
import { openEditAuthorNameModal } from 'redux/actions/modalActions';
import MySamples from './MySamples/MySamples';
import MyJingles from './MyJingles/MyJingles';
import {
  setActiveTab, checkIfOwnerProfile, getAuthor,
  setProfileAddress, setInvalidProfile,
} from '../../actions/profileActions';

import './Profile.scss';
import ThreeDotsLoader from '../Common/ThreeDotsLoader/TreeDotsLoader';

class Profile extends Component {
  // eslint-disable-next-line camelcase
  UNSAFE_componentWillMount() {
    if (!this.isValidProfile(this.props.match.params.address)) return;

    this.props.setProfileAddress(this.props.match.params.address);
    this.props.getAuthor();
    this.props.checkIfOwnerProfile();
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps(newProps) {
    if (newProps.address !== this.props.address) this.props.checkIfOwnerProfile();

    if (newProps.match.params.address === this.props.match.params.address) return;
    if (!this.isValidProfile(newProps.match.params.address)) return;

    this.props.setProfileAddress(newProps.match.params.address);
    this.props.getAuthor();
    this.props.checkIfOwnerProfile();
  }

  isValidProfile = (address) => {
    const isValid = ethereumAddress.isAddress(address);
    if (isValid) return true;

    this.props.setInvalidProfile();
    return false;
  };

  render() {
    const {
      tabs, isOwner, match: { params }, author, isValidProfile,
      gettingAuthor, gettingAuthorError,
    } = this.props;
    const { setActiveTab } = this.props;
    const activeTab = tabs.find((_tab) => _tab.active).value;

    return (
      <div className="profile-wrapper page-wrapper">
        <div className="width-container">
          <div className="page-header-wrapper">
            <div className="page-title">{ t('common.profile') }</div>
          </div>

          <div className="page-content-wrapper">
            {
              isValidProfile && (
                <div className="profile-container">
                  <div className="profile-info-wrapper">
                    <div className="author-link-wrapper">
                      <div className="author-wrapper">
                        <div className="author-name">
                          {
                            gettingAuthor ?
                              (<ThreeDotsLoader big />)
                              :
                              gettingAuthorError ?
                                (<div className="author-error">Error</div>)
                                :
                                author
                          }
                        </div>

                        {
                          isOwner && author && (
                            <div className="edit-author-icon-wrapper" onClick={this.props.openEditAuthorNameModal}>
                              <i className="material-icons edit-icon">edit</i>
                            </div>
                          )
                        }
                      </div>

                      <a
                        className="etherscan-link"
                        href={`https://etherscan.io/address/${params.address}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        { params.address }
                      </a>
                    </div>

                    <div className="tabs-wrapper">
                      {
                        tabs.map(({ label, value, active }) => (
                          <div
                            key={value}
                            className={`tab ${active ? 'active' : ''}`}
                            onClick={() => { setActiveTab(value); }}
                          >
                            <div className="tab-text">{ label }</div>
                          </div>
                        ))
                      }
                    </div>
                  </div>

                  { activeTab === tabs[0].value && <MyJingles address={this.props.match.params.address} /> }
                  { activeTab === tabs[1].value && <MySamples address={this.props.match.params.address} /> }
                </div>
              )
            }

            {
              !isValidProfile && (
                <div className="not-valid-message">
                  Provided address is not valid.
                </div>
              )
            }
          </div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  tabs: PropTypes.array.isRequired,
  isOwner: PropTypes.bool.isRequired,
  isValidProfile: PropTypes.bool.isRequired,
  match: PropTypes.object.isRequired,
  setActiveTab: PropTypes.func.isRequired,
  checkIfOwnerProfile: PropTypes.func.isRequired,
  getAuthor: PropTypes.func.isRequired,
  setProfileAddress: PropTypes.func.isRequired,
  setInvalidProfile: PropTypes.func.isRequired,
  openEditAuthorNameModal: PropTypes.func.isRequired,
  address: PropTypes.string.isRequired,

  gettingAuthor: PropTypes.bool.isRequired,
  gettingAuthorError: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  tabs: state.profile.tabs,
  editAuthorActive: state.profile.editAuthorActive,
  isOwner: state.profile.isOwner,
  authorEdit: state.profile.authorEdit,
  isValidProfile: state.profile.isValidProfile,
  address: state.app.address,

  gettingAuthor: state.profile.gettingAuthor,
  gettingAuthorError: state.profile.gettingAuthorError,
  author: state.profile.author,
});

const mapDispatchToProps = {
  setActiveTab,
  checkIfOwnerProfile,
  getAuthor,
  setProfileAddress,
  setInvalidProfile,
  openEditAuthorNameModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
