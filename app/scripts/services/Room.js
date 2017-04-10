(function() {

  function Room($rootScope, $firebaseArray, $firebaseObject) {
    var service = {};

    var ref = firebase.database().ref().child("rooms");
    var currentRoom = null;

    service.all = $firebaseArray(ref);


    service.addRoom = function(room_name) {
      this.all.$add(room_name);
    };

    service.getCurrentRoom = function() {
      return currentRoom;
    }

    service.setCurrentRoom = function(roomId) {
      currentRoom = $firebaseObject(ref.child(roomId));
      return currentRoom;
    }

    return service;
  }

  angular
    .module('blocChat')
    .factory('Room', ['$rootScope', '$firebaseArray', '$firebaseObject', Room]);
})();
