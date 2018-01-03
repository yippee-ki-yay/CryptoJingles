import React, { Component } from 'react';

import Pizzicato from 'pizzicato';

class JingleBox extends Component {

  constructor(props) {
    super(props);

    const sound = new Pizzicato.Sound(props.source, () => {
        // Sound loaded!
        this.state = {
            sound
        };
    });

  }

  playSound = () => {
      this.state.sound.play();
  }


  render() {
      return (
          <div>
            <div className="col-md-2">
                <div className="well bs-component">
                    <p>{ this.props.name }</p>
                        <div>
                        <button type="button" onClick={ this.playSound } className="btn btn-info">Play</button>
                        </div>
                    </div>
                </div>
          </div>
      )
  }
}

export default JingleBox;