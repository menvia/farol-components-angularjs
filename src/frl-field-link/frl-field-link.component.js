(function() {
  'use strict';

  angular.module('FarolComponents').component('frlFieldLink', {
    controllerAs: 'vmcpt',
    controller: 'FrlFieldLinkController',
    bindings: {
      fieldName: '@frlFieldname',
      hint: '@?frlHint',
      readonly: '<?frlReadonly',
      required: '<?frlRequired',
      hidden: '<?frlHidden',
      model: '=frlModel',
      initialValue: '@?frlInitialvalue',
    },
    template: `@@include('frl-field-link.html')`,
  });
})();
