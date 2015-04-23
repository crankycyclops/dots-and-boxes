/**
 * Vertex --
 * Used to define Line objects and to draw a matrix of dots on the gameboard.
 *
 * Constructor Input:
 *   - board: a reference to the parent game board
 *   - x: horizontal coordinate (a grid coordinate, not a raw pixel location)
 *   - y: vertical coordinate (a grid coordinate, not a raw pixel location)
 */
function Vertex(board, x, y) {

	// Circle style.
	var radius = 13;
	var outlineWidth = 1;
	var outline = 'black';
	var fill = 'black';

	/*************************************************************************/

	/**
	 * Public: Accessors for the vertex's coordinate and radius.
	 */
	this.getX      = function () {return x}
	this.getY      = function () {return y}
	this.getRadius = function () {return radius}

	/*************************************************************************/

	/**
	 * Public: Draws the vertex as a dot on the gameboard.
	 */
	this.draw = function () {

		var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");

		var xBoard = radius + board.getSquareWidth() * x;
		var yBoard = radius + board.getSquareHeight() * y;

		circle.setAttribute('cx', xBoard);
		circle.setAttribute('cy', yBoard);
		circle.setAttribute('r', radius);
		circle.setAttribute('stroke', outline);
		circle.setAttribute('stroke-width', outlineWidth);
		circle.setAttribute('fill', fill);

		board.getSvg().appendChild(circle);
	}
}

