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

  getPermanentTypeCardDistribution() {
    const permanentTypes = [
      'creature',
      'enchantment',
      'land',
      'artifact',
      'planeswalker',
    ]

    return this.#countPermanentCards(permanentTypes)
  }

  #countPermanentCards(permanentTypes) {
    let count = 0
    for (const card of this.deck.cards) {
      if (this.#isPermanentType(card, permanentTypes)) {
        count++
      }
    }
    return count
  }

  #isPermanentType(card, permanentTypes) {
    return permanentTypes.includes(card.cardType)
  }

  getLandCount(){
    let count = 0

    for(const card of this.deck.cards) {
      if(this.#isLandType(card)) {
        count++
      }
    }
    return count
  }

  #isLandType(card) {
    return card.cardType == 'land'
  }
}
