(function(){
  function config($locationProvider, $stateProvider){
    $locationProvider
      .html5Mode({
        enabled: true,
        requireBase: false
      });
    // $stateProvider
    //   .state('landing',{
    //     url: '/',
    //     controller: 'LandingCtrl as landing',
    //     templateUrl: '/templates/landing.html'
    //   });
  }
  angular
    .module('blocJams', ['ui.router', 'firebase'])
    .config(config);

})();
