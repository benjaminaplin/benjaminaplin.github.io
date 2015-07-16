// $(function(){

var cardType =  [2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,6,6,6,6,7,7,7,7,8,8,8,8,9,9,9,9,10,10,10,10,"A","A","A","A","J","J","J","J","K","K","K","K","Q","Q","Q","Q"];
var cardValue = [2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,6,6,6,6,7,7,7,7,8,8,8,8,9,9,9,9,10,10,10,10,1,1,1,1,10,10,10,10,10,10,10,10,10,10,10,10];
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
];
var dealerCardsValue = 0;
var playerCardsValue = 0;
var arrayDeckOfCards = [];

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
$('#start-game').on("click", function(){
	arrayDeckOfCards = shuffle(arrayDeckOfCards);
	deal();
	player.checksValueOfHand();
	dealer.checksValueOfHand();
}); 

var playerChoices = function playerChoices(){
	$('#player-choices').append('<button id="hit">hit</button><button id="stand">stand</button>');
	$('#hit').on("click", function(event){
		player.dealToPlayer();
		player.checksValueOfHand();
		player.nextMove();	
	})
	$('#stand').on("click", function(event){
		dealer.choice();
	})
}

function shuffle(array) {
  var currentIndex = array.length;
  var temporaryValue;
  var randomIndex;
    // While there remain elements to shuffle...
  while (0 !== currentIndex) {
      // Pick a remaining element...
  randomIndex = Math.floor(Math.random() * currentIndex);
  currentIndex -= 1;
      // And swap it with the current element.
  temporaryValue = array[currentIndex];
  array[currentIndex] = array[randomIndex];
  array[randomIndex] = temporaryValue;
  }
  return array;
}

var deal = function deal(){
	player.dealToPlayer();
	dealer.dealToDealer();
	player.dealToPlayer();
	dealer.dealToDealer();
};

var player = {
	dollars : 1000,
	dealToPlayer : function(){
		var newPlayerCard = arrayDeckOfCards.pop();
		this.arrayPlayerHand.push(newPlayerCard);
		$('div#player-hand').append('<div class="card"><img src="assets/card_images/' + newPlayerCard.cardImage + ' "class="card"></div>')
	},
	arrayPlayerHand : [],
	checksValueOfHand : function(){
		$.each(this.arrayPlayerHand, function(i, playerCard, array){
			playerCardsValue = playerCardsValue + playerCard.cardValue;
			});
		$('#player-score').text(playerCardsValue);
	},
	firstMove : function(){
		if (playerCardsValue === 21){
			alert("you got 21!");
		} else if (playerCardsValue < 21){
			playerChoices();
		}
	},
	nextMove : function(){
		if (playerCardsValue < 21 ){
			//get options
		} else if (playerCardsValue > 21){
			$('#status').text("you bust, sucka!");
		}
	},
	
	//run dealer choice method
	//if hit, 
		//run hit function, 
		//run check value, if 21, notify of 21
		//else if bust, notify of bust, game over
		//else run userChoice function again
	bets : function(){}
	//bet method takes from player value and puts on table
}
player.firstMove();

//DEALER OBJECT
var dealer = {
	arrayDealerHand : [],
	checksValueOfHand : function(){
		$.each(dealer.arrayDealerHand, function(i, playerCard, array){
			dealerCardsValue = dealerCardsValue + playerCard.cardValue;
		});
		$('#dealer-score').text(dealerCardsValue);
	},
	nextMove : function() {},
	//method to move - logic: if > 17, stand; if < 17 hit.
	dealToDealer : function (){
		var newDealerCard = arrayDeckOfCards.pop();
		this.arrayDealerHand.push(newDealerCard);
		// console.log(arrayDeckOfCards.length);
		$('div#dealer-hand').append('<div class="card"><img src="assets/card_images/' + newDealerCard.cardImage + ' "class="card"></div>')
	},
	choice : function (){
		// this.checksValueOfHand();
		console.log(dealerCardsValue);

		if(dealerCardsValue < 17){
			this.dealToDealer();
			this.checksValueOfHand();
		} else if (dealerCardsValue > 17){
			console.log("dealers ovrer 17");
			$('#status').text("dealer stands, sucka!");
		} else if (dealerCardsValue === 21){
			console.log("dealers  21");
			$('#status').text("dealer got a natch, sucka!");
		}
	}
}


//GET WINNER FUNCTION
//if tie - end game notify player else
	//if playerObj.getScore > dealerObj.getScore
	//	run playerWins function
	//if dealerObj.getScore > playerObj.getScore
	// 	run dealerWins functio

//PLAYERWINS FUNCTION
//notification, visuals of player win

//DEALERWINS FUNCTION
//notification, visuals of dealer win
	
// })