(function() {

  function Room($rootScope, $firebaseArray) {

    var ref = firebase.database().ref().child("rooms");
    var service = {};

    service.all = $firebaseArray(ref);

    service.addRoom = function(room_name) {
      this.all.$add(room_name);
    };

    return service;
  }

  angular
    .module('blocChat')
    .factory('Room', ['$rootScope', '$firebaseArray', Room]);
})();
