(function() {

  function Room($firebaseArray) {
    var ref = firebase.database().ref().child("rooms");
    var service = {};
    service.all = $firebaseArray(ref);
    service.addRoom = function(room_name){
      var list = $firebaseArray(ref);
      list.$add(room_name);
    };

    return service;
  }

  angular
    .module('blocChat')
    .factory('Room', ['$firebaseArray', Room]);
})();
