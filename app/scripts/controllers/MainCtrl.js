(function(){

  function MainCtrl(Message){
    var $ctrl = this;
    $ctrl.message = Message;
  }

  angular
    .module('blocChat')
    .controller('MainCtrl', ['Message', MainCtrl]);

})();
