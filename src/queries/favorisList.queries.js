const { FavoriteList } = require("../models/favoriteList.model");
const { Op, fn } = require("sequelize");

const getFavorisListeByIdQuery = async (id) => {
  try {
    return await FavoriteList.findByPk(id);
  } catch (error) {
    console.error("Error in getFavorisListeById:", error);
    throw error;
  }
};

const postFilmInFavorisListeQuery = async (id, filmId) => {
  try {
    return await FavoriteList.create({
      userId: id,
      movieId: filmId,
    });
  } catch (error) {
    console.error("Error in postFilmInFavorisListe:", error);
    throw error;
  }
};

const deleteFilmFromFavorisListeQuery = async (id, filmId) => {
  try {
    return await FavoriteList.destroy({
      where: { id, movieId: filmId },
    });
  } catch (error) {
    console.error("Error in deleteFilmFromFavorisListe:", error);
    throw error;
  }
};

module.exports = {
  getFavorisListeByIdQuery,
  postFilmInFavorisListeQuery,
  deleteFilmFromFavorisListeQuery,
};
