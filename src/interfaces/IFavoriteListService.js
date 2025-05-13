/**
 * Interface pour le service des listes de favoris
 */
class IFavoriteListService {
  async getAllFavoriteLists() {
    throw new Error(
      "Méthode abstraite getAllFavoriteLists() doit être implémentée"
    );
  }

  async getFavoriteListById(id) {
    throw new Error(
      "Méthode abstraite getFavoriteListById() doit être implémentée"
    );
  }

  async getFavoriteListByUserId(userId) {
    throw new Error(
      "Méthode abstraite getFavoriteListByUserId() doit être implémentée"
    );
  }

  async createFavoriteList(userId, name) {
    throw new Error(
      "Méthode abstraite createFavoriteList() doit être implémentée"
    );
  }

  async updateFavoriteList(id, name) {
    throw new Error(
      "Méthode abstraite updateFavoriteList() doit être implémentée"
    );
  }

  async deleteFavoriteList(id) {
    throw new Error(
      "Méthode abstraite deleteFavoriteList() doit être implémentée"
    );
  }

  async addMovieToList(favoriteListId, movieId) {
    throw new Error("Méthode abstraite addMovieToList() doit être implémentée");
  }

  async removeMovieFromList(favoriteListId, movieId) {
    throw new Error(
      "Méthode abstraite removeMovieFromList() doit être implémentée"
    );
  }
}

module.exports = IFavoriteListService;
