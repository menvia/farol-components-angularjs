(function() {
  'use strict';

  angular.module('FarolComponents').component('frlDefinitionTabber', {
    bindings: {
      baseModel: '=frlBaseModel',
      model: '=frlModel',
      modelPath: '@frlModelPath',
      fieldName: '@?frlFieldname',
      rawChildren: '<frlChildren',
      childrenDefinitions: '<?frlChildrendefinitions',
      hint: '@?frlHint',
      readonly: '<?frlReadonly',
      required: '<?frlRequired',
      modelFilterField: '@?frlModelfilterfield',
      itemNameField: '@?frlItemnamefield',
    },
    controller: 'FrlDefinitionTabber',
    controllerAs: 'vmcpt',
    template: `@@include('frl-definition-tabber.html')`,
  });
})();
