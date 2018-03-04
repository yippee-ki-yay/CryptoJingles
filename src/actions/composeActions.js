import update from 'immutability-helper';
import { Sound, Group } from 'pizzicato';
import {
  UPDATE_VOLUME, UPDATE_DELAY, UPDATE_CUTS, SET_COMPOSE_SAMPLES, SAMPLE_SORTING_OPTIONS, SET_COMPOSE_SELECTED_SORT,
  HANDLE_SAMPLE_DROP, HANDLE_SAMPLE_DROP_CANCEL, TOGGLE_LOADING_NEW_JINGLE, SET_NEW_JINGLE_GROUP,
  TOGGLE_NEW_JINGLE_PLAYING,
} from '../constants/actionTypes';
import { playWithDelay, createSettings } from '../util/soundHelper';
import { getSamplesFromContract } from '../util/web3/ethereumService';

/**
 * Fires when user finishes changing the compose volume slider
 *
 * @param {Object} payload { index, volume }
 * @return {Function}
 */
export const updateVolume = payload => (dispatch, getState) => {
  const { compose } = getState();
  const volumes = [...compose.volumes];

  volumes[payload.index] = payload.volume;
  dispatch({ type: UPDATE_VOLUME, payload: volumes });
};

/**
 * Fires when user finishes changing the delay volume slider
 *
 * @param {Object} payload { index, delay }
 * @return {Function}
 */
export const updateDelay = payload => (dispatch, getState) => {
  const { compose } = getState();
  const delays = [...compose.delays];

  delays[payload.index] = payload.delay;
  dispatch({ type: UPDATE_DELAY, payload: delays });
};

/**
 * Fires when user finishes changing the cut sample slider
 *
 * @param {Object} payload { index, cuts: { min, max } }
 * @return {Function}
 */
export const updateCuts = payload => (dispatch, getState) => {
  const { compose } = getState();
  const cuts = [...compose.cuts];

  cuts[payload.index] = payload.cuts.min;
  cuts[payload.index + 5] = payload.cuts.max;

  dispatch({ type: UPDATE_CUTS, payload: cuts });
};

/**
 * Gets samples for address from the contract and sets it in the reducer
 *
 * @param {String} address
 * @return {Function}
 */
export const getComposeSamples = address => async (dispatch) => {
  const payload = await getSamplesFromContract(address);
  dispatch({ type: SET_COMPOSE_SAMPLES, payload });
};

/**
 * Sorts compose samples when the user clicks the
 * Sort by dropdown
 *
 * @param {Object} option
 * @return {Function}
 */
export const onComposeSamplesSort = option => (dispatch, getState) => {
  let { composeSamples, selectedSort } = getState().compose;
  composeSamples = [...composeSamples];

  if (!composeSamples.length) return;

  switch (option.value) {
    case '-rarity': {
      composeSamples = composeSamples.sort((a, b) => b.rarity - a.rarity);
      selectedSort = SAMPLE_SORTING_OPTIONS[0];
      break;
    }
    case 'rarity': {
      composeSamples = composeSamples.sort((a, b) => a.rarity - b.rarity);
      selectedSort = SAMPLE_SORTING_OPTIONS[1];
      break;
    }
    case '-length': {
      composeSamples = composeSamples.sort((a, b) => b.length - a.length);
      selectedSort = SAMPLE_SORTING_OPTIONS[2];
      break;
    }
    case 'length': {
      composeSamples = composeSamples.sort((a, b) => a.length - b.length);
      selectedSort = SAMPLE_SORTING_OPTIONS[3];
      break;
    }
    default:
      break;
  }

  dispatch({ type: SET_COMPOSE_SELECTED_SORT, payload: { selectedSort, composeSamples } });
};

/**
 * Fires when a jingle is dropped into a JingleSlot component
 *
 * @param {Number} index
 * @param {Object} item
 * @return {Function}
 */
export const handleSampleDrop = (index, item) => (dispatch, getState) => {
  const compose = update(getState().compose, {
    sampleSlots: { [index]: { lastDroppedItem: { $set: item } } },
    droppedSampleIds: item.id ? { $push: [item.id] } : {},
  });

  dispatch({ type: HANDLE_SAMPLE_DROP, payload: compose });
};

/**
 * Fires when a jingle is removed from a JingleSlot component
 *
 * @param {Number} index
 * @param {Object} item
 * @return {Function}
 */
export const handleSampleDropCancel = (index, { id }) => (dispatch, getState) => {
  const composeState = getState().compose;
  const droppedSampleIds = [...composeState.droppedSampleIds];

  const boxIndex = droppedSampleIds.findIndex(_id => _id === id);
  droppedSampleIds.splice(boxIndex, 1);

  const compose = update(composeState, {
    sampleSlots: { [index]: { lastDroppedItem: { $set: null } } },
    droppedSampleIds: { $set: droppedSampleIds },
  });

  dispatch({ type: HANDLE_SAMPLE_DROP_CANCEL, payload: compose });
};

/**
 * Stops playing new jingle if the sample group is present
 *
 * @return {Function}
 */
export const stopNewJinglePlaying = () => (dispatch, getState) => {
  const { newJingleSampleGroup } = getState().compose;
  if (!newJingleSampleGroup) return;

  newJingleSampleGroup.stop();
  dispatch({ type: TOGGLE_NEW_JINGLE_PLAYING, payload: false });
};

/**
 * Downloads sound samples fromm IPFS and
 * creates a pizzicato group that goes to the state
 *
 */
const loadComposeSamplesGroup = onSampleGroupLoad => (dispatch, getState) => {
  // CHECK IF THIS IS THE SAME AS IN SINGLE JINGLE
  const { sampleSlots, composeSamples, delays, volumes } = getState().compose;

  let selectedSongSources = sampleSlots.filter(slot => slot.lastDroppedItem !== null);
  selectedSongSources = selectedSongSources.map(({ lastDroppedItem }) =>
    composeSamples.find(sample => lastDroppedItem.id === sample.id));

  dispatch({ type: TOGGLE_LOADING_NEW_JINGLE });

  selectedSongSources = selectedSongSources.map(({ source }, i) =>
    new Promise((resolve) => {
      const sound = new Sound(source, () => {
        sound.volume = volumes[i] / 100;
        resolve(sound);
      });
    }));

  Promise.all(selectedSongSources).then((sources) => {
    const longestSound = sources.reduce((prev, current, i) => ((
      (prev.getRawSourceNode().buffer.duration + delays[i]) >
      (current.getRawSourceNode().buffer.duration) + delays[i]) ?
      prev : current
    ));

    longestSound.on('stop', () => { dispatch({ type: TOGGLE_NEW_JINGLE_PLAYING, payload: false }); });

    dispatch({ type: SET_NEW_JINGLE_GROUP, payload: new Group(sources) });
    dispatch({ type: TOGGLE_LOADING_NEW_JINGLE });

    onSampleGroupLoad();
  });
};

/**
 * Fires when the sources for the new jingle are downloaded
 *
 * @return {Function}
 */
const onNewJingleGroupLoad = () => (dispatch, getState) => {
  const { compose } = getState();
  const { delays, volumes, cuts, newJingleSampleGroup, sampleSlots } = compose;
  const settings = createSettings(delays, volumes, cuts);

  playWithDelay(newJingleSampleGroup, settings, sampleSlots);
  dispatch({ type: TOGGLE_NEW_JINGLE_PLAYING, payload: true });
};

export const playNewJingle = () => (dispatch) => {
  dispatch(loadComposeSamplesGroup(() => { dispatch(onNewJingleGroupLoad()); }));
};
