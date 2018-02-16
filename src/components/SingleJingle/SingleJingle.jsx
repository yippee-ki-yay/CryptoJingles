import React, { Component } from 'react';
import { connect } from 'react-redux';
import { playAudio } from '../../actions/audioActions';
import { Link } from 'react-router';
import { Sound, Group} from 'pizzicato';
import JingleImage from '../JingleImage/JingleImage';
import LoadingIcon from '../../components/Decorative/LoadingIcon';
import Heart from '../../components/Decorative/Heart';
import { getJingleMetadata } from '../../constants/getMockData';
import { likeUnLikeMarketplaceJingle } from '../../actions/marketplaceActions';
import { likeUnLikeProfileJingle } from '../../actions/profileActions';
import { playWithDelay } from '../../util/soundHelper';
import { formatSalePrice } from '../../actions/utils';

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
    let delays = this.props.settings.slice(5, 11);
    delays = delays.map(d => parseInt(d));

    const sampleSrcs = this.props.sampleTypes.map((sampleType, i) =>
      new Promise((resolve) => {
        const sound = new Sound(getJingleMetadata(sampleType).source, () => { resolve(sound); });
        sound.volume = parseInt(this.props.settings[i]) / 100;
      }));

    this.setState({ loading: true });

    Promise.all(sampleSrcs).then((sources) => {
      const longestSound = sources.reduce((prev, current, i) => (
        (prev.getRawSourceNode().buffer.duration + delays[i]) > (current.getRawSourceNode().buffer.duration) + delays[i]) ? prev : current);

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

    playWithDelay(this.state.sound, this.props.settings);
    this.setState({ start: true });
  };

  stopSound = () => {
    if (!this.state.sound) return;
    this.state.sound.stop();
    this.setState({ start: false });
  };

  likeJingle = (jingleId, action) => {
    if (this.props.type === 'marketplace') this.props.likeUnLikeMarketplaceJingle(jingleId, action);
    if (this.props.type === 'profile') this.props.likeUnLikeProfileJingle(jingleId, action);
  };

  render() {
    const { jingleId, author, name, onSale, price, likeCount, liked, hasMM, lockedMM } = this.props;

    return (
      <div key={jingleId} className="single-song">
        <div className="jingle-image-actions">
          {
            onSale &&
            <div className="header-label">
              <span>On sale for:</span>
              {formatSalePrice(price)}Ξ
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
        </div>

        <div className="jingle-footer">
          <div className="id-likes-wrapper">
            <span>#{ jingleId }</span>
            <span>
              <span onClick={() => { this.likeJingle(jingleId, !liked); }}>
                <Heart active={liked} size="30" canLike={hasMM && !lockedMM} />
              </span>
              <span>{ likeCount }</span>
            </span>

          </div>
          <div className="jingle-footer-author">{ author }</div>
          <div className="jingle-footer-name">{ name }</div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  volumes: state.compose.volumes,
  delays: state.compose.delays,
  hasMM: state.app.hasMM,
  lockedMM: state.app.lockedMM,
});

const mapDispatchToProps = {
  likeUnLikeMarketplaceJingle, likeUnLikeProfileJingle, playAudio
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleJingle);