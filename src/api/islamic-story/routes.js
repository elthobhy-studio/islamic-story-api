const routes = (handler) => [
  {
    method: 'POST',
    path: '/prophets',
    handler: handler.postDataHandler,
  },
  {
    method: 'GET',
    path: '/prophets',
    handler: handler.getAllDatasHandler,
  },
  {
    method: 'GET',
    path: '/prophets/{id}',
    handler: handler.getDataByIdHandler,
  },
  {
    method: 'PUT',
    path: '/prophets/{id}',
    handler: handler.putDataByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/prophets/{id}',
    handler: handler.deleteDataByIdHandler,
  },
];

module.exports = routes;
