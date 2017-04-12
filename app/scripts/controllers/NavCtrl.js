(function(){

  function NavCtrl($rootScope, $document, $uibModal, $state, Room, User, data){
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
      Room.setCurrentRoom( room.$id );
      User.changeUserRoom( room.$id );
      $state.go('home.room', {id: room.$id});
      $ctrl.navOff = true;
    };

    var getRoomValue = function(room_id){
      return Room.getRoomById(room_id).$value;
    };

    var onSetUser = function(){
      $ctrl.currentUser  = User.getCurrentUser();
      if( !$ctrl.currentUser ){
        $state.go("home", {}, {reload: true});
      }
    };

    // var onStateChanged = function(room_id){
    //   Room.setCurrentRoom( room_id );
    // };

    $ctrl.users = User.all;
    $ctrl.rooms = Room.all;
    $ctrl.navOff = true;
    $ctrl.currentUser = User.getCurrentUser();
    $ctrl.currentRoomValue = null;
    $ctrl.initAddRoom = initAddRoom;
    $ctrl.selectRoom = selectRoom;
    $ctrl.getRoomValue = getRoomValue;

    // $rootScope.$on('$stateChangeSuccess', onStateChanged($state.params.id));

    $rootScope.$on("user.set", onSetUser);

  }

  angular
    .module('blocChat')
    .controller('NavCtrl', ['$rootScope', '$document', '$uibModal', '$state', 'Room', 'User', 'data', NavCtrl]);

})();
