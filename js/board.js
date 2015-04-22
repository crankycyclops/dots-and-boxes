function Board(game, boardId, width, height) {

	var that = this;

	// Reference to the game object that contains the board. Useful for setting
	// up event handlers. Note that even though Javascript technically doesn't
	// have references, and is always pass-by-value, objects are represented
	// internally as references. Therefore, no actual copying is taking place
	// and using this to access the original object is successful.
	var game = game;

	// SVG DOM element
	var svg = document.getElementById(boardId);

	// Game board parameters. Used to draw the correct number of dots and squares.
	var boxWidth = svg.width.baseVal.value;
	var boxHeight = svg.height.baseVal.value;
	var squareWidth = boxWidth / (width + 1);
	var squareHeight = boxHeight / (height + 1);

	// 2D array of vertices
	var vertices = [];

	// Lines connecting the vertices
	var lines = [];

	/*************************************************************************/

	/**
	 * Private: Initialize the vertices on the board.
	 */
	var initDots = function () {

		for (var y = 0; y <= height; y++) {
			vertices[y] = [];
			for (var x = 0; x <= width; x++) {
				vertices[y][x] = new Vertex(that, x, y);
			}
		}
	}

	/*************************************************************************/

	/**
	 * Private: Initializes the line segments between the vertices.
	 */
	var initLines = function () {

		// current index into array of lines
		var index = 0;

		// Draw the horizontal lines
		for (y = 0; y < vertices.length; y++) {
			for (x = 0; x < vertices[y].length - 1; x++) {
				var line = new Line(that, 'horizontal', index, vertices[y][x], vertices[y][x + 1]);
				lines.push(line);
				index++;
			}
		}

		// Draw the vertical lines
		for (y = 0; y < vertices.length - 1; y++) {
			for (x = 0; x < vertices[y].length; x++) {
				var line = new Line(that, 'vertical', index, vertices[y][x], vertices[y + 1][x]);
				lines.push(line);
				index++;
			}
		}
	}

	/*************************************************************************/

	/**
	 * Private: Takes as input a pair of [x, y] coordinates and returns the line
	 * if it exists or null if it doesn't or if it's out of bounds.
	 */
	var getLine = function (coord1, coord2) {

		// out of bounds
		if (coord1[0] < 0 || coord1[1] < 0 || coord1[0] > width || coord1[1] > height) {
			return null;
		}

		else if (coord2[0] < 0 || coord2[1] < 0 || coord2[0] > width || coord2[1] > height) {
			return null;
		}

		var lineDOM = document.getElementById('line-' + coord1[0] + '-' + coord1[1] + '-' + coord2[0] + '-' + coord2[1]);
		return !lineDOM ? null : lines[parseInt(lineDOM.getAttribute('data-index'))];
	}

	/*************************************************************************/

	/**
	 * Private: Fills in the square defined by the four lines (in an array) using
	 * a player's color.
	 */
	var fillBox = function (player, lines) {

		var xVals = [];
		var yVals = [];

		for (var i = 0; i < 4; i++) {
			xVals.push(lines[i].getVertex1().getX());
			xVals.push(lines[i].getVertex2().getX());
			yVals.push(lines[i].getVertex1().getY());
			yVals.push(lines[i].getVertex2().getY());
		}

		// figure out coordinates of fill square
		var minX = Math.min.apply(Math, xVals);
		var maxX = Math.max.apply(Math, xVals);
		var minY = Math.min.apply(Math, yVals);
		var maxY = Math.max.apply(Math, yVals);

		// TODO: draw fill square
	}

	/*************************************************************************/

	/**
	 * Private: Checks whether or not any boxes were completed. If so, they're
	 * marked as completed by the specified player. Returns number of newly
	 * completed squares.
	 */
	var checkBoxes = function (line) {

		var lineX1 = line.getVertex1().getX();
		var lineY1 = line.getVertex1().getY();
		var lineX2 = line.getVertex2().getX();
		var lineY2 = line.getVertex2().getY();

		var score = 0;

		// check squares on the top and bottom of the line
		if ('horizontal' == line.getType()) {

			// top square
			var topTop = getLine([lineX1, lineY1 - 1], [lineX2, lineY2 - 1]);
			var topLeft = getLine([lineX1, lineY1 - 1], [lineX1, lineY1]);
			var topRight = getLine([lineX2, lineY2 - 1], [lineX2, lineY2]);

			if (topTop && topTop.isClaimed() &&
			topLeft && topLeft.isClaimed() &&
			topRight && topRight.isClaimed()) {
				fillBox(line.getPlayer(), [line, topRight, topTop, topLeft]);
				score++;
			}

			// bottom square
			var bottomBottom = getLine([lineX1, lineY1 + 1], [lineX2, lineY2 + 1]);
			var bottomLeft = getLine([lineX1, lineY1], [lineX1, lineY1 + 1]);
			var bottomRight = getLine([lineX2, lineY2], [lineX2, lineY2 + 1]);

			if (bottomBottom && bottomBottom.isClaimed() &&
			bottomLeft && bottomLeft.isClaimed() &&
			bottomRight && bottomRight.isClaimed()) {
				fillBox(line.getPlayer(), [line, bottomRight, bottomBottom, bottomLeft]);
				score++;
			}
		}

		// check squares to the left and right of the line
		else {

			// left square
			var leftLeft = getLine([lineX1 - 1, lineY1], [lineX2 - 1, lineY2]);
			var leftTop = getLine([lineX1 - 1, lineY1], [lineX1, lineY1]);
			var leftBottom = getLine([lineX2 - 1, lineY2], [lineX2, lineY2]);

			if (leftLeft && leftLeft.isClaimed() &&
			leftTop && leftTop.isClaimed() &&
			leftBottom && leftBottom.isClaimed()) {
				fillBox(line.getPlayer(), [line, leftTop, leftLeft, leftBottom]);
				score++;
			}

			// right square
			var rightRight = getLine([lineX1 + 1, lineY1], [lineX2 + 1, lineY2]);
			var rightTop = getLine([lineX1, lineY1], [lineX1 + 1, lineY1]);
			var rightBottom = getLine([lineX2, lineY2], [lineX2 + 1, lineY2]);

			if (rightRight && rightRight.isClaimed() &&
			rightTop && rightTop.isClaimed() &&
			rightBottom && rightBottom.isClaimed()) {
				fillBox(line.getPlayer(), [line, rightBottom, rightRight, rightTop]);
				score++;
			}
		}

		return score;
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
	 * Public: Claims a line in the name of the specified player and checks
	 * for box completion by said player.
	 */
	this.claimLine = function (player, line) {

		line.claim(player);
		return checkBoxes(line);
	}

	/*************************************************************************/

	/**
	 * Public: Initializes the gameboard's lines and vertices.
	 */
	this.init = function () {

		initDots();
		initLines();
	}

	/*************************************************************************/

	/**
	 * Public: Draws the game board.
	 */
	this.draw = function () {

		// draw the lines
		for (var i = 0; i < lines.length; i++) {
			lines[i].draw();
		}

		// draw the vertices (should be on top of the lines)
		for (var i = 0; i < vertices.length; i++) {
			for (var j = 0; j < vertices[i].length; j++) {
				vertices[i][j].draw();
			}
		}
	}

	/*************************************************************************/

	/**
	 * Public: Accessors for important members of the gameboard.
	 */
	this.getSvg          = function () {return svg}
	this.getGame         = function () {return game}
	this.getSquareWidth  = function () {return squareWidth}
	this.getSquareHeight = function () {return squareHeight}
}
