/**
 * Represents a Magic: The Gathering card with validation for all properties.
 * Example of a card {"Lighning Bolt", "R", "Instant", "R", ""}
 */
export default class Card {
  /**
   * Creates a new Magic: The Gathering card.
   *
   * @param {string} cardName - The name of the card (letters, numbers, spaces, commas, apostrophes, hyphens only)
   * @param {string} cardManaCost - The mana cost using MTG notation (X, W, U, B, R, G, 0-9)
   * @param {string} cardType - The card type (instant, sorcery, creature, enchantment, land, artifact, planeswalker)
   * @param {string} cardColor - The card color(s) (white, blue, black, red, green, colorless  or a combination e.g. white green)
   * @param {string} cardBattleStats - Power/toughness for creatures only, in format "power/toughness" (e.g., "2/2"), empty string for non-creatures
   */
  constructor (cardName, cardManaCost, cardType, cardColor, cardBattleStats) {
    this.cardName = this.#validateCardName(cardName)
    this.cardManaCost = this.#validateManaCost(cardManaCost)
    this.cardType = this.#validateCardType(cardType)
    this.cardColor = this.#validateCardColors(cardColor)
    this.cardBattleStats = this.#validateCardBattleStats(cardBattleStats)
  }

  /**
   * Validates and normalizes the card name.
   *
   * @private
   * @param {string} cardName - The card name to validate
   * @returns {string} The normalized card name (trimmed and lowercase)
   */
  #validateCardName (cardName) {
    const validNamePattern = /^[A-Za-z0-9\s,'-]+$/

    if (!cardName || cardName.trim() === '') {
      throw new Error('Card name cannot be empty or just whitespace.')
    }

    if (!validNamePattern.test(cardName)) {
      throw new Error(`Invalid name: ${cardName}. Must contain only letters, numbers, spaces, commas, apostrophes and hyphens`)
    }

    return cardName.trim().toLowerCase()
  }

  /**
   * Validates the mana cost using Magic: The Gathering notation.
   *
   * @private
   * @param {string} cardManaCost - The mana cost to validate
   * @returns {string} The original mana cost if valid
   */
  #validateManaCost (cardManaCost) {
    const validcardManaCosts = /^[XWUBRG0-9]*$/
    const normalizedcardManaCost = cardManaCost.toUpperCase()

    if (!validcardManaCosts.test(normalizedcardManaCost)) {
      throw new Error(`Invalid mana cost: ${cardManaCost}. Must contain only: X, W, U, B, R, G, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, ''`)
    }

    return cardManaCost
  }

  /**
   * Validates and normalizes the card type.
   *
   * @private
   * @param {string} cardType - The card type to validate
   * @returns {string} The normalized card type
   */
  #validateCardType (cardType) {
    const validCardTypes = ['instant', 'sorcery', 'creature', 'enchantment', 'land', 'artifact', 'planeswalker']
    const normalizedType = cardType.toLowerCase()

    if (!validCardTypes.includes(normalizedType)) {
      throw new Error(`Invalid card type: ${cardType}. Must be one of: ${validCardTypes.join(', ')}`)
    }

    return normalizedType
  }

  /**
   * Validates and processes card colors (supports multiple colors).
   *
   * @private
   * @param {string} cardColor - Space-separated color names
   * @returns {string[]} Array of normalized color names
   */
  #validateCardColors (cardColor) {
    const validCardColors = ['white', 'blue', 'black', 'red', 'green', 'colorless']

    const colors = cardColor.toLowerCase().split(' ')
      .map(color => color.trim())

    for (const color of colors) {
      if (!validCardColors.includes(color)) {
        throw new Error(`Invalid card color: ${cardColor}. Must be one of: ${validCardColors.join(', ')}`)
      }
    }
    return colors
  }

  /**
   * Validates creature battle stats (power/toughness) or returns empty array for non-creatures.
   *
   * @private
   * @param {string} cardBattleStats - Power/toughness in format "power/toughness"
   * @returns {string[]} Trimmed battle stats string for creatures, empty array for non-creatures
   */
  #validateCardBattleStats (cardBattleStats) {
    if (this.cardType === 'creature') {
      if (!cardBattleStats || cardBattleStats.trim() === '') {
        throw new Error('Creatures must have power/toughness')
      }

      const validBattleStats = /^[\d*X-]+\/[\d*X-]+$/
      if (!validBattleStats.test(cardBattleStats.trim())) {
        throw new Error(`Invalid creature battle stats: ${cardBattleStats}. Must have format "power/toughness"`)
      }

      return cardBattleStats.trim()
    } else {
      return []
    }
  }
}
