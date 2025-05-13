/**
 * Classe de base pour les services de validation
 */
class BaseValidationService {
  /**
   * Vérifie si un email est valide
   * @param {string} email - Email à vérifier
   * @returns {boolean} True si l'email est valide
   */
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Vérifie si une chaîne est vide
   * @param {string} value - Valeur à vérifier
   * @returns {boolean} True si la valeur est vide
   */
  isEmpty(value) {
    return !value || value.trim().length === 0;
  }

  /**
   * Vérifie si une valeur a une longueur minimale
   * @param {string} value - Valeur à vérifier
   * @param {number} minLength - Longueur minimale requise
   * @returns {boolean} True si la valeur a la longueur minimale
   */
  hasMinLength(value, minLength) {
    return value && value.length >= minLength;
  }
}

module.exports = BaseValidationService;
