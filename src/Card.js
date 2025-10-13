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
   * @param {string} name - The name of the card (letters, numbers, spaces, commas, apostrophes, hyphens only)
   * @param {string} manaCost - The mana cost using MTG notation (X, W, U, B, R, G, 0-9)
   * @param {string} type - The card type (instant, sorcery, creature, enchantment, land, artifact, planeswalker)
   * @param {string} color - The card color(s) (white, blue, black, red, green, colorless  or a combination e.g. white green)
   * @param {string} powerToughness - Power/toughness for creatures only, in format "power/toughness" (e.g., "2/2"), empty string for non-creatures
   */
  constructor({ name, manaCost, type, color, powerToughness }) {
    this.name = this.#processName(name)
    this.manaCost = this.#processManaCost(manaCost)
    this.type = this.#processType(type)
    this.color = this.#processColors(color)
    this.powerToughness = this.#processPowerToughness(powerToughness)
  }

  #processName(name) {
    // Standard processing: check for empty/whitespace -> extract name -> validate format
    if (this.#isNameEmptyOrWhiteSpace(name)) {
      throw new Error('Card name cannot be empty or just whitespace.')
    }

    const extractedName = this.#extractName(name)
    this.#validateName(extractedName)
    return extractedName
  }

  #isNameEmptyOrWhiteSpace(name) {
    if (!name || name.trim() === '') {
      return true
    } else {
      return false
    }
  }

  #extractName(name) {
    return name.toLowerCase().trim()
  }

  #validateName(name) {
    // Allows: letters, numbers, spaces, commas, apostrophes, hyphens
    const validNamePattern = /^[A-Za-z0-9\s,'-]+$/

    if (!validNamePattern.test(name)) {
      throw new Error(
        `Invalid card name: ${name}. Must contain only letters, numbers, spaces, commas, apostrophes and hyphens.`
      )
    }
  }

  #processManaCost(manaCost) {
    // Standard processing: extract name -> validate format
    const extractedManaCost = this.#extractManaCost(manaCost)
    this.#validateManaCost(manaCost)

    return extractedManaCost
  }

  #extractManaCost(manaCost) {
    return manaCost.toUpperCase().trim()
  }

  #validateManaCost(manaCost) {
    // Allows: X, W, U, B, R, G, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, ''
    const validManaPattern = /^[XWUBRG0-9]*$/

    if (!validManaPattern.test(manaCost)) {
      throw new Error(
        `Invalid mana cost: ${manaCost}. Must contain only: X, W, U, B, R, G, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, ''`
      )
    }
  }

  #processType(type) {
    // Standard processing: check for empty/whitespace -> extract name -> validate format
    if (this.#isTypeEmptyOrWhiteSpace(type)) {
      throw new Error('Card type cannot be empty or just whitespace..')
    }

    const extractedType = this.#extractType(type)
    this.#validateType(type)

    return type
  }

  #isTypeEmptyOrWhiteSpace(type) {
    if (!type || type.trim() === '') {
      return true
    } else {
      return false
    }
  }

  #extractType(type) {
    return type.toLowerCase().trim()
  }

  #validateType(type) {
    const validTypes = [
      'instant',
      'sorcery',
      'creature',
      'enchantment',
      'land',
      'artifact',
      'planeswalker',
    ]

    if (!validTypes.includes(type)) {
      throw new Error(
        `Invalid card type: ${type}. Must be one of ${validTypes}`
      )
    }
  }

  #processColors(color) {
    // Standard processing: check for empty/whitespace -> extract name -> validate format
    if (this.#isColorEmptyOrWhiteSpace(color)) {
      throw new Error('Card color cannot be empty or just whitespace..')
    }
    const extractedColors = this.#extractColors(color)
    this.#validateColors(extractedColors)

    return extractedColors
  }

  #isColorEmptyOrWhiteSpace(color) {
    if (!color || color.trim() === '') {
      return true
    } else {
      return false
    }
  }

  #extractColors(color) {
    // Split on whitespace, trim each color, filter out empty strings
    return color
      .toLowerCase()
      .trim()
      .split(/\s+/)
      .filter((color) => color)
  }

  #validateColors(colors) {
    const validColors = ['white', 'blue', 'black', 'red', 'green', 'colorless']
    const invalidColors = colors.find((color) => !validColors.includes(color))

    if (invalidColors) {
      throw new Error(
        `Invalid card color: ${invalidColors}. Must be one or more of: ${validColors}`
      )
    }
  }

  #processPowerToughness(powerToughness) {
    // Non-creatures don't need power/toughness
    // Standard processing: check if creature -> validate empty -> validate format
    if (!this.#isTypeCreature(powerToughness)) {
      return ''
    }

    if (!powerToughness || powerToughness.trim() === '') {
      throw new Error('Creatures must have power/toughness')
    }

    this.#hasCreaturePowerToughness(powerToughness)

    const extractedPowerToughness = powerToughness.trim()
    this.#validatePowerToughness(extractedPowerToughness)

    return extractedPowerToughness
  }

  #isTypeCreature() {
    if (this.type === 'creature') {
      return true
    } else {
      return false
    }
  }

  #hasCreaturePowerToughness(powerToughness) {
    if (!powerToughness || powerToughness.trim() === '') {
      throw new Error('Power/toughness cannot be empty or whitespace.')
    }
  }

  #validatePowerToughness(powerToughness) {
    // Allows: digits, asterisk (*), X, hyphen (-) on both sides of required slash (/)
    const validPowerToughness = /^[\d*X-]+\/[\d*X-]+$/
    if (!validPowerToughness.test(powerToughness)) {
      throw new Error(
        `Invalid power/toughness: ${powerToughness}. Must have format "power/toughness"`
      )
    }
  }
}
