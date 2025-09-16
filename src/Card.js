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
   * @param {string} cardPowerToughness - Power/toughness for creatures only, in format "power/toughness" (e.g., "2/2"), empty string for non-creatures
   */
  constructor (cardName, cardManaCost, cardType, cardColor, cardPowerToughness) {
    this.cardName = this.#processCardName(cardName)
    this.cardManaCost = this.#processManaCost(cardManaCost)
    this.cardType = this.#processCardType(cardType)
    this.cardColor = this.#processCardColors(cardColor)
    this.cardPowerToughness = this.#processcardpowerToughness(cardPowerToughness)
  }

  /**
   * Processes the card name.
   *
   * @param {string} cardName - The card name to process
   * @returns {string} the processed card name
   */
  #processCardName (cardName) {
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
   * Processes the mana cost using Magic: The Gathering notation.
   *
   * @private
   * @param {string} cardManaCost - The mana cost to validate
   * @returns {string} The original mana cost if valid
   */
  #processManaCost (cardManaCost) {
    const validManaPattern = /^[XWUBRG0-9]*$/
    const normalizedcardManaCost = cardManaCost.toUpperCase()

    if (!validManaPattern.test(normalizedcardManaCost)) {
      throw new Error(`Invalid mana cost: ${cardManaCost}. Must contain only: X, W, U, B, R, G, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, ''`)
    }

    return cardManaCost
  }

  /**
   * Processes the card type.
   *
   * @private
   * @param {string} cardType - The card type to validate
   * @returns {string} The normalized card type
   */
  #processCardType (cardType) {
    const validCardTypes = ['instant', 'sorcery', 'creature', 'enchantment', 'land', 'artifact', 'planeswalker']
    const normalizedType = cardType.toLowerCase()

    if (!validCardTypes.includes(normalizedType)) {
      throw new Error(`Invalid card type: ${cardType}. Must be one of: ${validCardTypes.join(', ')}`)
    }

    return normalizedType
  }

  /**
   * Processes card colors (supports multiple colors).
   *
   * @private
   * @param {string} cardColor - Space-separated color names
   * @returns {string[]} Array of normalized color names
   */
  #processCardColors (cardColor) {
    const validCardColors = ['white', 'blue', 'black', 'red', 'green', 'colorless']

    const colorArray = cardColor.toLowerCase().split(' ')
      .map(color => color.trim())

    for (const color of colorArray) {
      if (!validCardColors.includes(color)) {
        throw new Error(`Invalid card color: ${cardColor}. Must be one of: ${validCardColors.join(', ')}`)
      }
    }
    return colorArray
  }

  /**
   * Processes creature battle stats (power/toughness) or returns empty string for non-creatures.
   *
   * @private
   * @param {string} cardPowerToughness - Power/toughness in format "power/toughness"
   * @returns {string} Trimmed battle stats string for creatures
   */
  #processcardpowerToughness (cardPowerToughness) {
    if (this.cardType === 'creature') {
      if (!cardPowerToughness || cardPowerToughness.trim() === '') {
        throw new Error('Creatures must have power/toughness')
      }

      const validBattleStats = /^[\d*X-]+\/[\d*X-]+$/
      if (!validBattleStats.test(cardPowerToughness.trim())) {
        throw new Error(`Invalid creature battle stats: ${cardPowerToughness}. Must have format "power/toughness"`)
      }

      return cardPowerToughness.trim()
    } else {
      return ''
    }
  }
}
