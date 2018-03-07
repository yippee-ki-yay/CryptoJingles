import update from 'immutability-helper';
import { Sound, Group } from 'pizzicato';
import {
  UPDATE_VOLUME, UPDATE_DELAY, UPDATE_CUTS, SET_COMPOSE_SAMPLES, SAMPLE_SORTING_OPTIONS, SET_COMPOSE_SELECTED_SORT,
  HANDLE_SAMPLE_DROP, HANDLE_SAMPLE_DROP_CANCEL, TOGGLE_LOADING_NEW_JINGLE, SET_NEW_JINGLE_GROUP,
  TOGGLE_NEW_JINGLE_PLAYING, SET_NEW_JINGLE_NAME,
} from '../constants/actionTypes';
import { playWithDelay, createSettings, getLongestSoundFromSources } from '../services/audioService';
import { getSamplesFromContract } from '../services/ethereumService';
import { addPendingTx, removePendingTx } from '../actions/appActions';
import { guid } from '../services/generalService';

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
  const composeState = getState().compose;
  const droppedSampleIds = [...composeState.droppedSampleIds];

  if (composeState.sampleSlots[index].lastDroppedItem) {
    const lastItemId = composeState.sampleSlots[index].lastDroppedItem.id;
    const boxIndex = droppedSampleIds.findIndex(_id => _id === lastItemId);
    droppedSampleIds.splice(boxIndex, 1);
  }

  let compose = { ...getState().compose };

  compose = update(compose, { droppedSampleIds: { $set: droppedSampleIds } });
  compose = update(compose, {
    sampleSlots: { [index]: { lastDroppedItem: { $set: item } } },
    droppedSampleIds: { $push: [item.id] },
  });

  dispatch({ type: HANDLE_SAMPLE_DROP, payload: compose });
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
 * Downloads sound samples fromm IPFS and
 * creates a pizzicato group that goes to the state
 *
 */
const loadComposeSamplesGroup = onSampleGroupLoad => (dispatch, getState) => {
  const {
    sampleSlots, composeSamples, delays, volumes,
  } = getState().compose;

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
    const longestSound = getLongestSoundFromSources(sources, delays);

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
  const {
    delays, volumes, cuts, newJingleSampleGroup, sampleSlots,
  } = compose;
  const settings = createSettings(delays, volumes, cuts);

  playWithDelay(newJingleSampleGroup, settings, sampleSlots);
  dispatch({ type: TOGGLE_NEW_JINGLE_PLAYING, payload: true });
};

/**
 * Fires when the user clicks on the compose page
 * play button
 *
 * @return {Function}
 */
export const playNewJingle = () => (dispatch) => {
  dispatch(loadComposeSamplesGroup(() => { dispatch(onNewJingleGroupLoad()); }));
};

/**
 * Fires when the user edits the jingle name input
 *
 * @param {Object} event
 * @return {Function}
 */
export const handleNewJingleNameChange = event => (dispatch) => {
  const val = event.target.value;
  if (val > 30) return;
  dispatch({ type: SET_NEW_JINGLE_NAME, payload: val });
};

/**
 * Fires when the user has 5 samples in sample slots
 * and submits the compose jingle button
 *
 * @return {Function}
 */
export const createNewJingle = () => async (dispatch, getState) => {
  const pendingTxId = guid();
  const { compose, app } = getState();
  const {
    composeSamples, droppedSampleIds, delays, volumes, cuts, newJingleName,
  } = compose;
  const { address } = app;

  if (droppedSampleIds.length !== 5) return; // TODO - show message in the  UI instead of return

  const settings = createSettings(delays, volumes, cuts);
  const selectedSongSources = composeSamples.filter(({ id }) => droppedSampleIds.find(sId => id === sId) === id);

  try {
    dispatch(addPendingTx(pendingTxId, 'Compose jingle'));

    await window.contract.composeJingle(newJingleName, selectedSongSources, settings, { from: address });

    dispatch(getComposeSamples(address));
    dispatch(removePendingTx(pendingTxId));
  } catch (err) {
    dispatch(removePendingTx(pendingTxId));
  }
};

/**
 * Checks if a sample is inside one of the JingleSlot components
 *
 * @param {Number} sampleId
 * @returns {Boolean}
 */
export const isSampleDropped = sampleId => (dispatch, getState) =>
  getState().compose.droppedSampleIds.indexOf(sampleId) > -1;
