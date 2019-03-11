components.push({
  name: 'frlProjectIcon',
  settings: {
    bindings: {
      class: '@',
      size: '=?',
      projectCode: '=',
      projectName: '=',
    },
    controller: 'frlProjectIconController',
    controllerAs: 'vmdr',
    template: `@@include('frl-project-icon.html')`,
  },
});

controllers.push({
  name: 'frlProjectIconController',
  method: function() {
    // variables
    const vmdr = this;
    // Methods
    // init
    vmdr.$onInit = () => {
      // Initialize with default value 40
      vmdr.size = vmdr.size || 36;
    };
  },
});
