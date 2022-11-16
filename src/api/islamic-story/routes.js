const {
  addDataHandler,
  getAllDatasHandler,
  getDataByIdHandler,
  editDataByIdHandler,
  deleteDataByIdHandler,
} = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/prophets',
    handler: addDataHandler,
  },
  {
    method: 'GET',
    path: '/prophets',
    handler: getAllDatasHandler,
  },
  {
    method: 'GET',
    path: '/prophets/{id}',
    handler: getDataByIdHandler,
  },
  {
    method: 'PUT',
    path: '/prophets/{id}',
    handler: editDataByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/prophets/{id}',
    handler: deleteDataByIdHandler,
  },
];

module.exports = routes;
