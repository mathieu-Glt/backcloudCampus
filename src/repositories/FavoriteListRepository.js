const IFavoriteListRepository = require("../interfaces/IFavoriteListRepository");
const { FavoriteList } = require("../models/favoriteList.model");

class FavoriteListRepository extends IFavoriteListRepository {
  constructor(db) {
    super();
    this.db = db;
  }

  async findAll(options) {
    return await FavoriteList.findAll({
      ...options,
      include: ["movies", "user"],
    });
  }

  async findByPk(id, options) {
    return await FavoriteList.findByPk(id, {
      ...options,
      include: ["movies", "user"],
    });
  }

  async findOne(options) {
    return await FavoriteList.findOne({
      ...options,
      include: ["movies", "user"],
    });
  }

  async create(favoriteListData) {
    return await FavoriteList.create(favoriteListData);
  }

  async update(data, options) {
    return await FavoriteList.update(data, options);
  }

  async destroy(options) {
    return await FavoriteList.destroy(options);
  }

  async addMovie(favoriteListId, movieId) {
    const favoriteList = await this.findByPk(favoriteListId);
    if (!favoriteList) {
      throw new Error("Liste de favoris non trouvée");
    }
    await favoriteList.addMovie(movieId);
    return await this.findByPk(favoriteListId);
  }

  async removeMovie(favoriteListId, movieId) {
    const favoriteList = await this.findByPk(favoriteListId);
    if (!favoriteList) {
      throw new Error("Liste de favoris non trouvée");
    }
    await favoriteList.removeMovie(movieId);
    return await this.findByPk(favoriteListId);
  }
}

module.exports = FavoriteListRepository;
