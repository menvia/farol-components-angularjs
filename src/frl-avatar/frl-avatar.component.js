(function() {
  'use strict';
  angular.module('FarolComponents').component('frlAvatar', {
    bindings: {
      class: '@',
      size: '=?',
      userId: '=',
      userName: '=',
    },
    controller: 'frlAvatarController',
    controllerAs: 'vmdr',
    template: `@@include('frl-avatar.html')`,
  });
})();
