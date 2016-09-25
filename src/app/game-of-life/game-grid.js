angular
  .module('gameOfLife')
  .component('gameGrid', {
    templateUrl: 'app/game-of-life/game-grid.html',
    bindings: {
      data: '<'
    }
  });
