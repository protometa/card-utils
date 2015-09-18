'use strict';

var suits = ['Spades', 'Clubs', 'Diamonds', 'Hearts'];
var ranks = ['Ace','2','3','4','5','6','7','8','9','10','Jack','Queen','King'];


function ordered (a, b) {
  // returns true if a comes before b in sorted deck, false if not
  var aSuitIndex = suits.indexOf(a.suit);
  var bSuitIndex = suits.indexOf(b.suit);
  if (aSuitIndex < bSuitIndex) {
    return true;
  } else if (aSuitIndex > bSuitIndex) {
    return false;
  } else {
    return ranks.indexOf(a.rank) < ranks.indexOf(b.rank);
  }
}

function successive (a, b) {
  // returns true if b comes directly after a in sorted deck
  (ranks.indexOf(b.rank) - ranks.indexOf(a.rank) == 1) &&
  (suits.indexOf(b.suit) - suits.indexOf(a.suit) == 1)
}


// I might put something like this in it's own module with it's own tests
// if it didn't already exist on npm, in which case I would use the exisiting
function qsort (arr) {
  // recursive quicksort
  if (arr.length === 0) return arr;
  var testCard = arr.pop();
  var left = qsort( arr.filter(function (card) { return ordered(card, testCard); }) );
  var right = qsort( arr.filter(function (card) { return ordered(testCard, card); }) );
  return left.concat(testCard, right);
}



function Deck () {
  this.cards = [];
  var that = this;
  suits.forEach(function (suit) {
    ranks.forEach(function (rank) {
      that.cards.push({suit: suit, rank: rank});
    })
  })
}


Deck.prototype.shuffle = function() {
  var shuffled = [];
  while (this.cards.length > 0){
    shuffled.push( this.drawRandom() );
  }
  this.cards = shuffled;
};


Deck.prototype.isPracticallyShuffled = function() {
  // returns false if at least 5 cards are still in original order
  for (var i = 0; i < this.cards.length - 5; i++) {
    this.cards.slice(i, 5)
  };
};


Deck.prototype.drawRandom = function() {
  return this.cards.splice( Math.floor( Math.random() * this.cards.length), 1)[0];
};


Deck.prototype.sort = function() {
  this.cards = qsort(this.cards.slice());
};




exports.Deck = Deck;

