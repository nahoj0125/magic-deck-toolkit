/**
 * Represents a Magic: The Gathering card with validation for all properties.
 *
 * @example const card = new Card('lightning Bolt', 'R', 'instant', 'red', '')
 * @example const card = new Card('ghalta, primal hunger', '10GG', 'creature', 'green', '12/12')
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
    this.cardPowerToughness = this.#processCardPowerToughness(cardPowerToughness)
  }

  #processCardName (cardName) {
    // Standard processing: check for empty/whitespace -> extract name -> validate format
    if (this.#isCardNameEmptyOrWhiteSpace(cardName)) {
      throw new Error('Card name cannot be empty or just whitespace.')
    }

    const name = this.#extractName(cardName)
    this.#validateName(name)
    return name
  }

  #isCardNameEmptyOrWhiteSpace(cardName) {
    if (!cardName || cardName.trim() === '') {
      return true
    } else {
      return false
    }
  }

  #extractName (cardName) {
    return cardName.toLowerCase().trim()
  }

  #validateName(cardName) {
    // Allows: letters, numbers, spaces, commas, apostrophes, hyphens
    const validNamePattern = /^[A-Za-z0-9\s,'-]+$/

    if (!validNamePattern.test(cardName)) {
      throw new Error(`Invalid card name: ${cardName}. Must contain only letters, numbers, spaces, commas, apostrophes and hyphens.`)
    }
  }

  #processManaCost (cardManaCost) {
    // Standard processing: extract name -> validate format
    const manaCost = this.#extractManaCost(cardManaCost)
    this.#validateManaCost(manaCost)

    return manaCost
  }

  #extractManaCost (cardManaCost) {
    return cardManaCost.toUpperCase().trim()
  }

  #validateManaCost (cardManaCost) {
    // Allows: X, W, U, B, R, G, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, ''
    const validManaPattern = /^[XWUBRG0-9]*$/

    if (!validManaPattern.test(cardManaCost)) {
      throw new Error(`Invalid mana cost: ${cardManaCost}. Must contain only: X, W, U, B, R, G, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, ''`)
    }
  }

  #processCardType (cardType) {
    // Standard processing: check for empty/whitespace -> extract name -> validate format
    if (this.#isCardTypeEmptyOrWhiteSpace(cardType)) {
      throw new Error('Card type cannot be empty or just whitespace..')
    }

    const type = this.#extractType(cardType)
    this.#validateType(type)

    return type
  }

  #isCardTypeEmptyOrWhiteSpace(cardType) {
    if (!cardType || cardType.trim() === '') {
      return true
    } else {
      return false
    }
  }

  #extractType (cardType) {
    return cardType.toLowerCase().trim()
  }

  #validateType (cardType) {
    const validCardTypes = ['instant', 'sorcery', 'creature', 'enchantment', 'land', 'artifact', 'planeswalker']

    if (!validCardTypes.includes(cardType)) {
      throw new Error (`Invalid card type: ${cardType}. Must be one of ${validCardTypes}`)
    }
  }

  #processCardColors (cardColor) {
    // Standard processing: check for empty/whitespace -> extract name -> validate format
    if (this.#isCardColorEmptyOrWhiteSpace(cardColor)) {
      throw new Error('Card color cannot be empty or just whitespace..')
    }
    const colors = this.#extractColors(cardColor)
    this.#validateColors(colors)

    return colors
  }

  #isCardColorEmptyOrWhiteSpace (cardColor) {
    if (!cardColor || cardColor.trim() === '') {
      return true
    } else {
      return false
    }
  }

  #extractColors (cardColor) {
    // Split on whitespace, trim each color, filter out empty strings
    return cardColor.toLowerCase().split(/\s+/).map(color => color.trim()).filter(color => color.trim())
  }

  #validateColors (colors) {
    const validCardColors = ['white', 'blue', 'black', 'red', 'green', 'colorless']
    const invalidColors = colors.find(color => !validCardColors.includes(color))

    if (invalidColors) {
      throw new Error(`Invalid card color: ${invalidColors}. Must be one or more of: ${validCardColors}`)
    }
  }

  #processCardPowerToughness (cardPowerToughness) {
    // Non-creatures don't need power/toughness
    // Standard processing: check if creature -> validate empty -> validate format
    if (!this.#isCardTypeCreature(cardPowerToughness)) {
      return ''
    }

    if (!cardPowerToughness || cardPowerToughness.trim() === '') {
      throw new Error('Creatures must have power/toughness')
    }

    this.#hasCreaturePowerToughness(cardPowerToughness)

    const powerToughness = cardPowerToughness.trim()
    this.#validatePowerToughness(powerToughness)

    return powerToughness
  }

  #isCardTypeCreature () {
    if (this.cardType === 'creature') {
      return true
    } else {
      return false
    }
  }

  #hasCreaturePowerToughness(cardPowerToughness) {
    if (!cardPowerToughness || cardPowerToughness.trim() === '') {
      throw new Error('Power/toughness cannot be empty or whitespace.')
    }
  }

  #validatePowerToughness (cardPowerToughness) {
    // Allows: digits, asterisk (*), X, hyphen (-) on both sides of required slash (/)
    const validPowerToughness = /^[\d*X-]+\/[\d*X-]+$/
    if (!validPowerToughness.test(cardPowerToughness)) {
      throw new Error(`Invalid power/toughness: ${cardPowerToughness}. Must have format "power/toughness"`)
    }
  }
}
