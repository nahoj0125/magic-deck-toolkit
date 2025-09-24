export default class CardTypeAnalyzer {
  constructor(deck) {
    this.deck = deck
  }

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

  getTemporarySpellsCount() {
    const temporarySpells = ['instant', 'sorcery']
    const distribution = this.getTypeDistribution()
    let count = 0

    temporarySpells.forEach((type) => {
      count += distribution[type] || 0
    })

    return count
  }

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

  getTypeOfDeck(creatureToSpellRatio) {
    if (this.#isDeckAggressive(creatureToSpellRatio)) {
      return 'aggressive'
    }

    else if (this.#isDeckControl(creatureToSpellRatio)) {
      return 'control'
    }

    else if (this.#isDeckMidrange(creatureToSpellRatio)) {
      return 'midrange'
    } 
      return 'undecided'
  }

  #isDeckAggressive(creatureToSpellRatio) {
    return creatureToSpellRatio > 1.5
  }
  
  #isDeckControl(creatureToSpellRatio) {
    return creatureToSpellRatio < 0.8
  }

  #isDeckMidrange(creatureToSpellRatio) {
    return creatureToSpellRatio >=0.8 && creatureToSpellRatio <= 1.5
  }
}
