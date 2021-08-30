import React from 'react';
import PropTypes from 'prop-types';
import trans from 'translate';

import CloseIcon from '../Common/Icons/CloseIcon';
import './modals.scss';

const ModalHeader = ({ closeModal, title }) => (
  <div className="modal-header">
    <div className="modal-title">{trans(title)}</div>
    <span onClick={closeModal} className="icon-close">
      <CloseIcon size={21} />
    </span>
  </div>
);

ModalHeader.propTypes = {
  closeModal: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default ModalHeader;
