import { describe, expect } from '@jest/globals'
import Deck from '../src/Deck.js'
import CardTypeAnalyzer from '../src/CardTypeAnalyzer.js'

describe('CardTypeAnalyzer', () => {
  test('Should return card type distribution', () => {
    const deck = new Deck('Johans deck')

    deck.addNewCard({
      cardName: 'counterspell',
      cardManaCost: 'UU',
      cardType: 'instant',
      cardColor: 'blue',
      cardPowerToughness: '',
    })

    deck.addNewCard({
      cardName: 'lightning bolt',
      cardManaCost: 'R',
      cardType: 'instant',
      cardColor: 'red',
      cardPowerToughness: '',
    })

    deck.addNewCard({
      cardName: 'ghalta, primal hunger',
      cardManaCost: 'GG10',
      cardType: 'creature',
      cardColor: 'green',
      cardPowerToughness: '12/12',
    })

    const analyzer = new CardTypeAnalyzer(deck)
    const cardTypeDistribution = analyzer.getTypeDistribution()

    expect(cardTypeDistribution).toEqual({ instant: 2, creature: 1 })
  })

  test('should return how many permanents from a deck', () => {
    const deck = new Deck('Johans deck')

    deck.addNewCard({
      cardName: 'counterspell',
      cardManaCost: 'UU',
      cardType: 'instant',
      cardColor: 'blue',
      cardPowerToughness: '',
    })

    deck.addNewCard({
      cardName: 'lightning bolt',
      cardManaCost: 'R',
      cardType: 'instant',
      cardColor: 'red',
      cardPowerToughness: '',
    })

    deck.addNewCard({
      cardName: 'ghalta, primal hunger',
      cardManaCost: 'GG10',
      cardType: 'creature',
      cardColor: 'green',
      cardPowerToughness: '12/12',
    })

    const analyzer = new CardTypeAnalyzer(deck)
    const permanentCount = analyzer.getPermanentTypeCardCount()

    expect(permanentCount).toBe(1)
  })

  test('should return the amount of lands', () => {
    const deck = new Deck('Johans deck')

    deck.addNewCard({
      cardName: 'plains',
      cardManaCost: '',
      cardType: 'land',
      cardColor: 'white',
      cardPowerToughness: '',
    })

    const analyzer = new CardTypeAnalyzer(deck)
    const landCount = analyzer.getLandCount()

    expect(landCount).toBe(1)
  })

  test('should return the amount of creatures', () => {
    const deck = new Deck('Johans deck')

    deck.addNewCard({
      cardName: 'ghalta, primal hunger',
      cardManaCost: 'GG10',
      cardType: 'creature',
      cardColor: 'green',
      cardPowerToughness: '12/12',
    })

    const analyzer = new CardTypeAnalyzer(deck)
    const creatureCount = analyzer.getCreatureCount()

    expect(creatureCount).toBe(1)
  })

    test('should return the amount of instant', () => {
    const deck = new Deck('Johans deck')

    deck.addNewCard({
      cardName: 'counterspell',
      cardManaCost: 'UU',
      cardType: 'instant',
      cardColor: 'blue',
      cardPowerToughness: '',
    })

    const analyzer = new CardTypeAnalyzer(deck)
    const instantCount = analyzer.getInstantCount()

    expect(instantCount).toBe(1)
  })

    test('should return the amount of sorceries', () => {
    const deck = new Deck('Johans deck')

    deck.addNewCard({
      cardName: 'shatter the sky',
      cardManaCost: '2WW',
      cardType: 'sorcery',
      cardColor: 'white',
      cardPowerToughness: '',
    })

    const analyzer = new CardTypeAnalyzer(deck)
    const sorceryCount = analyzer.getSorceryCount()

    expect(sorceryCount).toBe(1)
  })
  
  test('should return the amount of artifacts', () => {
    const deck = new Deck('Johans deck')

    deck.addNewCard({
      cardName: 'colossus hammer',
      cardManaCost: '1',
      cardType: 'artifact',
      cardColor: 'colorless',
      cardPowerToughness: '',
    })

    const analyzer = new CardTypeAnalyzer(deck)
    const artifactCount = analyzer.getArtifactCount()

    expect(artifactCount).toBe(1)
  })

    test('should return the amount of enchantment', () => {
    const deck = new Deck('Johans deck')

    deck.addNewCard({
      cardName: 'banishing light',
      cardManaCost: '2W',
      cardType: 'enchantment',
      cardColor: 'white',
      cardPowerToughness: '',
    })

    const analyzer = new CardTypeAnalyzer(deck)
    const enchantmentCount = analyzer.getEnchantmentCount()

    expect(enchantmentCount).toBe(1)
  })

  test('should return the amount of planeswalkers', () => {
    const deck = new Deck('Johans deck')

    deck.addNewCard({
      cardName: 'elspeth, undaunted hero',
      cardManaCost: '3W',
      cardType: 'planeswalker',
      cardColor: 'white',
      cardPowerToughness: '',
    })

    const analyzer = new CardTypeAnalyzer(deck)
    const planewalkerCount = analyzer.getPlaneswalkerCount()

    expect(planewalkerCount).toBe(1)
  })

  test('should return amount of temporary spells', () => {
    const deck = new Deck('Johans deck')

    deck.addNewCard({
      cardName: 'counterspell',
      cardManaCost: 'UU',
      cardType: 'instant',
      cardColor: 'blue',
      cardPowerToughness: '',
    })

    deck.addNewCard({
      cardName: 'lightning bolt',
      cardManaCost: 'R',
      cardType: 'instant',
      cardColor: 'red',
      cardPowerToughness: '',
    })

    deck.addNewCard({
      cardName: 'ghalta, primal hunger',
      cardManaCost: 'GG10',
      cardType: 'creature',
      cardColor: 'green',
      cardPowerToughness: '12/12',
    })

    const analyzer = new CardTypeAnalyzer(deck)
    const temporarySpellCount = analyzer.getTemporarySpellCount()

    expect(temporarySpellCount).toBe(2)
  })

    test('should return creature to spell ratio', () => {
    const deck = new Deck('Johans deck')

    deck.addNewCard({
      cardName: 'counterspell',
      cardManaCost: 'UU',
      cardType: 'instant',
      cardColor: 'blue',
      cardPowerToughness: '',
    })

    deck.addNewCard({
      cardName: 'ghalta, primal hunger',
      cardManaCost: 'GG10',
      cardType: 'creature',
      cardColor: 'green',
      cardPowerToughness: '12/12',
    })

    const analyzer = new CardTypeAnalyzer(deck)
    const ratio = analyzer.getCreatureToSpellRatio()

    expect(ratio).toBe(1)
    })

    test('should return control deck type', () => {
    const deck = new Deck('Johans deck')

    deck.addNewCard({
      cardName: 'counterspell',
      cardManaCost: 'UU',
      cardType: 'instant',
      cardColor: 'blue',
      cardPowerToughness: '',
    })

    deck.addNewCard({
      cardName: 'ghalta, primal hunger',
      cardManaCost: 'GG10',
      cardType: 'creature',
      cardColor: 'green',
      cardPowerToughness: '12/12',
    })

    const analyzer = new CardTypeAnalyzer(deck)
    const ratio = analyzer.getCreatureToSpellRatio()
    const deckType = analyzer.getTypeOfDeck(ratio)

    expect(deckType).toBe('midrange')
    })

  test('should return control deck type', () => {
    const deck = new Deck('Johans deck')

    deck.addNewCard({
      cardName: 'counterspell',
      cardManaCost: 'UU',
      cardType: 'instant',
      cardColor: 'blue',
      cardPowerToughness: '',
    })

    deck.addNewCard({
      cardName: 'lightning bolt',
      cardManaCost: 'R',
      cardType: 'instant',
      cardColor: 'red',
      cardPowerToughness: '',
    })

    const analyzer = new CardTypeAnalyzer(deck)
    const ratio = analyzer.getCreatureToSpellRatio()
    const deckType = analyzer.getTypeOfDeck(ratio)

    expect(deckType).toBe('control')
  })

    test('should return aggressive deck type', () => {
    const deck = new Deck('Johans deck')

    deck.addNewCard({
      cardName: 'ghalta, primal hunger',
      cardManaCost: 'GG10',
      cardType: 'creature',
      cardColor: 'green',
      cardPowerToughness: '12/12',
    })

    deck.addNewCard({
      cardName: 'serra angel',
      cardManaCost: '3WW',
      cardType: 'creature',
      cardColor: 'white',
      cardPowerToughness: '4/4'
    })

    const analyzer = new CardTypeAnalyzer(deck)
    const ratio = analyzer.getCreatureToSpellRatio()
    const deckType = analyzer.getTypeOfDeck(ratio)

    expect(deckType).toBe('aggressive')
  })
})
