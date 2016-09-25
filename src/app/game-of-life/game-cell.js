angular
  .module('gameOfLife')
  .factory('GameOfLifeCell', GameOfLifeCell);

/** @ngInject */
function GameOfLifeCell() {
  function Cell(x, y) {
    this.isAlive = false;
    this.xPos = x;
    this.yPos = y;
    this.aliveNeighbours = 0;
  }

  Cell.prototype.killMe = function() {
    this.isAlive = false;
  };

  Cell.prototype.makeAlive = function() {
    this.isAlive = true;
  };

  Cell.prototype.toggle = function() {
    this.isAlive = !this.isAlive;
  };

  return Cell;
}
