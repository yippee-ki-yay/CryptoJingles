const serverConfig = require('./createConfigServer');
const createFileRenderer = require('./createFileRenderer');

const config = serverConfig.create(5 + 6 + 10 + 4 + 8);

createFileRenderer(config);
