(function(){

  function UsernameModalCtrl($uibModalInstance){
    var $ctrl = this;
    $ctrl.username = '';
    $ctrl.disabled = $ctrl.username=='' ? "disabled" : "false";

    $ctrl.ok = function(){
      $uibModalInstance.close($ctrl.username);
    };
  }

  angular
    .module('blocChat')
    .controller('UsernameModalCtrl', ['$uibModalInstance', UsernameModalCtrl]);

})();
