const { execSync } = require('child_process');
const getJingleData = require('./getJingleData');

const DELETE_SINGLE_OUT_FILES = 'find . -name \'out*.wav\' -delete';

const _settings = [
  // volumes
  '50',
  '39',
  '67',
  '71',
  '0',
  // delays
  '0',
  '23',
  '23',
  '56',
  '0',
  // startCuts
  '0',
  '0',
  '0',
  '0',
  '0',
  // endCuts
  '23',
  '0',
  '0',
  '0',
  '0',
];

const handleExec = (error, stdout, stderr) => {
  if (error) {
    console.log(`error: ${error.message}`);
    return;
  }

  if (stderr) console.log(`stderr: ${stderr}`);
};

const generateV0Jingles = (jingleId, samplesFiles) => {
  const singleCommands = samplesFiles.map((fileName, index) => `./audios/out${index}.wav`);
  execSync(`sox -m ${singleCommands[0]} ${singleCommands[1]} ${singleCommands[2]} ${singleCommands[3]} ${singleCommands[4]} ./audios/v0_${jingleId}.wav`);
  execSync(DELETE_SINGLE_OUT_FILES);
};

const generate = (version, jingleId, samplesIds, settings) => {
  // get sample files paths
  const samplesFiles = samplesIds.map((sampleId) => {
    const filePath = getJingleData(sampleId).source;
    return /[^/]*$/.exec(filePath)[0];
  });

  if (version === 0) return generateV0Jingles(jingleId, samplesFiles);

  // split up settings
  const volumes = settings.slice(0, 5);
  const delays = settings.slice(5, 11);
  const startCuts = settings.slice(10, 16);
  const endCuts = settings.slice(15, 21);

  // cut each file and set volume
  samplesFiles.forEach((fileName, index) => {
    const volume = parseInt(volumes[index], 10) / 100;
    const cutStart = parseInt(startCuts[index], 10) / 10;
    const cutEnd = parseInt(endCuts[index], 10) / 10;

    const noCut = cutStart === 0 && cutEnd === 0;

    return execSync(`sox -v ${volume} ../public/${fileName} ./audios/out${index}.wav${noCut ? '' : ` trim ${cutStart} ${cutEnd}`}`);
  }, handleExec);

  // Generate parameters per file for the mix command
  const singleCommands = samplesFiles.map((fileName, index) => {
    const delay = parseInt(delays[index], 10) / 10;

    return delay ? `"|sox ./audios/out${index}.wav -p pad ${delay}"` : `./audios/out${index}.wav`;
  });

  execSync(`sox -m ${singleCommands[0]} ${singleCommands[1]} ${singleCommands[2]} ${singleCommands[3]} ${singleCommands[4]} ./audios/v1_${jingleId}.wav`);
  execSync(DELETE_SINGLE_OUT_FILES);
};

generate(1, 0, [70, 88, 7, 27, 54], _settings);
