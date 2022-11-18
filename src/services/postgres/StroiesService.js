const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const InvariantError = require('../../exceptions/InvariantError');
const mapDBToModel = require('../../utils/index');
const NotFoundError = require('../../exceptions/NotFoundError');

class StoriesService {
  constructor() {
    this._pool = new Pool();
  }

  async addStories({ image, name, umur, tempat_diutus, kisah }) {
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const query = {
      text: 'INSERT INTO story VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING id',
      values: [id, createdAt, updatedAt, image, name, umur, tempat_diutus, kisah],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError('Story gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  async getStories() {
    const result = await this._pool.query('SELECT * FROM story');

    return result.rows.map(mapDBToModel);
  }

  async getStoryById(id) {
    const query = {
      text: 'SELECT * FROM story WHERE id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Story gagal ditemukan');
    }

    return result.rows.map(mapDBToModel)[0];
  }

  async editStoryById(id, { image, name, umur, tempat_diutus, kisah }) {
    const updatedAt = new Date().toISOString();
    const query = {
      text: 'UPDATE story SET image = $1, name = $2, umur = $3, tempat_diutus = $4, kisah = $5, updated_at = $6 WHERE id = $7 RETURNING id',
      values: [image, name, umur, tempat_diutus, kisah, updatedAt, id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Gagal memperbarui story, id tidak ditemukan');
    }
  }

  async deleteStoryById(id) {
    const query = {
      text: 'DELETE FROM story WHERE id = $1 RETURNING id',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Story gagal dihapus, id tidak ditemukan');
    }
  }
}

module.exports = StoriesService;
