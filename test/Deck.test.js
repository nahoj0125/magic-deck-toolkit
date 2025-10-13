import { describe, expect } from '@jest/globals'
import Deck from '../src/Deck.js'

describe('Deck', () => {
  test('Should add a card to a deck.', () => {
    const deck = new Deck('Johans deck')

    deck.addCard({
      name: 'counterspell',
      manaCost: 'UU',
      type: 'instant',
      color: 'blue',
      powerToughness: '',
    })

    expect(deck.cards.length).toBe(1)
    expect(deck.cards[0].name).toBe('counterspell')
    expect(deck.cards[0].manaCost).toBe('UU')
    expect(deck.cards[0].type).toBe('instant')
  })

  test('Should add multiple cards to a deck.', () => {
    const deck = new Deck('Johans deck')

    deck.addCard(
      {
        name: 'counterspell',
        manaCost: 'UU',
        type: 'instant',
        color: 'blue',
        powerToughness: '',
      },
      60
    )

    expect(deck.cards.length).toBe(60)
    expect(deck.cards[0].name).toBe('counterspell')
    expect(deck.cards[0].manaCost).toBe('UU')
    expect(deck.cards[0].type).toBe('instant')
  })

  test('Should fail when deck exceeds 60 cards.', () => {
    const deck = new Deck('Johans deck')

    expect(() => {
      deck.addCard(
        {
          name: 'counterspell',
          manaCost: 'UU',
          type: 'instant',
          color: 'blue',
          powerToughness: '',
        },
        61
      )
    }).toThrow()
  })

  test('Should remove a card from the deck.', () => {
    const deck = new Deck('Johans deck')

    deck.addCard({
      name: 'counterspell',
      manaCost: 'UU',
      type: 'instant',
      color: 'blue',
      powerToughness: '',
    })

    deck.addCard(
      {
        name: 'lightning bolt',
        manaCost: 'R',
        type: 'instant',
        color: 'red',
        powerToughness: '',
      },
      2
    )

    deck.removeCardByName('lightning bolt')

    expect(deck.cards.length).toBe(1)
  })

  test('Should remove all cards from the deck.', () => {
    const deck = new Deck('Johans deck')

    deck.addCard({
      name: 'counterspell',
      manaCost: 'UU',
      type: 'instant',
      color: 'blue',
      powerToughness: '',
    })

    deck.clearDeck()

    expect(deck.cards.length).toBe(0)
  })

  test('Should get total amout of cards in a deck.', () => {
    const deck = new Deck('Johans deck')

    deck.addCard({
      name: 'counterspell',
      manaCost: 'UU',
      type: 'instant',
      color: 'blue',
      powerToughness: '',
    })

    deck.addCard(
      {
        name: 'lightning bolt',
        manaCost: 'R',
        type: 'instant',
        color: 'red',
        powerToughness: '',
      },
      2
    )

    deck.getTotalCards()
    expect(deck.cards.length).toBe(3)
  })

  test('Should return an array with all cards in the deck.', () => {
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

    const cards = deck.getCards()
    expect(cards[0].name).toBe('counterspell')
    expect(cards[0].manaCost).toBe('UU')
    expect(cards[0].type).toBe('instant')
    expect(cards[0].color).toStrictEqual(['blue'])
    expect(cards[0].powerToughness).toBe('')

    expect(cards[1].name).toBe('lightning bolt')
    expect(cards[1].manaCost).toBe('R')
    expect(cards[1].type).toBe('instant')
    expect(cards[1].color).toStrictEqual(['red'])
    expect(cards[0].powerToughness).toBe('')
  })
})
