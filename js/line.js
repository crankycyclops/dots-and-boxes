/**
 * Line --
 * Represents line segments on the game board. Provides methods to draw lines on
 * the game board and to claim lines by players.
 *
 * Constructor Input:
 *   - board: reference to the parent game board
 *   - type: one of 'horizontal' or 'vertical'
 *   - index: array location of the line in the game board's array of lines
 *            (used to easily retrieve the Line object using an onclick event
 *            handler)
 *   - vertex1 and vertex2: Vertex objects that define the Line.
 */
function Line(board, type, index, vertex1, vertex2) {

	// player object if claimed or false if not
	var player = false;

	/**
	 * Public: Accessors for the line's vertices and type (vertical or horizontal.)
	 */
	this.getVertex1 = function () {return vertex1}
	this.getVertex2 = function () {return vertex2}
	this.getType    = function () {return type}

	/*************************************************************************/

	/**
	 * Public: Draws the line on the gameboard.
	 */
	this.draw = function () {

		var that = this;
		var line = document.createElementNS("http://www.w3.org/2000/svg", "line");

		line.setAttribute('class', 'segment');
		line.setAttribute('data-index', index);

		line.setAttribute('x1', vertex1.getRadius() + vertex1.getX() * board.getSquareWidth());
		line.setAttribute('y1', vertex1.getRadius() + vertex1.getY() * board.getSquareHeight());
		line.setAttribute('x2', vertex2.getRadius() + vertex2.getX() * board.getSquareWidth());
		line.setAttribute('y2', vertex2.getRadius() + vertex2.getY() * board.getSquareHeight());

		// used to retrieve the vertice pair associated with the line on a click event
		line.setAttribute('id', 'line-' + vertex1.getX() + '-' +
			vertex1.getY() + '-' + vertex2.getX() + '-' + vertex2.getY());

		// mark the line segment as taken whenever it's clicked on
		line.addEventListener('click', function (e) {

			// make sure the segment hasn't already been taken before completing the turn
			if (!player) {
				board.getGame().completeTurn(that);
			}
		});

		board.getSvg().appendChild(line);
	}

	/*************************************************************************/

	/**
	 * Public: claim this line by a player.
	 */
	this.claim = function (p) {

		player = p;

		// mark the line segment with the player's color
		lineDOM = document.getElementById('line-' + vertex1.getX() + '-' +
			vertex1.getY() + '-' + vertex2.getX() + '-' + vertex2.getY());
		lineDOM.setAttribute('style', 'stroke: ' + player.color + ' !important');
	}

	/*************************************************************************/

	/**
	 * Public: Returns the line's player (or false if not claimed.)
	 */
	this.getPlayer = function () {return player}

	/*************************************************************************/

	/**
	 * Public: Returns true if the line has been claimed and false if not.
	 */
	this.isClaimed = function () {return player ? true : false}
}
