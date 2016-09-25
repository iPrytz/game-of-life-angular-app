describe('gameOfLifeService', function() {
  beforeEach(module('gameOfLife'));
  var gameOfLifeService;
  var grid;
  var cellX = 1;
  var cellY = 1;
  beforeEach(inject(function(_gameOfLifeService_) {
    gameOfLifeService = _gameOfLifeService_;
    grid = gameOfLifeService.createGrid(15, 15);
  }));

  it('the game grid should have the specified rows and columns', function() {
    expect(grid.length).toEqual(15);
    expect(grid[0].length).toEqual(15);
  });

  it('try if cell rules is applied in correct way', function() {
    var cellBeforeTick = angular.copy(grid[cellX][cellY]);
    var cellAfterTick = grid[cellX][cellY];
    var aliveNeighbours = countAliveNeighbours(cellX, cellY);
    gameOfLifeService.makeATick(grid);
    testRules(cellBeforeTick, cellAfterTick, aliveNeighbours);
  });

  it('try if cell rules is applied in correct way a second time', function() {
    gameOfLifeService.makeATick(grid);

    var cellAfterOneTick = angular.copy(grid[cellX][cellY]);
    var cellAfterTwoTick = grid[cellX][cellY];
    var aliveNeighbours = countAliveNeighbours(cellX, cellY, aliveNeighbours);
    gameOfLifeService.makeATick(grid);
    testRules(cellAfterOneTick, cellAfterTwoTick);
  });

  function countAliveNeighbours(cellX, cellY){
    aliveNeighbours = 0;
    if (grid[cellX - 1][cellY - 1].isAlive) {
      aliveNeighbours++;
    }
    if (grid[cellX - 1][cellY].isAlive) {
      aliveNeighbours++;
    }
    if (grid[cellX - 1][cellY + 1].isAlive) {
      aliveNeighbours++;
    }
    if (grid[cellX][cellY - 1].isAlive) {
      aliveNeighbours++;
    }
    if (grid[cellX][cellY + 1].isAlive) {
      aliveNeighbours++;
    }
    if (grid[cellX + 1][cellY - 1].isAlive) {
      aliveNeighbours++;
    }
    if (grid[cellX + 1][cellY].isAlive) {
      aliveNeighbours++;
    }
    if (grid[cellX + 1][cellY + 1].isAlive) {
      aliveNeighbours++;
    }
    return aliveNeighbours;
  }

  function testRules(cellBeforeTick, cellAfterTick, aliveNeighbours){
    if (cellBeforeTick.isAlive) {
      if (aliveNeighbours <= 1 || aliveNeighbours >= 4) {
        expect(cellAfterTick.isAlive).toBe(false);
      } else if (aliveNeighbours === 3 || aliveNeighbours === 2) {
        expect(cellAfterTick.isAlive).toBe(true);
      }
    } else if (!cellBeforeTick.isAlive) {
      if (aliveNeighbours === 3) {
        expect(cellAfterTick.isAlive).toBe(true);
      } else {
        expect(cellAfterTick.isAlive).toBe(false);
      }
    }
  }

});
