const InvariantError = require('../../exceptions/InvariantError');
const StoryPayloadSchema = require('./schema');

const StorysValidator = {
  validateStoryPayload: (payload) => {
    const validationResult = StoryPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = StorysValidator;
