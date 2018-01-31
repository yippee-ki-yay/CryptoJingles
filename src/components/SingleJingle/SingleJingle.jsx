import React, { Component } from 'react';
import { connect } from 'react-redux';
import { playAudio } from '../../actions/audioActions';
import { Link } from 'react-router';
import { Sound, Group} from 'pizzicato';
import JingleImage from '../../components/JingleImage/JingleImage';
import { getJingleMetadata } from '../../getMockData';

class SingleJingle extends Component {
  constructor (props) {
    super(props);

    this.state = { start: false };
  }

  componentDidMount() {
    const sampleSrcs = this.props.sampleTypes.map((sampleType) =>
      new Promise((resolve) => {
        const sound = new Sound(getJingleMetadata(sampleType).source, () => { resolve(sound); });
    }));

    Promise.all(sampleSrcs).then((sources) => {
      const sound = new Group(sources);

      sound.on('stop', () => {
        this.setState({ start: false });
      });

      this.state = { sound, start: false };
    });
  }

  playSound = () => {
    this.state.sound.play();
    this.setState({ start: true });
  };

  stopSound = () => {
    this.state.sound.stop();
    this.setState({ start: false });
  };

  render() {
    const { jingleId, author, name, onSale, price } = this.props;
    return (
      <div key={jingleId} className="single-song">
        {
          onSale &&
          <div className="header-label"><span>On sale for:</span> {window.web3.fromWei(price, 'ether')}Ξ</div>
        }

        <div className="jingle-image-container">
          <JingleImage width={200} height={200} id={jingleId} />
        </div>

        <div className="overlay">
          {
            !this.state.start &&
            <span onClick={ this.playSound }>
              <i className="material-icons play">play_circle_outline</i>
            </span>
          }
          {
            this.state.start &&
            <span onClick={ this.stopSound }><i className="material-icons stop">cancel</i></span>
          }
          <Link to={`/jingle/${jingleId}`}>
            <i className="material-icons open">open_in_new</i>
          </Link>
        </div>

        #{ jingleId }
        <div>{ author }</div>
        <div>{ name }</div>
      </div>
    )
  }
}

export default connect(null, { playAudio })(SingleJingle);