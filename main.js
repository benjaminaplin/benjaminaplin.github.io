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
$('#deal').on("click", function(){
	arrayDeckOfCards = shuffle(arrayDeckOfCards);
	deal();
	player.checksValueOfHand();//*******************************<<<<<<<<<<
	dealer.checksValueOfHand();
	player.choice();//*******************************<<<<<<<<<<PROBLEM HERE IS WHERE CHECKSVALUE OF HAND GETS TRICKY
}); 

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

var newHand = function newHand() {
	player.arrayPlayerHand = [];
	$('div#player-hand').empty();
	playerCardsValue = 0;

	dealer.arrayDealerHand = [];
	$('div#dealer-hand').empty();
	dealerCardsValue = 0;

	deal();
	
	player.checksValueOfHand();
	dealer.checksValueOfHand();
	// debugger
}



var player = {
	dollars : 1000,
	arrayPlayerHand : [],
	checksValueOfHand : function(){
		playerCardsValue = 0;
		$.each(this.arrayPlayerHand, function(i, playerCard, array){
			playerCardsValue += playerCard.cardValue;
			});
		$('#player-score').text(playerCardsValue);
	},
	firstMove : function(){
		if (playerCardsValue === 21){
			$('#status').text("you got 21!");
		}
		if (playerCardsValue > 0 && playerCardsValue < 21){
			this.choice();
			$('#status').text("hit or stand??");			
		}
	},
	nextMove : function(){
		if (playerCardsValue < 21 ){
			$('#status').text("hit or stand??");		
		}
		if (playerCardsValue > 21){
			$('#status').text("you bust, sucka!");
			player.lose();
		}
		if (playerCardsValue === 21){
			$('#status').text("you got 21!");
		}
	},
	dealToPlayer : function(){
		var newPlayerCard = arrayDeckOfCards.pop();
		this.arrayPlayerHand.push(newPlayerCard);
		$('div#player-hand').append('<div class="card"><img src="assets/card_images/' + newPlayerCard.cardImage + ' "class="card"></div>');		
	},
	choice : function(){
		$('#player-choices').append('<button id="hit">hit</button><button id="stand">stand</button>');
		$('#hit').on("click", function(event){
			player.dealToPlayer();
			player.checksValueOfHand();//*******************************<<<<<<<<<<
			player.nextMove();	
		})
		$('#stand').on("click", function(event){
			dealer.choice();
		})
		$('#status').text("hit or stand??");			
	},
	bets : function(){},
	wins : function(){
		console.log("player wins function fired")
		playerWinsModalDiv();
	},
	lose : function(){
		playerLoseModalDiv();
	}
	//bet method takes from player value and puts on table
}
player.firstMove();

//DEALER OBJECT
var dealer = {
	arrayDealerHand : [],
	checksValueOfHand : function(){
		dealerCardsValue = 0;		
		$.each(dealer.arrayDealerHand, function(i, playerCard, array){
			dealerCardsValue = dealerCardsValue + playerCard.cardValue;
		});
		$('#dealer-score').text(dealerCardsValue);
	},
	dealToDealer : function (){
		var newDealerCard = arrayDeckOfCards.pop();
		this.arrayDealerHand.push(newDealerCard);
		$('div#dealer-hand').append('<div class="card"><img src="assets/card_images/' + newDealerCard.cardImage + ' "class="card"></div>')
	},
	choice : function (){
		if(dealerCardsValue <= 17){
			this.dealToDealer();
			this.checksValueOfHand();
			console.log("<=17 dealer takes a card");
		}
		if (dealerCardsValue > 17 && dealerCardsValue < 21){
			console.log("dealers ovrer 17 and under 21");
			$('#status').text("dealer stands, hit again?");
		}
		if (dealerCardsValue > 21){
			console.log("dealer busters");
			$('#status').text("dealer BUSTS");
			player.wins();
		}
		if (dealerCardsValue === 21){
			console.log("dealers  21");
			$('#status').text("dealer got a natch, sucka!");
		}
    }
}

var playerWinsModalDiv = function playerWinsModalDiv(){
	playerWinsModal.toggle();
}

var playerWinsModal = $('#player-wins-modal');
var newHandButton = $('#new-hand-player-wins-modal')	
newHandButton.on('click', function(event){
	console.log("clicked new hand button");
	playerWinsModal.toggle();
	newHand();
})

var playerLoseModalDiv = function playerLoseModalDiv(){
	playerLoseModal.toggle();
}

var playerLoseModal = $('#player-lose-modal');
var newHandButton = $('#new-hand-player-lose-modal')	
newHandButton.on('click', function(event){
		// debugger
    playerLoseModal.toggle();
    newHand();
})





