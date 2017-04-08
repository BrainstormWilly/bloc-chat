(function() {

  function User($rootScope, $state, $firebaseAuth, $firebaseArray, $firebaseObject) {

    var service = {};
    var currentUser = null;
    var auth = $firebaseAuth();
    var ref = firebase.database().ref().child("users");

    var changeUserRoom = function(room_value){
      var onChangeUserRoom = function(snapshot){
        snapshot.ref.child('room').set(room_value);
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
      if( user===null ){
        $state.go("home", {}, {reload: true});
      }
    };

    var signinUser = function(email, password){
      auth.$signInWithEmailAndPassword(email, password)
        .then(function(user){
          ref.orderByChild("email").equalTo(email).on("child_added", toggleUserOnline);
          $state.go("home");
        })
        .catch(function(error){
          console.error(error);
        });
    };

    var signupUser = function(name, email, password){
      auth.$createUserWithEmailAndPassword(email, password)
        .then(function(user){
          user.updateProfile({
            displayName: name
          }).then(function(){
            service.all.$add({
              name: name,
              email: email,
              online: true,
              role: 'user'
            });
            $state.go("home");
          })
        }).catch(function(error){
          console.error(error);
        });
    };

    var signoutUser = function(){
      ref.orderByChild("email").equalTo(currentUser.email).on("child_added", toggleUserOnline);
      auth.$signOut();
    };

    var checkAuthorization = function(){
      return auth.$requireSignIn();
    };

    var toggleUserOnline = function(snapshot){
      var user = snapshot.val();
      if( user.online ){
        snapshot.ref.child('online').set(false);
      }else{
        snapshot.ref.child('online').set(true);
      }
    };


    auth.$onAuthStateChanged(setCurrentUser);

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
    .factory('User', ['$rootScope', '$state', '$firebaseAuth', '$firebaseArray', '$firebaseObject', User]);
})();
