(function() {
  'use strict';

  angular.module('FarolComponents').component('frlDataTabber', {
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
      wrapAround: '<?frlWraparound',
    },
    controller: 'FrlDataTabber',
    controllerAs: 'vmcpt',
    template: `@@include('frl-data-tabber.html')`,
  });
})();
