// PROBLEM WHEN there is less than 5 samples
export const playWithDelay = (group, settings) => {
    let delays = settings.slice(5, 11);
    let startCuts = settings.slice(10, 16);
    let endCuts = settings.slice(15, 21);

    delays = delays.map(d => parseInt(d) / 10);
    startCuts = startCuts.map(d => parseInt(d) / 10);
    endCuts = endCuts.map(d => parseInt(d) / 10);

    for(let i = 0; i < 5; ++i) {
        if (group.sounds[i]) {
            const sound = group.sounds[i];

            sound.play(delays[i], startCuts[i]);

            const length = sound.getRawSourceNode().buffer.duration;

            let whenToStop = length + delays[i];

            if (startCuts[i] !== 0) {
                whenToStop = (endCuts[i] - startCuts[i]) + delays[i];
            } else if (endCuts[i] !== 0) {
                whenToStop = ((length) - (length - endCuts[i])) + delays[i];
            }
            
            setTimeout(() => {
                sound.stop();
            }, whenToStop * 1000);
        }
    }
  }

  export const createSettings = (props) => {
    let { volumes, delays, cuts } = props;

    delays = delays.map(d => d * 10);
    cuts = cuts.map(c => c * 10);

    return [...volumes, ...delays, ...cuts];
  }