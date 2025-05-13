/**
 * Interface pour le service des personnages
 */
class ICharacterService {
  async getAllCharacters() {
    throw new Error(
      "Méthode abstraite getAllCharacters() doit être implémentée"
    );
  }

  async getCharacterById(id) {
    throw new Error(
      "Méthode abstraite getCharacterById() doit être implémentée"
    );
  }

  async getCharacterBySlug(slug) {
    throw new Error(
      "Méthode abstraite getCharacterBySlug() doit être implémentée"
    );
  }

  async createCharacter(characterData) {
    throw new Error(
      "Méthode abstraite createCharacter() doit être implémentée"
    );
  }

  async updateCharacter(id, characterData) {
    throw new Error(
      "Méthode abstraite updateCharacter() doit être implémentée"
    );
  }

  async deleteCharacter(id) {
    throw new Error(
      "Méthode abstraite deleteCharacter() doit être implémentée"
    );
  }
}

module.exports = ICharacterService;
