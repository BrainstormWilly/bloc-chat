(function() {

  function Room($firebaseArray) {

    var ref = firebase.database().ref().child("rooms");
    var list = $firebaseArray(ref);


    function addRoom(room_name) {
      console.log('adding', room_name)
      list.$add(room_name);
      debugger;
    };

    return {
      all: list,
      addRoom: addRoom
    };
  }

  angular
    .module('blocChat')
    .factory('Room', ['$firebaseArray', Room]);
})();
