(function(){
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
          }
        }
      });
  }
  angular
    .module('blocChat', ['ui.router', 'ui.bootstrap', 'firebase'])
    .config(config);

})();
