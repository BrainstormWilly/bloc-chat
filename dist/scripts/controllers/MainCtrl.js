(function(){

  function MainCtrl($document, $uibModal, Room, Message){
    var $ctrl = this;

    $ctrl.currentRoomId = 2;

  }

  angular
    .module('blocChat')
    .controller('MainCtrl', ['$document', '$uibModal', 'Room', 'Message', MainCtrl]);

})();
