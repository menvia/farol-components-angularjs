(function() {
  'use strict';

  angular.module('FarolComponents').component('frlTable', {
    bindings: {
      model: '<frlModel',
      fieldName: '@frlFieldname',
      columns: '<frlColumns',
      columnNameField: '@frlColumnnamefield',
      columnNameList: '<?frlColumnnamelist',
      columnOrderField: '@?frlColumnorderfield',
      columnFilter: '<?frlColumnfilter',
      hint: '@?frlHint',
      help: '@?frlHelp',
      lineNameField: '@?frlLinenamefield',
      lineNameList: '<?frlLinenamelist',
      lineOrderField: '@?frlLineorderfield',
      lineFilter: '<?frlLinefilter',
      cellLineField: '@?frlCelllinefield',
      wrapAround: '<?frlWraparound',
    },
    controller: 'FrlTable',
    controllerAs: 'vmcpt',
    template: `@@include('frl-table.html')`,
  });
})();
