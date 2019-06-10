(function() {
  'use strict';

  angular.module('FarolComponents').controller('FrlTable', FrlTable);

  /**
   * Controller for Farol Router Field Directive
   * @param {Service} $translate
   * @param {Service} ObjectQueryService
   * @param {Service} LoadingSplashService
   * @param {Service} ObjectIdService
   * @constructor
   * @ngInject
   */
  function FrlTable(
      $translate,
      ObjectQueryService,
      LoadingSplashService,
      ObjectIdService,
  ) {
    // variables
    const vmcpt = this;
    // Methods
    const parseNewItem = (item) => {
      item._id = item._id || ObjectIdService.getString();
      return item;
    };
    /**
     * initialize data to be exhibit on table
     */
    const initialize = () => {
      const loadingId = LoadingSplashService.showLoading(true);
      vmcpt.loaded = undefined;
      vmcpt.model = vmcpt.model || [];
      vmcpt.columns = vmcpt.columns || [];
      if (Array.isArray(vmcpt.model) && Array.isArray(vmcpt.columns)) {
        vmcpt.model.forEach((item) => {
          parseNewItem(item);
        });
        vmcpt.columns.forEach((item) => {
          parseNewItem(item);
        });
        vmcpt.loaded = true;
      } else {
        vmcpt.loaded = false;
      }
      LoadingSplashService.hideLoading(loadingId);
    };
    // init
    vmcpt.$onInit = initialize;

    vmcpt.getColumnName = (column) => {
      let result;
      if (Array.isArray(vmcpt.columnNameList)) {
        result = ObjectQueryService.getProperty(
            '_id:' +
            ObjectQueryService.getProperty(vmcpt.columnNameField, column) +
            '.name',
            vmcpt.columnNameList,
        );
      } else {
        result = ObjectQueryService.getProperty(vmcpt.columnNameField, column);
      }
      return result;
    };

    vmcpt.getLineName = (line) => {
      let result;
      if (Array.isArray(vmcpt.lineNameList)) {
        result = ObjectQueryService.getProperty(
            '_id:' +
            ObjectQueryService.getProperty(vmcpt.lineNameField, line) +
            '.name',
            vmcpt.lineNameList,
        );
      } else {
        result = ObjectQueryService.getProperty(vmcpt.lineNameField, line);
      }
      return result;
    };

    vmcpt.getCellData = (column, line) => {
      return ObjectQueryService.getProperty(((vmcpt.cellLineField) ? vmcpt.cellLineField + '.' : '') + column._id ,line);
    };

    vmcpt.getChildName = (childModel, index) =>
      vmcpt.itemNameField
        ? ObjectQueryService.getProperty(vmcpt.itemNameField, childModel) ||
          $translate.instant('NONAME')
        : $translate.instant('ITEM') + ' ' + index;
  }
})();
