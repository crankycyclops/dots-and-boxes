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

	// Line segment parameters
	var lineWidth = 4;
	var lineColor = '#cccccc';

	/*************************************************************************/

	/**
	 * Initialize the vertices on the board.
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
	 * Private: Draw the dots.
	 */
	var drawDots = function () {

		for (var i = 0; i < vertices.length; i++) {
			for (var j = 0; j < vertices[i].length; j++) {
				vertices[i][j].draw();
			}
		}
	}

	/*************************************************************************/

	var drawLine = function (vertex1, vertex2) {

		var line = document.createElementNS("http://www.w3.org/2000/svg", "line");

		line.setAttribute('x1', vertex1.getRadius() + vertex1.getX() * squareWidth);
		line.setAttribute('y1', vertex1.getRadius() + vertex1.getY() * squareHeight);
		line.setAttribute('x2', vertex2.getRadius() + vertex2.getX() * squareWidth);
		line.setAttribute('y2', vertex2.getRadius() + vertex2.getY() * squareHeight);
		line.setAttribute('stroke-width', lineWidth);
		line.setAttribute('stroke', lineColor);

		svg.appendChild(line);
	}

	/*************************************************************************/

	/**
	 * Draws the line segments between the vertices and attaches event handlers.
	 */
	var drawLines = function () {

		// Draw the horizontal lines
		for (y = 0; y < vertices.length; y++) {
			for (x = 0; x < vertices[y].length - 1; x++) {
				drawLine(vertices[y][x], vertices[y][x + 1]);
			}
		}

		// Draw the vertical lines
		for (y = 0; y < vertices.length - 1; y++) {
			for (x = 0; x < vertices[y].length; x++) {
				drawLine(vertices[y][x], vertices[y + 1][x]);
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
	 * Public: Accessors for important members of the gameboard.
	 */
	this.getSvg          = function () {return svg}
	this.getSquareWidth  = function () {return squareWidth}
	this.getSquareHeight = function () {return squareHeight}

	/*************************************************************************/

	/**
	 * Public: Draws the game board.
	 */
	this.draw = function () {

		initDots();
		drawLines();
		drawDots();
	}
}

