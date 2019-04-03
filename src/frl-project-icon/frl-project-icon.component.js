(function() {
  'use strict';
  angular.module('FarolComponents').component('frlProjectIcon', {
    bindings: {
      class: '@',
      size: '=?',
      projectCode: '=',
      projectName: '=',
    },
    controller: 'frlProjectIconController',
    controllerAs: 'vmdr',
    template: `@@include('frl-project-icon.html')`,
  });
})();
