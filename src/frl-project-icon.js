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
    template: `<img
    style="width: {{ vmdr.size }}px; min-width: {{ vmdr.size }}px; height: {{
      vmdr.size
    }}px; line-height: {{ vmdr.size }}px;"
    frl-src="{{ vmdr.projectCode }},icon"
  />`,
  },
});

controllers.push({
  name: 'FrlProjectIconController',
  method: function() {
    // variables
    const vmdr = this;
    // Methods
    // init
    vmdr.$onInit = function() {
      // Initialize with default value 40
      vmdr.size = vmdr.size || 36;
    };
  },
});
