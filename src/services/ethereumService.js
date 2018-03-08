import { getJingleMetadata } from '../constants/getMockData';

export const parseSamples = (samples) => {
  const mySamples = [];

  for (let i = 0; i < samples.length; i += 2) {
    const id = parseInt(samples[i].valueOf(), 10);
    const jingleType = parseInt(samples[i + 1].valueOf(), 10);

    mySamples.push({
      id,
      jingleType,
      ...getJingleMetadata(jingleType),
    });
  }

  return mySamples;
};

/**
 * Hashes array of intiger sample ids
 *
 * @param {Array} samples
 */
export const checkIfJingleUnique = samples =>
  new Promise(async (resolve) => {
    const samplesHash = window.web3.utils.keccak256(samples);
    const res = await window.jingleContract.uniqueJingles(samplesHash);
    resolve(res);
  });

export const getSamplesFromContract = address =>
  new Promise(async (resolve) => {
    const samples = parseSamples(await window.samplesContract.getAllSamplesForOwner(address));
    resolve(samples);
  });
