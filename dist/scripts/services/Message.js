(function() {

  function Message($firebaseArray) {

    var ref = firebase.database().ref().child("messages");
    var service = {};

    service.user = "";
    service.title = "All Messages";
    service.all = $firebaseArray(ref);
    service.getByRoomId = function(room) {
      this.all = $firebaseArray(ref.orderByChild('roomID').equalTo(room.$id));
      this.title = room.$value;
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
