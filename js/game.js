/**
 * Game --
 * Main entrypoint to the "Dots and Boxes" game. Provides public methods to
 * start a game and to complete a turn (the latter is ordinarily called by a
 * Line's onclick event handler.) Game handles scoring and interfaces with the
 * UI via user-defined callbacks.
 *
 * Constructor Input:
 *   - An object containing configuration information for the game. Some are
 *     required and some are optional. The following options can be set:
 *
 *     width (required) - number of squares in the horizontal direction
 *     height (required) - number of squares in the vertical direction
 *     numPlayers (required) - number of players in the game
 *     boardId (required) - HTML ID of the gameboard's SVG element
 *     getPlayerData (required) - user-defined callback that retrieves information
 *                                about each player
 *     displayCurrentPlayer (optional) - user-defined callback that displays the
 *                                       current player
 *     displayWinner (optional) - user-defined callback that displays the winner
 *                                when the game ends (if there is a winner)
 *     displayTie (optional) - user-defined callback that displays the results of
 *                             a tie
 */
function Game(options) {

	// Private: Represents players in the game.
	var players = [];

	// Private: Index pointing to the current player in players.
	var curPlayer = 0;

	// Once this adds up to the total number of squares, we declare a winner
	// (or maybe a tie?)
	var totalScore = 0;

	// Private: The game board.
	var board;

	// Private: Optional callback that displays information about the current player.
	var displayCurrentPlayer = false;

	// Private: Optional callback that announces the winner.
	var displayWinner = false;

	// Private: Optional callback that announces a tie.
	var displayTie = false;

	/*************************************************************************/

	if (typeof(options.width) != 'number' || options.width < 1) {
		throw "width must be at least 1";
	}

	if (typeof(options.height) != 'number' || options.height < 1) {
		throw "height must be at least 1";
	}

	if (typeof(options.numPlayers) != 'number' || options.numPlayers < 2) {
		throw "numPlayers must be set and must be an integer greater than or equal to 2";
	}

	if (typeof(options.boardId) != 'string' || options.boardId.length < 1) {
		throw "the id of the gameboard's SVG tag must be specified";
	}

	// Required callback that provides the game with information about a player.
	if (typeof(options.getPlayerData) != 'function') {
		throw "getPlayerData must be set and must be a function";
	}

	if (typeof(options.displayCurrentPlayer) != 'undefined') {
		if ('function' == typeof(options.displayCurrentPlayer)) {
			displayCurrentPlayer = options.displayCurrentPlayer;
		} else {
			throw "displayCurrentPlayer must be a function";
		}
	}

	if (typeof(options.displayWinner) != 'undefined') {
		if ('function' == typeof(options.displayWinner)) {
			displayWinner = options.displayWinner;
		} else {
			throw "displayWinner must be a function";
		}
	}

	if (typeof(options.displayTie) != 'undefined') {
		if ('function' == typeof(options.displayTie)) {
			displayTie = options.displayTie;
		} else {
			throw "displayTie must be a function";
		}
	}

	board = new Board(this, options.boardId, options.width, options.height);

	/*************************************************************************/

	/**
	 * Private: This function generates vibrant, "evenly spaced" colours (i.e.
	 * no clustering). This is ideal for creating easily distinguishable vibrant
	 * markers in Google Maps and other apps.
	 * Adam Cole, 2011-Sept-14
	 * HSV to RBG adapted from:
	 * http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript
	 * And I (James Colannino) stole this from:
	 * http://stackoverflow.com/questions/1484506/random-color-generator-in-javascript
	 */
	var getPlayerColor = function (numOfSteps, step) {

		var r, g, b;
		var h = step / numOfSteps;
		var i = ~~(h * 6);
		var f = h * 6 - i;
		var q = 1 - f;

		switch(i % 6) {
			case 0: r = 1, g = f, b = 0; break;
			case 1: r = q, g = 1, b = 0; break;
			case 2: r = 0, g = 1, b = f; break;
			case 3: r = 0, g = q, b = 1; break;
			case 4: r = f, g = 0, b = 1; break;
			case 5: r = 1, g = 0, b = q; break;
		}

		return "#" + ("00" + (~ ~(r * 255)).toString(16)).slice(-2) +
			("00" + (~ ~(g * 255)).toString(16)).slice(-2) + ("00" +
			(~ ~(b * 255)).toString(16)).slice(-2);
	}

	/*************************************************************************/

	/**
	 * Private: Retrieves information for each player in the game. Calls a
	 * user-supplied method for retrieving the player's data.
	 */
	var getPlayers = function () {

		for (var i = 0; i < options.numPlayers; i++) {

			players[i] = options.getPlayerData(i + 1);
			players[i].index = i;
			players[i].score = 0;
			players[i].color = getPlayerColor(options.numPlayers, i);
		}
	}

	/*************************************************************************/

	/**
	 * Private: notifies the current player that it's their turn.
	 */
	var notifyPlayer = function () {

		// If we were given a callback, use it to display information about the
		// current player
		if (displayCurrentPlayer) {
			displayCurrentPlayer(players[curPlayer]);
		}
	}

	/*************************************************************************/

	/**
	 * Private: Increments the current player.
	 */
	var togglePlayer = function () {

		curPlayer++;
		curPlayer %= options.numPlayers;
	}

	/*************************************************************************/

	/**
	 * Private: Figure out who won the game and announce the good news!
	 */
	var announceWinner = function () {

		var highScoreTies = [];
		var highScorePlayer = players[0];

		// figure out the highest scoring player
		for (var i = 0; i < players.length; i++) {

			if (players[i].score > highScorePlayer.score) {
				highScorePlayer = players[i];
			}
		}

		// figure out if there are any ties
		for (var i = 0; i < players.length; i++) {
			if (players[i].score == highScorePlayer.score &&
			players[i].index != highScorePlayer.index) {
				highScoreTies.push(players[i]);
			}
		}

		// Uh oh, there were ties!
		if (highScoreTies.length > 0 && displayTie) {
			displayTie(highScoreTies);
		}

		// Annnnd, we have a winner!
		else if (displayWinner) {
			displayWinner(highScorePlayer);
		}
	}

	/*************************************************************************/

	/**
	 * Public: Starts the game.
	 */
	this.start = function () {

		getPlayers();
		board.init();
		board.draw();

		// Let the first player know that it's their turn.
		notifyPlayer();
	}

	/*************************************************************************/

	/**
	 * Public: Called whenever the current player clicks on a line segment.
	 * This completes that player's turn.
	 */
	this.completeTurn = function (line) {

		var score = board.claimLine(players[curPlayer], line);

		if (score > 0) {

			totalScore += score;
			players[curPlayer].score += score;

			// Check to see if all the squares have been filled in
			if (totalScore == options.width * options.height) {
				announceWinner();
				return;
			}
		}

		// move on to the next player if a square wasn't completed
		else {
			togglePlayer(players[curPlayer]);
		}

		// Let the current player know that it's their turn.
		notifyPlayer();
	}
}

