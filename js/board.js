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

	/**
	 * Draws a line segment and attaches to it the appropriate event handlers.
	 */
	var drawLine = function (vertex1, vertex2) {

		var line = document.createElementNS("http://www.w3.org/2000/svg", "line");

		line.setAttribute('x1', vertex1.getRadius() + vertex1.getX() * squareWidth);
		line.setAttribute('y1', vertex1.getRadius() + vertex1.getY() * squareHeight);
		line.setAttribute('x2', vertex2.getRadius() + vertex2.getX() * squareWidth);
		line.setAttribute('y2', vertex2.getRadius() + vertex2.getY() * squareHeight);
		line.setAttribute('class', 'segment');

		// used to retrieve the vertice pair associated with the line on a click event
		line.setAttribute('data-vx1', vertex1.getX());
		line.setAttribute('data-vy1', vertex1.getY());
		line.setAttribute('data-vx2', vertex2.getX());
		line.setAttribute('data-vy2', vertex2.getY());

		// mark the line segment as taken whenever it's clicked on
		line.addEventListener('click', function (e) {

			// make sure the segment hasn't already been taken before completing the turn
			if (!e.target.getAttribute('data-taken')) {

				var vertex1 = vertices[e.target.getAttribute('data-vy1')][e.target.getAttribute('data-vx1')];
				var vertex2 = vertices[e.target.getAttribute('data-vy2')][e.target.getAttribute('data-vx2')];

				game.completeTurn(vertex1, vertex2);
				e.target.setAttribute('data-taken', 1);
			}
		});

		svg.appendChild(line);
	}

	/*************************************************************************/

	/**
	 * Draws line segments between the vertices.
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

