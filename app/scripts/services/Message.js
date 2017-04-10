(function() {

  function Message($firebaseArray, moment) {

    var ref = firebase.database().ref().child("messages");
    // var messages = $firebaseArray(ref);
    var service = {};
    var getByRoomId = function(room) {
      return $firebaseArray(ref.orderByChild('roomID').equalTo(room.$id));
    };
    var send = function(message, room, user){
      $firebaseArray(ref).$add({
        content: message,
        roomID: room,
        username: user,
        sentAt: moment.utc().format()
      });
    };

    service.getByRoomId = getByRoomId;
    service.send = send;

    return service;
  }

  angular
    .module('blocChat')
    .factory('Message', ['$firebaseArray', 'moment', Message]);
})();
