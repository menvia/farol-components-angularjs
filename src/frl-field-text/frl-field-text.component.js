(function() {
  'use strict';

  angular.module('FarolComponents').component('frlFieldText', {
    controllerAs: 'vmcpt',
    controller: 'FrlFieldTextController',
    bindings: {
      fieldName: '@frlFieldname',
      hint: '@?frlHint',
      readonly: '<?frlReadonly',
      required: '<?frlRequired',
      hidden: '<?frlHidden',
      minLength: '<?frlMinlength',
      maxLength: '<?frlMaxlength',
      mask: '@?frlMask',
      pattern: '@?frlPattern',
      patternDescription: '@?frlPatterndescription',
      nonMaterialView: '<?frlNonmaterialview',
      model: '=frlModel',
      initialValue: '@?frlInitialvalue',
    },
    template: `@@include('frl-field-text.html')`,
  });
})();
