(function() {
  'use strict';
  angular
      .module('FarolComponents')
      .controller('frlAvatarController', function($rootScope, $scope, $timeout) {
      // variables
        const vmdr = this;
        // Methods
        // init
        vmdr.$onInit = () => {
          vmdr.reload = true;
          // Initialize with default value 40
          vmdr.size = vmdr.size || 36;
        };
        // Reload on refresh avatar
        $rootScope.$on('refreshAvatar', () => {
          vmdr.reload = false;
          $timeout(() => (vmdr.reload = true), 500);
        });
      });
})();
