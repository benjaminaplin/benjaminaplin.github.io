var cardType =  [2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,6,6,6,6,7,7,7,7,8,8,8,8,9,9,9,9,10,10,10,10,"A","A","A","A","J","J","J","J","K","K","K","K","Q","Q","Q","Q"];
var cardValue = [2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,6,6,6,6,7,7,7,7,8,8,8,8,9,9,9,9,10,10,10,10,11,11,11,11,10,10,10,10,10,10,10,10,10,10,10,10];
var cardImages = [
	"2_of_clubs.png",
	"2_of_diamonds.png",
	"2_of_hearts.png",
	"2_of_spades.png",
	"3_of_clubs.png",
	"3_of_diamonds.png",
	"3_of_hearts.png",
	"3_of_spades.png",
	"4_of_clubs.png",
	"4_of_diamonds.png",
	"4_of_hearts.png",
	"4_of_spades.png",
	"5_of_clubs.png",
	"5_of_diamonds.png",
	"5_of_hearts.png",
	"5_of_spades.png",
	"6_of_clubs.png",
	"6_of_diamonds.png",
	"6_of_hearts.png",
	"6_of_spades.png",
	"7_of_clubs.png",
	"7_of_diamonds.png",
	"7_of_hearts.png",
	"7_of_spades.png",
	"8_of_clubs.png",
	"8_of_diamonds.png",
	"8_of_hearts.png",
	"8_of_spades.png",
	"9_of_clubs.png",
	"9_of_diamonds.png",
	"9_of_hearts.png",
	"9_of_spades.png",
	"10_of_clubs.png",
	"10_of_diamonds.png",
	"10_of_hearts.png",
	"10_of_spades.png",
	"ace_of_clubs.png",
	"ace_of_diamonds.png",
	"ace_of_hearts.png",
	"ace_of_spades.png",
	"jack_of_clubs.png",
	"jack_of_diamonds.png",
	"jack_of_hearts.png",
	"jack_of_spades.png",
	"king_of_clubs.png",
	"king_of_diamonds.png",
	"king_of_hearts.png",
	"king_of_spades.png",
	"queen_of_clubs.png",
	"queen_of_diamonds.png",
	"queen_of_hearts.png",
	"queen_of_spades.png",
	"card_back.png"
];
var dealerCardsValue = 0;
var playerCardsValue = 0;
var arrayDeckOfCards = [];
var modal = $('#modal');
var newHandButton = $('#new-hand-modal');
var cardBackToggleSet = 0;
var playerDollars = 1000;
var bet;
$("#account-balance").text("$" + playerDollars);

//*****CARD CREATOR*********
var Card = function Card(cardType, cardValue, cardImage, cardId){
	this.cardType = cardType;
	this.cardValue = cardValue;
	this.cardImage = cardImage;
	this.cardId = cardId;
}
$.each(cardType, function(i, value, array){
	var card = new Card(cardType[i], cardValue[i], cardImages[i], i);
	arrayDeckOfCards.push(card);
});
//**************************
$('#deal').on("click", function(){
	arrayDeckOfCards = shuffle(arrayDeckOfCards);
	deal();
	setTimeout(function(){
		dealer.checksValueOfHand();
				}, 1250);
	setTimeout(function(){
		player.checksValueOfHand();
				}, 1250);
	setTimeout(function(){
		player.move();
				}, 1250);
	setTimeout(function(){
		player.choice();
				}, 1250);
}); 

function shuffle(array) {
  var currentIndex = array.length;
  var temporaryValue;
  var randomIndex;

  while (0 !== currentIndex) {
	  randomIndex = Math.floor(Math.random() * currentIndex);
	  currentIndex -= 1;
	  temporaryValue = array[currentIndex];
	  array[currentIndex] = array[randomIndex];
	  array[randomIndex] = temporaryValue;
  }
  return array;
}

var checkForTie = function checkForTie(){
	if(playerCardsValue === dealerCardsValue && dealerCardsValue > 17){
		playerDollars += bet;
		modal.toggle();
		$('#modal-status').text("its a TIE");
	} 
}

var deal = function deal(){
	setTimeout(function(){
	$('div#dealer-hand').append('<div class="card"><img src="assets/card_images/card_back.png" id="card-back" class="card animated bounceInDown"></div>');
		}, 200);	
	setTimeout(function(){
		dealer.dealToDealer();
		}, 200);
	setTimeout(function(){
		dealer.dealToPlayer();
		}, 500);
	setTimeout(function(){
		dealer.dealToPlayer();
		}, 1000);
	setTimeout(function(){
		dealer.dealToDealer();
		}, 750);
	cardBackToggleSet = 0;
	$( "#deal" ).off("click");
	$("#dealer-score").toggle();
	$('#modal-header').text("");
};

var newHand = function newHand() {
	player.playerHand = [];
	$('div#player-hand').empty();
	playerCardsValue = 0;

	dealer.dealerHand = [];
	$('div#dealer-hand').empty();
	dealerCardsValue = 0;

	$('#status').text("");
	$('#cards-left-in-deck').text(arrayDeckOfCards.length + " cards left in the deck!");

	deal();
	setTimeout(function(){
		dealer.checksValueOfHand();
				}, 1200);
	setTimeout(function(){
		player.checksValueOfHand();
				}, 1200);
}

