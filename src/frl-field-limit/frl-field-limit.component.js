(function() {
  'use strict';

  angular.module('FarolComponents').component('frlFieldLimit', {
    bindings: {
      fieldName: '@frlFieldname',
      hint: '@?frlHint',
      readonly: '<?frlReadonly',
      required: '<?frlRequired',
      hidden: '<?frlHidden',
      minValue: '<?frlMinvalue',
      maxValue: '<?frlMaxvalue',
      valueStep: '<?frlValuestep',
      model: '=frlModel',
      initialValue: '@?frlInitialvalue',
    },
    controllerAs: 'vmcpt',
    controller: 'FrlFieldLimitController',
    template: `@@include('frl-field-limit.html')`,
  });
})();
