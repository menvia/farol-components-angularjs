(function() {
  'use strict';

  angular
      .module('app.farol')
      .controller('FrlFieldSelectController', FrlFieldSelectController);

  /**
   * Controller for Farol Select Field Directive
   * @param {*} $scope
   * @param {Service} ObjectQueryService
   * @param {Service} LoadingSplashService
   * @constructor
   * @ngInject
   */
  function FrlFieldSelectController(
      $scope,
      ObjectQueryService,
      LoadingSplashService,
  ) {
    // variables
    const vmcpt = this;
    let toDestroy;
    vmcpt.list = [];

    // Methods
    // init
    vmcpt.$onInit = () => {
      const loadingId = LoadingSplashService.showLoading(true);
      if (
        vmcpt.initialValue &&
        (vmcpt.model === '' || vmcpt.model === undefined)
      ) {
        vmcpt.model = String(vmcpt.initialValue);
      }
      toDestroy = $scope.$watchCollection('vmcpt.rawList', () => {
        const watchLoadingId = LoadingSplashService.showLoading(true);
        vmcpt.list = [];
        if (Array.isArray(vmcpt.rawList)) {
          vmcpt.rawList.forEach((item) => {
            vmcpt.list.push({
              name: ObjectQueryService.getObjectAndField(
                  vmcpt.itemnamefield || 'name',
                  item,
              ),
              _id: ObjectQueryService.getObjectAndField(
                  vmcpt.itemidfield || '_id',
                  item,
              ),
            });
          });
        }
        LoadingSplashService.hideLoading(watchLoadingId);
      });
      vmcpt.finishedLoading = true;
      LoadingSplashService.hideLoading(loadingId);
    };

    vmcpt.$onDestroy = () => {
      toDestroy();
    };
  }
})();
