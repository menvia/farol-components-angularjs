(function() {
  'use strict';

  angular.module('FarolComponents').component('frlFieldAction', {
    controllerAs: 'vmcpt',
    controller: 'FrlFieldActionController',
    bindings: {
      fieldName: '<fieldName',
      text: '<?text',
      action: '<action'
    },
    template: `@@include('frl-field-action.html')`
  });
})();
