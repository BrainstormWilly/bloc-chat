(function() {

  function User($rootScope, $firebaseArray) {
    var service = {};

    var currentUser = null;
    service.getCurrentUser = getCurrentUser;
    service.setCurrentUser = setCurrentUser;

    function getCurrentUser() {
      return currentUser;
    }

    function setCurrentUser(user) {
      currentUser = user;
    }

    return service;
  }

  angular
    .module('blocChat')
    .factory('User', ['$rootScope', '$firebaseArray', User]);
})();
