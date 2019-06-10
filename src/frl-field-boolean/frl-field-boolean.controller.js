(function() {
  'use strict';

  angular
      .module('FarolComponents')
      .controller('FrlFieldBooleanController', FrlFieldBooleanController);

  /**
   * Controller for Farol Text Field Directive
   * @param       {Object} uuid Service
   * @constructor
   * @ngInject
   */
  function FrlFieldBooleanController(uuid) {
    // variables
    const vmdr = this;
    // Methods
    // init
    vmdr.$onInit = () => {
      if (
        vmdr.initialValue &&
        (vmdr.model === '' || vmdr.model === undefined)
      ) {
        vmdr.model = !!vmdr.initialValue;
      }
      vmdr.finishedLoading = true;
    };
  }
})();
