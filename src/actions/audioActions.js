import { TOGGLE_PLAY_AUDIO, TOGGLE_AUDIO_LOADING, ADD_NEW_AUDIO, AUDIO_LOADED } from '../constants/actionTypes';
import { getSoundFromSource } from '../services/audioService';

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
const audioLoaded = (id, sound, source) => (dispatch, getState) => {
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
 * Creates new audio object and menages audio states
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

  dispatch(audioLoaded(id, sound, source));
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
