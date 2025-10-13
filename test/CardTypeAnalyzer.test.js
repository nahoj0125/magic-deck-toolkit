import { describe, expect } from '@jest/globals'
import Deck from '../src/Deck.js'
import CardTypeAnalyzer from '../src/CardTypeAnalyzer.js'

describe('CardTypeAnalyzer', () => {
  test('Should return card type distribution', () => {
    const deck = new Deck('Johans deck')

    deck.addCard({
      name: 'counterspell',
      manaCost: 'UU',
      type: 'instant',
      color: 'blue',
      powerToughness: '',
    })

    deck.addCard({
      name: 'lightning bolt',
      manaCost: 'R',
      type: 'instant',
      color: 'red',
      powerToughness: '',
    })

    deck.addCard({
      name: 'ghalta, primal hunger',
      manaCost: 'GG10',
      type: 'creature',
      color: 'green',
      powerToughness: '12/12',
    })

    const analyzer = new CardTypeAnalyzer(deck)
    const cardTypeDistribution = analyzer.getTypeDistribution()

    expect(cardTypeDistribution).toEqual({ instant: 2, creature: 1 })
  })

  test('should return how many permanents from a deck', () => {
    const deck = new Deck('Johans deck')

    deck.addCard({
      name: 'counterspell',
      manaCost: 'UU',
      type: 'instant',
      color: 'blue',
      powerToughness: '',
    })

    deck.addCard({
      name: 'lightning bolt',
      manaCost: 'R',
      type: 'instant',
      color: 'red',
      powerToughness: '',
    })

    deck.addCard({
      name: 'ghalta, primal hunger',
      manaCost: 'GG10',
      type: 'creature',
      color: 'green',
      powerToughness: '12/12',
    })

    const analyzer = new CardTypeAnalyzer(deck)
    const permanentCount = analyzer.getPermanentTypeCardCount()

    expect(permanentCount).toBe(1)
  })

  test('should return the amount of lands', () => {
    const deck = new Deck('Johans deck')

    deck.addCard({
      name: 'plains',
      manaCost: '',
      type: 'land',
      color: 'white',
      powerToughness: '',
    })

    const analyzer = new CardTypeAnalyzer(deck)
    const landCount = analyzer.getLandCount()

    expect(landCount).toBe(1)
  })

  test('should return the amount of creatures', () => {
    const deck = new Deck('Johans deck')

    deck.addCard({
      name: 'ghalta, primal hunger',
      manaCost: 'GG10',
      type: 'creature',
      color: 'green',
      powerToughness: '12/12',
    })

    const analyzer = new CardTypeAnalyzer(deck)
    const creatureCount = analyzer.getCreatureCount()

    expect(creatureCount).toBe(1)
  })

    test('should return the amount of instant', () => {
    const deck = new Deck('Johans deck')

    deck.addCard({
      name: 'counterspell',
      manaCost: 'UU',
      type: 'instant',
      color: 'blue',
      powerToughness: '',
    })

    const analyzer = new CardTypeAnalyzer(deck)
    const instantCount = analyzer.getInstantCount()

    expect(instantCount).toBe(1)
  })

    test('should return the amount of sorceries', () => {
    const deck = new Deck('Johans deck')

    deck.addCard({
      name: 'shatter the sky',
      manaCost: '2WW',
      type: 'sorcery',
      color: 'white',
      powerToughness: '',
    })

    const analyzer = new CardTypeAnalyzer(deck)
    const sorceryCount = analyzer.getSorceryCount()

    expect(sorceryCount).toBe(1)
  })
  
  test('should return the amount of artifacts', () => {
    const deck = new Deck('Johans deck')

    deck.addCard({
      name: 'colossus hammer',
      manaCost: '1',
      type: 'artifact',
      color: 'colorless',
      powerToughness: '',
    })

    const analyzer = new CardTypeAnalyzer(deck)
    const artifactCount = analyzer.getArtifactCount()

    expect(artifactCount).toBe(1)
  })

    test('should return the amount of enchantment', () => {
    const deck = new Deck('Johans deck')

    deck.addCard({
      name: 'banishing light',
      manaCost: '2W',
      type: 'enchantment',
      color: 'white',
      powerToughness: '',
    })

    const analyzer = new CardTypeAnalyzer(deck)
    const enchantmentCount = analyzer.getEnchantmentCount()

    expect(enchantmentCount).toBe(1)
  })

  test('should return the amount of planeswalkers', () => {
    const deck = new Deck('Johans deck')

    deck.addCard({
      name: 'elspeth, undaunted hero',
      manaCost: '3W',
      type: 'planeswalker',
      color: 'white',
      powerToughness: '',
    })

    const analyzer = new CardTypeAnalyzer(deck)
    const planewalkerCount = analyzer.getPlaneswalkerCount()

    expect(planewalkerCount).toBe(1)
  })

  test('should return amount of temporary spells', () => {
    const deck = new Deck('Johans deck')

    deck.addCard({
      name: 'counterspell',
      manaCost: 'UU',
      type: 'instant',
      color: 'blue',
      powerToughness: '',
    })

    deck.addCard({
      name: 'lightning bolt',
      manaCost: 'R',
      type: 'instant',
      color: 'red',
      powerToughness: '',
    })

    deck.addCard({
      name: 'ghalta, primal hunger',
      manaCost: 'GG10',
      type: 'creature',
      color: 'green',
      powerToughness: '12/12',
    })

    const analyzer = new CardTypeAnalyzer(deck)
    const temporarySpellsCount = analyzer.getTemporarySpellsCount()

    expect(temporarySpellsCount).toBe(2)
  })

    test('should return creature to spell ratio', () => {
    const deck = new Deck('Johans deck')

    deck.addCard({
      name: 'counterspell',
      manaCost: 'UU',
      type: 'instant',
      color: 'blue',
      powerToughness: '',
    })

    deck.addCard({
      name: 'ghalta, primal hunger',
      manaCost: 'GG10',
      type: 'creature',
      color: 'green',
      powerToughness: '12/12',
    })

    const analyzer = new CardTypeAnalyzer(deck)
    const ratio = analyzer.getCreatureToSpellRatio()

    expect(ratio).toBe(1)
    })

  test('should return creature to spell ratio when there are no temporary spells', () => {
    const deck = new Deck('Johans deck')

    deck.addCard({
      name: 'serra angel',
      manaCost: '3WW',
      type: 'creature',
      color: 'white',
      powerToughness: '4/4'
    })

    deck.addCard({
      name: 'reassembling skeleton',
      manaCost: '1B',
      type: 'creature',
      color: 'black',
      powerToughness: '1/1'
    })

    const analyzer = new CardTypeAnalyzer(deck)
    const ratio = analyzer.getCreatureToSpellRatio()

    expect(ratio).toBe(Infinity)
    })

    test('should return control deck type', () => {
    const deck = new Deck('Johans deck')

    deck.addCard({
      name: 'counterspell',
      manaCost: 'UU',
      type: 'instant',
      color: 'blue',
      powerToughness: '',
    })

    deck.addCard({
      name: 'ghalta, primal hunger',
      manaCost: 'GG10',
      type: 'creature',
      color: 'green',
      powerToughness: '12/12',
    })

    const analyzer = new CardTypeAnalyzer(deck)
    const ratio = analyzer.getCreatureToSpellRatio()
    const deckType = analyzer.getDeckArchetypek(ratio)

    expect(deckType).toBe('midrange')
    })

  test('should return control deck type', () => {
    const deck = new Deck('Johans deck')

    deck.addCard({
      name: 'counterspell',
      manaCost: 'UU',
      type: 'instant',
      color: 'blue',
      powerToughness: '',
    })

    deck.addCard({
      name: 'lightning bolt',
      manaCost: 'R',
      type: 'instant',
      color: 'red',
      powerToughness: '',
    })

    const analyzer = new CardTypeAnalyzer(deck)
    const ratio = analyzer.getCreatureToSpellRatio()
    const deckType = analyzer.getDeckArchetypek(ratio)

    expect(deckType).toBe('control')
  })

    test('should return aggressive deck type', () => {
    const deck = new Deck('Johans deck')

    deck.addCard({
      name: 'ghalta, primal hunger',
      manaCost: 'GG10',
      type: 'creature',
      color: 'green',
      powerToughness: '12/12',
    })

    deck.addCard({
      name: 'serra angel',
      manaCost: '3WW',
      type: 'creature',
      color: 'white',
      powerToughness: '4/4'
    })

    const analyzer = new CardTypeAnalyzer(deck)
    const ratio = analyzer.getCreatureToSpellRatio()
    const deckType = analyzer.getDeckArchetypek(ratio)

    expect(deckType).toBe('aggressive')
  })
})
