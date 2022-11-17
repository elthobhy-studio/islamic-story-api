const StoriesHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'stories',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const storyHandler = new StoriesHandler(service, validator);
    server.route(routes(storyHandler));
  },
};
