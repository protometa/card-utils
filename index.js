'use strict';

var suits = ['Spades', 'Clubs', 'Diamonds', 'Hearts'];
var ranks = ['Ace','2','3','4','5','6','7','8','9','10','Jack','Queen','King'];


function Deck () {
	this.cards = []
	var that = this
	suits.forEach(function (suit) {
		ranks.forEach(function (rank) {
			that.cards.push({suit: suit, rank: rank})
		})
	})
}



exports.Deck = Deck;

