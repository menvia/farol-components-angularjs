(function() {
  'use strict';

  angular.module('FarolComponents').component('frlFieldNumber', {
    controllerAs: 'vmcpt',
    controller: 'FrlFieldNumberController',
    bindings: {
      fieldName: '@frlFieldname',
      hint: '@?frlHint',
      readonly: '<?frlReadonly',
      required: '<?frlRequired',
      hidden: '<?frlHidden',
      minLength: '<?frlMinlength',
      maxLength: '<?frlMaxlength',
      minValue: '<?frlMinvalue',
      maxValue: '<?frlMaxvalue',
      valueStep: '<?frlValuestep',
      pattern: '@?frlPattern',
      patternDescription: '@?frlPatterndescription',
      nonMaterialView: '<?frlNonmaterialview',
      model: '=frlModel',
      initialValue: '@?frlInitialvalue',
      help: '@?frlHelp',
    },
    template: `@@include('frl-field-number.html')`,
  });
})();
