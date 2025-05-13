const ICharacterService = require("../interfaces/ICharacterService");

class CharacterService extends ICharacterService {
  /**
   * @param {Object} characterRepository - Repository pour l'accès aux données des personnages
   */
  constructor(characterRepository) {
    super();

    if (!characterRepository) {
      throw new Error("characterRepository est requis");
    }
    this.characterRepository = characterRepository;
  }

  async getAllCharacters() {
    return await this.characterRepository.findAll({
      include: ["movies"], // Inclure les films associés
    });
  }

  async getCharacterById(id) {
    return await this.characterRepository.findByPk(id, {
      include: ["movies"],
    });
  }

  async getCharacterBySlug(slug) {
    return await this.characterRepository.findOne({
      where: { slug },
      include: ["movies"],
    });
  }

  async createCharacter(characterData) {
    // Validation des données
    if (!characterData.firstName || !characterData.lastName) {
      throw new Error("Le prénom et le nom sont requis");
    }

    // Génération du slug
    const slug = `${characterData.firstName}-${characterData.lastName}`
      .toLowerCase()
      .replace(/ /g, "-");

    return await this.characterRepository.create({
      ...characterData,
      slug,
    });
  }

  async updateCharacter(id, characterData) {
    const character = await this.getCharacterById(id);
    if (!character) {
      throw new Error("Personnage non trouvé");
    }

    // Mise à jour du slug si le nom ou prénom change
    if (characterData.firstName || characterData.lastName) {
      const firstName = characterData.firstName || character.firstName;
      const lastName = characterData.lastName || character.lastName;
      characterData.slug = `${firstName}-${lastName}`
        .toLowerCase()
        .replace(/ /g, "-");
    }

    return await this.characterRepository.update(characterData, {
      where: { id },
    });
  }

  async deleteCharacter(id) {
    const character = await this.getCharacterById(id);
    if (!character) {
      return false;
    }

    await this.characterRepository.destroy({
      where: { id },
    });
    return true;
  }
}

module.exports = CharacterService;
