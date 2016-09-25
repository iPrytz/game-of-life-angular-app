angular
  .module('gameOfLife')
  .factory('gameOfLifeService', gameOfLifeService);

/** @ngInject */
function gameOfLifeService(GameOfLifeCell, gameOfLifePatterns) {
  var preDefinedPatterns = gameOfLifePatterns || [];

  function patternContains(x, y, pattern) {
    if (pattern) {
      for (var i = 0; i < pattern.length; i++) {
        if (pattern[i].x === x && pattern[i].y === y) {
          return true;
        }
      }
    }
  }

  function getPatternNames() {
    var propertyNames = [];
    angular.forEach(preDefinedPatterns, function(value, key) {
      this.push(key);
    }, propertyNames);
    return propertyNames;
  }

  function createGrid(row, columns, pattern) {
    var grid = [];
    var preDefinedPattern = preDefinedPatterns[pattern];
    for (var x = 0; x < row; x++) {
      grid[x] = [];

      for (var y = 0; y < columns; y++) {
        var cell = new GameOfLifeCell(x, y);
        cell.makeAlive();
        if (patternContains(x, y, preDefinedPattern)) {
          cell.toggle();
        }
        grid[x].push(cell);
      }

    }
    return grid;
  }

  function isInsideBoundries(grid, x, y) {
    return grid.length && (x >= 0 && x < grid.length && y >= 0 && y < grid[0].length);
  }

  function cellAtPosIsAlive(grid, x, y) {
    return grid[x] && grid[x][y] && grid[x][y].isAlive;
  }

  function countAliveNeighbours(grid, cell) {
    var aliveNeighbours = 0;
    for (var x = -1; x <= 1; x++) {
      for (var y = -1; y <= 1; y++) {
        var xPos = cell.xPos + x;
        var yPos = cell.yPos + y;
        if (!(x === 0 && y === 0) && isInsideBoundries(grid, xPos, yPos) && cellAtPosIsAlive(grid, xPos, yPos)) {
          aliveNeighbours++;
        }
      }
    }
    cell.aliveNeighbours = aliveNeighbours;
  }

  function applyRulesToCell(cell) {
    if (cell.aliveNeighbours <= 1 || cell.aliveNeighbours >= 4 && cell.isAlive) {
      cell.killMe();
    } else if (cell.aliveNeighbours === 3 && !cell.isAlive) {
      cell.makeAlive();
    }
  }

  function makeATick(grid) {
    for (var x1 = 0; x1 < grid.length; x1++) {
      for (var y1 = 0; y1 < grid[0].length; y1++) {
        var cell1 = grid[x1][y1];
        countAliveNeighbours(grid, cell1);
      }
    }

    for (var x2 = 0; x2 < grid.length; x2++) {
      for (var y2 = 0; y2 < grid[0].length; y2++) {
        var cell2 = grid[x2][y2];
        applyRulesToCell(cell2);
      }
    }
  }

  return {
    createGrid: createGrid,
    makeATick: makeATick,
    getPatternNames: getPatternNames
  };
}

