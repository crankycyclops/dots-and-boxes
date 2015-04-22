function Vertex(board, x, y) {

	// Circle style.
	var radius = 10;
	var outlineWidth = 1;
	var outline = 'black';
	var fill = 'black';

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

