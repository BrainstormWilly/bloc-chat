(function() {

  function User($rootScope, $firebaseArray) {

    var service = {};
    var currentUser = null;
    var getCurrentUser = function () {
      return currentUser;
    };
    var setCurrentUser = function (user) {
      currentUser = user;
    };

    service.getCurrentUser = getCurrentUser;
    service.setCurrentUser = setCurrentUser;

    return service;
  }

  angular
    .module('blocChat')
    .factory('User', ['$rootScope', '$firebaseArray', User]);
})();
