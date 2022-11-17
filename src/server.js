const Hapi = require('@hapi/hapi');
const stories = require('./api/islamic-story');
const StoriesServices = require('./services/inMemory/StroiesServices');
const StorysValidator = require('./validator/islamic-story');

const init = async () => {
  const storiesService = new StoriesServices();

  const server = Hapi.server({
    port: 5000,
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register({
    plugin: stories,
    options: {
      service: storiesService,
      validator: StorysValidator,
    },
  });

  await server.start();
  console.log(`server berjalan pada ${server.info.uri}`);
};

init();
