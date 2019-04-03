(function() {
  'use strict';
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
