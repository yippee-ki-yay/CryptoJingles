import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from './Modal';
import modalMapping from './modalMapping';
import { closeModal } from '../../redux/actions/modalActions';

const ModalRoot = ({
  SpecificModal, modalProps, modalType, modalOpen, closeModal,
}) => {
  let closeFunc = closeModal;

  if (SpecificModal && modalProps.resolve) {
    closeFunc = () => {
      modalProps.resolve(false);
      closeModal();
    };
  }

  return (
    <Modal modalOpen={modalOpen} closeModal={closeFunc} width={modalProps.width} className={modalProps.className}>
      {
        SpecificModal ?
          (
            <SpecificModal
              modalType={modalType}
              closeModal={closeFunc}
              {...modalProps}
            />
          ) : null
      }
    </Modal>
  );
};

ModalRoot.defaultProps = {
  SpecificModal: null,
};

ModalRoot.propTypes = {
  modalProps: PropTypes.object.isRequired,
  modalType: PropTypes.string.isRequired,
  modalOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  SpecificModal: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func,
    PropTypes.object,
  ]),
};

const mapStateToProps = ({ modal }) => ({
  modalProps: modal.modalProps,
  modalOpen: modal.modalType.length > 0,
  SpecificModal: modalMapping[modal.modalType],
  modalType: modal.modalType,
});

const mapDispatchtoProps = {
  closeModal,
};

export default connect(mapStateToProps, mapDispatchtoProps)(ModalRoot);
