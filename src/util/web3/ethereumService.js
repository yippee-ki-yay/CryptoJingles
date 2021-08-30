import { getJingleMetadata } from '../../constants/getMockData';

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

export const getSamples = async (address) => {
  const data = await window.samplesContract.getAllSamplesForOwner(address);
  return parseSamples(data);
};
