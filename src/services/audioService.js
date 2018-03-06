import Pizzicato from 'pizzicato';
import { getJingleMetadata } from '../constants/getMockData';

const defaultSamplePos = [
  { lastDroppedItem: true },
  { lastDroppedItem: true },
  { lastDroppedItem: true },
  { lastDroppedItem: true },
  { lastDroppedItem: true },
];

export const playWithDelay = (group, settings, samplesPos = defaultSamplePos) => {
  let delays = settings.slice(5, 11);
  let startCuts = settings.slice(10, 16);
  let endCuts = settings.slice(15, 21);

  delays = delays.map(d => parseInt(d, 10) / 10);
  startCuts = startCuts.map(d => parseInt(d, 10) / 10);
  endCuts = endCuts.map(d => parseInt(d, 10) / 10);

  let longest = 0;

  let soundIndex = 0;
  let longestSound = null;

  for (let i = 0; i < 5; i += 1) {
    if (samplesPos[i].lastDroppedItem) {
      const sound = group.sounds[soundIndex];

      sound.play(delays[i], startCuts[i]);

      const length = sound.getRawSourceNode().buffer.duration;

      let whenToStop = length + delays[i];

      if (startCuts[i] !== 0) {
        whenToStop = (endCuts[i] - startCuts[i]) + delays[i];
      } else if (endCuts[i] !== 0) {
        whenToStop = ((length) - (length - endCuts[i])) + delays[i];
      }

      if (whenToStop > longest) {
        longest = whenToStop;
        longestSound = sound;
      }

      setTimeout(() => {
        sound.stop();
      }, whenToStop * 1000);

      soundIndex += 1;
    }
  }

  return longestSound;
};

export const createSettings = (_delays, _volumes, _cuts) => {
  let delays = [..._delays];
  let cuts = [..._cuts];
  const volumes = [..._volumes];

  delays = delays.map(d => d * 10);
  cuts = cuts.map(c => c * 10);

  return [...volumes, ...delays, ...cuts];
};

/**
 * Returns loaded Pizzicato sound object
 *
 * @return {Object}
 */
export const getSoundFromSource = source =>
  new Promise((resolve) => {
    const sound = new Pizzicato.Sound(source, () => {
      resolve(sound);
    });
  });

/**
 * Returns array of promises for sample sounds
 *
 * @return {Array}
 */
export const getSourcesForJingle = (sampleTypes, settings) =>
  sampleTypes.map((sampleType, i) =>
    new Promise((resolve) => {
      const sound = new Pizzicato.Sound(getJingleMetadata(sampleType).source, () => { resolve(sound); });
      sound.volume = parseInt(settings[i], 10) / 100;
    }));

/**
 * Returns pizzicato sound object for samples
 *
 * @param {Array} sampleSrcs
 * @param {Array} delays
 * @param {Function} onStop
 * @return {Object}
 */
export const getSoundForJingle = (sampleSrcs, delays, onStop) =>
  new Promise((resolve) => {
    Promise.all(sampleSrcs).then((sources) => {
      const longestSound = sources.reduce((prev, current, i) => ((
        (prev.getRawSourceNode().buffer.duration + delays[i]) >
        (current.getRawSourceNode().buffer.duration) + delays[i]) ?
        prev : current));

      longestSound.on('stop', onStop);
      const sound = new Pizzicato.Group(sources);
      sound.on('stop', onStop);

      resolve(sound);
    });
  });
