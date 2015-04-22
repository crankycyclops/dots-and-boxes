function Game(options) {

	// Private: Represents players in the game.
	var players = [];

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

	if (typeof(options.getPlayerData) != 'function') {
		throw "getPlayerData must be set and must be a function";
	}

	board = new Board(options.width, options.height);

	/*************************************************************************/

	/**
	 * Public: Starts the game.
	 */
	this.start = function () {

		getPlayers();
		board.draw();
	}
}

