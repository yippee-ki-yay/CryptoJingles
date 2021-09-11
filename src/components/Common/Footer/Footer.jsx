import React from 'react';
import PropTypes from 'prop-types';

import RedditIcon from '../Icons/RedditIcon';
import MediumIcon from '../Icons/MediumIcon';
import DiscordIcon from '../Icons/DiscordIcon';
import bigLogo from '../../Home/bigLogo.png';
import OpenSeaSmallIcon from '../Icons/OpenSeaSmallIcon';
import './Footer.scss';

const Footer = () => (
  <div className="footer-wrapper">
    <div className="width-container">
      <div className="top">
        <div className="collections">
          <a
            className="reddit"
            href="https://opensea.io/collection/genesis-jingles"
            target="_blank"
            rel="noopener noreferrer"
          >
            <OpenSeaSmallIcon />
            OpenSea Genesis Jingles collection
          </a>

          <a
            className="reddit"
            href="https://opensea.io/collection/new-jingles"
            target="_blank"
            rel="noopener noreferrer"
          >
            <OpenSeaSmallIcon />
            OpenSea New Jingles collection
          </a>
        </div>
      </div>

      <div className="bottom">
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
            target="_blank"
            rel="noopener noreferrer"
          >
            <MediumIcon />
          </a>

          <a
            className="discord"
            href="https://discord.gg/AEHvH7Bv"
            target="_blank"
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
  </div>
);

Footer.propTypes = {};

export default Footer;
