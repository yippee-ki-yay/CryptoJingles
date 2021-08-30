import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import WalletModalNoAccount from './WalletModalNoAccount/WalletModalNoAccount';
import WalletModalConnected from './WalletModalConnected/WalletModalConnected';

class WalletModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showAccount: false,
    };
  }

  componentDidMount() {
    if (this.props.address) this.setState({ showAccount: true });
  }

  componentDidUpdate(prevProps) {
    if (this.props.resolve && !prevProps.address && this.props.address) {
      this.props.resolve(true);
      this.props.closeModal();
    } else if (prevProps.address && !this.props.address) {
      this.setState({ showAccount: false }); // eslint-disable-line
    }
  }

  componentWillUnmount() {
    if (this.props.reject && !this.props.address) this.props.reject('errors.you_have_not_connected_a_wallet');
  }

  render() {
    const { closeModal } = this.props;
    const { showAccount } = this.state;

    return (
      <div className="wallet-modal-wrapper">
        { !showAccount && (<WalletModalNoAccount closeModal={closeModal} />) }
        { showAccount && (<WalletModalConnected closeModal={closeModal} />) }
      </div>
    );
  }
}

WalletModal.defaultProps = {
  address: '',
  resolve: null,
  reject: null,
};

WalletModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  resolve: PropTypes.func,
  reject: PropTypes.func,
  address: PropTypes.string,
};

const mapStateToProps = ({ app }) => ({ address: app.address });

export default connect(mapStateToProps)(WalletModal);
