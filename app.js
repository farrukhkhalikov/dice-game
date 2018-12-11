/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying;
init();

var lastDice;

// scores = [ 0, 0 ];
// roundScore = 0;
// activePlayer = 0; these three variables are wrapped in a function below

// dice = Math.floor(Math.random() * 6) + 1;
// console.log(dice);

// **************************************************
// document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';
// #current- is from HTML file, it is a player specific ID.
// this querySelector method above is called setter because we are setting a value

// var x = document.querySelector('#score-0').textContent;
// console.log(x);

//this method is called getter, because it is just getting info not changing it or anything, its just printing the value of variable x;
// ************************************************

// document.querySelector('.dice').style.display = 'none'; moved to init function below (DRY)

//this method is making a dice element disappear when we load the paga initially.

// document.getElementById('score-0').textContent = '0';
// document.getElementById('score-1').textContent = '0';
// document.getElementById('current-0').textContent = '0';
// document.getElementById('current-1').textContent = '0'; moved into init function below

// this method here sets all the scores to 0 when the game starts
// score and current are IDs grabbed from the HTML file

//****************** */
// function btn() {
//     //do something here
// }
// btn();
/// if we use this function inside our eventListener (after 'click') then this is called call back function because we dont have to call the function
/// eventListener will call the function for us
///************************ */

document.querySelector('.btn-roll').addEventListener('click', function() {
	if (gamePlaying) {
		//1. Random number. (we remove it from outer scope and only this function will have access to this var)
		//also this function will have access to outer scope variables such as scores, roundScore and activePlayer
		//however other functions will not have access to dice variable except for this one
		var dice1 = Math.floor(Math.random() * 6) + 1;
		var dice2 = Math.floor(Math.random() * 6) + 1;

		//2. Display the result
		document.getElementById('dice-1').style.display = 'block';
		document.getElementById('dice-2').style.display = 'block';

		document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
		document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';

		// if (dice === 6 && lastDice === 6) {
			///this here is to check if a player rolls two straigh 6
			// scores[activePlayer] = 0; ///sets the players score to zero
			// document.querySelector('#score-' + activePlayer).textContent = '0';
			// nextPlayer();
		 if (dice1 !== 1 && dice2 !== 1) {
			//3. Update the round score IF the rolled number was NOT a 1
			//add score
			roundScore += dice1 + dice2; //first we are updating the score
			document.querySelector('#current-' + activePlayer).textContent = roundScore; //here we are displaying the score that we have updated
		} else {
			//next player's turn
			nextPlayer();
		}

		// lastDice = dice;

		//do something here
		//this function, which is being used inside the eventListener is called anonymous function
		///it is because we can not use it anywhere else except for here only
	}
});
/// this event listener takes 2 parameters, 1st is the event (when we want something to happen and here it is when smthing is clicked)
// and the second parameter is the function, what we want to happen.

document.querySelector('.btn-hold').addEventListener('click', function() {
	if (gamePlaying) {
		/// Add current score to global score
		scores[activePlayer] += roundScore;

		/// Update the UI
		document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

		///method which gives players to write and store their scores

		var input = document.querySelector('.final-score').value;
		var winningScore;

		//Undefined, o, null, or "" are all COERCED as false
		///Everything else is true

		if (input) {
			//if input is true
			winningScore = input;
		} else {
			winningScore = 100;
		}

		// Check if player has won

		if (scores[activePlayer] >= winningScore) {
			document.querySelector('#name-' + activePlayer).textContent = 'Winner';
			document.getElementById('dice-1').style.display = 'none';
			document.getElementById('dice-2').style.display = 'none';
			document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
			document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
			gamePlaying = false;
		} else {
			/// next player
			nextPlayer();
		}
	}
});

function nextPlayer() {
	activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
	roundScore = 0; // this is done when the 2nd player starts playing his score starts from 0
	//   if (activePlayer === 0) {
	//       activePlayer = 1;
	//   } else {
	//       activePlayer = 0;
	//   }
	/// that ternary statement above is the same thing as writing IF and ELSE statement here
	/// but the ternary statement above is much cleaner.

	document.getElementById('current-0').textContent = 0;
	document.getElementById('current-1').textContent = 0; // this is to set the score to 0 for the User Interface

	document.querySelector('.player-0-panel').classList.toggle('active');
	document.querySelector('.player-1-panel').classList.toggle('active'); //this method is used to toggle between the two players, if one of them scores 1 then the next one gets his turn

	document.getElementById('dice-1').style.display = 'none';
	document.getElementById('dice-2').style.display = 'none'; //this is to make the dice disappear when players take turns playing. (if one looses and its next player's turn the dice will disappear)
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
	///this function kicks off when the game is loaded, it sets everything to 0 and re-starts the game
	scores = [ 0, 0 ];
	activePlayer = 0;
	roundScore = 0;
	gamePlaying = true;

	document.getElementById('dice-1').style.display = 'none';
	document.getElementById('dice-2').style.display = 'none';

	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';

	document.getElementById('name-0').textContent = 'Player 1';
	document.getElementById('name-1').textContent = 'Player 2'; ///when the game is won by any of the players this method resets the names from Winner back to the Player 1 or Player 2

	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');

	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.add('active'); /// sets the active player to be player 1 after one of them has won the game
}
