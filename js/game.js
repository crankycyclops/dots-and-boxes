function Game(options) {

	// Private: Represents players in the game.
	var players = [];

	// Private: Index pointing to the current player in players.
	var curPlayer = 0;

	// Private: The game board.
	var board;

	/*************************************************************************/

	/**
	 * Private: Retrieves information for each player in the game. Calls a
	 * user-supplied method for retrieving the player's data.
	 */
	var getPlayers = function () {

		for (var i = 0; i < options.numPlayers; i++) {

			players[i] = options.getPlayerData(i + 1);
			players[i].index = i;
			players[i].points = 0;

			// Random color generation stolen from:
			// http://www.paulirish.com/2009/random-hex-color-code-snippets/
			players[i].color = '#' + Math.floor(Math.random() * 16777215).toString(16);
		}
	}

	/*************************************************************************/

	/**
	 * Public: Starts the game.
	 */
	this.start = function () {

		getPlayers();
		board.draw();
	}

	/*************************************************************************/

	/**
	 * Public: Called whenever the current player clicks on a line segment.
	 * This completes that player's turn.
	 */
	this.completeTurn = function (line) {

		var score = board.claimLine(players[curPlayer], line);
		if (score > 0) {
			players[curPlayer].score += score;
		}

		// move on to the next player if a square wasn't completed
		else {
			curPlayer++;
			curPlayer %= options.numPlayers;
		}
	}

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

	if (typeof(options.getPlayerData) != 'function') {
		throw "getPlayerData must be set and must be a function";
	}

	board = new Board(this, options.boardId, options.width, options.height);
}

