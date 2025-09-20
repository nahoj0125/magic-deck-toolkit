import { describe, expect } from '@jest/globals'
import Deck from '../src/Deck.js'
import ManaAnalyzer from '../src/ManaAnalyzer.js'

describe('ManaAnalyzer', () => {
  test('should return mana curve of the deck', () => {
    const deck = new Deck('Johans deck')

    deck.addNewCard({
      cardName: 'counterspell',
      cardManaCost: 'UU',
      cardType: 'instant',
      cardColor: 'blue',
      cardPowerToughness: ''
    })

    deck.addNewCard({
      cardName: 'lightning bolt',
      cardManaCost: 'R',
      cardType: 'instant',
      cardColor: 'red',
      cardPowerToughness: ''
    })

    deck.addNewCard({
      cardName: 'ghalta, primal hunger',
      cardManaCost: 'GG10',  
      cardType: 'creature',
      cardColor: 'green',
      cardPowerToughness: '12/12'
    })

    const analyzer = new ManaAnalyzer(deck)
    const manaCurve = analyzer.getManaCurve()

    expect(manaCurve).toEqual({ 1: 1, 2: 1, 12: 1 })
  })

  test('Should return average mana cost of the deck.', () => {
    const deck = new Deck('Johans deck')

    deck.addNewCard({
      cardName: 'counterspell',
      cardManaCost: 'UU',
      cardType: 'instant',
      cardColor: 'blue',
      cardPowerToughness: ''
    })

    deck.addNewCard({
      cardName: 'lightning bolt',
      cardManaCost: 'R',
      cardType: 'instant',
      cardColor: 'red',
      cardPowerToughness: ''
    })

    deck.addNewCard({
      cardName: 'ghalta, primal hunger',
      cardManaCost: 'GG10',  
      cardType: 'creature',
      cardColor: 'green',
      cardPowerToughness: '12/12'
    })

    const analyzer = new ManaAnalyzer(deck)
    const averageManaCost = analyzer.getAverageManaCost()

    expect(averageManaCost).toBe(5)
  })
})