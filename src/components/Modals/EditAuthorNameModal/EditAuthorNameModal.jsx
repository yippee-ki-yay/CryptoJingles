import React, { useCallback, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import trans from 'translate';
import { connect } from 'react-redux';
import ModalBody from '../ModalBody';
import {
  clearSubmitAuthorForm,
  onEditAuthorChange,
  submitEditAuthorForm,
} from '../../../actions/profileActions';
import MessageBox from '../../Common/MessageBox/MessageBox';
import { MESSAGE_BOX_TYPES } from '../../../constants/general';

import './EditAuthorNameModal.scss';

const EditAuthorNameModal = ({
  closeModal, onEditAuthorChange, submitEditAuthorForm, authorEdit, author,
  updatingAuthor, updatingAuthorError, clearSubmitAuthorForm,
}) => {
  const noChange = useMemo(() => authorEdit === author, [authorEdit, author]);

  const stopSubmitCallback = useCallback((e) => { e.preventDefault(); }, []);
  const submitEditAuthorFormCallback = useCallback(() => {
    submitEditAuthorForm(authorEdit, closeModal);
  }, [submitEditAuthorForm, closeModal, authorEdit]);

  useEffect(() => () => { clearSubmitAuthorForm(); }, [clearSubmitAuthorForm]);

  return (
    <div className="edit-auth-name-modal-wrapper">
      <ModalBody closeModal={closeModal} title={trans('profile.edit_author_name')}>
        <form onSubmit={stopSubmitCallback}>
          <input
            className="form-input"
            maxLength="30"
            disabled={updatingAuthor}
            autoFocus
            onChange={onEditAuthorChange}
            type="text"
            value={authorEdit}
          />

          <button
            className="button green"
            type="submit"
            disabled={updatingAuthor || noChange}
            onClick={submitEditAuthorFormCallback}
          >
            { updatingAuthor ? trans('common.saving') : trans('common.save') }
          </button>

          { updatingAuthorError && (<MessageBox type={MESSAGE_BOX_TYPES.ERROR}>{ updatingAuthorError }</MessageBox>) }
        </form>
      </ModalBody>
    </div>
  );
};

EditAuthorNameModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  onEditAuthorChange: PropTypes.func.isRequired,
  submitEditAuthorForm: PropTypes.func.isRequired,
  clearSubmitAuthorForm: PropTypes.func.isRequired,
  authorEdit: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  updatingAuthor: PropTypes.bool.isRequired,
  updatingAuthorError: PropTypes.string.isRequired,
};

const mapStateToProps = ({ profile }) => ({
  author: profile.author,
  authorEdit: profile.authorEdit,
  updatingAuthor: profile.updatingAuthor,
  updatingAuthorError: profile.updatingAuthorError,
});

const mapDispatchToProps = {
  onEditAuthorChange,
  submitEditAuthorForm,
  clearSubmitAuthorForm,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditAuthorNameModal);
