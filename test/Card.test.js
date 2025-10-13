import { describe, expect } from '@jest/globals'
import Card from '../src/Card.js'

describe('Card', () => {
  test('Should return a card with all properties.', () => {
    const card = new Card({
      cardName: 'counterspell',
      cardManaCost: 'UU',
      cardType: 'instant',
      cardColor: 'blue',
      cardPowerToughness: ''
    })

    expect(card.cardName).toBe('counterspell')
    expect(card.cardManaCost).toBe('UU')
    expect(card.cardType).toBe('instant')
    expect(card.cardColor).toStrictEqual(['blue'])
  })

  test('Should fail when card name is empty.', () => {
    expect(() => {
      const card = new Card({
        cardName: '',
        cardManaCost: 'UU',
        cardType: 'instant',
        cardColor: 'blue',
        cardPowerToughness: ''
      })
      return card
    }).toThrow()
  })

  test('Should fail when card name is whitespace.', () => {
    expect(() => {
      const card = new Card({
        cardName: '        ',
        cardManaCost: 'UU',
        cardType: 'instant',
        cardColor: 'blue',
        cardPowerToughness: ''
      })
      return card
    }).toThrow()
  })

  test('Should handle empty mana cost for lands.', () => {
    const card = new Card({
      cardName: 'island',
      cardManaCost: '',
      cardType: 'land',
      cardColor: 'blue',
      cardPowerToughness: ''
    })

    expect(card.cardManaCost).toBe('')
  })

  test('Should handle multicolored mana cost', () => {
    const card = new Card({
      cardName: 'knight of autumn',
      cardManaCost: '1GW',
      cardType: 'creature',
      cardColor: 'green white',
      cardPowerToughness: '2/1'
    })

    expect(card.cardColor).toStrictEqual(['green', 'white'])
  })

  test('Should fail when an invalid card type is chosen.', () => {
    expect(() => {
      const card = new Card({
        cardName: 'counterspell',
        cardManaCost: 'UU',
        cardType: 'notValidCardType',
        cardColor: 'blue',
        cardPowerToughness: ''
      })
      return card
    }).toThrow()
  })

  test('Should fail when an invalid color is chosen.', () => {
    expect(() => {
      const card = new Card({
        cardName: 'counterspell',
        cardManaCost: 'UU',
        cardType: 'instant',
        cardColor: 'notacolor',
        cardPowerToughness: ''
      })
      return card
    }).toThrow()
  })

  test('Should handle the power and toughness of a creature type card.', () => {
    const card = new Card({
      cardName: 'serra angel',
      cardManaCost: '3WW',
      cardType: 'creature',
      cardColor: 'white',
      cardPowerToughness: '4/4'
    })

    expect(card.cardPowerToughness).toBe('4/4')
  })

  test('Should handle the power and toughness of a non-creature type card', () => {
    const card = new Card({
      cardName: 'counterspell',
      cardManaCost: 'UU',
      cardType: 'instant',
      cardColor: 'blue',
      cardPowerToughness: ''
    })
    expect(card.cardPowerToughness).toBe('')
  })
})
