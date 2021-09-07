import React, { Component } from 'react';
import t from 'translate';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { silentLogin } from '../../redux/actions/walletActions';
import { getInPageProviderName } from '../../services/walletService';
import Blocker from './Blocker/Blocker';
import BoxLoader from '../Decorative/BoxLoader';

class AccountRouteChecker extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  // componentDidMount() {
  //   this.login();
  // }

  componentDidUpdate(prevProps) {
    const { requireLogin, address, accountType } = this.props;

    const requiredLoginChanged = requireLogin !== prevProps.requireLogin;
    const accountChanged = address && prevProps.address && address !== prevProps.address;
    const accountTypeChanged = accountType && accountType !== prevProps.accountType;

    if (accountTypeChanged || requiredLoginChanged || accountChanged) this.login();
    if (accountChanged || accountChanged) this.setKey(`${address}-${accountType}`);
  }

  setKey(key) { this.setState({ key }); }

  async login() { this.props.silentLogin(); }

  render() {
    const { key } = this.state;
    const {
      component: Component, address, connectingWalletProvider, connectingWallet, requireLogin,
      connectingWalletAccountType, requireLoginBlocker,
      ...rest
    } = this.props;

    const showLoader = requireLogin && requireLoginBlocker && (connectingWalletProvider || connectingWallet);

    if (showLoader) {
      let message = '';

      if (connectingWallet) message = t('common.connecting');
      if (connectingWalletProvider) {
        message = t('common.connecting_wallet', { wallet: getInPageProviderName() });
      }

      return (
        <div className="checker-loader-container width-container">
          <BoxLoader />
          { message && <div className="checker-text">{ message }</div> }
        </div>
      );
    }

    const additional = {};
    if (key) additional.key = key;

    let content;

    if (requireLoginBlocker && !address) content = (<Blocker />);
    else content = <Route {...additional} {...rest} render={(props) => (<Component {...props} />)} />;

    return content;
  }
}

AccountRouteChecker.defaultProps = {
  address: '',
  accountType: '',
  requireLogin: false,
  requireLoginBlocker: false,
};

AccountRouteChecker.propTypes = {
  accountType: PropTypes.string,
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  silentLogin: PropTypes.func.isRequired,
  connectingWalletProvider: PropTypes.bool.isRequired,
  connectingWallet: PropTypes.bool.isRequired,
  connectingWalletAccountType: PropTypes.string.isRequired,
  address: PropTypes.string,
  requireLogin: PropTypes.bool,
  requireLoginBlocker: PropTypes.bool,
};

const mapStateToProps = ({ app }) => ({
  address: app.address,
  accountType: app.accountType,
  connectingWalletProvider: app.connectingWalletProvider,
  connectingWallet: app.connectingWallet,
  connectingWalletAccountType: app.connectingWalletAccountType,
});

const mapDispatchToProps = { silentLogin };

export default connect(mapStateToProps, mapDispatchToProps)(AccountRouteChecker);
