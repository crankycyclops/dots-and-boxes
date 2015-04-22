function Board(game, boardId, width, height) {

	// Reference to the game object that contains the board. Useful for setting
	// up event handlers. Note that even though Javascript technically doesn't
	// have references, and is always pass-by-value, objects are represented
	// internally as references. Therefore, no actual copying is taking place
	// and using this to access the original object is successful.
	var game = game;

	// SVG DOM element
	var svg = document.getElementById(boardId);

	// Line segments belonging to the squares.
	var lines = [];

	// 2D array of squares.
	var squares = [];

	// Circle style.
	var circleRadius = 10;
	var circleOutline = 'black';
	var circleOutlineWidth = 1;
	var circleFill = 'black';

	/*************************************************************************/

	/**
	 * Private: Draws a single dot on the gameboard at the specified coordinate.
	 */
	var drawDot = function (x, y) {

		var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");

		circle.setAttribute('cx', x);
		circle.setAttribute('cy', y);
		circle.setAttribute('r', circleRadius);
		circle.setAttribute('stroke', circleOutline);
		circle.setAttribute('stroke-width', circleOutlineWidth);
		circle.setAttribute('fill', circleFill);

		svg.appendChild(circle);
	}

	/*************************************************************************/

	/**
	 * Private: Draws the dots.
	 */
	var drawDots = function () {

		var boxWidth = svg.width.baseVal.value;
		var boxHeight = svg.height.baseVal.value;
		var squareWidth = boxWidth / width;
		var squareHeight = boxHeight / height;

		for (var x = circleRadius; x < boxWidth; x += squareWidth) {
			for (var y = circleRadius; y < boxHeight; y += squareHeight) {
				drawDot(x, y);
			}
		}
	}

	/*************************************************************************/

	/**
	 * Private: Deactivates the game board so that players can no longer click
	 * on line segments.
	 */
	var deactivate = function () {

		// TODO
	}

	/*************************************************************************/

	/**
	 * Public: Draws the game board and attaches event handlers to each piece.
	 */
	this.draw = function () {

		// TODO
		drawDots();
	}

	/*************************************************************************/

	/**
	 * Public: Activates the selected line segment and gives credit for the
	 * activation to the specified player.
	 */
	this.markLine = function (player, vertex1, vertex2) {

		// TODO
	}
}

