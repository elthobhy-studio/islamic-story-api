const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class StoriesServices {
  constructor() {
    this._stories = [];
  }

  addStories({ image, name, umur, tempat_diutus, kisah }) {
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const newStories = {
      id,
      createdAt,
      updatedAt,
      image,
      name,
      umur,
      tempat_diutus,
      kisah,
    };

    this._stories.push(newStories);

    const isSuccess = this._stories.filter((s) => s.id === id).length > 0;

    if (!isSuccess) {
      throw new InvariantError('Story gagal ditambahkan');
    }

    return id;
  }

  getStories() {
    return this._stories;
  }

  getStoryById(id) {
    const story = this._stories.filter((s) => s.id === id)[0];
    if (!story) {
      throw new NotFoundError('Story gagal ditemukan');
    }
    return story;
  }

  editStoryById(id, { image, name, umur, tempat_diutus, kisah }) {
    const index = this._stories.findIndex((s) => s.id === id);
    if (index === -1) {
      throw new NotFoundError('Gagal memperbarui story, id tidak ditemukan');
    }
    const updatedAt = new Date().toISOString();

    this._stories[index] = {
      ...this._stories[index],
      updatedAt,
      image,
      name,
      umur,
      tempat_diutus,
      kisah,
    };
  }

  deleteStoryById(id) {
    const index = this._stories.findIndex((s) => s.id === id);

    if (index === -1) {
      throw new NotFoundError('Story gagal dihapus. Id tidak ditemukan');
    }

    this._stories.splice(index, 1);
  }
}

module.exports = StoriesServices;
