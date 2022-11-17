require('dotenv').config();

const Hapi = require('@hapi/hapi');
const stories = require('./api/islamic-story');
const StoriesServices = require('./services/postgres/StroiesService');
const StorysValidator = require('./validator/islamic-story');

const init = async () => {
  const storiesService = new StoriesServices();

  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
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
