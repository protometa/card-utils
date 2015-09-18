# card-utils
Utilies for playing cards.


## Installation

    npm install card-utils
  
## Usage

```javascript
var cardUtils = require('card-utils);
  
var deck = cardUtils.generateDeck();
var shuffled = cardUtils.shuffle(deck);
var sorted = cardUtils.sort(shuffled);
```

## Tests

Run `npm test` in package root.
