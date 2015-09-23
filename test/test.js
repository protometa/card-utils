'use strict';

var should = require('should');
var sinon = require('sinon');

var cardUtils = require('../index.js');

var testDecks = require('./decks.js');


describe('ordered(cardA, cardB)', function() {
  
  it('returns true if cardA suit comes before cardB suit in sorted deck', function() {
    cardUtils.ordered({suit: 'Spades', rank: '2'}, {suit: 'Diamonds', rank: 'Ace'})
    .should.be.true();
  });

  it('returns false if cardA suit comes after cardB suit', function() {
    cardUtils.ordered({suit: 'Hearts', rank: 'Ace'}, {suit: 'Clubs', rank: '2'})
    .should.be.false();
    cardUtils.ordered({suit: 'Clubs', rank: '8'}, {suit: 'Spades', rank: '8'})
    .should.be.false();
  });

  it('defers to rank if suit matches, returns true if cardA rank comes before cardB rank', function() {
    cardUtils.ordered({suit: 'Spades', rank: '10'}, {suit: 'Spades', rank: 'Jack'})
    .should.be.true();
  });

  it('likewise, returns false if cardA rank comes after cardB rank', function() {
    cardUtils.ordered({suit: 'Diamonds', rank: 'Queen'}, {suit: 'Diamonds', rank: '2'})
    .should.be.false();
  });

  it('throws error if cards are invalid', function () {
    (function () {
      cardUtils.ordered({suit: 'Jack', rank: '4'}, {suit: 'Hearts', rank: '4'})
    }).should.throw('invalid cards');
  })

  it('throws error if cards match', function () {
    (function () {
      cardUtils.ordered({suit: 'Hearts', rank: '4'}, {suit: 'Hearts', rank: '4'})
    }).should.throw('cannot determine order of identical cards');
  })

});

describe('successive(cardA, cardB)', function() {

  it('returns false if cardA and cardB are different suits', function () {
    cardUtils.successive({suit: 'Spades', rank: 'King'}, {suit: 'Clubs', rank: 'Ace'})
    .should.be.false();
  })

  it('returns false if cardB comes before cardA', function() {
    cardUtils.successive({suit: 'Hearts', rank: 'Queen'}, {suit: 'Hearts', rank: 'Jack'})
    .should.be.false();
    cardUtils.successive({suit: 'Clubs', rank: 'Ace'}, {suit: 'Clubs', rank: 'King'})
    .should.be.false();
  });

  it('returns false if cardB comes after but not directly after cardA', function() {
    cardUtils.successive({suit: 'Hearts', rank: '5'}, {suit: 'Hearts', rank: '8'})
    .should.be.false();
  });

  it('returns true if cardB comes directly after cardA', function() {
    cardUtils.successive({suit: 'Spade', rank: 'Ace'}, {suit: 'Spade', rank: '2'})
    .should.be.true();
    cardUtils.successive({suit: 'Hearts', rank: 'Queen'}, {suit: 'Hearts', rank: 'King'})
    .should.be.true();
  });
  
});


describe('generateDeck()', function() {

  it('generates new sorted deck', function() {
    cardUtils.generateDeck().should.eql(testDecks.sorted);
  });

});


describe('validDeck()', function() {

  it('returns false if deck is missing cards', function() {
    cardUtils.validDeck(testDecks.missingCard).should.be.false();
  });

  it('returns false if deck has duplicate cards', function() {
    cardUtils.validDeck(testDecks.dupCards).should.be.false();
  });

  it('returns false if deck has invalid cards', function() {
    cardUtils.validDeck(testDecks.invalidCard).should.be.false();
  });

  it('returns true if deck is otherwise valid', function () {
    cardUtils.validDeck(testDecks.sorted).should.be.true();
    cardUtils.validDeck(testDecks.shuffled).should.be.true();
  })

});


describe('sort()', function() {
    
  it('sorts the cards in place', function () {
    var sorted = cardUtils.sort(testDecks.shuffled);
    sorted.should.eql(testDecks.sorted);
  });

  it('does not modify the array', function () {
    var shuffled = testDecks.shuffled.slice();
    cardUtils.sort(shuffled);
    shuffled.should.be.eql(testDecks.shuffled);
  })

});


// function isPracticallyShuffledTests () {
//   // body...
// }

// describe('isPracticallyShuffled()', function () {
//   it('returns true if cards appears shuffled (no more than five cards in original order)', function() {
    
//   });
// })


describe('shuffle()', function() {
  
  it('shuffles cards', function() {
    // hey it's theoretically impossible to tell if a deck has been shuffled
    // any test of randomness could result in false negative
    // unless that test is built into the shuffle method...

    // first test isPracticallyShuffled()
    cardUtils.isPracticallyShuffled(testDecks.sorted).should.be.false();
    cardUtils.isPracticallyShuffled(testDecks.shuffled).should.be.true();
    cardUtils.isPracticallyShuffled(testDecks.partiallyShuffled).should.be.false();

    // use it to test shuffle()
    sinon.spy(cardUtils, 'isPracticallyShuffled');

    var shuffled = cardUtils.shuffle(testDecks.sorted);

    cardUtils.isPracticallyShuffled.called.should.be.true();
    cardUtils.isPracticallyShuffled.lastCall.returnValue.should.be.true();
    cardUtils.validDeck(shuffled).should.be.true();
    cardUtils.isPracticallyShuffled(shuffled).should.be.true();

    cardUtils.isPracticallyShuffled.restore()


  });

});




