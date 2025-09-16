import { expect } from '@jest/globals'
import Card from '../src/Card.js'

describe('Card', () => {
  test('Should return a card with all properties.', () => {
    const card = new Card('counterspell', 'UU', 'instant', 'blue')

    expect(card.cardName).toBe('counterspell')
    expect(card.cardManaCost).toBe('UU')
    expect(card.cardType).toBe('instant')
    expect(card.cardColor).toStrictEqual(['blue'])
  })

  test('Should fail when card name is empty.', () => {
    expect(() => {
      const card = new Card('', 'UU', 'instant', 'blue', '')
      return card
    }).toThrow()
  })

  test('Should fail when card name is whitespace.', () => {
    expect(() => {
      const card = new Card('        ', 'UU', 'instant', 'blue', '')
      return card
    }).toThrow()
  })

  test('Should handle empty mana cost for lands.', () => {
    const card = new Card('island', '', 'land', 'blue')

    expect(card.cardManaCost).toBe('')
  })

  test('Should handle multicolored mana cost', () => {
    const card = new Card('knight of autumn', '1GW', 'creature', 'green white', '2/1')

    expect(card.cardColor).toStrictEqual(['green', 'white'])
  })

  test('Should fail when an invalid card type is chosen.', () => {
    expect(() => {
      const card = new Card('counterspell', 'UU', 'notValidCardType', 'blue', '')
      return card
    }).toThrow()
  })

  test('Should fail when an invalid color is chosen.', () => {
    expect(() => {
      const card = new Card('counterspell', 'UU', 'instant', 'notacolor', '')
      return card
    }).toThrow()
  })

  test('Should handle the battle stats of a creature type card.', () => {
    const card = new Card('serra angel', '3WW', 'creature', 'white', '4/4')

    expect(card.cardPowerToughness).toBe('4/4')
  })

  test('Should handle the battle stats of a non-creature type card', () => {
    const card = new Card('counterspell', 'UU', 'instant', 'blue', '')

    expect(card.cardPowerToughness).toBe('')
  })
})
