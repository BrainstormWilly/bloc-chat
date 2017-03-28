(function() {

  function Message($firebaseArray) {

    var ref = firebase.database().ref().child("messages");
    var service = {};

    service.user = "";
    service.title = "All Messages";
    service.all = $firebaseArray(ref);

    service.getByRoomId = function(room) {
      $firebaseArray(ref.orderByChild('roomID').equalTo(room.$id));
      return this.all;
    };
    service.setUser = function(user){
      this.user = user;
    };


    return service;
  }

  angular
    .module('blocChat')
    .factory('Message', ['$firebaseArray', Message]);
})();
