(function() {
  'use strict';

  angular
      .module('FarolComponents')
      .controller('FrlFieldTimeController', FrlFieldTimeController);

  /**
   * Controller for Farol Text Field Directive
   * @param {*} $scope
   * @param       {Object} uuid Service
   * @constructor
   * @ngInject
   */
  function FrlFieldTimeController($scope, uuid) {
    // variables
    const vmcpt = this;
    // Methods
    // init
    vmcpt.$onInit = () => {
      if (
        vmcpt.initialValue &&
        (vmcpt.model === '' || vmcpt.model === undefined)
      ) {
        vmcpt.model = vmcpt.initialValue;
      }

      $scope.$watch(vmcpt.model, () => {
        if (vmcpt.model) {
          vmcpt.model = new Date(vmcpt.model);
          if (vmcpt.hasDate) {
            vmcpt.year = vmcpt.model.getFullYear();
            vmcpt.month = vmcpt.model.getMonth();
            vmcpt.day = vmcpt.model.getDate();
          }
          if (vmcpt.hasTime) {
            vmcpt.hour = vmcpt.model.getHours();
            vmcpt.minute = vmcpt.model.getMinutes();
          }
        }
      });

      vmcpt.finishedLoading = true;
    };

    vmcpt.updateModel = () => {
      if (vmcpt.hasDate && vmcpt.year && vmcpt.month && vmcpt.day) {
        if (!(vmcpt.model instanceof Date)) {
          vmcpt.model = new Date(0);
        }
        vmcpt.year = vmcpt.model.getFullYear();
        vmcpt.month = vmcpt.model.getMonth();
        vmcpt.day = vmcpt.model.getDate();
      }
      if (vmcpt.hasTime && vmcpt.hour && vmcpt.minute) {
        if (!(vmcpt.model instanceof Date)) {
          vmcpt.model = new Date(0);
        }
        vmcpt.hour = vmcpt.model.getHours();
        vmcpt.minute = vmcpt.model.getMinutes();
      }
    };
  }
})();
