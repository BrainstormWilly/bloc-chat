(function(){

  function MainCtrl($rootScope, $state, User, Room){
    var $ctrl = this;

    $ctrl.currentUser = User.getCurrentUser();

    init();

    $rootScope.$on('$stateChangeSuccess', init);

    function init() {
      $ctrl.currentRoomId = $state.params.id || "room1";
      $ctrl.currentRoom = Room.getCurrentRoom();

      if (!$ctrl.currentRoom) {
        $ctrl.currentRoom = Room.setCurrentRoom($ctrl.currentRoomId);
      }
    }
  }

  angular
    .module('blocChat')
    .controller('MainCtrl', ['$rootScope', '$state', 'User', 'Room', MainCtrl]);

})();
