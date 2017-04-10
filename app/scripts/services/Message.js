(function() {

  function Message($firebaseArray) {

    var ref = firebase.database().ref().child("messages");
    var service = {};

    service.title = "All Messages";
    service.all = $firebaseArray(ref);
    service.getByRoomId = function(room) {
      this.all = $firebaseArray(ref.orderByChild('roomID').equalTo(room.$id));
      this.title = room.$value;
    };

    return service;
  }

  angular
    .module('blocChat')
    .factory('Message', ['$firebaseArray', Message]);
})();
