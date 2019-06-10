(function() {
  'use strict';

  angular
      .module('FarolComponents')
      .controller('FrlFieldDisplaytextController', FrlFieldDisplaytextController);

  /**
   * Controller for Farol Text Field Directive
   * @param       {Object} uuid Service
   * @constructor
   * @ngInject
   */
  function FrlFieldDisplaytextController(uuid) {
    // variables
    const vmcpt = this;
    // Methods
    // init
    vmcpt.$onInit = () => {
      vmcpt.finishedLoading = true;
    };
  }
})();
