(function(){

  function blocChatCookies($document, $cookies, $uibModal, $state, User, Room){
    var currentUser = $cookies.get('blockChatCurrentUser');
    if( !currentUser || currentUser === '' ) {
      var parentElem = angular.element($document[0].querySelector('body .modal-parent'));
      var modalInstance = $uibModal.open({
        animation: true,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: '/templates/username-modal.html',
        backdropClass: "modal-backdrop",
        backdrop: 'static',
        windowClass: "modal-panel",
        controller: 'UsernameModalCtrl',
        controllerAs: 'modal',
        appendTo: parentElem
      });

      modalInstance.result.then(function (username) {
        $cookies.put('blockChatCurrentUser', username);
        User.setCurrentUser(username);
      });
    } else{
      User.setCurrentUser(currentUser);
    }
  }

  function config($locationProvider, $stateProvider){
    $locationProvider
      .html5Mode({
        enabled: true,
        requireBase: false
      });

    $stateProvider
      .state('home',{
        url: '/',
        views: {
          'nav': {
            controller: 'NavCtrl as nav',
            templateUrl: '/templates/nav.html'
          },
          'main': {
            controller: "MainCtrl as main",
            templateUrl: "/templates/main.html"
          },
          'footer': {
            controller: "FooterCtrl as footer",
            templateUrl: "/templates/footer.html"
          }
        }
      })
      .state('home.room', {
        url: 'room/:id'
      });
  }

  angular
    .module('blocChat', ['ngCookies', 'ui.router', 'ui.bootstrap', 'firebase', 'angularMoment'])
    .config(config)
    .run(['$document', '$cookies', '$uibModal', '$state', 'User', 'Room', blocChatCookies]);

})();
