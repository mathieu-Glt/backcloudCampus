const IUserRepository = require("../interfaces/IUserRepository");
const { User } = require("../models/user.model");

class UserRepository extends IUserRepository {
  async findAll(options) {
    return await User.findAll(options);
  }

  async findByPk(id, options) {
    return await User.findByPk(id, options);
  }

  async findOne(options) {
    return await User.findOne(options);
  }

  async create(data) {
    return await User.create(data);
  }

  async update(data, options) {
    return await User.update(data, options);
  }

  async destroy(options) {
    return await User.destroy(options);
  }
}

module.exports = UserRepository;
