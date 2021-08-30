import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './modals.scss';

class Modal extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { children: null, show: null };
  }

  componentDidMount() {
    document.addEventListener('keydown', (event) => {
      if (event.keyCode === 27) {
        this.props.closeModal();
      }
    });
  }

  // eslint-disable-next-line
  UNSAFE_componentWillReceiveProps(newProps) {
    if (!newProps.modalOpen && (this.state.children !== null)) {
      setTimeout(() => { this.setState({ show: null }); }, 300);
      return setTimeout(() => { this.setState({ children: null }); }, 500);
    }

    if (newProps.modalOpen) { this.setState({ show: true }); }

    return this.setState({ children: newProps.children });
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.props.closeModal);
  }

  render() {
    return (
      <div
        className={`modal-backdrop ${this.state.show ? 'open' : ''} ${this.props.className}`}
        role="button"
        tabIndex={0}
        onClick={() => {
          this.props.closeModal();
        }}
      >
        <div className="modal-scroll-container">
          <div className="modal-wrapper" style={{ maxWidth: this.props.width }}>
            <div
              className="modal1"
              onClick={(e) => { e.stopPropagation(); }}
            >
              { (this.state.children !== null) && this.state.children }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Modal.defaultProps = {
  width: 'auto',
  className: '',
};

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
};

export default Modal;
