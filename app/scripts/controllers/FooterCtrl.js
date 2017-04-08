(function(){

  function FooterCtrl($rootScope, $state, User, Room, Message){
    var $ctrl = this;
    var sendMessage = function(){
      // console.log($ctrl.message, Room.getCurrentRoom().$id, User.getCurrentUser());
      Message.send($ctrl.message, Room.getCurrentRoom().$id, User.getCurrentUser().displayName);
      $ctrl.message = '';
      // $state.go('home.room', {id: Room.getCurrentRoom().$id});
    };

    $ctrl.message = "";
    $ctrl.sendMessage = sendMessage;
  }

  angular
    .module('blocChat')
    .controller('FooterCtrl', ['$rootScope', '$state', 'User', 'Room', 'Message', FooterCtrl]);

})();
