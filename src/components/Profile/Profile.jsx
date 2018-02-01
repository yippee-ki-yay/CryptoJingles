import React, { Component } from 'react';
import { connect } from 'react-redux';
import MySamples from '../../mySamples/MySamples';
import MyJingles from '../../myJingles/MyJingles';
import MySongs from '../MySongs/MySongs';
import MyAlbums from '../MyAlbums/MyAlbums';
import {
  setActiveTab, checkIfOwnerProfile, toggleEditAuthor, onEditAuthorChange, submitEditAuthorForm, getAuthor
} from '../../actions/profileActions';
import OutsideAlerter from '../OutsideAlerter/OutsideAlerter';

import './Profile.css';
import profilePlaceholder from './profile-placeholder.png';

// TODO - add proptypes
class Profile extends Component {
  componentWillMount() {
    this.props.getAuthor(this.props.params.address);
    this.props.checkIfOwnerProfile(this.props.params.address);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.params.address === this.props.params.address) return;

    this.props.getAuthor(newProps.params.address);
    this.props.checkIfOwnerProfile(newProps.params.address);
  }

  render() {
    const { tabs, isOwner, params, author, editAuthorActive, authorEdit, submitEditAuthorForm } = this.props;
    const { setActiveTab, toggleEditAuthor, onEditAuthorChange } = this.props;
    const activeTab = tabs.find((_tab) => _tab.active).value;

    return (
      <div className="container profile-wrapper">

        { /* TODO - create component out of this, fix html layout */  }
        <div className="profile-info-wrapper">
          <div className="profile-image-wrapper">
            <img src={profilePlaceholder} alt="profile image"/>
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

        { activeTab === tabs[0].value && <MySamples address={this.props.params.address} />  }
        { activeTab === tabs[1].value && <MyJingles address={this.props.params.address} />  }
        { activeTab === tabs[2].value && <MySongs />  }
        { activeTab === tabs[3].value && <MyAlbums /> }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  tabs: state.profile.tabs,
  editAuthorActive: state.profile.editAuthorActive,
  isOwner: state.profile.isOwner,
  author: state.profile.author,
  authorEdit: state.profile.authorEdit
});

const mapDispatchToProps = {
  setActiveTab, checkIfOwnerProfile, toggleEditAuthor, onEditAuthorChange, submitEditAuthorForm, getAuthor
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
