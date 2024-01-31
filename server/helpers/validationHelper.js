const Joi = require("joi");
const Boom = require("boom");

const idValidation = (data) => {
  const schema = Joi.object({
    id: Joi.string().required().description("User id, i.e. john-1"),
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

const createUserValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string()
      .required()
      .description("User username, i.e. JohnDoe"),
    password: Joi.string()
      .required()
      .description("User password, i.e. JohnDoe123"),
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

const createPlaylistValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string()
      .required()
      .description("Playlist name, i.e. Morning Music"),
    user_id: Joi.string().required().description("User id, i.e. john-1"),
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

module.exports = {
  idValidation,
  createUserValidation,
  createPlaylistValidation,
};
