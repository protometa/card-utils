'use strict';

var suits = ['Spades', 'Clubs', 'Diamonds', 'Hearts'];
var ranks = ['Ace','2','3','4','5','6','7','8','9','10','Jack','Queen','King'];


var self = module.exports = {

  ordered: function  (cardA, cardB) {
    // returns true if cardA comes before cardB in sorted deck, false if not
    if (cardA.suit === cardB.suit && cardA.rank === cardB.rank) {
      throw new Error('cannot determine order of identical cards');
    };
    var aSuitIndex = suits.indexOf(cardA.suit);
    var bSuitIndex = suits.indexOf(cardB.suit);
    var aRankIndex = ranks.indexOf(cardA.rank);
    var bRankIndex = ranks.indexOf(cardB.rank);

    if ( aSuitIndex < 0
      || bSuitIndex < 0
      || aRankIndex < 0
      || bRankIndex < 0
    ) {
      throw new Error('invalid cards');
    }

    if (aSuitIndex < bSuitIndex) {
      return true;
    } else if (aSuitIndex > bSuitIndex) {
      return false;
    } else {
      return  aRankIndex < bRankIndex;
    }
  },

  successive: function (cardA, cardB) {
    // returns true if cardB comes directly after cardA in same suit
    return cardA.suit === cardB.suit &&
    ranks.indexOf(cardB.rank) - ranks.indexOf(cardA.rank) === 1 
  },

  sort: function (cards) {
    // recursive quicksort
    if (cards.length === 0) return cards;
    cards = cards.slice();
    var pivotCard = cards.pop();
    var left = self.sort( cards.filter(function (card) {
      return self.ordered(card, pivotCard);
    }));
    var right = self.sort( cards.filter(function (card) {
      return self.ordered(pivotCard, card);
    }));
    return left.concat(pivotCard, right);
  },

  generateDeck: function () {
    var deck = [];
    suits.forEach(function (suit) {
      ranks.forEach(function (rank) {
        deck.push({suit: suit, rank: rank});
      })
    })
    return deck;
  },

  validDeck: function (deck) {
    if (deck.length !== (52)) return false;
    for (var i1 = 0; i1 < deck.length; i1++) {
      var card = deck[i1];
      if (suits.indexOf(card.suit) < 0) return false;
      if (ranks.indexOf(card.rank) < 0) return false;
      // cards should all be unique
      for (var i2 = i1+1; i2 < deck.length; i2++) {
        if (card.suit === deck[i2].suit && card.rank === deck[i2].rank) {
          return false;
        };
      };
    };
    return true;
  },

  isPracticallyShuffled: function (cards) {
    // returns false if at least 5 cards are still in original deck order
    var successiveCount = 0;
    for (var i = 0; i < cards.length - 1; i++) {
      if ( self.successive(cards[i], cards[i+1]) ) {
        successiveCount++;
        if (successiveCount > 5) return false;
      } else { 
        successiveCount = 0;
      };
    };
    return true;
  },

  shuffle: function (cards) {
    // randomish shuffle
    var shuffled = null;
    do {
        var cards = shuffled || cards.slice();
        shuffled = [];
        while (cards.length > 0){
          shuffled.push( self.drawRandom(cards) );
        }
      } while (self.isPracticallyShuffled(shuffled) === false)
      return shuffled;
  },

  drawRandom: function (cards) {
    return cards.splice( Math.floor( Math.random() * cards.length), 1)[0];
  },


};














