(function() {
  'use strict';

  angular.module('FarolComponents').component('frlFieldRouter', {
    bindings: {
      // Object from where the attribute will be binded
      model: '=frlModel',
      // Object that contains the entire tree since the root
      baseModel: '=?frlBaseModel',
      // Path that gets you from the baseModel to the local model
      modelPath: '@?frlModelPath',
      /**
       * Definitions is an object with multiple atributes. These
       * attributes contain the information necessary to
       * display the frl-field.
       * Each definition is a object with 2 attributes. This
       * attributes are used by the router to resolve the
       * definition data dynamically:
       *  - method: String - define how to resolve:
       *      - 'static' -> does nothing
       *      - 'model' -> value from model or definition
       *      - 'basemodel' -> get a value from base model
       *      - 'frlapi' -> query API for a value
       *  - params: provide the params the  method need to run
       *      If 'static', params is used as is. If 'model' or
       *      'basemodel', params.path is required. If 'frlapi',
       *      params.frlentity, params.frlparams and params.frlmethod
       *      are required.
       * The definitions can have multiple different attributes
       * depending on the type of the frl-field that it is
       * rendering. There is one attribute that is required for any field:
       *  - fieldtype: string - name of frl-field to render
       */
      rawDefinitions: '<frlFieldDefinitions',
    },
    controller: 'FrlFieldRouterController',
    controllerAs: 'vmcpt',
    template: `@@include('frl-field-router.html')`,
  });
})();
