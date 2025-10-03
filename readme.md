# Magic Deck Toolkit

A JavaScript module for managing and analyzing Magic: The Gathering decks. This toolkit provides classes for creating cards, building decks, and analyzing deck composition through mana curve analysis and card type distribution.

## Features

- **Card Management:** Create and validate Magic: The Gathering cards with proper mana notation
- **Deck Building:** Build 60-card decks with easy card addition and removal
- **Mana Analysis:** Analyze mana curves, average mana cost, and color distribution
- **Type Analysis:** Examine card type distribution and determine deck archetypes

## Requirements

- Node.js with ES modules support
- Jest for testing

## Installation
```
git clone https://github.com/nahoj0125/magic-deck-toolkit.git
cd magic-deck-toolkit
npm install
```

## Usage

### Creating Cards
```javascript
import Card from './Card.js'

// Create an instant spell
const bolt = new Card('Lightning Bolt', 'R', 'instant', 'red', '')

// Create a creature
const ghalta = new Card('Ghalta, Primal Hunger', '10GG', 'creature', 'green', '12/12')
```

### Building a deck
```javascript
import Deck from './Deck.js'

const myDeck = new Deck('Gruul Aggro')

// Add a single card
myDeck.addNewCard({
  cardName: 'Lightning Bolt',
  cardManaCost: 'R',
  cardType: 'instant',
  cardColor: 'red',
  cardPowerToughness: ''
})

// Add multiple copies at once
myDeck.addNewCard({
  cardName: 'Llanowar Elves',
  cardManaCost: 'G',
  cardType: 'creature',
  cardColor: 'green',
  cardPowerToughness: '1/1'
}, 4)

// Remove cards
myDeck.removeCardByName('Lightning Bolt')

// Get deck information
console.log(myDeck.getTotalCards()) // Total cards in deck
console.log(myDeck.getCards()) // Array of all cards
```

### Analyzing mana
```javascript
import ManaAnalyzer from './ManaAnalyzer.js'

const analyzer = new ManaAnalyzer(myDeck)

// Get mana curve distribution
const curve = analyzer.getManaCurve()
// Example: { 1: 12, 2: 8, 3: 10, 4: 6 }

// Get average mana cost
const avgCost = analyzer.getAverageManaCost()
console.log(`Average CMC: ${avgCost}`)

// Get color distribution
const colors = analyzer.getColorDistributionOfCardsInDeck()
// Example: { white: 0, blue: 5, black: 0, red: 15, green: 20, colorless: 0 }

// Get mana curve as percentages
const percentages = analyzer.getManaCurvePercentages()
// Example: { 1: 20, 2: 13, 3: 17, 4: 10 }
```

### Analyzing Card Types
```javascript
import CardTypeAnalyzer from './CardTypeAnalyzer.js'

const typeAnalyzer = new CardTypeAnalyzer(myDeck)

// Get type distribution
const distribution = typeAnalyzer.getTypeDistribution()
// Example: { creature: 24, instant: 8, sorcery: 4, land: 24 }

// Get specific counts
console.log(typeAnalyzer.getCreatureCount())
console.log(typeAnalyzer.getInstantCount())
console.log(typeAnalyzer.getLandCount())

// Get permanent vs temporary spell counts
console.log(typeAnalyzer.getPermanentTypeCardCount())
console.log(typeAnalyzer.getTemporarySpellsCount())

// Determine deck archetype
const ratio = typeAnalyzer.getCreatureToSpellRatio()
const archetype = typeAnalyzer.getTypeOfDeck(ratio)
console.log(`This is an ${archetype} deck`) // aggressive, control, midrange, or undecided
```

## API Reference

### Card

Creates a validated Magic: The Gathering card.

**Constructor Parameters:**

* cardName (string): Card name (letters, numbers, spaces, commas, apostrophes, hyphens)
* cardManaCost (string): Mana cost using MTG notation (X, W, U, B, R, G, 0-9), empty string for lands
* cardType (string): Card type (instant, sorcery, creature, enchantment, land, artifact, planeswalker)
* cardColor (string): One or more colors separated by spaces (e.g., "red" or "white blue")
* cardPowerToughness (string): Power/toughness for creatures (e.g., "2/2"), empty string for non-creatures

### Deck

Manages a collection of up to 60 cards.

**Methods:**

* addNewCard(cardObject, quantity): Add card(s) to deck. Takes an object with properties: {cardName, cardManaCost, cardType, cardColor, cardPowerToughness}. Optional quantity parameter (default: 1)
* clearDeck(): Remove all cards
* getCards(): Get array of all Card objects in deck
* getTotalCards(): Get total card count
* removeCardByName(cardName): Remove all copies of a card by name

### ManaAnalyzer

Analyzes mana costs and color distribution.

**Methods:**

* getAverageManaCost(): Returns average converted mana cost
* getColorDistributionOfCardsInDeck(): Returns color distribution object
* getManaCurve(): Returns object with mana costs and their frequencies
* getManaCurvePercentages(): Returns mana curve as percentages

### CardTypeAnalyzer
Analyzes card type distribution and deck archetype.

**Methods:**

* getCreatureToSpellRatio(): Calculate creature-to-spell ratio
* getLandCount(), getCreatureCount(), getInstantCount(), etc.: Get specific type counts
* getPermanentTypeCardCount(): Count cards that remain on battlefield
* getTemporarySpellsCount(): Count instant and sorcery spells
* getTypeDistribution(): Returns object with card types and counts
* getTypeOfDeck(ratio): Determine archetype (aggressive, control, midrange, undecided)

## Validation Rules

### Card Names
- Cannot be empty or whitespace
- May contain: letters, numbers, spaces, commas, apostrophes, hyphens

### Mana Costs
- Valid symbols: X, W (white), U (blue), B (black), R (red), G (green), 0-9
- Example: "2RG" (2 generic + red + green)

### Card Types
- Must be one of: instant, sorcery, creature, enchantment, land, artifact, planeswalker

### Colors
- Valid colors: white, blue, black, red, green, colorless
- Can specify multiple colors: "white blue" for multicolor cards

### Power/Toughness
- Required for creatures only
- Format: "power/toughness" (e.g., "3/3", "*/2", "X/X")
- Supports numbers, asterisks (*), X, and hyphens

## Deck Archetypes

The `CardTypeAnalyzer` classifies decks based on creature-to-spell ratio:

- **Aggressive** (ratio > 1.5): Many creatures, fast gameplay
- **Control** (ratio < 0.8): Many spells, reactive gameplay
- **Midrange** (0.8 ≤ ratio ≤ 1.5): Balanced creature/spell mix
- **Undecided**: Doesn't fit standard archetypes

## Development

### Setup

```bash
git clone https://github.com/yourusername/magic-deck-toolkit.git
cd magic-deck-toolkit
npm install
```

### Running the Application

```bash
npm start
```

## Testing
```bash
npm test
```

## Contributing

Contributions are welcome! 

### Reporting Bugs
Found a bug? Please [open an issue](https://github.com/yourusername/magic-deck-toolkit/issues) with details about the problem.

### Pull Requests
1. Fork the repository
2. Create your feature branch
3. Write tests for your changes
4. Ensure all tests pass (`npm test`)
5. Submit a pull request

## License

[MIT](./LICENSE)

## Author
- Johan Persson
- jp223yp@student.lnu.se

Created as a laboration for educational purposes at Linnaeus University for the course 1DV610
