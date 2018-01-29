import React from 'react';
import { Link } from 'react-router';

import './Page404.css';

const MyAlbums = () => (
  <div className="container page404-wrapper">
    <h1>MIC CHECK.</h1>
    <h1>MIC CHECK.</h1>
    <h5>Uh oh, you're lost. The page you are looking for doesn't exits.</h5>

    <Link to="/">RETURN HOME</Link>
  </div>
);

export default MyAlbums;
