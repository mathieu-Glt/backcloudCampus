const IFavoriteListService = require("../interfaces/IFavoriteListService");

class FavoriteListService extends IFavoriteListService {
  /**
   * @param {Object} favoriteListRepository - Repository pour l'accès aux données des listes de favoris
   */
  constructor(favoriteListRepository) {
    super();

    if (!favoriteListRepository) {
      throw new Error("favoriteListRepository est requis");
    }
    this.favoriteListRepository = favoriteListRepository;
  }

  async getAllFavoriteLists() {
    return await this.favoriteListRepository.findAll();
  }

  async getFavoriteListById(id) {
    return await this.favoriteListRepository.findByPk(id);
  }

  async getFavoriteListByUserId(userId) {
    return await this.favoriteListRepository.findOne({
      where: { userId },
    });
  }

  async createFavoriteList(userId, name = "Ma liste de favoris") {
    // Vérifier si l'utilisateur a déjà une liste de favoris
    const existingList = await this.getFavoriteListByUserId(userId);
    if (existingList) {
      throw new Error("L'utilisateur a déjà une liste de favoris");
    }

    return await this.favoriteListRepository.create({
      userId,
      name,
    });
  }

  async updateFavoriteList(id, name) {
    const favoriteList = await this.getFavoriteListById(id);
    if (!favoriteList) {
      throw new Error("Liste de favoris non trouvée");
    }

    return await this.favoriteListRepository.update(
      { name },
      { where: { id } }
    );
  }

  async deleteFavoriteList(id) {
    const favoriteList = await this.getFavoriteListById(id);
    if (!favoriteList) {
      return false;
    }

    await this.favoriteListRepository.destroy({
      where: { id },
    });
    return true;
  }

  async addMovieToList(favoriteListId, movieId) {
    return await this.favoriteListRepository.addMovie(favoriteListId, movieId);
  }

  async removeMovieFromList(favoriteListId, movieId) {
    return await this.favoriteListRepository.removeMovie(
      favoriteListId,
      movieId
    );
  }
}

module.exports = FavoriteListService;
