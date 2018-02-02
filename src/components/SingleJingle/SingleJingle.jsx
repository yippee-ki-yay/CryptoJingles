import React, { Component } from 'react';
import { connect } from 'react-redux';
import { playAudio } from '../../actions/audioActions';
import { Link } from 'react-router';
import { Sound, Group} from 'pizzicato';
import JingleImage from '../../components/JingleImage/JingleImage';
import LoadingIcon from '../../components/Decorative/LoadingIcon';
import { getJingleMetadata } from '../../getMockData';

class SingleJingle extends Component {
  constructor (props) {
    super(props);

    this.state = {
      start: false,
      loading: false,
      sound: null
    };

    this.stopSound = this.stopSound.bind(this);
    this.playSound = this.playSound.bind(this);
    this.loadJingle = this.loadJingle.bind(this);
  }

  componentWillUnmount() { this.stopSound(); }

  loadJingle() {
    const sampleSrcs = this.props.sampleTypes.map((sampleType) =>
      new Promise((resolve) => {
        const sound = new Sound(getJingleMetadata(sampleType).source, () => { resolve(sound); });
      }));

    this.setState({ loading: true });

    Promise.all(sampleSrcs).then((sources) => {
      const longestSound = sources.reduce((prev, current) => (
        prev.getRawSourceNode().buffer.duration > current.getRawSourceNode().buffer.duration) ? prev : current);

      longestSound.on('stop', () => { this.setState({ start: false }); });

      const sound = new Group(sources);

      sound.on('stop', () => { this.setState({ start: false }); });

      this.setState({ sound, start: false, loading: false });
      this.playSound();
    });
  }

  playSound = () => {
    if (this.state.sound === null) {
      this.loadJingle();
      return
    }

    this.state.sound.play();
    this.setState({ start: true });
  };

  stopSound = () => {
    if (!this.state.sound) return;
    this.state.sound.stop();
    this.setState({ start: false });
  };

  render() {
    const { jingleId, author, name, onSale, price } = this.props;
    return (
      <div key={jingleId} className="single-song">
        {
          onSale &&
          <div className="header-label">
            <span>On sale for:</span>
            {window.web3.fromWei(price, 'ether').slice(0, 8)}Ξ
          </div>
        }

        <div className="jingle-image-container">
          <JingleImage width={200} height={200} id={jingleId} />
        </div>

        <div className="overlay">
          { this.state.loading && <LoadingIcon /> }
          {
            !this.state.start && !this.state.loading &&
            <span onClick={ this.playSound }>
              <i className="material-icons play">play_circle_outline</i>
            </span>
          }
          {
            this.state.start && !this.state.loading &&
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