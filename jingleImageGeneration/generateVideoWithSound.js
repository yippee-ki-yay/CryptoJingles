const { execSync } = require('child_process');

// brew install ffmpeg

const repoPath = require('./path');

module.exports = (version, jingleId) => {
  const fileName = `v${version}_${jingleId}`;

  execSync(`ffmpeg -i ${repoPath.path}/jingleImageGeneration/videos/${fileName}.webm -i ${repoPath.path}/jingleImageGeneration/audios/${fileName}.wav -map 0:0 -map 1:0 ${repoPath.path}/public/videosWithSound/${fileName}.webm`);
};
