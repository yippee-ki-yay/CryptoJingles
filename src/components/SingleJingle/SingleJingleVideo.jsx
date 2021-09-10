import React, {
  useCallback, useEffect, useMemo, useRef, useState,
} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import loadingGif from './loadingGif.gif';

const SingleJingleVideo = ({ jingleId, version }) => {
  const soundRef = useRef();

  const [videoError, setVideoError] = useState('');
  const [loaded, setLoaded] = useState(false);
  const [playing, setPlaying] = useState(false);

  const src = useMemo(() => `https://cryptojingles.app/public/videosWithSound/v${version}_${jingleId}.webm`, [version, jingleId]);

  const setPlayingFalse = useCallback(() => setPlaying(false), [setPlaying]);

  const playSoundCallback = useCallback(() => {
    if (!soundRef.current) return;

    soundRef.current.play();
    setPlaying(true);
  }, [soundRef]);

  const stopSoundCallback = useCallback(() => {
    if (!soundRef.current) return;

    soundRef.current.pause();
    soundRef.current.currentTime = 0;
    setPlaying(false);
  }, [soundRef]);

  useEffect(() => () => stopSoundCallback(), [stopSoundCallback]);

  useEffect(() => {
    const video = document.createElement('video');

    const errorCallback = (e) => setVideoError(true);
    video.addEventListener('error', errorCallback);

    const loadedCallback = () => setLoaded(true);
    video.addEventListener('loadeddata', loadedCallback);

    video.src = src;

    return () => {
      video.removeEventListener('error', errorCallback);
      video.removeEventListener('loadeddata', loadedCallback);
    };
  }, [src, setVideoError, setLoaded]);

  return (
    <div className={clsx('video-container', { error: videoError })}>
      { videoError && (<div className="over-video-error-overlay">Video is being generated...</div>) }

      <div className="overlay">
        {
          !videoError && loaded && !playing && (
            <span onClick={playSoundCallback}>
              <i className="material-icons play">play_circle_outline</i>
            </span>
          )
        }

        { playing && (<span onClick={stopSoundCallback}><i className="material-icons stop">cancel</i></span>) }

        <Link to={`/jingle/${version}/${jingleId}`}>
          <i className="material-icons open">open_in_new</i>
        </Link>
      </div>

      <video // eslint-disable-line
        muted
        autoPlay
        loop
        playsInline
        poster={loadingGif}
      >
        <source src={src} type="video/webm" />
        <audio src={src} onEnded={setPlayingFalse} ref={soundRef} /> {/* eslint-disable-line */}
      </video>
    </div>
  );
};

SingleJingleVideo.propTypes = {
  jingleId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  version: PropTypes.number.isRequired,
};

export default SingleJingleVideo;
