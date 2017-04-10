(function(){

  function UsernameModalCtrl($rootScope, $uibModalInstance, User){
    var $ctrl = this;
    var signin = function(){
      User.signinUser($ctrl.email, $ctrl.password);
    };
    var signup = function(){
      User.signupUser($ctrl.name, $ctrl.email, $ctrl.password);
    };
    var onSignIn = function(){
      $uibModalInstance.close();
    };

    $ctrl.name = '';
    $ctrl.email = '';
    $ctrl.password = '';
    $ctrl.new_user = false;
    $ctrl.signin = signin;
    $ctrl.signup = signup;

    $rootScope.$on("user.set", onSignIn);

  }

  angular
    .module('blocChat')
    .controller('UsernameModalCtrl', ['$rootScope', '$uibModalInstance', 'User', UsernameModalCtrl]);

})();
