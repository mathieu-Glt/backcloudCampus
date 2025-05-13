const ICharacterRepository = require("../interfaces/ICharacterRepository");
const { Character } = require("../models/character.model");

class CharacterRepository extends ICharacterRepository {
  constructor(db) {
    super();
    this.db = db;
  }

  async findAll(options) {
    return await Character.findAll(options);
  }

  async findByPk(id, options) {
    return await Character.findByPk(id, options);
  }

  async findOne(options) {
    return await Character.findOne(options);
  }

  async create(characterData) {
    return await Character.create(characterData);
  }

  async update(data, options) {
    return await Character.update(data, options);
  }

  async destroy(options) {
    return await Character.destroy(options);
  }
}

module.exports = CharacterRepository;
