(function(){

  function NavCtrl($document, $uibModal, Room, Message){
    var $ctrl = this;
    $ctrl.rooms = Room.all;

    $ctrl.initAddRoom = function(){
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
    }

    $ctrl.selectRoom = function(room){
      Message.getByRoomId(room);
    };
  }

  angular
    .module('blocChat')
    .controller('NavCtrl', ['$document', '$uibModal', 'Room', 'Message', NavCtrl]);

})();
