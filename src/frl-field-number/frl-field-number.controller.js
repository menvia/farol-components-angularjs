(function() {
  'use strict';

  angular
      .module('app.farol')
      .controller('FrlFieldNumberController', FrlFieldNumberController);

  /**
   * Controller for Farol Text Field Directive
   * @param       {Object} uuid Service
   * @constructor
   * @ngInject
   */
  function FrlFieldNumberController(uuid) {
    // variables
    const vmcpt = this;
    // Methods
    // init
    vmcpt.$onInit = () => {
      if (
        vmcpt.initialValue &&
        (vmcpt.model === '' || vmcpt.model === undefined)
      ) {
        vmcpt.model = parseFloat(vmcpt.initialValue);
      }
      vmcpt.finishedLoading = true;
    };
  }
})();
