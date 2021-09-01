const serverConfig = require('./createConfigServer');
const createFileRenderer = require('./createFileRenderer');

const config = serverConfig.create(5 + 1 + 10 + 3 + 8);

createFileRenderer(config);
