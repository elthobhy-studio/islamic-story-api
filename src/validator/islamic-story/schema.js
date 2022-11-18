const Joi = require('joi');

const StoryPayloadSchema = Joi.object({
  image: Joi.string().required(),
  name: Joi.string().required(),
  umur: Joi.string().required(),
  tempat_diutus: Joi.string().required(),
  kisah: Joi.string().required(),
});

module.exports = StoryPayloadSchema;
