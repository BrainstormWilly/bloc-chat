(function(){

  function MainCtrl($rootScope, $state, User, Room){
    var $ctrl = this;



    // init();

    $rootScope.$on('$stateChangeSuccess', init);
    $rootScope.$on("user.set", setUser);

    function setUser(){
      $ctrl.currentUser = User.getCurrentUser();
    }

    function init() {
      $ctrl.currentUser = User.getCurrentUser();
      $ctrl.currentRoomId = $state.params.id;
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
