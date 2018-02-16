import React, { Component } from 'react';
import { connect } from 'react-redux';
import ethereumAddress from 'ethereum-address';
import MySamples from './MySamples/MySamples';
import MyJingles from './MyJingles/MyJingles';
import MySongs from './MySongs/MySongs';
import MyAlbums from './MyAlbums/MyAlbums';
import {
  setActiveTab, checkIfOwnerProfile, toggleEditAuthor, onEditAuthorChange, submitEditAuthorForm, getAuthor,
  setProfileAddress, setInvalidProfile
} from '../../actions/profileActions';
import OutsideAlerter from '../OutsideAlerter/OutsideAlerter';

import './Profile.scss';
import profilePlaceholder from './profile-placeholder.png';

// TODO - add proptypes
class Profile extends Component {
  componentWillMount() {
    if (!this.isValidProfile(this.props.params.address)) return;

    this.props.setProfileAddress(this.props.params.address);
    this.props.getAuthor();
    this.props.checkIfOwnerProfile();
  }

  componentWillReceiveProps(newProps) {
    if (newProps.params.address === this.props.params.address) return;
    if (!this.isValidProfile(newProps.params.address)) return;

    this.props.setProfileAddress(newProps.params.address);
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
      tabs, isOwner, params, author, editAuthorActive, authorEdit, submitEditAuthorForm, isValidProfile
    } = this.props;
    const { setActiveTab, toggleEditAuthor, onEditAuthorChange } = this.props;
    const activeTab = tabs.find((_tab) => _tab.active).value;

    return (
      <div className="container profile-wrapper">
        { /* TODO - create component out of this, fix html layout */ }
        {
          isValidProfile &&
          <div>
            <div className="profile-info-wrapper">
              <div className="profile-image-wrapper">
                <img src={profilePlaceholder} alt="profile placeholder"/>
                <div>
                  <h2>
                <span className="author">
                  { !isOwner && author}

                  {
                    isOwner &&
                    <div>
                      {
                        !editAuthorActive &&
                        <span>
                          <span>{author}</span>
                          <span onClick={() => { toggleEditAuthor(true); }}>
                            <i className="material-icons edit-icon">edit</i>
                          </span>
                        </span>
                      }

                      {
                        editAuthorActive &&
                        <div className="edit-author-wrapper">
                          <OutsideAlerter onClickOutside={() => { toggleEditAuthor(false); }}>
                            <form onSubmit={(e) => {e.preventDefault(); }}>
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
                      }
                    </div>
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
            </div>

            { activeTab === tabs[0].value && <MySamples address={this.props.params.address} />  }
            { activeTab === tabs[1].value && <MyJingles address={this.props.params.address} />  }
            { activeTab === tabs[2].value && <MySongs />  }
            { activeTab === tabs[3].value && <MyAlbums /> }
          </div>
        }

        {
          !isValidProfile &&
          <div className="not-valid-message">
            Provided address is not valid.
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  tabs: state.profile.tabs,
  editAuthorActive: state.profile.editAuthorActive,
  isOwner: state.profile.isOwner,
  author: state.profile.author,
  authorEdit: state.profile.authorEdit,
  isValidProfile: state.profile.isValidProfile
});

const mapDispatchToProps = {
  setActiveTab, checkIfOwnerProfile, toggleEditAuthor, onEditAuthorChange, submitEditAuthorForm, getAuthor,
  setProfileAddress, setInvalidProfile
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
