(function() {
  'use strict';

  angular
      .module('FarolComponents')
      .controller('FrlFieldTextController', FrlFieldTextController);

  /**
   * Controller for Farol Text Field Directive
   * @param       {Object} uuid Service
   * @constructor
   * @ngInject
   */
  function FrlFieldTextController(uuid) {
    // variables
    const vmcpt = this;
    // Methods
    // init
    vmcpt.$onInit = () => {
      if (
        vmcpt.initialValue &&
        (vmcpt.model === '' || vmcpt.model === undefined)
      ) {
        vmcpt.model = String(vmcpt.initialValue);
      }
      vmcpt.finishedLoading = true;
    };
  }
})();
