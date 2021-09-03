const { execSync } = require('child_process');

// Kick-F, elephant2, crystal-bells-70-bpm, rave-synth, party-people-voco-vox
// const samples = ['70', '88', '7', '27', '54'];
const samplesFiles = ['Kick-F.wav', 'elephant2.wav', 'crystal-bells-70-bpm.wav', 'rave-synth.wav', 'party-people-voco-vox.wav'];
const settings = [
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

  console.log('BLA');
};

const generate = () => {
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

  const singleCommands = samplesFiles.map((fileName, index) => {
    const delay = parseInt(delays[index], 10) / 10;

    return delay ? `"|sox ./audios/out${index}.wav -p pad ${delay}"` : `./audios/out${index}.wav`;
  });

  execSync(`sox -m ${singleCommands[0]} ${singleCommands[1]} ${singleCommands[2]} ${singleCommands[3]} ${singleCommands[4]} ./audios/final.wav`);

  // sox -m "|sox LavaFlowSynth.wav -p pad 2" "|sox HodlOn1.wav -p pad 8" out.wav
  // exec('sox -v 0.1 ../public/LavaFlowSynth.wav ./audios/out.wav trim 0 1.8', handleExec);
};

generate();
