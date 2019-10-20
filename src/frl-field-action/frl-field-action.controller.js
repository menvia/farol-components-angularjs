(function() {
  'use strict';

  angular
    .module('FarolComponents')
    .controller('FrlFieldActionController', FrlFieldActionController);

  /**
   * Controller for Farol Text Field Directive
   * @param       {Object} uuid Service
   * @constructor
   * @ngInject
   */
  function FrlFieldActionController(uuid) {
    // variables
    const vmcpt = this;
    // Methods
    // init
    vmcpt.$onInit = () => {
      vmcpt.finishedLoading = true;
    };
  }
})();
