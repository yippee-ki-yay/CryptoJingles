import React from 'react';
import PropTypes from 'prop-types';

import CloseIcon from '../Common/Icons/CloseIcon';
import './modals.scss';

const ModalBody = ({ children, title, closeModal }) => (
  <div className="modal-body">
    <div className="modal-header">
      <div className="modal-title">{ title }</div>
      <span onClick={closeModal} className="icon-close">
        <CloseIcon size={21} />
      </span>
    </div>
    <div className="modal-body-content">
      { children }
    </div>
  </div>
);

ModalBody.propTypes = {
  children: PropTypes.node.isRequired,
  closeModal: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default ModalBody;
