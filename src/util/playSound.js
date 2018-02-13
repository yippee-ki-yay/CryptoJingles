// PROBLEM WHEN there is less than 5 samples
export const playWithDelay = (group, settings) => {
    let delays = settings.slice(5, 11);
    let startCuts = settings.slice(10, 16);
    let endCuts = settings.slice(15, 21);

    console.log(group.sounds);

    delays = delays.map(d => parseInt(d) / 10);
    startCuts = startCuts.map(d => parseInt(d) / 10);
    endCuts = endCuts.map(d => parseInt(d) / 10);

    for(let i = 0; i < 5; ++i) {
        if (group.sounds[i]) {
            const sound = group.sounds[i];

            sound.play(delays[i], startCuts[i]);

            const length = sound.getRawSourceNode().buffer.duration;

            const whenToStop = (length + delays[i]) - endCuts[i];

            console.log(length, whenToStop);

            setTimeout(() => {
                sound.stop();
            }, whenToStop * 1000);
        }
    }

    // group.sounds.forEach((sound, i) => {
    //   sound.play(delays[i], startCuts[i]);

    //   const length = sound.getRawSourceNode().buffer.duration;

    //   const whenToStop = (length + delays[i]) - endCuts[i];

    //   console.log(length, delays[i], endCuts[i]);

    //   setTimeout(() => {
    //     sound.stop();
    //   }, whenToStop * 1000);

    // });
  }