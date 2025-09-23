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

  test('should return how many permannts from a deck', () => {
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
    const permanentCount = analyzer.getPermanentTypeCardDistribution()

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

    deck.addNewCard({
      cardName: 'lightning bolt',
      cardManaCost: 'R',
      cardType: 'instant',
      cardColor: 'red',
      cardPowerToughness: '',
    })

    const analyzer = new CardTypeAnalyzer(deck)
    const landCount = analyzer.getLandCount()

    expect(landCount).toBe(1)
  })
})
