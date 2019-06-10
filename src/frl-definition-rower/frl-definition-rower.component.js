(function() {
  'use strict';

  angular.module('FarolComponents').component('frlDefinitionRower', {
    bindings: {
      baseModel: '=frlBaseModel',
      model: '=frlModel',
      modelPath: '@frlModelPath',
      fieldName: '@?frlFieldname',
      rawChildren: '<frlChildren',
      rawChildrenDefinitions: '<?frlChildrendefinitions',
      hint: '@?frlHint',
      readonly: '<?frlReadonly',
      required: '<?frlRequired',
      inLine: '<?frlInline',
    },
    controller: 'FrlDefinitionRower',
    controllerAs: 'vmcpt',
    template: `@@include('frl-definition-rower.html')`,
  });
})();
