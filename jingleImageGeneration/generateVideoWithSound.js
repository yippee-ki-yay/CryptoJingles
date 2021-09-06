const { execSync } = require('child_process');

// brew install ffmpeg

module.exports = (version, jingleId) => {
  const fileName = `v${version}_${jingleId}`;

  execSync(`ffmpeg -i ./videos/${fileName}.webm -i ./audios/${fileName}.wav -map 0:0 -map 1:0 ./videosWithSound/${fileName}.webm`);
};
