/**
 * Analyzes the distribution of card types in a Magic: The Gathering deck.
 *
 * Provides methods to count specific card types, calculate ratios between different
 * categories (creatures vs spells), and determine deck archetype based on card type distribution.
 *
 * @example
 * const analyzer = new CardTypeAnalyzer(myDeck)
 * const distribution = analyzer.getTypeDistribution()
 * const deckType = analyzer.getTypeOfDeck(analyzer.getCreatureToSpellRatio())
 */
export default class CardTypeAnalyzer {
  constructor(deck) {
    this.deck = deck
  }

  /**
   * Gets the count of each card in the deck.
   *
   * @returns {Object} Object with card types as keys and counts as values
   * @example { creature: 12, instant: 6, sorcery: 6, land: 24 }
   */
  getTypeDistribution() {
    const cards = this.deck.cards
    const cardTypeDistribution = {}

    cards.forEach((card) => {
      const cardType = card.cardType
      cardTypeDistribution[cardType] = (cardTypeDistribution[cardType] || 0) + 1
    })

    return cardTypeDistribution
  }

  getLandCount() {
    const distribution = this.getTypeDistribution()
    return distribution.land || 0
  }

  getCreatureCount() {
    const distribution = this.getTypeDistribution()
    return distribution.creature || 0
  }

  getInstantCount() {
    const distribution = this.getTypeDistribution()
    return distribution.instant || 0
  }

  getSorceryCount() {
    const distribution = this.getTypeDistribution()
    return distribution.sorcery || 0
  }

  getArtifactCount() {
    const distribution = this.getTypeDistribution()
    return distribution.artifact || 0
  }

  getEnchantmentCount() {
    const distribution = this.getTypeDistribution()
    return distribution.enchantment || 0
  }

  getPlaneswalkerCount() {
    const distribution = this.getTypeDistribution()
    return distribution.planeswalker || 0
  }

  /**
   * Gets the count of cards that remains on the battlefield when played.
   *
   * @returns {number} Total amout of permanent cards.
   */
  getPermanentTypeCardCount() {
    const permanentTypes = [
      'creature',
      'enchantment',
      'land',
      'artifact',
      'planeswalker',
    ]
    const distribution = this.getTypeDistribution()
    let count = 0

    permanentTypes.forEach((type) => {
      count += distribution[type] || 0
    })
    return count
  }

  /**
   * Gets the count of with one-time effects when played.
   *
   * @returns {number} Total amout of temporary spell cards.
   */
  getTemporarySpellsCount() {
    const temporarySpells = ['instant', 'sorcery']
    const distribution = this.getTypeDistribution()
    let count = 0

    temporarySpells.forEach((type) => {
      count += distribution[type] || 0
    })

    return count
  }

  /**
   * Calculates the ratio of creatures to temporary spells.
   *
   * @returns {number} Ratio of creature to temporary spells.
   * @example 2 creatures / 2 temporary spells = 1
   */
  getCreatureToSpellRatio() {
    const creatures = this.getCreatureCount()
    const temporarySpells = this.getTemporarySpellsCount()
    let ratio

    if (temporarySpells == 0) {
      ratio = this.#handleZeroSpells(creatures)
    } else {
      ratio = creatures / temporarySpells
    }

    return Math.round(ratio * 100) / 100
  }

  // Handles division with 0
  #handleZeroSpells(creatures) {
    if (creatures > 0) {
      // Returns a large number to trigger getTypeOfDeck()
      return 999
    } else {
      return 0
    }
  }

  /**
   * Determines deck archetype based on creature-to-spell ratio.
   * @param {number} creatureToSpellRatio - The ratio from getCreatureToSpellRatio()
   * @returns {string} The deck's archetype: 'aggressive', 'control', 'midrange', or 'undecided'
   */
  getTypeOfDeck(creatureToSpellRatio) {
    if (this.#isDeckAggressive(creatureToSpellRatio)) {
      return 'aggressive'
    } else if (this.#isDeckControl(creatureToSpellRatio)) {
      return 'control'
    } else if (this.#isDeckMidrange(creatureToSpellRatio)) {
      return 'midrange'
    }
    return 'undecided'
  }

  // The deck has many creatures -> deck is aggressive
  #isDeckAggressive(creatureToSpellRatio) {
    return creatureToSpellRatio > 1.5
  }

  // The deck has many spells -> deck is contol
  #isDeckControl(creatureToSpellRatio) {
    return creatureToSpellRatio < 0.8
  }

  // The deck has a balance of creatures and spells -> deck is midrange
  #isDeckMidrange(creatureToSpellRatio) {
    return creatureToSpellRatio >= 0.8 && creatureToSpellRatio <= 1.5
  }
}
