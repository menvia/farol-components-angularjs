(function() {
  'use strict';

  angular.module('FarolComponents').component('frlFieldSelect', {
    bindings: {
      fieldName: '@frlFieldname',
      hint: '@?frlHint',
      readonly: '<?frlReadonly',
      required: '<?frlRequired',
      hidden: '<?frlHidden',
      nonMaterialView: '<?frlNonmaterialview',
      multiple: '<?frlMultiple',
      model: '=frlModel',
      initialValue: '@?frlInitialvalue',
      rawList: '<frlList',
      itemnamefield: '@?frlItemnamefield',
      itemidfield: '@?frlItemidfield',
      basemodel: '<?frlBasemodel',
    },
    controller: 'FrlFieldSelectController',
    controllerAs: 'vmcpt',
    template: `@@include('frl-field-select.html')`,
  });
})();
