/**
 * @fileoverview Contrôleur gérant les opérations de lecture (GET) sur les personnages
 */

const {
  getAllFavorisListes: getAllFavorisListesQuery,
  getFavorisListeById: getFavorisListeByIdQuery,
  getFavorisListeBySlug: getFavorisListeBySlugQuery,
  getFavorisListeByName: getFavorisListeByNameQuery,
} = require("../queries/favoris-liste.queries");

/**
 * Récupère toutes les listes de favoris
 * @async
 * @function getAllFavorisListes
 * @returns {Promise<Array>} Liste de favoris
 * @throws {Error} En cas d'erreur serveur
 */
const getAllFavorisListes = async (req, res) => {
  try {
    const favorisListes = await getAllFavorisListesQuery();
    res.status(200).json(favorisListes);
  } catch (error) {
    console.error("Error fetching favoris listes:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Récupère une liste de favoris par son ID
 * @async
 * @function getFavorisListeById
 * @param {Object} req - Requête Express
 * @param {Object} res - Réponse Express
 * @returns {Promise<Object>} Liste de favoris
 * @throws {Error} En cas d'erreur serveur
 */
const getFavorisListeById = async (req, res) => {
  try {
    const favorisListe = await getFavorisListeByIdQuery(req.params.id);
    res.status(200).json(favorisListe);
  } catch (error) {
    console.error("Error fetching favoris liste:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Ajoute un film à la liste de favoris de l'utilisateur connecté
 * @async
 * @function postFilmInFavorisListe
 * @param {Object} req - Requête Express
 * @param {Object} res - Réponse Express
 * @returns {Promise<Object>} Liste de favoris
 * @throws {Error} En cas d'erreur serveur
 */
const postFilmInFavorisListe = async (req, res) => {
  try {
    const favorisListe = await postFilmInFavorisListeQuery(
      req.params.id,
      req.body.filmId
    );
    res.status(200).json(favorisListe);
  } catch (error) {
    console.error("Error fetching favoris liste:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Supprime un film de la liste de favoris de l'utilisateur connecté
 * @async
 * @function deleteFilmFromFavorisListe
 * @param {Object} req - Requête Express
 * @param {Object} res - Réponse Express
 * @returns {Promise<Object>} Liste de favoris
 * @throws {Error} En cas d'erreur serveur
 */
const deleteFilmFromFavorisListe = async (req, res) => {
  try {
    const favorisListe = await deleteFilmFromFavorisListeQuery(
      req.params.id,
      req.body.filmId
    );
    res.status(200).json(favorisListe);
  } catch (error) {
    console.error("Error fetching favoris liste:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
