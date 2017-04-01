(function() {

  function Room($rootScope, $firebaseArray, $firebaseObject, $state) {

    var service = {};
    var ref = firebase.database().ref().child("rooms");
    var currentRoom = null;
    var addRoom = function(room_name) {
      service.all.$add(room_name);
    };
    var getCurrentRoom = function() {
      return currentRoom;
    };
    var setCurrentRoom = function(roomId) {
      currentRoom = $firebaseObject(ref.child(roomId));
      return currentRoom;
    };

    service.all = $firebaseArray(ref);
    service.addRoom = addRoom;
    service.getCurrentRoom = getCurrentRoom;
    service.setCurrentRoom = setCurrentRoom;

    service.all.$loaded().then(function(data){
      $state.go('home.room', {id: data.$keyAt(0)});
    });

    return service;
  }

  angular
    .module('blocChat')
    .factory('Room', ['$rootScope', '$firebaseArray', '$firebaseObject', '$state', Room]);
})();
