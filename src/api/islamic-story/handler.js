const ClientError = require('../../exceptions/ClientError');
class StoriesHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postDataHandler = this.postDataHandler.bind(this);
    this.getAllDatasHandler = this.getAllDatasHandler.bind(this);
    this.getDataByIdHandler = this.getDataByIdHandler.bind(this);
    this.putDataByIdHandler = this.putDataByIdHandler.bind(this);
    this.deleteDataByIdHandler = this.deleteDataByIdHandler.bind(this);
  }

  async postDataHandler(request, h) {
    try {
      this._validator.validateStoryPayload(request.payload);
      const { image, name, umur, tempat_diutus, kisah } = request.payload;
      const storyId = await this._service.addStories({ image, name, umur, tempat_diutus, kisah });

      const response = h.response({
        status: 'success',
        message: 'Data berhasil Ditambahkan',
        data: {
          storyId,
        },
      });
      response.code(201);
      return response;
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      //server error
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }
  async getAllDatasHandler() {
    const stories = await this._service.getStories();
    return {
      status: 'success',
      data: {
        stories,
      },
    };
  }
  async getDataByIdHandler(request, h) {
    try {
      const { id } = request.params;
      const story = await this._service.getStoryById(id);
      return {
        status: 'success',
        data: {
          story,
        },
      };
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      //server error
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }
  async putDataByIdHandler(request, h) {
    try {
      this._validator.validateStoryPayload(request.payload);
      const { id } = request.params;
      await this._service.editStoryById(id, request.payload);

      return {
        status: 'success',
        message: 'Story berhasil diperbaharui',
      };
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      //server error
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }
  async deleteDataByIdHandler(request, h) {
    try {
      const { id } = request.params;
      await this._service.deleteStoryById(id);
      return {
        status: 'success',
        message: 'Story Berhasil dihapus',
      };
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      //server error
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }
}

module.exports = StoriesHandler;
