(function(){

  function MainCtrl($rootScope, User, Room){
    var $ctrl = this;
    var setUser = function(){
      $ctrl.currentUser = User.getCurrentUser();
    };
    var setRoom = function() {
      $ctrl.currentRoom = Room.getCurrentRoom();
    };
    var signoutUser = function(){
      User.signoutUser();
    };

    $ctrl.signoutUser = signoutUser;

    $rootScope.$on('room.set', setRoom);
    $rootScope.$on("user.set", setUser);

    setRoom();
    setUser();

  }

  angular
    .module('blocChat')
    .controller('MainCtrl', ['$rootScope', 'User', 'Room', MainCtrl]);

})();
