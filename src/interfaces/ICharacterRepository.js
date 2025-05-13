/**
 * Interface pour le repository des personnages
 */
class ICharacterRepository {
  async findAll(options) {
    throw new Error("Méthode abstraite findAll() doit être implémentée");
  }

  async findByPk(id, options) {
    throw new Error("Méthode abstraite findByPk() doit être implémentée");
  }

  async findOne(options) {
    throw new Error("Méthode abstraite findOne() doit être implémentée");
  }

  async create(data) {
    throw new Error("Méthode abstraite create() doit être implémentée");
  }

  async update(data, options) {
    throw new Error("Méthode abstraite update() doit être implémentée");
  }

  async destroy(options) {
    throw new Error("Méthode abstraite destroy() doit être implémentée");
  }
}

module.exports = ICharacterRepository;
