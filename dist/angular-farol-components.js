'use strict';

let components = [];
let controllers = [];
('use strict');

components.push({
  name: 'frlProjectIcon',
  settings: {
    bindings: {
      class: '@',
      size: '=?',
      projectCode: '=',
      projectName: '=',
    },
    controller: 'FrlProjectIconController',
    controllerAs: 'vmdr',
    template:
      '<img\n    style="width: {{ vmdr.size }}px; min-width: {{ vmdr.size }}px; height: {{\n      vmdr.size\n    }}px; line-height: {{ vmdr.size }}px;"\n    frl-src="{{ vmdr.projectCode }},icon"\n  />',
  },
});
controllers.push({
  name: 'FrlProjectIconController',
  method: function method() {
    // variables
    let vmdr = this; // Methods
    // init

    vmdr.$onInit = function() {
      // Initialize with default value 40
      vmdr.size = vmdr.size || 36;
    };
  },
});
('use strict');

function _typeof(obj) {
  if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj &&
        typeof Symbol === 'function' &&
        obj.constructor === Symbol &&
        obj !== Symbol.prototype
        ? 'symbol'
        : typeof obj;
    };
  }
  return _typeof(obj);
}

(function(root, factory) {
  'use strict';

  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['angular'], factory);
  } else if (
    typeof module !== 'undefined' &&
    _typeof(module.exports) === 'object'
  ) {
    // CommonJS support (for us webpack/browserify/ComponentJS folks)
    module.exports = factory(require('angular'));
  } else {
    // in the case of no module loading system
    // then don't worry about creating a global
    // variable like you would in normal UMD.
    // It's not really helpful... Just call your factory
    return factory(angular);
  }
})(void 0, function(angular) {
  'use strict'; // create your angular module and do stuff

  let moduleName = 'FarolComponents';
  let mod = angular.module(moduleName, []);
  components.forEach(function(item) {
    return mod.component(item.name, item.settings);
  });
  controllers.forEach(function(item) {
    return mod.controller(item.name, item.method);
  });
  return moduleName; // the name of your module
});
