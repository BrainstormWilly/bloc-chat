(function(){

  function NavCtrl($document, $uibModal, $state, Room, User){
    var $ctrl = this;

    var initAddRoom = function(){
      var parentElem = angular.element($document[0].querySelector('body .modal-parent'));

      var modalInstance = $uibModal.open({
        animation: true,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: '/templates/new-room-modal.html',
        backdropClass: "modal-backdrop",
        windowClass: "modal-panel",
        controller: 'NewRoomModalCtrl',
        controllerAs: 'modal',
        appendTo: parentElem
      });

      modalInstance.result.then(function (room_name) {
        Room.addRoom(room_name);
      }, function () {
        console.log('dismissed');
      });
    };

    var selectRoom = function(room){
      Room.setCurrentRoom(room.$id);
      User.changeUserRoom( room.$value );
      $state.go('home.room', {id: room.$id});
      $ctrl.navOff = true;
    };

    $ctrl.users = User.all;
    $ctrl.rooms = Room.all;
    $ctrl.navOff = true;
    $ctrl.initAddRoom = initAddRoom;
    $ctrl.selectRoom = selectRoom;

  }

  angular
    .module('blocChat')
    .controller('NavCtrl', ['$document', '$uibModal', '$state', 'Room', 'User', NavCtrl]);

})();
