import { describe, expect } from '@jest/globals'
import Card from '../src/Card.js'

describe('Card', () => {
  test('Should return a card with all properties.', () => {
    const card = new Card({
      name: 'counterspell',
      manaCost: 'UU',
      type: 'instant',
      color: 'blue',
      powerToughness: '',
    })

    expect(card.name).toBe('counterspell')
    expect(card.manaCost).toBe('UU')
    expect(card.type).toBe('instant')
    expect(card.color).toStrictEqual(['blue'])
  })

  test('Should fail when card name is empty.', () => {
    expect(() => {
      const card = new Card({
        name: '',
        manaCost: 'UU',
        type: 'instant',
        color: 'blue',
        powerToughness: '',
      })
      return card
    }).toThrow()
  })

  test('Should fail when card name is whitespace.', () => {
    expect(() => {
      const card = new Card({
        name: '        ',
        manaCost: 'UU',
        type: 'instant',
        color: 'blue',
        powerToughness: '',
      })
      return card
    }).toThrow()
  })

  test('Should handle empty mana cost for lands.', () => {
    const card = new Card({
      name: 'island',
      manaCost: '',
      type: 'land',
      color: 'blue',
      powerToughness: '',
    })

    expect(card.manaCost).toBe('')
  })

  test('Should handle multicolored mana cost', () => {
    const card = new Card({
      name: 'knight of autumn',
      manaCost: '1GW',
      type: 'creature',
      color: 'green white',
      powerToughness: '2/1',
    })

    expect(card.color).toStrictEqual(['green', 'white'])
  })

  test('Should fail when an invalid card type is chosen.', () => {
    expect(() => {
      const card = new Card({
        name: 'counterspell',
        manaCost: 'UU',
        type: 'notValidType',
        color: 'blue',
        powerToughness: '',
      })
      return card
    }).toThrow()
  })

  test('Should fail when an invalid color is chosen.', () => {
    expect(() => {
      const card = new Card({
        name: 'counterspell',
        manaCost: 'UU',
        type: 'instant',
        color: 'notacolor',
        powerToughness: '',
      })
      return card
    }).toThrow()
  })

  test('Should handle the power and toughness of a creature type card.', () => {
    const card = new Card({
      name: 'serra angel',
      manaCost: '3WW',
      type: 'creature',
      color: 'white',
      powerToughness: '4/4',
    })

    expect(card.powerToughness).toBe('4/4')
  })

  test('Should handle the power and toughness of a non-creature type card', () => {
    const card = new Card({
      name: 'counterspell',
      manaCost: 'UU',
      type: 'instant',
      color: 'blue',
      powerToughness: '',
    })
    expect(card.powerToughness).toBe('')
  })
})
