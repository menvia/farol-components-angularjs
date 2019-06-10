(function() {
  'use strict';

  angular
      .module('app.farol')
      .controller('FrlFieldLinkController', FrlFieldLinkController);

  /**
   * Controller for Farol Text Field Directive
   * @param   {Service} $mdDialog
   * @param   {Service} uuid Service
   * @constructor
   * @ngInject
   */
  function FrlFieldLinkController($mdDialog, uuid) {
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
    /**
     * Function to start edit dialog
     * @param {Object} ev event that triggered function
     */
    vmcpt.showEditDialog = (ev) => {
      const edit = $mdDialog
          .prompt()
          .title('Insert the link address')
          .textContent('Don\'t forget the protocol (e.g: https://)')
          .placeholder('Link address')
          .ariaLabel('Link address')
          .initialValue(vmcpt.model)
          .targetEvent(ev)
          .required(vmcpt.required)
          .ok('UPDATE')
          .cancel('CANCEL')
          .multiple(true);
      $mdDialog.show(edit).then(function(result) {
        vmcpt.model = result;
      });
    };
  }
})();
