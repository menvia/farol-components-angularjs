(function() {
  'use strict';

  angular.module('FarolComponents').component('frlDataRower', {
    bindings: {
      baseModel: '=frlBaseModel',
      model: '=frlModel',
      modelPath: '@frlModelPath',
      fieldName: '@frlFieldname',
      childrenDefinitions: '<?frlChildrendefinitions',
      hint: '@?frlHint',
      readonly: '<?frlReadonly',
      required: '<?frlRequired',
      minLength: '<?frlMinlength',
      maxLength: '<?frlMaxlength',
      initialValue: '<?frlInitialvalue',
      itemNameField: '@?frlItemnamefield',
      itemOrderField: '@?frlItemorderfield',
    },
    controller: 'FrlDataRower',
    controllerAs: 'vmcpt',
    template: `@@include('frl-data-rower.html')`,
  });
})();
