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
          },
          'main': {
            controller: "MainCtrl as main",
            templateUrl: "/templates/main.html"
          }
        }
      });
  }
  angular
    .module('blocChat', ['ui.router', 'ui.bootstrap', 'firebase'])
    .config(config);

})();
