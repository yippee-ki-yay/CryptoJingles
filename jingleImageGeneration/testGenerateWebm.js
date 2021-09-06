const serverConfig = require('./createConfigServer');
const createFileRenderer = require('./createFileRenderer');

const config = serverConfig.create(0, 0 + 1 + 2 + 3 + 4, 0, true);

createFileRenderer(config);
