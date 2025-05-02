const FavoriteList = require("../models/favoriteList.model");
const Movie = require("../models/movie.model");

/**
 * Crée une liste de favoris pour l'utilisateur connecté
 */
const createFavoriteList = async (req, res) => {
  try {
    const userId = req.user.id; // Récupération de l'ID de l'utilisateur connecté

    // Vérifier si l'utilisateur a déjà une liste de favoris
    const existingList = await FavoriteList.findOne({
      where: { userId },
    });

    if (existingList) {
      return res.status(400).json({
        message: "Vous avez déjà une liste de favoris",
      });
    }

    const favoriteList = await FavoriteList.create({
      userId,
      name: req.body.name || "Ma liste de favoris",
    });

    res.status(201).json(favoriteList);
  } catch (error) {
    console.error("Error creating favorite list:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Récupère la liste de favoris de l'utilisateur connecté
 */
const getFavoriteList = async (req, res) => {
  try {
    const userId = req.user.id; // Récupération de l'ID de l'utilisateur connecté

    const favoriteList = await FavoriteList.findOne({
      where: { userId },
      include: [
        {
          model: Movie,
          as: "movies",
        },
      ],
    });

    if (!favoriteList) {
      return res.status(404).json({
        message: "Liste de favoris non trouvée",
      });
    }

    res.json(favoriteList);
  } catch (error) {
    console.error("Error getting favorite list:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Ajoute un film à la liste de favoris de l'utilisateur connecté
 */
const addMovieToFavoriteList = async (req, res) => {
  try {
    const userId = req.user.id; // Récupération de l'ID de l'utilisateur connecté
    const { movieId } = req.params;

    const favoriteList = await FavoriteList.findOne({
      where: { userId },
    });

    if (!favoriteList) {
      return res.status(404).json({
        message: "Liste de favoris non trouvée",
      });
    }

    // Vérifier si le film existe
    const movie = await Movie.findByPk(movieId);
    if (!movie) {
      return res.status(404).json({
        message: "Film non trouvé",
      });
    }

    // Vérifier si le film est déjà dans la liste
    const isInList = await favoriteList.hasMovie(movieId);
    if (isInList) {
      return res.status(400).json({
        message: "Ce film est déjà dans votre liste de favoris",
      });
    }

    await favoriteList.addMovie(movieId);

    res.json({
      message: "Film ajouté à la liste de favoris avec succès",
    });
  } catch (error) {
    console.error("Error adding movie to favorite list:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Supprime un film de la liste de favoris de l'utilisateur connecté
 */
const removeMovieFromFavoriteList = async (req, res) => {
  try {
    const userId = req.user.id; // Récupération de l'ID de l'utilisateur connecté
    const { movieId } = req.params;

    const favoriteList = await FavoriteList.findOne({
      where: { userId },
    });

    if (!favoriteList) {
      return res.status(404).json({
        message: "Liste de favoris non trouvée",
      });
    }

    // Vérifier si le film est dans la liste
    const isInList = await favoriteList.hasMovie(movieId);
    if (!isInList) {
      return res.status(400).json({
        message: "Ce film n'est pas dans votre liste de favoris",
      });
    }

    await favoriteList.removeMovie(movieId);

    res.json({
      message: "Film supprimé de la liste de favoris avec succès",
    });
  } catch (error) {
    console.error("Error removing movie from favorite list:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createFavoriteList,
  getFavoriteList,
  addMovieToFavoriteList,
  removeMovieFromFavoriteList,
};
