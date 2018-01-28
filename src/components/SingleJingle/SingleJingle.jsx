import React from 'react';
import { connect } from 'react-redux';
import { playAudio } from '../../actions/audioActions';
import { Link } from 'react-router';
import JingleImage from '../../components/JingleImage/JingleImage';

const SingleJingle = ({ jingleId, author, name, imageSrc, source, onSale, price, playAudio }) => (
  <div key={jingleId} className="single-song">
    {
      onSale &&
      <div className="header-label"><span>On sale for:</span> {window.web3.fromWei(price, 'ether')}Ξ</div>
    }

    <div>
      <JingleImage id={jingleId} />
    </div>

    <div className="overlay">
      <i
        className="material-icons play"
        onClick={() => { playAudio({ name, img: imageSrc, src: source, author }); }}
      >
        play_circle_outline
      </i>
      <Link to={`/jingle/${jingleId}`}>
        <i className="material-icons open">open_in_new</i>
      </Link>
    </div>

    #{ jingleId }
    <div>{ author }</div>
    <div>{ name }</div>
  </div>
);

export default connect(null, { playAudio })(SingleJingle);