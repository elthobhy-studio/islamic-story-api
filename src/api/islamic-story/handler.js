const { nanoid } = require('nanoid');
const datas = require('./data');

const addDataHandler = (request, h) => {
  const { image, name, umur, tempat_diutus, kisah } = request.payload;

  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newData = {
    id,
    createdAt,
    updatedAt,
    image,
    name,
    umur,
    tempat_diutus,
    kisah,
  };

  datas.push(newData);
  const isSuccess = datas.filter((data) => data.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Data Berhasil Ditambahkan',
      data: {
        dataId: id,
      },
    });

    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Data gagal ditambahkan',
  });

  response.code(500);
  return response;
};

const getAllDatasHandler = () => ({
  status: 'success',
  datas: {
    datas,
  },
});

const getDataByIdHandler = (request, h) => {
  const { id } = request.params;

  const data = datas.filter((d) => d.id == id)[0];

  if (data !== undefined) {
    return {
      status: 'success',
      data: {
        data,
      },
    };
  }
  const response = h.response({
    status: 'fail',
    message: 'Data gagal ditemukan',
  });
  response.code(404);
  return response;
};

const editDataByIdHandler = (request, h) => {
  const { id } = request.params;
  const { image, name, umur, tempat_diutus, kisah } = request.payload;
  const updatedAt = new Date().toISOString();

  const index = datas.findIndex((d) => d.id === id);
  if (index !== -1) {
    datas[index] = {
      ...datas[index],
      image,
      name,
      umur,
      tempat_diutus,
      kisah,
      updatedAt,
    };
    const response = h.response({
      status: 'success',
      message: 'Data berhasil diperbarui',
    });

    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal Memperbaharui data, ID tidak ditemukan',
  });
  response.code(404);
  return response;
};

const deleteDataByIdHandler = (request, h) => {
  const { id } = request.params;

  const index = datas.findIndex((d) => d.id === id);

  if (index !== -1) {
    datas.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Data Berhasil dihapus',
    });

    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Data gagal dihapus, ID tidak ditemukan',
  });
  response.code(404);
  return response;
};

module.exports = {
  addDataHandler,
  getAllDatasHandler,
  getDataByIdHandler,
  editDataByIdHandler,
  deleteDataByIdHandler,
};
