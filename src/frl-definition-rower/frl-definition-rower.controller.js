(function() {
  'use strict';

  angular
      .module('app.farol')
      .controller('FrlDefinitionRower', FrlDefinitionRower);

  /**
   * Controller for Farol Definition Rower Component
   * @param {Service} LoadingSplashService
   * @param {Service} ObjectQueryService
   * @param {Service} ObjectIdService
   * @constructor
   * @ngInject
   */
  function FrlDefinitionRower(
      LoadingSplashService,
      ObjectQueryService,
      ObjectIdService,
  ) {
    // variables
    const vmcpt = this;
    // Methods
    // init
    vmcpt.$onInit = () => {
      const loadingId = LoadingSplashService.showLoading(true);
      vmcpt.model = vmcpt.model || {};
      if (vmcpt.rawChildrenDefinitions) {
        vmcpt.childrenDefinitions = JSON.parse(
            JSON.stringify(vmcpt.rawChildrenDefinitions),
        );
      }
      if (Array.isArray(vmcpt.rawChildren)) {
        vmcpt.children = JSON.parse(JSON.stringify(vmcpt.rawChildren));
        vmcpt.children.forEach((child, index) => {
          child._id = child._id || ObjectIdService.getString();
          child.modelPath = vmcpt.modelPath.concat(
            vmcpt.modelPath ? '.' : '',
            child.modelfield,
          );
          if (child.modelfield.includes('.')) {
            const lastDot = child.modelfield.lastIndexOf('.');
            child.modelObject = ObjectQueryService.getProperty(
                child.modelfield.slice(0, lastDot),
                vmcpt.model,
            );
            child.modelAttribute = child.modelfield.slice(lastDot + 1);
          } else {
            (child.modelObject = vmcpt.model),
            (child.modelAttribute = child.modelfield);
          }
        });
        vmcpt.loaded = true;
      } else {
        vmcpt.loaded = false;
      }
      LoadingSplashService.hideLoading(loadingId);
    };

    vmcpt.getChildOrder = (child) => child.order || child.tempId;
  }
})();
