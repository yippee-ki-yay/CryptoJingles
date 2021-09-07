import React from 'react';
import PropTypes from 'prop-types';

import RedditIcon from '../Icons/RedditIcon';
import MediumIcon from '../Icons/MediumIcon';
import DiscordIcon from '../Icons/DiscordIcon';
import bigLogo from '../../Home/bigLogo.png';
import './Footer.scss';

const Footer = () => (
  <div className="footer-wrapper">
    <div className="width-container">
      <div className="logo-wrapper">
        <img className="big-logo" src={bigLogo} alt="Logo with typeface" />
      </div>

      <div className="socials-wrapper">
        <a
          className="reddit"
          href="https://www.reddit.com/r/CryptoJingles/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <RedditIcon />
        </a>

        <a
          className="medium"
          href="https://medium.com/@cryptojingles"
          rel="noopener noreferrer"
        >
          <MediumIcon />
        </a>

        <a
          className="discord"
          href="https://discord.gg/AEHvH7Bv"
          rel="noopener noreferrer"
        >
          <DiscordIcon />
        </a>
      </div>

      <div className="footer-copyright">
        &copy; CRYPTO JINGLES - 2021 Copyright
      </div>
    </div>
  </div>
);

Footer.propTypes = {};

export default Footer;
