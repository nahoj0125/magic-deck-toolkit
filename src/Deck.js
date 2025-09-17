import Card from './Card.js'
// Represents a magic the gathering deck with 60 cards.
/**
 * Represents a deck of Magic: The Gathering cards.
 * Manages a collection of Card objects
 */
export default class Deck {
  /**
   * Creates a new Magic: The Gathering deck.
   *
   * @param {string}deckName - The name of the deck
   */
  constructor (deckName) {
    this.cards = []
    this.deckName = deckName
  }

  /**
   * Adds a card to the deck.
   *
   * @param {object} card - The card object to be added to the deck with properties (cardName, cardManaCost, cardType, cardColor, cardPowerToughness)
   * @param {number} [quantity=1] - The number of copies of this card to add to the deck, default = 1
   */
  addNewCard (card, quantity = 1) {
    if (this.cards.length + quantity > 60) {
      throw new Error(`$Cannot add ${card}: max size of the deck is 60.`)
    }
    for (let i = 0; i < quantity; i++) {
      const cardToBeAdded = new Card(
        card.cardName,
        card.cardManaCost,
        card.cardType,
        card.cardColor,
        card.cardBattleStats
      )
      this.cards.push(cardToBeAdded)
    }
  }

  /**
   * Removes card by its name from the deck.
   *
   * @param {string} cardToBeRemoved - The card to be removed.
   * @returns {Deck} - The deck with card removed.
   */
  removeCardByName (cardToBeRemoved) {
    const cardNameLowerCase = cardToBeRemoved.toLowerCase()
    this.cards = this.cards.filter(card => card.cardName.toLowerCase() !== cardNameLowerCase)
    return this
  }

  /**
   * Removes all cards from the deck.
   */
  clearDeck () {
    this.cards = []
  }

  /**
   * Gets the total amout of cards.
   *
   * @returns {number} - The total amout of ards in the deck.
   */
  getTotalCards () {
    return this.cards.length
  }

  /**
   * Gets all cards in the deck.
   *
   * @returns {Card[]} - Array containing all cards in the deck.
   */
  getCards () {
    return this.cards
  }
}
