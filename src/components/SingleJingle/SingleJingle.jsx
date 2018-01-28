import React from 'react';
import { connect } from 'react-redux';
import { playAudio } from '../../actions/audioActions';
import { Link } from 'react-router';

const SingleJingle = ({ id, author, name, imageSrc, source, sale, price, playAudio }) => (
  <div key={id} className="single-song">
    {
      sale &&
      <div className="header-label"><span>On sale for:</span> {price}Ξ</div>
    }

    <img src={ imageSrc } alt={name} />

    <div className="overlay">
      <i
        className="material-icons play"
        onClick={() => { playAudio({ name, img: imageSrc, src: source, author }); }}
      >
        play_circle_outline
      </i>
      <Link to={`/jingle/${id}`}>
        <i className="material-icons open">open_in_new</i>
      </Link>
    </div>

    #{ id }
    <div>{ author }</div>
    <div>{ name }</div>
  </div>
);

export default connect(null, { playAudio })(SingleJingle);