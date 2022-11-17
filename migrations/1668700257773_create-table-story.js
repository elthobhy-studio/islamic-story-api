/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.createTable('story', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    created_at: {
      type: 'TEXT',
      notNull: true,
    },
    updated_at: {
      type: 'TEXT',
      notNull: true,
    },
    image: {
      type: 'TEXT',
      notNull: true,
    },
    name: {
      type: 'TEXT',
      notNull: true,
    },
    umur: {
      type: 'TEXT',
      notNull: true,
    },
    tempat_diutus: {
      type: 'TEXT',
      notNull: true,
    },
    kisah: {
      type: 'TEXT',
      notNull: true,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('story');
};
