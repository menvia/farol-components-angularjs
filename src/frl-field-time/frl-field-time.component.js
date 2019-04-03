(function() {
  'use strict';

  angular.module('FarolComponents').component('frlFieldTime', {
    controllerAs: 'vmcpt',
    controller: 'FrlFieldTimeController',
    bindings: {
      fieldName: '@frlFieldname',
      hint: '@?frlHint',
      readonly: '<?frlReadonly',
      required: '<?frlRequired',
      hidden: '<?frlHidden',
      minValue: '<?frlMinvalue',
      maxValue: '<?frlMaxvalue',
      hasDate: '<?frlHasdate',
      hasTime: '<?frlHastime',
      model: '=frlModel',
      initialValue: '@?frlInitialvalue',
    },
    template: `@@include('frl-field-time.html')`,
  });
})();
