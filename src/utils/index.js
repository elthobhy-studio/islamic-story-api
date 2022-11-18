const mapDBToModel = ({ id, created_at, updated_at, image, name, umur, tempat_diutus, kisah }) => ({
  id,
  createdAt: created_at,
  updatedAt: updated_at,
  image,
  name,
  umur,
  tempat_diutus,
  kisah,
});

module.exports = mapDBToModel;
