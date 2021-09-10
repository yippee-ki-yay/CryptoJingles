import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ethereumAddress from 'ethereum-address';
import t from 'translate';
import MySamples from './MySamples/MySamples';
import MyJingles from './MyJingles/MyJingles';
import MySongs from './MySongs/MySongs';
import MyAlbums from './MyAlbums/MyAlbums';
import {
  setActiveTab, checkIfOwnerProfile, toggleEditAuthor, onEditAuthorChange, submitEditAuthorForm, getAuthor,
  setProfileAddress, setInvalidProfile,
} from '../../actions/profileActions';
import OutsideAlerter from '../OutsideAlerter/OutsideAlerter';
import profilePlaceholder from './profile-placeholder.png';

import './Profile.scss';

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
      tabs, isOwner, match: { params }, author, editAuthorActive, authorEdit, submitEditAuthorForm, isValidProfile,
    } = this.props;
    const { setActiveTab, toggleEditAuthor, onEditAuthorChange } = this.props;
    const activeTab = tabs.find((_tab) => _tab.active).value;

    return (
      <div className="profile-wrapper page-wrapper">
        <div className="width-container">
          <div className="page-header-wrapper">
            <div className="page-title">{ t('common.profile') }</div>
          </div>

          <div className="page-content-wrapper">
            { /* TODO - create component out of this, fix html layout */ }
            {
              isValidProfile && (
                <div>
                  <div className="profile-info-wrapper">
                    <div className="profile-image-wrapper">
                      <img src={profilePlaceholder} alt="profile placeholder" />
                      <div>
                        <h2>
                          <span className="author">
                            { !isOwner && author}

                            {
                              isOwner && (
                                <div>
                                  {
                                    !editAuthorActive && (
                                      <span>
                                        <span>{author}</span>
                                        <span onClick={() => { toggleEditAuthor(true); }}>
                                          <i className="material-icons edit-icon">edit</i>
                                        </span>
                                      </span>
                                    )
                                  }

                                  {
                                    editAuthorActive && (
                                      <div className="edit-author-wrapper">
                                        <OutsideAlerter onClickOutside={() => { toggleEditAuthor(false); }}>
                                          <form onSubmit={(e) => { e.preventDefault(); }}>
                                            <span>
                                              <input
                                                maxLength="30"
                                                autoFocus
                                                onChange={onEditAuthorChange}
                                                type="text"
                                                value={authorEdit}
                                              />
                                              <span>
                                                <span>
                                                  <button type="submit" onClick={submitEditAuthorForm}>
                                                    <i className="material-icons save">save</i>
                                                  </button>
                                                </span>
                                                <span onClick={() => { toggleEditAuthor(false); }}>
                                                  <i className="material-icons close-icon">close</i>
                                                </span>
                                              </span>
                                            </span>
                                          </form>
                                        </OutsideAlerter>
                                      </div>
                                    )
                                  }
                                </div>
                              )
                            }
                          </span>
                        </h2>
                        <h4>
                          <a
                            className="etherscan-link"
                            href={`https://etherscan.io/address/${params.address}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            { params.address }
                          </a>
                        </h4>
                      </div>
                    </div>

                    { /* TODO - create component out of this */ }
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
                  </div>

                  { activeTab === tabs[0].value && <MySamples address={this.props.match.params.address} /> }
                  { activeTab === tabs[1].value && <MyJingles address={this.props.match.params.address} /> }
                  { activeTab === tabs[2].value && <MySongs /> }
                  { activeTab === tabs[3].value && <MyAlbums /> }
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
  editAuthorActive: PropTypes.bool.isRequired,
  isOwner: PropTypes.bool.isRequired,
  author: PropTypes.string.isRequired,
  authorEdit: PropTypes.string.isRequired,
  isValidProfile: PropTypes.bool.isRequired,
  match: PropTypes.object.isRequired,
  setActiveTab: PropTypes.func.isRequired,
  checkIfOwnerProfile: PropTypes.func.isRequired,
  toggleEditAuthor: PropTypes.func.isRequired,
  onEditAuthorChange: PropTypes.func.isRequired,
  submitEditAuthorForm: PropTypes.func.isRequired,
  getAuthor: PropTypes.func.isRequired,
  setProfileAddress: PropTypes.func.isRequired,
  setInvalidProfile: PropTypes.func.isRequired,
  address: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  tabs: state.profile.tabs,
  editAuthorActive: state.profile.editAuthorActive,
  isOwner: state.profile.isOwner,
  author: state.profile.author,
  authorEdit: state.profile.authorEdit,
  isValidProfile: state.profile.isValidProfile,
  address: state.app.address,
});

const mapDispatchToProps = {
  setActiveTab,
  checkIfOwnerProfile,
  toggleEditAuthor,
  onEditAuthorChange,
  submitEditAuthorForm,
  getAuthor,
  setProfileAddress,
  setInvalidProfile,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
