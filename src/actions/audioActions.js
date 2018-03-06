import { TOGGLE_PLAY_AUDIO, TOGGLE_AUDIO_LOADING, ADD_NEW_AUDIO, AUDIO_LOADED } from '../constants/actionTypes';
import { getSoundFromSource, getSourcesForJingle, getSoundForJingle, playWithDelay } from '../services/audioService';

/**
 * Toggles audio loading based on action (true or false)
 *
 * @param {String} id
 * @param {Boolean} action
 * @return {Function}
 */
const toggleAudioLoading = (id, action) => (dispatch, getState) => {
  const audios = [...getState().audio.audios];
  const audioIndex = audios.findIndex(_audio => _audio.id === id);

  audios[audioIndex].loading = action;
  dispatch({ type: TOGGLE_AUDIO_LOADING, payload: audios });
};

/**
 * Toggles audio playing based on action (true or false)
 *
 * @param {String} id
 * @param {Boolean} action
 * @return {Function}
 */
const toggleAudioPlaying = (id, action) => (dispatch, getState) => {
  const audios = [...getState().audio.audios];
  const audioIndex = audios.findIndex(_audio => _audio.id === id);

  audios[audioIndex].playing = action;
  dispatch({ type: TOGGLE_PLAY_AUDIO, payload: audios });
};

/**
 * Stops audio from being played
 *
 * @param {String} id
 * @return {Function}
 */
export const stopAudio = id => (dispatch, getState) => {
  const audios = [...getState().audio.audios];
  const audioIndex = audios.findIndex(_audio => _audio.id === id);

  if (audioIndex === -1) return;

  audios[audioIndex].sound.stop();
  audios[audioIndex].playing = false;
  dispatch({ type: TOGGLE_PLAY_AUDIO, payload: audios });
};

/**
 * Fires when an audio is downloaded and is ready to be played
 *
 * @param {String} id
 * @param {Object} sound
 * @param {String} source
 * @return {Function}
 */
const sampleLoaded = (id, sound, source) => (dispatch, getState) => {
  const audios = [...getState().audio.audios];
  const audioIndex = audios.findIndex(_audio => _audio.id === id);

  audios[audioIndex] = {
    id,
    sound,
    source,
    playing: true,
    loading: false,
  };

  sound.play();
  dispatch({ type: AUDIO_LOADED, payload: audios });
};

/**
 * Creates new audio object for sample and menages audio states
 *
 * @param {String} id
 * @param {String} source
 * @return {Function}
 */
const loadSample = (id, source) => async (dispatch) => {
  dispatch({ type: ADD_NEW_AUDIO, payload: { id, source } });
  dispatch(toggleAudioLoading(id, true));

  const sound = await getSoundFromSource(source);

  sound.on('stop', () => { dispatch(toggleAudioPlaying(id, false)); });

  dispatch(sampleLoaded(id, sound, source));
};

/**
 * Fires when user clicks play button on sample
 *
 * @param {String} _id
 * @param {String} source
 * @return {Function}
 */
export const playSample = (_id, source) => (dispatch, getState) => {
  const audios = [...getState().audio.audios];
  const audioIndex = audios.findIndex(_audio => _audio.id === _id);

  if (audioIndex === -1) return dispatch(loadSample(_id, source));

  const audio = audios.find(_audio => _audio.id === _id);
  audio.sound.play();

  audios[audioIndex].playing = true;

  dispatch({ type: TOGGLE_PLAY_AUDIO, payload: audios });
};

/**
 * Fires when an audio is downloaded and is ready to be played
 *
 * @param {String} id
 * @param {Object} sound
 * @param {Object} settings
 * @return {Function}
 */
const jingleLoaded = (id, sound, settings) => (dispatch, getState) => {
  const audios = [...getState().audio.audios];
  const audioIndex = audios.findIndex(_audio => _audio.id === id);

  audios[audioIndex] = {
    id,
    sound,
    settings,
    playing: true,
    loading: false,
  };

  playWithDelay(sound, settings);
  dispatch({ type: AUDIO_LOADED, payload: audios });
};

/**
 * Creates new audio object for jingle and menages audio states
 *
 * @param {String} id
 * @param {Array} settings
 * @param {Array} sampleTypes
 * @return {Function}
 */
export const loadJingle = (id, settings, sampleTypes) => async (dispatch) => {
  dispatch({ type: ADD_NEW_AUDIO, payload: { id } });

  let delays = settings.slice(5, 11);
  delays = delays.map(d => parseInt(d, 10));

  const sampleSrcs = getSourcesForJingle(sampleTypes, settings);

  dispatch(toggleAudioLoading(id, true));

  const sound = await getSoundForJingle(sampleSrcs, delays, () => { dispatch(toggleAudioPlaying(id, false)); });

  dispatch(jingleLoaded(id, sound, settings));
};

/**
 * Fires when user clicks play button on jingle
 *
 * @param {String} id
 * @param {Array} settings
 * @param {Array} sampleTypes
 * @return {Function}
 */
export const playJingle = (id, settings, sampleTypes) => (dispatch, getState) => {
  const audios = [...getState().audio.audios];
  const audioIndex = audios.findIndex(_audio => _audio.id === id);

  if (audioIndex === -1) return dispatch(loadJingle(id, settings, sampleTypes));

  const audio = audios.find(_audio => _audio.id === id);
  playWithDelay(audio.sound, audio.settings);

  audios[audioIndex].playing = true;

  dispatch({ type: TOGGLE_PLAY_AUDIO, payload: audios });
};
