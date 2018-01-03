import React, { Component } from 'react';

import './Placeholder.css';

class Placeholder extends Component {

  constructor(props) {
    super(props);

    this.state = {
        stage: 'unselected'
    };

  }

  placeholderSeleced = () => {

    let stage = 'selected';

    if (this.state.stage === 'selected') {
        stage = 'unselected';
    }

    this.setState({
        stage: stage
    });
  }

  render() {
        if (this.state.stage === 'unselected') {
            return (
                <div className="col-md-2" onClick={ this.placeholderSeleced } >
                    <div className="well bs-component placeholder">
                        #{ this.props.id } Add jingle
                    </div>
                </div>
            );
        } else if(this.state.stage === 'selected') {
            return (
                <div className="col-md-2" onClick={ this.placeholderSeleced } >
                    <div className="well bs-component placeholder">
                        Select jingle
                    </div>
                </div>
            );
        }
  }
}

export default Placeholder;