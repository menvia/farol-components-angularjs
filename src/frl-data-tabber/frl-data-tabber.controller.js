(function() {
  'use strict';

  angular.module('FarolComponents').controller('FrlDataTabber', FrlDataTabber);

  /**
   * Controller for Farol Router Field Directive
   * @param {Service} $translate
   * @param {Service} ObjectQueryService
   * @param {Service} LoadingSplashService
   * @param {Service} ObjectIdService
   * @constructor
   * @ngInject
   */
  function FrlDataTabber(
      $translate,
      ObjectQueryService,
      LoadingSplashService,
      ObjectIdService,
  ) {
    // variables
    const vmcpt = this;
    // Methods
    // init
    vmcpt.$onInit = () => {
      const loadingId = LoadingSplashService.showLoading(true);
      vmcpt.model = vmcpt.model || [];
      if (Array.isArray(vmcpt.model)) {
        vmcpt.model.forEach(item => {
          parseNewItem(item);
        });
        vmcpt.loaded = true;
      } else {
        vmcpt.loaded = false;
      }
      LoadingSplashService.hideLoading(loadingId);
    };

    vmcpt.addItem = () => {
      const loadingId = LoadingSplashService.showLoading(true);
      const newItem = parseNewItem({});
      vmcpt.model.push(newItem);
      LoadingSplashService.hideLoading(loadingId);
    };

    vmcpt.deleteItem = (_id) => {
      const loadingId = LoadingSplashService.showLoading(true);
      vmcpt.model.splice(
          vmcpt.model.findIndex(function(item) {
            return item._id === _id;
          }),
          1,
      );
      vmcpt.loaded = true;
      LoadingSplashService.hideLoading(loadingId);
    };

    vmcpt.getChildOrder = (childModel) =>
      ObjectQueryService.getProperty(
          vmcpt.itemOrderField || vmcpt.itemNameField || '_id',
          childModel,
      );

    vmcpt.getChildName = (childModel, index) =>
      vmcpt.itemNameField
        ? ObjectQueryService.getProperty(vmcpt.itemNameField, childModel) ||
          $translate.instant('NONAME')
        : $translate.instant('ITEM') + ' ' + index;

    vmcpt.minReached = () => {
      return vmcpt.minLength >= vmcpt.model.length;
    }

    vmcpt.maxReached = () => {
      return vmcpt.model.length >= vmcpt.maxLength;
    }

    const parseNewItem = (item) => {
      item._id = item._id || ObjectIdService.getString();
      return item;
    };
  }
})();
