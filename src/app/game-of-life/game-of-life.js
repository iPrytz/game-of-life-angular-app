angular
  .module('gameOfLife')
  .component('gameOfLife', {
    templateUrl: 'app/game-of-life/game-of-life.html',
    controller: GameOfLifeCtrl
  });

/** @ngInject */
function GameOfLifeCtrl(gameOfLifeService, $interval) {
  var vm = this;

  vm.tickSpeed = 200; //between 50 - 500
  vm.gameOfLifeService = gameOfLifeService;
  var interval;

  vm.$onInit = function() {
    vm.selectedPatternName = 'tretton37';
    vm.world = vm.gameOfLifeService.createGrid(45, 85, vm.selectedPatternName);
    vm.patternNames = vm.gameOfLifeService.getPatternNames();
  };

  vm.onPatternChange = function() {
    vm.stopTicks();
    vm.world = vm.gameOfLifeService.createGrid(45, 85, vm.selectedPatternName);
  };

  vm.onTickSpeedChange = function() {
    if (interval) {
      $interval.cancel(interval);
      interval = $interval(function() {
        vm.gameOfLifeService.makeATick(vm.world);
      }, vm.tickSpeed);
    }
  };

  vm.startTicks = function() {
    interval = $interval(function() {
      vm.gameOfLifeService.makeATick(vm.world);
    }, vm.tickSpeed);
    vm.gameRunning = true;
  };

  vm.stopTicks = function() {
    if (interval) {
      $interval.cancel(interval);
      interval = null;
    }
    vm.gameRunning = false;
  };

  vm.resetGame = function() {
    vm.world = vm.gameOfLifeService.createGrid(45, 85, vm.selectedPatternName);
  };
}
