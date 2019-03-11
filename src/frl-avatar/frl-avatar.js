components.push({
  name: 'frlAvatar',
  settings: {
    bindings: {
      class: '@',
      size: '=?',
      userId: '=',
      userName: '=',
    },
    controller: 'frlAvatarController',
    controllerAs: 'vmdr',
    template: `@@include('frl-avatar.html')`,
  },
});

controllers.push({
  name: 'frlAvatarController',
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