var newGame = function newGame(){
	bet = 0;
	arrayDeckOfCards = [];
	$.each(cardType, function(i, value, array){
		var card = new Card(cardType[i], cardValue[i], cardImages[i], i);
		arrayDeckOfCards.push(card);
	});
	arrayDeckOfCards = shuffle(arrayDeckOfCards);
	modal.toggle();
	newHand();
}

$('#new-game-modal').on("click", function(event){
	newGame();
})

var player = {
	playerHand : [],
	checksValueOfHand : function(){
		playerCardsValue = 0;
		$.each(this.playerHand, function(i, playerCard, array){
			playerCardsValue += playerCard.cardValue;
			});
		$('#player-score').text(playerCardsValue);
	},
	move : function(){
		if (playerCardsValue === 21){
			$('#modal-header').text("you got 21!");
			this.wins();
		} else if (playerCardsValue > 21){
			$.each(this.playerHand, function(i, playerCard, array){
				if(playerCard.cardType === "A"){
					playerCardsValue -= 10;
					$('#player-score').text(playerCardsValue);
				}
			});
			if (playerCardsValue > 21){
				$('#modal-header').text("you bust, sucka!");
				this.lose();
			}
		} else if (dealerCardsValue > 17 && playerCardsValue > dealerCardsValue && playerCardsValue <= 21){
			modal.toggle();
			this.wins();
		} else if (playerCardsValue === 21){
			$('#modal-header').text("you got 21!");
			if (dealerCardsValue > 17){
				this.wins();
			}
		}
		checkForTie();
	},
	choice : function(){
		$('#player-choices').append('<button id="hit">hit</button><button id="stand">stand</button>');
		$('#hit').on("click", function(event){
			dealer.dealToPlayer();
			player.checksValueOfHand();
			player.move();	
		});
		$('#stand').on("click", function(event){
			cardBackToggle();
			dealer.move();
		});
		$('#status').text("hit or stand??");			
	},
	bets : function(){},
	wins : function(){
		playerDollars += bet*2;
		$("#account-balance").text("$" + playerDollars);
		setTimeout(function(){
			cardBackToggle();
			modal.toggle();
		}, 1250);
		$('#modal-status').text("you scored " + playerCardsValue + ". dealer scored " + dealerCardsValue +  ". you win $" + bet + "!");
		resetBet();
	},
	lose : function(){
		setTimeout(function(){
			cardBackToggle();
			modal.toggle();
		}, 1250);
		$('#modal-status').text("you scored " + playerCardsValue + ". dealer scored " + dealerCardsValue +  ". you lose $" + bet + "!");
		resetBet();
	}
}

var dealer = {
	dealerHand : [],
	checksValueOfHand : function(){
		dealerCardsValue = 0;		
		$.each(dealer.dealerHand, function(i, playerCard, array){
			dealerCardsValue = dealerCardsValue + playerCard.cardValue;
		});
		$('#dealer-score').text("Dealer Score is " + dealerCardsValue);
	},
	dealToDealer : function (){
		var newDealerCard = arrayDeckOfCards.pop();
		this.dealerHand.push(newDealerCard);
		$('div#dealer-hand').append('<div class="card"><img src="assets/card_images/' + newDealerCard.cardImage + ' "class="card animated bounceInDown"></div>')
		$('#cards-left-in-deck').text(arrayDeckOfCards.length + " cards left in the deck!");
	},
	dealToPlayer : function(){
		var newPlayerCard = arrayDeckOfCards.pop();
		player.playerHand.push(newPlayerCard);
		$('div#player-hand').append('<div class="card"><img src="assets/card_images/' + newPlayerCard.cardImage + ' "class="card animated bounceInUp"></div>');		
		$('#cards-left-in-deck').text(arrayDeckOfCards.length + " cards left in the deck!");	
	},
	move : function (){
		// debugger
		if (dealerCardsValue > 21){
			$.each(dealer.dealerHand, function(i, dealerCard, array){
				if(dealerCard.cardType === "A"){
					dealerCardsValue -= 10;
				}
			});
		}
		if(dealerCardsValue <= 17){
			while(dealerCardsValue <= 17){
				this.dealToDealer();
				this.checksValueOfHand();		
			}
		}
		if (dealerCardsValue === 21 && playerCardsValue !== 21){
			$('modal-header').text("dealer got 21, sucka!");
			player.lose();
		}
		if(dealerCardsValue > playerCardsValue && dealerCardsValue < 21){
			player.lose();
		}
		if (dealerCardsValue > 21){
			$('#modal-header').text("dealer bust$$$$!");
			player.wins();
		}
		if (dealerCardsValue > 17 && playerCardsValue > dealerCardsValue && playerCardsValue <= 21){
			player.wins();
		}
		checkForTie();

  }
}

newHandButton.on('click', function(event){
  modal.toggle();
  newHand();
})
// *************BETTING****************
$("#place-bet").on("click", function(e){
 	bet = $('input#current-bet-input').val();	
	bet = parseInt(bet);
	$('#current-bet').text(bet);
	playerDollars -= bet;
	$("#account-balance").text("$" + playerDollars);
	$("#current-bet-input").val('$0');
	$("#animate-bet h3").addClass("animated zoomIn");
});

var resetBet = function resetBet() {
	bet = 0;
	$("#current-bet").text(bet);
	$("#current-bet-input").val('');
}
// *************************************
var cardBackToggle = function cardBackToggle(){
	while(cardBackToggleSet===0){
		$("#card-back").toggle();
		$('#dealer-score').toggle();
		cardBackToggleSet++;
	}
}
