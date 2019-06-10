(function() {
  'use strict';

  angular
      .module('app.farol')
      .controller('FrlFieldLimitController', FrlFieldLimitController);

  /**
   * Controller for Farol Text Field Directive
   * @param       {Object} $scope Service
   * @constructor
   * @ngInject
   */
  function FrlFieldLimitController($scope) {
    // variables
    const vmcpt = this;
    // Methods
    // init
    vmcpt.$onInit = () => {
      vmcpt.minValue =
        vmcpt.minValue && vmcpt.minValue > 0 ? vmcpt.minValue : 0;
      vmcpt.valueStep = vmcpt.valueStep || 1;
      if (vmcpt >= 0) {
        vmcpt.limited = true;
        vmcpt.limit = vmcpt.model;
      } else {
        vmcpt.model = -1;
        vmcpt.limited = false;
        vmcpt.limit = vmcpt.minValue;
      }
      vmcpt.finishedLoading = true;
    };

    vmcpt.updateModel = () => {
      vmcpt.model = vmcpt.limited === false ? -1 : vmcpt.limit;
    };
  }
})();
