(function() {

  function User($rootScope, $firebaseAuth, $firebaseArray, $firebaseObject) {

    var service = {};
    var currentUser = null;
    var auth = $firebaseAuth();
    var ref = firebase.database().ref().child("users");

    var changeUserRoom = function(room_id){
      var onChangeUserRoom = function(snapshot){
        snapshot.ref.child('room_id').set(room_id);
      };
      ref.orderByChild("email").equalTo(currentUser.email).on("child_added", onChangeUserRoom);
    };

    var getUsers = function(){
      service.all = $firebaseArray(ref);
      return service.all.$loaded();
    };

    var getCurrentUser = function () {
      return currentUser;
    };

    var setCurrentUser = function (user) {
      currentUser = user;
      $rootScope.$broadcast("user.set");
    };

    var signinUser = function(email, password){
      auth.$signInWithEmailAndPassword(email, password);
    };

    var signupUser = function(name, email, password){
      auth.$createUserWithEmailAndPassword(email, password)
        .then(function(user){
          user.updateProfile({
            displayName: name
          }).then(function(){
            var user = {
              name: name,
              email: email,
              online: true,
              role: 'user',
              room_id: null
            };
            service.all.$add(user);
            setCurrentUser(user);
          })
        }).catch(function(error){
          console.error(error);
        });
    };

    var signoutUser = function(){
      auth.$signOut();
    };

    var checkAuthorization = function(){
      return auth.$requireSignIn();
    };

    var onAuthStateChanged = function(user){
      if( user ){
        ref.orderByChild("email").equalTo(user.email).on("child_added", setUserOnline);
      }else if (currentUser) {
        ref.orderByChild("email").equalTo(currentUser.email).on("child_added", setUserOffline);
      }
    };

    var setUserOnline = function(snapshot){
      var user = snapshot.val();
      snapshot.ref.child('online').set(true);
      setCurrentUser(user);
    };

    var setUserOffline = function(snapshot){
      console.log("setUserOffline");
      snapshot.ref.child('online').set(false);
      setCurrentUser(null);
    };


    auth.$onAuthStateChanged(onAuthStateChanged);

    service.changeUserRoom = changeUserRoom;
    service.checkAuthorization = checkAuthorization;
    service.getUsers = getUsers;
    service.getCurrentUser = getCurrentUser;
    // service.setCurrentUser = setCurrentUser;
    service.signinUser = signinUser;
    service.signupUser = signupUser;
    service.signoutUser = signoutUser;


    return service;
  }

  angular
    .module('blocChat')
    .factory('User', ['$rootScope', '$firebaseAuth', '$firebaseArray', '$firebaseObject', User]);
})();
