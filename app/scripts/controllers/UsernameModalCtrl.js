(function(){

  function UsernameModalCtrl($rootScope, $uibModalInstance, $state, User, Room){
    var $ctrl = this;
    var signin = function(){
      User.signinUser($ctrl.email, $ctrl.password)
    };
    var signup = function(){
      User.signupUser($ctrl.name, $ctrl.email, $ctrl.password);
    };
    var onUserSet = function(){
      var user = User.getCurrentUser();
      if( user ){
        if( user.room_id ){
          $state.go('home.room', {id: user.room_id});
        }else{
          var room = Room.getCurrentRoom();
          User.changeUserRoom(room.$id);
          $state.go('home.room', {id: room.$id}, {reload: true});
        }
      }else{
        $state.go("home", {}, {reload: true});
      }
      $uibModalInstance.close();
    };

    $ctrl.name = '';
    $ctrl.email = '';
    $ctrl.password = '';
    $ctrl.new_user = false;
    $ctrl.signin = signin;
    $ctrl.signup = signup;

    $rootScope.$on("user.set", onUserSet);

  }

  angular
    .module('blocChat')
    .controller('UsernameModalCtrl', ['$rootScope', '$uibModalInstance', '$state', 'User', 'Room', UsernameModalCtrl]);

})();
