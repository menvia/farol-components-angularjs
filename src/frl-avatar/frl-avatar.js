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
  /**
   * @param {Object} $rootScope Service
   * @param {Object} $scope Service
   * @param {Object} $timeout Service
   * @ngInject
   * */
  method: function($rootScope, $scope, $timeout) {
    // variables
    const vmdr = this;
    // Methods
    // init
    vmdr.$onInit = () => {
      vmdr.reload = true;
      // Initialize with default value 40
      vmdr.size = vmdr.size || 36;
    };
    // Reload on refresh avatar
    $rootScope.$on('refreshAvatar', () => {
      vmdr.reload = false;
      $timeout(() => (vmdr.reload = true), 500);
    });
  },
});
