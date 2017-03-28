(function() {

  function Message($firebaseArray) {
    var service = {};

    var ref = firebase.database().ref().child("messages");
    var messages = $firebaseArray(ref);

    service.getByRoomId = function(room) {
      return $firebaseArray(ref.orderByChild('roomID').equalTo(room.$id));
    };

    return service;
  }

  angular
    .module('blocChat')
    .factory('Message', ['$firebaseArray', Message]);
})();
