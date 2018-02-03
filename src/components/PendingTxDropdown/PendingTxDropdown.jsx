import React, { Component } from 'react';
import { connect } from 'react-redux';
import OutsideAlerter from '../OutsideAlerter/OutsideAlerter';

import './PendingTxDropdown.css';

class PendingTxDropdown extends Component {
  constructor(props) {
    super(props);

    this.state = { open: true };

    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.hideDropdown = this.hideDropdown.bind(this);
  }

  toggleDropdown() { this.setState({ open: !this.state.open }); }

  hideDropdown() {
    if (this.props.pendingTxs.length > 0 && this.state.open) {
      this.setState({ open: false });
    }
  }

  render() {
    // const { name, id } = this.props;
    return (
      <OutsideAlerter onClickOutside={() => { this.hideDropdown(); }}>
        <div className="pending-tx-dropdown-wrapper">
          {
            (this.props.pendingTxs.length > 0) &&
            <div>
              <div className="dropdown-header" onClick={this.toggleDropdown}>
                Pending transactions

                <div className="icons-wrapper">
                  <i className="material-icons">{ this.state.open ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }</i>
                </div>
              </div>

              {
                this.state.open &&
                <div className="dropdown-wrapper">
                  {
                    this.props.pendingTxs.map(({ tx, type}) => (
                      <div className="pending-single" key={tx}>
                        <span className="type">{ type }</span>
                      </div>
                    ))
                  }
                </div>
              }
            </div>
          }
        </div>
      </OutsideAlerter>
    )
  }
}

const mapStateToProps = (state) => ({
  pendingTxs: state.app.pendingTxs
});

export default connect(mapStateToProps)(PendingTxDropdown);
