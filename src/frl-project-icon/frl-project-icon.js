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
  angular
      .module('FarolComponents')
      .controller('frlProjectIconController', function() {
      // variables
        const vmdr = this;
        // Methods
        // init
        vmdr.$onInit = () => {
        // Initialize with default value 40
          vmdr.size = vmdr.size || 36;
        };
      });
})();
