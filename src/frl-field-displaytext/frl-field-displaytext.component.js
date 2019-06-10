(function() {
  'use strict';

  angular.module('FarolComponents').component('frlFieldDisplaytext', {
    controllerAs: 'vmcpt',
    controller: 'FrlFieldDisplaytextController',
    bindings: {
      fieldName: '@frlFieldname',
      hidden: '<?frlHidden',
      model: '=?frlModel',
      text: '@?frlText',
      nonmaterialview: '<?frlNonmaterialview',
    },
    template: `@@include('frl-field-displaytext.html')`,
  });
})();
