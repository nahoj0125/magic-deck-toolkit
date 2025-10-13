// Represents a analyzer for mana costs on a Magic: the Gathering deck.
export default class ManaAnalyzer {
  /**
   * Creates a new Magic: The Gathering mana analyzer.
   *
   * @param {deck}deck - The name of the deck
   */
  constructor(deck) {
    this.deck = deck
  }

  getManaCurve() {
    const cards = this.deck.cards
    const manaCurve = {}

    cards.forEach((card) => {
      const coloredMana = this.#countColorManaSymbols(card.manaCost)
      const uncoloredMana = this.#countUncoloredManaSymbols(card.manaCost)
      const totalMana = coloredMana + uncoloredMana

      manaCurve[totalMana] = (manaCurve[totalMana] || 0) + 1
    })

    return manaCurve
  }

  // Cards with mana costs:
  // "R" → 1 colored symbol
  // "UU" → 2 colored symbols
  // "10GG" → 2 colored symbols (ignores the "10")
  #countColorManaSymbols(manaCost) {
    const validManaPattern = /[XWUBRG]/g
    const matchesFromManaPattern = manaCost.match(validManaPattern)
    return matchesFromManaPattern ? matchesFromManaPattern.length : 0
  }

  #countUncoloredManaSymbols(manaCost) {
    const numericMatch = manaCost.match(/\d+/)
    return numericMatch ? parseInt(numericMatch[0]) : 0
  }

  getAverageManaCost() {
    // Convert mana curve object to array of [manaValue, occurrenceCount] pairs
    // Example: { 1: 1, 2: 1, 12: 1 } becomes [['1', 1], ['2', 1], ['12', 1]]
    const manaCurve = Object.entries(this.getManaCurve())
    const result = this.#manaCurveReducer(manaCurve)

    return result.sum / result.count
  }

  // Reduces mana curve data to sum and count needed for average calculation
  // Expected input: array of [manaValue, occurrenceCount] pairs
  #manaCurveReducer(manaCurve) {
    return manaCurve.reduce(
      (accumulator, [mana, occurence]) => {
        const manaValue = Number(mana)
        const occurenceCounter = Number(occurence)

        return {
          sum: accumulator.sum + manaValue * occurenceCounter,
          count: accumulator.count + occurenceCounter,
        }
      },
      { sum: 0, count: 0 }
    )
  }

  getColorDistributionOfCards() {
    const colorDistribution = {
      white: 0,
      blue: 0,
      black: 0,
      red: 0,
      green: 0,
      colorless: 0,
    }

    this.#countColorsInDeck(colorDistribution)

    return colorDistribution
  }

  #countColorsInDeck(colorDistribution) {
    for (const card of this.deck.cards) {
      this.#countColorsInCard(card, colorDistribution)
    }
  }

  #countColorsInCard(card, colorDistribution) {
    for (const color of card.color) {
      colorDistribution[color]++
    }
  }

  getManaCurvePercentages() {
    const totalAmountCards = this.deck.cards.length
    const manaCurve = this.getManaCurve()
    const percentages = this.#convertManaCurveToPercentages(manaCurve, totalAmountCards)

    return percentages
  }

  #convertManaCurveToPercentages(manaCurve, totalAmountCards) {
    const percentages = {}
    Object.keys(manaCurve).forEach((cost) => {
      percentages[cost] = Math.round((manaCurve[cost] / totalAmountCards) * 100)
    })
    return percentages
  }
}
