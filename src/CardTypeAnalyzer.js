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

    const distribution = this.getTypeDistribution()

    let count = 0
    permanentTypes.forEach(type => {
      count += distribution[type] || 0
    })
    return count
  }

  getLandCount(){
    const distribution = this.getTypeDistribution()
    return distribution.land || 0
  }
}
