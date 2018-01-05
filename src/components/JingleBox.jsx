import React, { Component } from 'react';

import Pizzicato from 'pizzicato';

import './JingleBox.css';

class JingleBox extends Component {

  constructor(props) {
    super(props);

    this.state = {
        start: false
    };

    const sound = new Pizzicato.Sound(props.source, () => {
        // Sound loaded!
        sound.loop = true;
        this.state = {
            sound,
            start: false
        };
    });

  }

  playSound = () => {
      this.state.sound.play();

      this.setState({
          start: true
      });
  }

  stopSound = () => {
      this.state.sound.stop();

      this.setState({
        start: false
    });
  }

  render() {
      return (
          <div>
            <div className="col-md-2">
                <div className="well bs-component">
                    <div className="jingle-header">
                        <span className="text-success name-tag"> { this.props.name } </span>
                        <span className="id-tag pull-right"> #{ this.props.id } </span>
                    </div>

                    { !this.state.start &&
                        <svg viewBox="0 0 140 140" onClick={ this.playSound } >
                            <circle cx="70" cy="70" r="65" style={{fill:'#fff', stroke:'#ddd'}}/>
                            <polygon id="shape" points="50,40 100,70 100,70 50,100, 50,40" style={{fill:"#aaa"}}>
                            </polygon>
                        </svg>
                    }

                    { this.state.start &&
                        <svg viewBox="0 0 140 140" onClick={ this.stopSound }>
                            <circle cx="70" cy="70" r="65" style={{fill:'#fff', stroke:'#ddd'}}/>
                            <polygon id="shape" points="45,45 95,45 95,95, 45,95 45,45" style={{fill:"#aaa"}}>
                            </polygon>
                        </svg>
                    }
                    </div>
                </div>
          </div>
      )
  }
}

export default JingleBox;