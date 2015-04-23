/**
 * Square --
 * Object is used ONLY for filling in a player's colors when a square is claimed.
 * The actual detection of completed squares is done in Board using Line objects.
 *
 * Constructor Input:
 *   - board: reference to the gameboard object
 *   - x and y: raw pixel coordinates inside the SVG element
 *   - offset: extra pixels to add to x and y due to the radius of the left-most
 *             dot pushing things down and right a little.
 */
function Square(board, x, y, offset) {

	// Private: default opacity for colored squares
	var opacity = 0.4;

	// Private: Physical coordinates on the gameboard.
	var xBoard = x * board.getSquareWidth();
	var yBoard = y * board.getSquareHeight();

	// Private: Square DOM element
	var square = document.createElementNS("http://www.w3.org/2000/svg", "rect");

	/*************************************************************************/

	/**
	 * Public: Draws an invisible square on the gameboard, which will be filled
	 * in once a player claims it.
	 */
	this.draw = function () {

		square.setAttribute('x', xBoard + offset);
		square.setAttribute('y', yBoard + offset);
		square.setAttribute('width', board.getSquareWidth());
		square.setAttribute('height', board.getSquareHeight());
		square.setAttribute('fill', '#ffffff');
		square.setAttribute('style', 'opacity: ' + opacity + '; fill-opacity: ' +
			opacity + '; stroke-opacity: ' + opacity + ';');

		board.getSvg().appendChild(square);
	}

	/*************************************************************************/

	/**
	 * Public: fills in the square with the given color.
	 */
	this.fill = function (color) {

		square.setAttribute('fill', color);
	}
}

