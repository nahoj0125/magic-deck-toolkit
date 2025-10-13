import { describe, expect } from '@jest/globals'
import Deck from '../src/Deck.js'
import ManaAnalyzer from '../src/ManaAnalyzer.js'

describe('ManaAnalyzer', () => {
  test('should return mana curve of the deck', () => {
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

    const analyzer = new ManaAnalyzer(deck)
    const manaCurve = analyzer.getManaCurve()

    expect(manaCurve).toEqual({ 1: 1, 2: 1, 12: 1 })
  })

  test('Should return average mana cost of the deck.', () => {
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

    const analyzer = new ManaAnalyzer(deck)
    const averageManaCost = analyzer.getAverageManaCost()

    expect(averageManaCost).toBe(5)
  })

  test('Should return color distribution of the deck.', () => {
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

    const analyzer = new ManaAnalyzer(deck)
    const colorDistribution = analyzer.getColorDistributionOfCards()

    expect(colorDistribution).toEqual({
      white: 0,
      blue: 1,
      black: 0,
      red: 1,
      green: 1,
      colorless: 0,
    })
  })

  test('Should calculate percentages of mana curve', () => {
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

    const analyzer = new ManaAnalyzer(deck)
    const percentages = analyzer.getManaCurvePercentages()

    expect(percentages).toEqual({
      1: 33,
      2: 33,
      12: 33,
    })
  })
})
