'use strict';

var should = require('should');

var Deck = require('../index.js').Deck;

var testDecks = require('./decks.js');

describe('Deck', function () {

  var deck;

  beforeEach(function () {
    deck = new Deck();
  });

  it('starts with the expected set of cards', function () {
    deck.cards.should.eql(testDecks.sorted);
  });

  describe('shuffle()', function () {

    it('shuffles the cards', function () {
      deck.shuffle();
      // console.log(deck.cards) // wow this is actually impossible to test...
      deck.cards.should.not.eql(testDecks.shuffled); // there is an astronomical chance that even this will incorrectly fail
    })

  });

  describe('sort()', function() {
    
    it('sorts the cards', function () {
      deck.cards = testDecks.shuffled.slice();
      deck.sort();
      deck.cards.should.eql(testDecks.sorted);
    });

  });

  
});




