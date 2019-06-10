(function() {
  'use strict';

  angular.module('FarolComponents').component('frlFieldTextarea', {
    controllerAs: 'vmcpt',
    controller: 'FrlFieldTextareaController',
    bindings: {
      fieldName: '@frlFieldname',
      hint: '@?frlHint',
      readonly: '<?frlReadonly',
      required: '<?frlRequired',
      hidden: '<?frlHidden',
      minLength: '<?frlMinlength',
      maxLength: '<?frlMaxlength',
      pattern: '@?frlPattern',
      patternDescription: '@?frlPatterndescription',
      nonMaterialView: '<?frlNonmaterialview',
      model: '=frlModel',
      initialValue: '@?frlInitialvalue',
    },
    template: `@@include('frl-field-textarea.html')`,
  });
})();
