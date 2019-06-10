(function() {
  'use strict';

  angular.module('FarolComponents').component('frlFieldBoolean', {
    controllerAs: 'vmdr',
    controller: 'FrlFieldBooleanController',
    bindings: {
      fieldName: '@frlFieldname',
      hint: '@?frlHint',
      readonly: '<?frlReadonly',
      hidden: '<?frlHidden',
      model: '=frlModel',
      initialValue: '@?frlInitialvalue',
    },
    template: `@@include('frl-field-boolean.html')`,
  });
})();
