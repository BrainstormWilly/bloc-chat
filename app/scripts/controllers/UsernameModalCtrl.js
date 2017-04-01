(function(){

  function UsernameModalCtrl($uibModalInstance){
    var $ctrl = this;
    var username_submit = function(){
      $uibModalInstance.close($ctrl.username);
    };

    $ctrl.username = '';
    $ctrl.disabled = $ctrl.username=='' ? "disabled" : "false";
    $ctrl.ok = username_submit;
  }

  angular
    .module('blocChat')
    .controller('UsernameModalCtrl', ['$uibModalInstance', UsernameModalCtrl]);

})();
