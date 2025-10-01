import { describe, expect } from '@jest/globals'
import Deck from '../src/Deck.js'

describe('Deck', () => {
  test('Should add a card to a deck.', () => {
    const deck = new Deck('Johans deck')

    deck.addNewCard({
      cardName: 'counterspell',
      cardManaCost: 'UU',
      cardType: 'instant',
      cardColor: 'blue',
      cardPowerToughness: ''
    }
    )

    expect(deck.cards.length).toBe(1)
    expect(deck.cards[0].cardName).toBe('counterspell')
    expect(deck.cards[0].cardManaCost).toBe('UU')
    expect(deck.cards[0].cardType).toBe('instant')
  })

  test('Should add multiple cards to a deck.', () => {
    const deck = new Deck('Johans deck')

    deck.addNewCard({
      cardName: 'counterspell',
      cardManaCost: 'UU',
      cardType: 'instant',
      cardColor: 'blue',
      cardPowerToughness: ''
    }, 60
    )

    expect(deck.cards.length).toBe(60)
    expect(deck.cards[0].cardName).toBe('counterspell')
    expect(deck.cards[0].cardManaCost).toBe('UU')
    expect(deck.cards[0].cardType).toBe('instant')
  })

  test('Should fail when deck exceeds 60 cards.', () => {
    const deck = new Deck('Johans deck')

    expect(() => {
      deck.addNewCard({
        cardName: 'counterspell',
        cardManaCost: 'UU',
        cardType: 'instant',
        cardColor: 'blue',
        cardPowerToughness: ''
      }, 61)
    }).toThrow()
  })

  test('Should remove a card from the deck.', () => {
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
    }, 2
    )

    deck.removeCardByName('lightning bolt')

    expect(deck.cards.length).toBe(1)
  })

  test('Should remove all cards from the deck.', () => {
    const deck = new Deck('Johans deck')

    deck.addNewCard({
      cardName: 'counterspell',
      cardManaCost: 'UU',
      cardType: 'instant',
      cardColor: 'blue',
      cardPowerToughness: ''
    })

    deck.clearDeck()

    expect(deck.cards.length).toBe(0)
  })

  test('Should get total amout of cards in a deck.', () => {
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
    }, 2
    )

    deck.getTotalCards()
    expect(deck.cards.length).toBe(3)
  })

  test('Should return an array with all cards in the deck.', () => {
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

    const cards = deck.getCards()
    expect(cards[0].cardName).toBe('counterspell')
    expect(cards[0].cardManaCost).toBe('UU')
    expect(cards[0].cardType).toBe('instant')
    expect(cards[0].cardColor).toStrictEqual(['blue'])
    expect(cards[0].cardPowerToughness).toBe('')

    expect(cards[1].cardName).toBe('lightning bolt')
    expect(cards[1].cardManaCost).toBe('R')
    expect(cards[1].cardType).toBe('instant')
    expect(cards[1].cardColor).toStrictEqual(['red'])
    expect(cards[0].cardPowerToughness).toBe('')
  })
})
