(function() {

  function Room($rootScope, $firebaseArray, $firebaseObject, $state) {

    var service = {};
    var ref = firebase.database().ref().child("rooms");
    var currentRoom = null;
    var addRoom = function(room_name) {
      service.all.$add(room_name);
    };
    var getCurrentRoom = function() {
      if( !currentRoom ){
        currentRoom = service.all[0];
      }
      return currentRoom;
    };
    var setCurrentRoom = function(roomId) {
      currentRoom = $firebaseObject(ref.child(roomId));
      $rootScope.$broadcast('room.set');
    };
    var getRooms = function(){
      service.all = $firebaseArray(ref);
      return service.all.$loaded();
    };

    service.getRooms = getRooms;
    service.addRoom = addRoom;
    service.getCurrentRoom = getCurrentRoom;
    service.setCurrentRoom = setCurrentRoom;

    // $rootScope.$on('$stateChangeSuccess', setCurrentRoom($state.params.id));

    return service;
  }

  angular
    .module('blocChat')
    .factory('Room', ['$rootScope', '$firebaseArray', '$firebaseObject', '$state', Room]);
})();
